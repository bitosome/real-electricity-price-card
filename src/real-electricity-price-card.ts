import { LitElement, TemplateResult, css, html, nothing, svg } from 'lit';
import { designTokens } from './shared/design-tokens';
import {
  componentStyles,
  familyStyles,
  formatHassDateTime,
  formatHassNumber,
  hassTimeZone,
  headerStyles,
  isAvailableValue,
  notice,
  showEntityMoreInfo,
  telemetryStyles,
  UI_ICONS,
  UNAVAILABLE_TEXT,
} from '@bitosome/ha-card-ui';

const CARD_VERSION = '0.2.0';
const DEFAULT_YESTERDAY_ENTITY = 'sensor.real_electricity_price_hourly_prices_yesterday';
const DEFAULT_TODAY_ENTITY = 'sensor.real_electricity_price_hourly_prices_today';
const DEFAULT_TOMORROW_ENTITY = 'sensor.real_electricity_price_hourly_prices_tomorrow';
const DEFAULT_CURRENT_PRICE_ENTITY = 'sensor.real_electricity_price_current_price';
const DEFAULT_CHEAP_PRICE_ENTITY = 'number.real_electricity_price_acceptable_price';
const DEFAULT_UNIT = '€/kWh';
const HOUR_MS = 60 * 60 * 1000;
const CHART_HOURS = 48;
const CHART_WIDTH = 360;
// Chart labels are 11 CSS pixels, so label room is estimated in pixels and converted to viewBox units.
const AXIS_LABEL_CHAR_PX = 5.8;
const TIME_LABEL_GAP_PX = 8;
const TICK_STEP_HOURS = [6, 8, 12, 16, 24, 48];

type SelectorMode = 'hover' | 'click';

interface HassEntity {
  state: string;
  attributes?: Record<string, unknown>;
}

interface HomeAssistant {
  states: Record<string, HassEntity | undefined>;
  locale?: {
    language?: string;
    number_format?: string;
    time_format?: string;
    time_zone?: string;
  };
  config?: {
    time_zone?: string;
  };
}

interface RealElectricityPriceCardConfig {
  type?: string;
  yesterday_entity?: string;
  today_entity?: string;
  tomorrow_entity?: string;
  current_price_entity?: string;
  cheap_price_entity?: string;
  cheap_threshold?: number;
  name?: string;
  chart_type?: 'bar' | 'line';
  graph_type?: 'bar' | 'line';
  selector_mode?: SelectorMode;
  height?: number;
  horizontal_lines?: number;
  price_decimals?: number;
  axis_decimals?: number;
  unit?: string;
  min?: number;
  max?: number;
  show_current_marker?: boolean;
  show_extremes?: boolean;
  show_stats?: boolean;
  past_color?: string;
  current_hour_color?: string;
  future_color?: string;
  cheap_past_color?: string;
  cheap_color?: string;
  cheap_current_color?: string;
  fill_color?: string;
  marker_color?: string;
  grid_color?: string;
  chart_background?: string;
  card_background?: string;
}

interface HourlyPriceItem {
  x?: number | string;
  y?: number | string;
  price?: number | string;
  actual_price?: number | string;
  nord_pool_price?: number | string;
  start_time?: string;
  end_time?: string;
}

interface PricePoint {
  timestamp: number;
  value: number;
  sourceTimestamp?: number;
}

interface ChartPoint extends PricePoint {
  x: number;
  y: number;
  sourceTimestamp?: number;
}

interface ChartBox {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface PriceRange {
  min: number;
  max: number;
}

interface ChartDomain {
  start: number;
  end: number;
}

interface StepPathSegment {
  line: string;
  area: string;
}

interface PriceDataResult {
  points: PricePoint[];
  moreInfoEntityId?: string;
  missingEntityIds: string[];
}

function fireEvent(node: HTMLElement, type: string, detail: unknown): void {
  node.dispatchEvent(new CustomEvent(type, {
    detail,
    bubbles: true,
    composed: true,
  }));
}

function configNumber(value: unknown, min: number, max: number): number | undefined {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) return undefined;
  return Math.max(min, Math.min(max, numberValue));
}

function parseTimestamp(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const asNumber = Number(value);
    if (Number.isFinite(asNumber)) return asNumber;
    const asDate = new Date(value).getTime();
    if (Number.isFinite(asDate)) return asDate;
  }
  return undefined;
}

function parseNumberValue(...values: unknown[]): number | undefined {
  for (const value of values) {
    if (value === null || value === undefined || value === '') continue;
    const numberValue = Number(value);
    if (Number.isFinite(numberValue)) return numberValue;
  }
  return undefined;
}

function parseHourlyPricePoints(entity: HassEntity | undefined): PricePoint[] {
  const data = entity?.attributes?.hourly_prices;
  if (!Array.isArray(data)) return [];
  return data.reduce<PricePoint[]>((points, item) => {
    const raw = item as HourlyPriceItem | [unknown, unknown];
    const timestamp = Array.isArray(raw)
      ? parseTimestamp(raw[0])
      : parseTimestamp(raw.start_time) ?? parseTimestamp(raw.x);
    const value = Array.isArray(raw)
      ? parseNumberValue(raw[1])
      : parseNumberValue(raw.actual_price, raw.price, raw.y, raw.nord_pool_price);
    if (timestamp === undefined || value === undefined) return points;
    points.push({
      timestamp,
      value,
      sourceTimestamp: timestamp,
    });
    return points;
  }, []).sort((a, b) => a.timestamp - b.timestamp);
}

function chartType(config: RealElectricityPriceCardConfig): 'bar' | 'line' {
  return (config.chart_type || config.graph_type) === 'line' ? 'line' : 'bar';
}

function selectorMode(config: RealElectricityPriceCardConfig): SelectorMode {
  return config.selector_mode === 'click' ? 'click' : 'hover';
}

function chartHeight(config: RealElectricityPriceCardConfig): number {
  return configNumber(config.height, 120, 360) || 190;
}

function horizontalLineCount(config: RealElectricityPriceCardConfig): number {
  return Math.round(configNumber(config.horizontal_lines, 2, 9) || 5);
}

function priceDecimals(config: RealElectricityPriceCardConfig): number {
  return Math.round(configNumber(config.price_decimals, 0, 6) ?? 4);
}

function axisDecimals(config: RealElectricityPriceCardConfig): number {
  return Math.round(configNumber(config.axis_decimals, 0, 4) ?? 2);
}

function priceUnit(config: RealElectricityPriceCardConfig): string {
  return config.unit || DEFAULT_UNIT;
}

function formatPrice(hass: HomeAssistant | undefined, value: number | undefined, config: RealElectricityPriceCardConfig): string {
  return formatHassNumber(hass, value, { digits: priceDecimals(config), unit: priceUnit(config) });
}

/** The axis keeps labels short: the configured unit up to its "/", e.g. "€" for "€/kWh". */
function axisUnit(config: RealElectricityPriceCardConfig): string | undefined {
  return priceUnit(config).split('/')[0].trim() || undefined;
}

function formatAxisPrice(hass: HomeAssistant | undefined, value: number, config: RealElectricityPriceCardConfig): string {
  return formatHassNumber(hass, value, { digits: axisDecimals(config), unit: axisUnit(config) });
}

function homeTimeZone(hass?: HomeAssistant): string | undefined {
  return hassTimeZone(hass);
}

function formatDateTime(hass: HomeAssistant | undefined, timestamp: number): string {
  return formatHassDateTime(hass, timestamp, { year: false });
}

function timeZoneParts(timestamp: number, timeZone: string, options: Intl.DateTimeFormatOptions): Record<string, string> {
  const formatter = new Intl.DateTimeFormat('en-US', { ...options, timeZone });
  return formatter.formatToParts(new Date(timestamp)).reduce<Record<string, string>>((parts, part) => {
    if (part.type !== 'literal') parts[part.type] = part.value;
    return parts;
  }, {});
}

function timeZoneOffsetMs(timestamp: number, timeZone: string): number {
  const parts = timeZoneParts(timestamp, timeZone, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });
  const year = Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);
  const hour = Number(parts.hour);
  const minute = Number(parts.minute);
  const second = Number(parts.second);
  if (![year, month, day, hour, minute, second].every(Number.isFinite)) return 0;
  return Date.UTC(year, month - 1, day, hour, minute, second) - timestamp;
}

function homeTimeZoneMidnight(hass?: HomeAssistant): number | undefined {
  const zone = homeTimeZone(hass);
  if (!zone) return undefined;
  try {
    const parts = timeZoneParts(Date.now(), zone, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const year = Number(parts.year);
    const month = Number(parts.month);
    const day = Number(parts.day);
    if (![year, month, day].every(Number.isFinite)) return undefined;
    const utcGuess = Date.UTC(year, month - 1, day, 0, 0, 0, 0);
    const firstOffset = timeZoneOffsetMs(utcGuess, zone);
    const firstStart = utcGuess - firstOffset;
    const secondOffset = timeZoneOffsetMs(firstStart, zone);
    return utcGuess - secondOffset;
  } catch {
    return undefined;
  }
}

function fixedChartDomain(hass?: HomeAssistant): ChartDomain {
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  const start = homeTimeZoneMidnight(hass) ?? startDate.getTime();
  return {
    start,
    end: start + (CHART_HOURS * HOUR_MS),
  };
}

function hourlyPriceData(hass: HomeAssistant | undefined, config: RealElectricityPriceCardConfig, domain: ChartDomain): PriceDataResult {
  const yesterdayEntityId = config.yesterday_entity || DEFAULT_YESTERDAY_ENTITY;
  const todayEntityId = config.today_entity || DEFAULT_TODAY_ENTITY;
  const tomorrowEntityId = config.tomorrow_entity || DEFAULT_TOMORROW_ENTITY;
  const yesterdayEntity = hass?.states[yesterdayEntityId];
  const todayEntity = hass?.states[todayEntityId];
  const tomorrowEntity = hass?.states[tomorrowEntityId];
  const rawPoints = [
    ...parseHourlyPricePoints(yesterdayEntity),
    ...parseHourlyPricePoints(todayEntity),
    ...parseHourlyPricePoints(tomorrowEntity),
  ];
  const pointsByTimestamp = rawPoints.reduce<Map<number, PricePoint>>((points, point) => {
    if (point.timestamp >= domain.start && point.timestamp < domain.end) {
      points.set(point.timestamp, point);
    }
    return points;
  }, new Map());
  const missingEntityIds = [
    todayEntity ? undefined : todayEntityId,
    tomorrowEntity ? undefined : tomorrowEntityId,
  ].filter((entityId): entityId is string => Boolean(entityId));

  return {
    points: [...pointsByTimestamp.values()].sort((a, b) => a.timestamp - b.timestamp),
    moreInfoEntityId: todayEntity ? todayEntityId : tomorrowEntity ? tomorrowEntityId : undefined,
    missingEntityIds,
  };
}

function valueRange(points: PricePoint[], config: RealElectricityPriceCardConfig): PriceRange {
  const values = points.map((point) => point.value);
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const explicitMin = Number(config.min);
  const explicitMax = Number(config.max);
  let min = Number.isFinite(explicitMin) ? explicitMin : Math.min(0, rawMin);
  let max = Number.isFinite(explicitMax) ? explicitMax : rawMax;
  const padding = Math.max((max - min) * 0.08, 0.005);
  if (!Number.isFinite(explicitMin)) min -= rawMin < 0 ? padding : 0;
  if (!Number.isFinite(explicitMax)) max += padding;
  if (max <= min) max = min + 0.01;
  return { min, max };
}

function xForTimestamp(timestamp: number, domain: ChartDomain, box: ChartBox): number {
  const plotWidth = box.width - box.left - box.right;
  const span = Math.max(1, domain.end - domain.start);
  return box.left + ((timestamp - domain.start) / span) * plotWidth;
}

function timestampForX(x: number, domain: ChartDomain, box: ChartBox): number {
  const plotWidth = box.width - box.left - box.right;
  const span = Math.max(1, domain.end - domain.start);
  const clampedX = Math.max(box.left, Math.min(box.width - box.right, x));
  return domain.start + ((clampedX - box.left) / Math.max(1, plotWidth)) * span;
}

function buildChartPoints(points: PricePoint[], box: ChartBox, range: PriceRange, domain: ChartDomain): ChartPoint[] {
  const plotHeight = box.height - box.top - box.bottom;
  return points.map((point) => ({
    ...point,
    x: xForTimestamp(point.timestamp, domain, box),
    y: box.top + ((range.max - point.value) / (range.max - range.min)) * plotHeight,
  }));
}

function pointIndexAtTimestamp(points: ChartPoint[], timestamp: number): number {
  if (!points.length) return 0;
  if (timestamp <= points[0].timestamp) return 0;
  let index = 0;
  for (let pointIndex = 1; pointIndex < points.length; pointIndex += 1) {
    if (points[pointIndex].timestamp > timestamp) break;
    index = pointIndex;
  }
  return index;
}

function pointIndexAtSourceTimestamp(points: ChartPoint[], timestamp: number): number {
  if (!points.length) return 0;
  const pointTime = (point: ChartPoint): number => point.sourceTimestamp ?? point.timestamp;
  if (timestamp <= pointTime(points[0])) return 0;
  let index = 0;
  for (let pointIndex = 1; pointIndex < points.length; pointIndex += 1) {
    if (pointTime(points[pointIndex]) > timestamp) break;
    index = pointIndex;
  }
  return index;
}

function currentSelectionPoint(points: ChartPoint[], timestamp: number, domain: ChartDomain, box: ChartBox): ChartPoint {
  const source = points[pointIndexAtSourceTimestamp(points, timestamp)];
  if (timestamp < domain.start || timestamp > domain.end) return source;
  return {
    ...source,
    timestamp,
    x: xForTimestamp(timestamp, domain, box),
    sourceTimestamp: source.sourceTimestamp ?? source.timestamp,
  };
}

function intervalEndTimestamp(point: PricePoint, domain: ChartDomain): number {
  return Math.min(point.timestamp + HOUR_MS, domain.end);
}

function intervalEndX(point: PricePoint, domain: ChartDomain, box: ChartBox): number {
  return xForTimestamp(intervalEndTimestamp(point, domain), domain, box);
}

function intervalCenterX(point: PricePoint, domain: ChartDomain, box: ChartBox): number {
  const end = intervalEndTimestamp(point, domain);
  return xForTimestamp(point.timestamp + ((end - point.timestamp) / 2), domain, box);
}

function intervalCenterPoint(point: ChartPoint, domain: ChartDomain, box: ChartBox): ChartPoint {
  return {
    ...point,
    timestamp: point.sourceTimestamp ?? point.timestamp,
    x: intervalCenterX(point, domain, box),
    sourceTimestamp: point.sourceTimestamp ?? point.timestamp,
  };
}

/**
 * Edge labels are anchored inwards, so each neighbouring pair needs the facing extents of
 * both labels plus a gap. Widths use the same per-character estimate as the axis labels.
 */
function domainTicks(domain: ChartDomain, plotWidthPx: number, formatLabel: (timestamp: number) => string): number[] {
  const ticksForStep = (step: number): number[] =>
    Array.from({ length: (CHART_HOURS / step) + 1 }, (_, index) => domain.start + (index * step * HOUR_MS));
  const fits = (ticks: number[]): boolean => {
    const spacing = plotWidthPx / (ticks.length - 1);
    const widths = ticks.map((timestamp) => formatLabel(timestamp).length * AXIS_LABEL_CHAR_PX);
    return widths.slice(1).every((width, index) => {
      const left = index === 0 ? widths[0] : widths[index] / 2;
      const right = index + 1 === ticks.length - 1 ? width : width / 2;
      return left + right + TIME_LABEL_GAP_PX <= spacing;
    });
  };
  const step = TICK_STEP_HOURS.find((hours) => fits(ticksForStep(hours))) ?? TICK_STEP_HOURS[TICK_STEP_HOURS.length - 1];
  return ticksForStep(step);
}

function axisLabelValues(config: RealElectricityPriceCardConfig, range: PriceRange): number[] {
  const lines = horizontalLineCount(config);
  return Array.from({ length: lines }, (_, index) => range.min + ((range.max - range.min) * (1 - (index / (lines - 1)))));
}

/** Margins are kept in CSS pixels and converted with the current viewBox scale. */
function chartBox(config: RealElectricityPriceCardConfig, scale: number, axisLabels: string[]): ChartBox {
  const longestLabel = Math.max(0, ...axisLabels.map((label) => label.length));
  return {
    width: CHART_WIDTH,
    height: chartHeight(config),
    left: 8,
    right: Math.max(34, longestLabel * AXIS_LABEL_CHAR_PX + 8) * scale,
    top: 15 * scale,
    bottom: 24 * scale,
  };
}

function stepPathSegments(points: ChartPoint[], baseline: number, domain: ChartDomain, box: ChartBox): StepPathSegment[] {
  const segments: StepPathSegment[] = [];
  let line = '';
  let areaStartX = 0;
  let lastEndX = 0;
  let previous: ChartPoint | undefined;

  const closeSegment = (): void => {
    if (!line) return;
    segments.push({
      line,
      area: `${line} L ${lastEndX.toFixed(2)} ${baseline.toFixed(2)} L ${areaStartX.toFixed(2)} ${baseline.toFixed(2)} Z`,
    });
    line = '';
  };

  points.forEach((point) => {
    const startX = point.x;
    const endX = intervalEndX(point, domain, box);
    const contiguous = previous && Math.abs(point.timestamp - (previous.timestamp + HOUR_MS)) < 60_000;

    if (!line || !contiguous) {
      closeSegment();
      areaStartX = startX;
      line = `M ${startX.toFixed(2)} ${point.y.toFixed(2)}`;
    } else {
      line += ` L ${startX.toFixed(2)} ${point.y.toFixed(2)}`;
    }

    line += ` L ${endX.toFixed(2)} ${point.y.toFixed(2)}`;
    lastEndX = endX;
    previous = point;
  });

  closeSegment();
  return segments;
}

function average(points: PricePoint[]): number | undefined {
  if (!points.length) return undefined;
  return points.reduce((sum, point) => sum + point.value, 0) / points.length;
}

function cheapPriceThreshold(hass: HomeAssistant | undefined, config: RealElectricityPriceCardConfig): number | undefined {
  const explicit = Number(config.cheap_threshold);
  if (Number.isFinite(explicit)) return explicit;
  const entityId = config.cheap_price_entity || DEFAULT_CHEAP_PRICE_ENTITY;
  return parseNumberValue(hass?.states[entityId]?.state);
}

function resolvePointColor(
  point: PricePoint,
  config: RealElectricityPriceCardConfig,
  cheapThreshold: number | undefined,
  now: number,
): string {
  const sourceTime = point.sourceTimestamp ?? point.timestamp;
  const isCurrent = now >= sourceTime && now < sourceTime + HOUR_MS;
  const isPast = sourceTime + HOUR_MS <= now;
  const isCheap = cheapThreshold !== undefined && point.value <= cheapThreshold;

  if (isCurrent && isCheap) return config.cheap_current_color || '#22c55e';
  if (isCurrent) return config.current_hour_color || '#3b82f6';
  if (isPast && isCheap) return config.cheap_past_color || '#bbf7d0';
  if (isPast) return config.past_color || '#bfdbfe';
  if (isCheap) return config.cheap_color || '#86efac';
  return config.future_color || '#93c5fd';
}

function currentPriceValue(hass: HomeAssistant | undefined, config: RealElectricityPriceCardConfig): number | undefined {
  const entityId = config.current_price_entity || DEFAULT_CURRENT_PRICE_ENTITY;
  const raw = hass?.states[entityId]?.state;
  const value = Number(raw);
  return Number.isFinite(value) ? value : undefined;
}

function normalizeConfig(config: RealElectricityPriceCardConfig): RealElectricityPriceCardConfig {
  return {
    yesterday_entity: DEFAULT_YESTERDAY_ENTITY,
    today_entity: DEFAULT_TODAY_ENTITY,
    tomorrow_entity: DEFAULT_TOMORROW_ENTITY,
    current_price_entity: DEFAULT_CURRENT_PRICE_ENTITY,
    cheap_price_entity: DEFAULT_CHEAP_PRICE_ENTITY,
    chart_type: 'bar',
    selector_mode: 'hover',
    height: 190,
    horizontal_lines: 5,
    price_decimals: 4,
    axis_decimals: 2,
    unit: DEFAULT_UNIT,
    show_current_marker: true,
    show_extremes: true,
    show_stats: true,
    fill_color: 'rgba(56, 199, 243, 0.18)',
    marker_color: '#38c7f3',
    grid_color: 'var(--divider-color, rgba(127, 127, 127, 0.25))',
    chart_background: 'color-mix(in srgb, var(--card-background-color, #303446) 94%, var(--primary-color, #c39ce3))',
    card_background: 'var(--ha-card-background, var(--card-background-color, #1f1f1f))',
    ...config,
  };
}

class RealElectricityPriceCard extends LitElement {
  public hass?: HomeAssistant;

  private _config?: RealElectricityPriceCardConfig;

  private _selectedIndex?: number;

  private _dragging = false;

  private _clockTimer?: number;

  private _chartWidth?: number;

  private _resizeObserver?: ResizeObserver;

  private _observedChart?: Element;

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _selectedIndex: { state: true },
    _chartWidth: { state: true },
  };

  public static async getConfigElement(): Promise<HTMLElement> {
    await customElements.whenDefined('real-electricity-price-card-editor');
    return document.createElement('real-electricity-price-card-editor');
  }

  public static getStubConfig(): RealElectricityPriceCardConfig {
    return {
      type: 'custom:real-electricity-price-card',
      yesterday_entity: DEFAULT_YESTERDAY_ENTITY,
      today_entity: DEFAULT_TODAY_ENTITY,
      tomorrow_entity: DEFAULT_TOMORROW_ENTITY,
      current_price_entity: DEFAULT_CURRENT_PRICE_ENTITY,
      chart_type: 'bar',
    };
  }

  public setConfig(config: RealElectricityPriceCardConfig): void {
    this._config = normalizeConfig(config || {});
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._clockTimer = window.setInterval(() => this.requestUpdate(), 30_000);
    // Re-attach the chart size observer after the card is moved in the DOM.
    if (this.hasUpdated) this.requestUpdate();
  }

  disconnectedCallback(): void {
    if (this._clockTimer !== undefined) {
      window.clearInterval(this._clockTimer);
      this._clockTimer = undefined;
    }
    this._resizeObserver?.disconnect();
    this._observedChart = undefined;
    super.disconnectedCallback();
  }

  protected updated(): void {
    const chartBody = this.renderRoot.querySelector('.price-chart-body') || undefined;
    if (chartBody === this._observedChart) return;
    this._observedChart = chartBody;
    this._resizeObserver?.disconnect();
    if (!chartBody || typeof ResizeObserver === 'undefined') return;
    this._resizeObserver ??= new ResizeObserver((entries) => {
      const width = Math.round(entries[0]?.contentRect.width || 0);
      if (width > 0 && width !== this._chartWidth) this._chartWidth = width;
    });
    this._resizeObserver.observe(chartBody);
  }

  public getCardSize(): number {
    const height = chartHeight(this._config || {});
    return Math.max(3, Math.ceil((height + 150) / 50));
  }

  protected render(): TemplateResult {
    if (!this._config) return html``;
    const config = normalizeConfig(this._config);
    const domain = fixedChartDomain(this.hass);
    const priceData = hourlyPriceData(this.hass, config, domain);

    if (!priceData.points.length) return this._renderUnavailable(priceData.missingEntityIds);

    const type = chartType(config);
    const selector = selectorMode(config);
    const title = typeof config.name === 'string' ? config.name.trim() : '';
    const chartRawPoints = priceData.points;
    const range = valueRange(chartRawPoints, config);
    const scale = CHART_WIDTH / Math.max(120, this._chartWidth || CHART_WIDTH);
    const axisLabels = axisLabelValues(config, range).map((value) => formatAxisPrice(this.hass, value, config));
    const box = chartBox(config, scale, axisLabels);
    const points = buildChartPoints(chartRawPoints, box, range, domain);
    const now = Date.now();
    const hasManualSelection = this._selectedIndex !== undefined;
    const selectedIndex = Math.max(0, Math.min(points.length - 1, hasManualSelection ? this._selectedIndex ?? 0 : pointIndexAtTimestamp(points, now)));
    const selected = hasManualSelection
      ? intervalCenterPoint(points[selectedIndex], domain, box)
      : currentSelectionPoint(points, now, domain, box);
    const minPoint = points.reduce((best, point) => point.value < best.value ? point : best, points[0]);
    const maxPoint = points.reduce((best, point) => point.value > best.value ? point : best, points[0]);
    const current = currentPriceValue(this.hass, config);
    const cheapThreshold = cheapPriceThreshold(this.hass, config);
    const moreInfoEntityId = priceData.moreInfoEntityId || config.current_price_entity || DEFAULT_CURRENT_PRICE_ENTITY;

    return html`
      <ha-card class="price-card" style=${`--rep-card-bg:${config.card_background};--rep-chart-bg:${config.chart_background};--rep-grid:${config.grid_color};--rep-marker:${config.marker_color};`}>
        <div class="price-content">
          ${title ? html`
            <div class="price-head">
              <button type="button" class="price-title family-title" aria-haspopup="dialog" aria-label=${`${title}: details`} title="Details" @click=${() => this._openMoreInfo(moreInfoEntityId)}>
                <span>${title}</span>
                <ha-icon .icon=${UI_ICONS.details} aria-hidden="true"></ha-icon>
              </button>
            </div>
          ` : nothing}

          ${config.show_stats === false ? nothing : this._renderStats(config, chartRawPoints, minPoint, maxPoint, current)}

          <div class="price-chart-frame">
            <div class="price-chart-head">
              <div class="price-selected">
                <span>${formatDateTime(this.hass, selected.timestamp)}</span>
                <strong>${formatPrice(this.hass, selected.value, config)}</strong>
              </div>
            </div>
            <div class="price-chart-body">
              ${this._renderChart(config, box, scale, axisLabels, points, selected, minPoint, maxPoint, range, type, selector, domain, cheapThreshold, now)}
              <span
                class="price-selected-dot"
                style=${`left:${((selected.x / box.width) * 100).toFixed(2)}%;top:${((selected.y / box.height) * 100).toFixed(2)}%;`}
              ></span>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _renderUnavailable(missingEntityIds: string[]): TemplateResult {
    // Both price sources missing is a configuration problem; existing sources without data are only unavailable.
    const notFound = missingEntityIds.length >= 2;
    const missing = missingEntityIds.length ? ` Missing: ${missingEntityIds.join(', ')}` : '';
    return html`
      <ha-card class="price-card">
        <div class="price-content">
          ${notFound
            ? notice({ tone: 'error', title: 'Price entities not found', message: missing.trim() })
            : notice({ tone: 'neutral', title: UNAVAILABLE_TEXT, message: `No hourly prices are available yet.${missing}` })}
        </div>
      </ha-card>
    `;
  }

  private _renderStats(
    config: RealElectricityPriceCardConfig,
    points: PricePoint[],
    minPoint: PricePoint,
    maxPoint: PricePoint,
    current: number | undefined,
  ): TemplateResult {
    return html`
      <div class="price-stats family-telemetry">
        ${this._renderStat('Now', current, config)}
        ${this._renderStat('Low', minPoint.value, config)}
        ${this._renderStat('Average', average(points), config)}
        ${this._renderStat('High', maxPoint.value, config)}
      </div>
    `;
  }

  private _renderStat(label: string, value: number | undefined, config: RealElectricityPriceCardConfig): TemplateResult {
    return html`
      <div class="price-stat family-telemetry-cell">
        <span class="family-telemetry-label">${label}</span>
        ${isAvailableValue(value)
          ? html`<span class="family-telemetry-value">${formatHassNumber(this.hass, value, { digits: priceDecimals(config) })} <span class="price-unit">${priceUnit(config)}</span></span>`
          : html`<span class="family-telemetry-value family-unavailable">${UNAVAILABLE_TEXT}</span>`}
      </div>
    `;
  }

  private _renderChart(
    config: RealElectricityPriceCardConfig,
    box: ChartBox,
    scale: number,
    axisLabels: string[],
    points: ChartPoint[],
    selected: ChartPoint,
    minPoint: ChartPoint,
    maxPoint: ChartPoint,
    range: PriceRange,
    type: 'bar' | 'line',
    selector: SelectorMode,
    domain: ChartDomain,
    cheapThreshold: number | undefined,
    now: number,
  ): TemplateResult {
    const baseline = box.height - box.bottom;
    const zeroY = Math.max(box.top, Math.min(baseline, box.top + ((range.max - 0) / (range.max - range.min)) * (box.height - box.top - box.bottom)));
    const plotWidth = box.width - box.left - box.right;
    const barSlotWidth = plotWidth / CHART_HOURS;
    const barWidth = Math.max(2, Math.min(14, barSlotWidth * 0.9));
    const ticks = domainTicks(domain, plotWidth / scale, (timestamp) => formatDateTime(this.hass, timestamp));
    const currentX = xForTimestamp(Date.now(), domain, box);
    const showCurrent = config.show_current_marker !== false && currentX >= box.left && currentX <= box.width - box.right;
    const minLabelX = intervalCenterX(minPoint, domain, box);
    const maxLabelX = intervalCenterX(maxPoint, domain, box);
    const gradientId = 'rep-line-fill';
    const lineGradientId = 'rep-line-color';
    const gradientSpan = Math.max(1, box.width - box.left - box.right);
    const lineColorStops = points.flatMap((point) => {
      const color = resolvePointColor(point, config, cheapThreshold, now);
      const startOffset = Math.max(0, Math.min(100, ((point.x - box.left) / gradientSpan) * 100));
      const endOffset = Math.max(0, Math.min(100, ((intervalEndX(point, domain, box) - box.left) / gradientSpan) * 100));
      return [
        svg`<stop offset=${`${startOffset}%`} stop-color=${color}></stop>`,
        svg`<stop offset=${`${endOffset}%`} stop-color=${color}></stop>`,
      ];
    });

    return html`
      <svg
        class="price-chart"
        viewBox=${`0 0 ${box.width} ${box.height}`}
        preserveAspectRatio="none"
        style=${`--rep-text-scale:${scale.toFixed(4)};`}
        role="slider"
        tabindex="0"
        aria-label="Electricity price interval"
        aria-valuemin="0"
        aria-valuemax=${points.length - 1}
        aria-valuenow=${pointIndexAtTimestamp(points, selected.timestamp)}
        aria-valuetext=${`${formatDateTime(this.hass, selected.timestamp)} ${formatPrice(this.hass, selected.value, config)}`}
        @keydown=${(ev: KeyboardEvent) => this._selectKeyboard(ev, points, selected.timestamp)}
        @pointerdown=${(ev: PointerEvent) => this._selectPoint(ev, points, box, selector, domain)}
        @pointermove=${(ev: PointerEvent) => this._selectPoint(ev, points, box, selector, domain)}
        @pointerup=${this._stopPointer}
        @pointercancel=${this._stopPointer}
        @pointerleave=${this._stopPointer}
      >
        <defs>
          <linearGradient id=${gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color=${config.fill_color || 'rgba(56, 199, 243, 0.20)'}></stop>
            <stop offset="100%" stop-color="rgba(56, 199, 243, 0.04)"></stop>
          </linearGradient>
          <linearGradient id=${lineGradientId} x1=${box.left} x2=${box.width - box.right} y1="0" y2="0" gradientUnits="userSpaceOnUse">
            ${lineColorStops}
          </linearGradient>
        </defs>
        ${this._renderGrid(box, scale, axisLabels, ticks, domain)}
        ${type === 'line'
          ? this._renderLineChart(points, baseline, gradientId, lineGradientId, domain, box)
          : this._renderBarChart(points, zeroY, barWidth, barSlotWidth, selected, config, cheapThreshold, now)}
        ${showCurrent ? svg`<line class="price-current-line" x1=${currentX} x2=${currentX} y1=${box.top} y2=${baseline}></line>` : nothing}
        ${config.show_extremes === false ? nothing : svg`
          <text class="price-extreme" x=${minLabelX} y=${Math.max(11 * scale, minPoint.y - (9 * scale))}>L</text>
          <text class="price-extreme" x=${maxLabelX} y=${Math.max(11 * scale, maxPoint.y - (9 * scale))}>H</text>
        `}
        <line class="price-selected-line" x1=${selected.x} x2=${selected.x} y1=${box.top} y2=${baseline}></line>
        <title>${formatDateTime(this.hass, selected.timestamp)} ${formatPrice(this.hass, selected.value, config)}</title>
        <desc>${points.length} available hourly electricity price points in a fixed ${CHART_HOURS}-hour chart window.</desc>
      </svg>
    `;
  }

  private _renderGrid(
    box: ChartBox,
    scale: number,
    axisLabels: string[],
    ticks: number[],
    domain: ChartDomain,
  ): TemplateResult[] {
    const baseline = box.height - box.bottom;
    const lines = axisLabels.length;
    return [
      ...axisLabels.map((label, index) => {
        const y = box.top + (index / (lines - 1)) * (baseline - box.top);
        return svg`
          <line class="price-grid-line" x1=${box.left} x2=${box.width - box.right} y1=${y} y2=${y}></line>
          <text class="price-axis-label" x=${box.width - (2 * scale)} y=${y}>${label}</text>
        `;
      }),
      ...ticks.map((timestamp, index) => {
        const x = xForTimestamp(timestamp, domain, box);
        const edgeClass = index === 0
          ? ' price-time-label-start'
          : index === ticks.length - 1
            ? ' price-time-label-end'
            : '';
        return svg`
          <line class="price-time-line" x1=${x} x2=${x} y1=${box.top} y2=${baseline}></line>
          <text class=${`price-time-label${edgeClass}`} x=${x} y=${box.height - (6 * scale)}>${formatDateTime(this.hass, timestamp)}</text>
        `;
      }),
    ];
  }

  private _renderBarChart(
    points: ChartPoint[],
    zeroY: number,
    barWidth: number,
    barSlotWidth: number,
    selected: ChartPoint,
    config: RealElectricityPriceCardConfig,
    cheapThreshold: number | undefined,
    now: number,
  ): TemplateResult[] {
    const selectedTimestamp = selected.timestamp;
    const selectedSourceTimestamp = selected.sourceTimestamp;
    const barInset = Math.max(0, (barSlotWidth - barWidth) / 2);
    return points.map((point) => {
      const top = Math.min(point.y, zeroY);
      const height = Math.max(1, Math.abs(zeroY - point.y));
      const selectedClass = point.timestamp === selectedTimestamp || (
        selectedSourceTimestamp !== undefined && point.sourceTimestamp === selectedSourceTimestamp
      ) ? ' price-bar-selected' : '';
      return svg`
        <rect
          class=${`price-bar${selectedClass}`}
          x=${point.x + barInset}
          y=${top}
          width=${barWidth}
          height=${height}
          rx="2.5"
          fill=${resolvePointColor(point, config, cheapThreshold, now)}
        ></rect>
      `;
    });
  }

  private _renderLineChart(
    points: ChartPoint[],
    baseline: number,
    fillGradientId: string,
    lineGradientId: string,
    domain: ChartDomain,
    box: ChartBox,
  ): TemplateResult {
    const segments = stepPathSegments(points, baseline, domain, box);
    return svg`
      ${segments.map((segment) => svg`<path class="price-line-area" d=${segment.area} fill=${`url(#${fillGradientId})`}></path>`)}
      ${segments.map((segment) => svg`<path class="price-line-shadow" d=${segment.line}></path>`)}
      ${segments.map((segment) => svg`<path class="price-line" d=${segment.line} stroke=${`url(#${lineGradientId})`}></path>`)}
    `;
  }

  private _selectKeyboard(ev: KeyboardEvent, points: ChartPoint[], timestamp: number): void {
    const current = pointIndexAtTimestamp(points, timestamp);
    let next = current;
    switch (ev.key) {
      case 'ArrowLeft': case 'ArrowDown': next -= 1; break;
      case 'ArrowRight': case 'ArrowUp': next += 1; break;
      case 'PageDown': next -= 6; break;
      case 'PageUp': next += 6; break;
      case 'Home': next = 0; break;
      case 'End': next = points.length - 1; break;
      default: return;
    }
    ev.preventDefault();
    this._selectedIndex = Math.max(0, Math.min(points.length - 1, next));
  }

  private _selectPoint(ev: PointerEvent, points: ChartPoint[], box: ChartBox, selector: SelectorMode, domain: ChartDomain): void {
    const hoverMove = selector === 'hover' && ev.type === 'pointermove' && ev.pointerType !== 'touch';
    if (ev.type === 'pointermove' && !hoverMove && !this._dragging) return;
    if (ev.type === 'pointerdown') {
      this._dragging = true;
      try {
        (ev.currentTarget as Element).setPointerCapture(ev.pointerId);
      } catch {
        // Pointer capture can fail inside some embedded webviews.
      }
    }
    if (ev.pointerType !== 'touch') ev.preventDefault();
    const rect = (ev.currentTarget as SVGElement).getBoundingClientRect();
    const x = ((ev.clientX - rect.left) / Math.max(1, rect.width)) * box.width;
    const timestamp = timestampForX(x, domain, box);
    this._selectedIndex = pointIndexAtTimestamp(points, timestamp);
  }

  private _stopPointer = (ev: PointerEvent): void => {
    this._dragging = false;
    try {
      (ev.currentTarget as Element).releasePointerCapture(ev.pointerId);
    } catch {
      // Ignore browser/webview pointer-capture differences.
    }
  };

  private _openMoreInfo(entityId?: string): void {
    if (!entityId) return;
    showEntityMoreInfo(this, entityId);
  }

  static styles = [designTokens, familyStyles, componentStyles, headerStyles, telemetryStyles, css`
    :host {
      display: block;
      color: var(--primary-text-color);
    }

    ha-card.price-card {
      overflow: hidden;
      border-radius: var(--family-radius);
      background: var(--rep-card-bg);
      box-shadow: var(--ha-card-box-shadow, none);
    }

    .price-content {
      padding: var(--tile-padding-large);
      border-radius: inherit;
      box-sizing: border-box;
    }

    .price-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: var(--large-gap);
    }

    .price-title {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      max-width: 100%;
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--primary-text-color);
      font-family: inherit;
      min-height: 44px;
      text-align: left;
      cursor: pointer;
    }

    .price-title span { min-width: 0; overflow-wrap: anywhere; }
    .price-title ha-icon { width: 22px; height: 22px; --mdc-icon-size: 22px; flex: 0 0 22px; color: var(--secondary-text-color); }

    .price-title:focus {
      outline: none;
    }

    .price-title:focus-visible {
      outline: 3px solid var(--primary-color);
      outline-offset: 3px;
      border-radius: 4px;
    }

    .price-selected {
      flex: 0 1 auto;
      display: inline-flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: flex-end;
      gap: 4px 8px;
      max-width: 100%;
      min-width: 0;
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.4;
      font-weight: 500;
      text-align: right;
    }

    .price-selected span {
      min-width: 0;
      max-width: 100%;
      overflow-wrap: anywhere;
    }

    .price-selected strong {
      flex-shrink: 0;
      color: var(--primary-text-color);
      font-size: 14px;
      line-height: 1;
      font-weight: 600;
      letter-spacing: 0;
      white-space: nowrap;
    }

    .price-stats {
      --family-telemetry-columns: 4;
      margin-bottom: var(--large-gap);
      border-radius: var(--tile-border-radius);
      background: var(--family-tile);
    }

    .price-unit {
      color: var(--secondary-text-color);
      font-size: 11px;
      font-weight: 500;
      white-space: nowrap;
    }

    .price-chart-frame {
      position: relative;
      width: 100%;
      min-width: 0;
      display: grid;
      gap: 5px;
      padding: 7px 8px 6px;
      box-sizing: border-box;
      border-radius: var(--tile-border-radius);
      background: var(--rep-chart-bg);
      overflow: hidden;
    }

    .price-chart-head {
      min-width: 0;
      min-height: 18px;
      display: flex;
      align-items: start;
      justify-content: flex-end;
      gap: 8px;
    }

    .price-chart-body {
      position: relative;
      width: 100%;
      min-width: 0;
      overflow: visible;
    }

    .price-chart {
      display: block;
      width: 100%;
      height: auto;
      min-width: 0;
      cursor: pointer;
      touch-action: pan-y;
      user-select: none;
      -webkit-user-select: none;
    }

    .price-chart text {
      user-select: none;
      -webkit-user-select: none;
      pointer-events: none;
    }

    .price-grid-line,
    .price-time-line {
      stroke: var(--rep-grid);
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
    }

    .price-time-line {
      stroke-dasharray: 3 3;
    }

    .price-current-line {
      stroke: var(--rep-marker);
      stroke-width: 1.5;
      opacity: 0.62;
      vector-effect: non-scaling-stroke;
    }

    .price-selected-line {
      stroke: color-mix(in srgb, var(--primary-text-color) 36%, transparent);
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
    }

    .price-bar {
      opacity: 0.95;
      transition: opacity 120ms ease;
    }

    .price-bar-selected {
      opacity: 1;
      stroke: color-mix(in srgb, var(--primary-text-color) 72%, transparent);
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
    }

    .price-line-area {
      opacity: 0.95;
    }

    .price-line-shadow {
      fill: none;
      stroke: rgba(0, 0, 0, 0.24);
      stroke-width: 7;
      stroke-linecap: round;
      stroke-linejoin: round;
      vector-effect: non-scaling-stroke;
    }

    .price-line {
      fill: none;
      stroke-width: 4.3;
      stroke-linecap: round;
      stroke-linejoin: round;
      vector-effect: non-scaling-stroke;
    }

    /* SVG text scales with the viewBox; --rep-text-scale keeps labels at 11 CSS pixels. */
    .price-axis-label,
    .price-time-label,
    .price-extreme {
      fill: var(--secondary-text-color);
      font-size: calc(11px * var(--rep-text-scale, 1));
      font-weight: 600;
      text-anchor: middle;
      dominant-baseline: middle;
    }

    .price-axis-label {
      text-anchor: end;
    }

    .price-time-label-start {
      text-anchor: start;
    }

    .price-time-label-end {
      text-anchor: end;
    }

    .price-extreme {
      fill: var(--primary-text-color);
    }

    .price-selected-dot {
      position: absolute;
      z-index: 2;
      width: 15px;
      height: 15px;
      min-width: 15px;
      min-height: 15px;
      box-sizing: border-box;
      aspect-ratio: 1 / 1;
      border: 1px solid color-mix(in srgb, var(--primary-text-color) 54%, transparent);
      border-radius: 50%;
      background: color-mix(in srgb, var(--card-background-color, #000) 60%, transparent);
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary-text-color) 18%, transparent);
      transform: translate(-50%, -50%);
      pointer-events: none;
    }

    .price-selected-dot::after {
      content: "";
      position: absolute;
      inset: 4px;
      border-radius: 50%;
      background: var(--primary-text-color);
      box-shadow: 0 0 0 1px color-mix(in srgb, var(--card-background-color, #000) 40%, transparent);
    }

    .price-card { container-type:inline-size; }
    .price-chart:focus-visible { outline:3px solid var(--primary-color);outline-offset:-3px;border-radius:8px; }
    .price-stat .family-telemetry-value { line-height:1.4; }
    @media (prefers-reduced-motion:reduce) { *,*::before,*::after { animation:none!important;transition:none!important; } }
    @container (max-width: 480px) {
      .price-content {
        padding: var(--tile-padding-large);
      }

      .price-head {
        gap: 10px;
      }

      .price-title {
        max-width: 64%;
      }

      .price-stats {
        --family-telemetry-columns: 2;
      }

      .price-stat:nth-child(2n) {
        border-inline-end: 0;
      }
    }
  `];
}

class RealElectricityPriceCardEditor extends LitElement {
  public hass?: HomeAssistant;

  private _config: RealElectricityPriceCardConfig = RealElectricityPriceCard.getStubConfig();

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  public setConfig(config: RealElectricityPriceCardConfig): void {
    this._config = normalizeConfig(config || {});
  }

  protected render(): TemplateResult {
    const config = normalizeConfig(this._config);
    return html`
      <div class="editor">
        ${this._textField('Name (optional)', 'name', config.name || '')}
        ${this._textField('Yesterday Prices Entity', 'yesterday_entity', config.yesterday_entity || DEFAULT_YESTERDAY_ENTITY)}
        <div class="grid">
          ${this._textField('Today Prices Entity', 'today_entity', config.today_entity || DEFAULT_TODAY_ENTITY)}
          ${this._textField('Tomorrow Prices Entity', 'tomorrow_entity', config.tomorrow_entity || DEFAULT_TOMORROW_ENTITY)}
        </div>
        ${this._textField('Current Price Entity', 'current_price_entity', config.current_price_entity || DEFAULT_CURRENT_PRICE_ENTITY)}
        ${this._textField('Acceptable Price Entity', 'cheap_price_entity', config.cheap_price_entity || DEFAULT_CHEAP_PRICE_ENTITY)}
        <label>
          <span>Chart Type</span>
          <select .value=${chartType(config)} @change=${(ev: Event) => this._setValue('chart_type', (ev.target as HTMLSelectElement).value)}>
            <option value="bar">Bars</option>
            <option value="line">Step line</option>
          </select>
        </label>
        <label>
          <span>Selector Mode</span>
          <select .value=${selectorMode(config)} @change=${(ev: Event) => this._setValue('selector_mode', (ev.target as HTMLSelectElement).value)}>
            <option value="hover">Hover</option>
            <option value="click">Click / tap</option>
          </select>
        </label>
        <div class="grid">
          ${this._numberField('Height', 'height', chartHeight(config), 120, 360)}
          ${this._numberField('Horizontal Lines', 'horizontal_lines', horizontalLineCount(config), 2, 9)}
          ${this._numberField('Price Decimals', 'price_decimals', priceDecimals(config), 0, 6)}
          ${this._numberField('Axis Decimals', 'axis_decimals', axisDecimals(config), 0, 4)}
        </div>
        ${this._textField('Unit', 'unit', config.unit || DEFAULT_UNIT)}
        <div class="grid">
          ${this._numberField('Y Min', 'min', config.min ?? '', undefined, undefined, true)}
          ${this._numberField('Y Max', 'max', config.max ?? '', undefined, undefined, true)}
          ${this._numberField('Cheap Threshold', 'cheap_threshold', config.cheap_threshold ?? '', undefined, undefined, true)}
        </div>
        <div class="toggles">
          ${this._checkbox('Current Marker', 'show_current_marker', config.show_current_marker !== false)}
          ${this._checkbox('Extremes', 'show_extremes', config.show_extremes !== false)}
          ${this._checkbox('Stats', 'show_stats', config.show_stats !== false)}
        </div>
        <h3>Color Overrides</h3>
        <div class="grid">
          ${this._colorField('Past', 'past_color', config.past_color || '#bfdbfe')}
          ${this._colorField('Current Hour', 'current_hour_color', config.current_hour_color || '#3b82f6')}
          ${this._colorField('Future', 'future_color', config.future_color || '#93c5fd')}
          ${this._colorField('Cheap Past', 'cheap_past_color', config.cheap_past_color || '#bbf7d0')}
          ${this._colorField('Cheap', 'cheap_color', config.cheap_color || '#86efac')}
          ${this._colorField('Cheap Current', 'cheap_current_color', config.cheap_current_color || '#22c55e')}
          ${this._colorField('Marker', 'marker_color', config.marker_color || '#38c7f3')}
        </div>
        ${this._textField('Area Fill Color', 'fill_color', config.fill_color || 'rgba(56, 199, 243, 0.18)')}
        ${this._textField('Grid Color', 'grid_color', config.grid_color || 'var(--divider-color, rgba(127, 127, 127, 0.25))')}
        ${this._textField('Chart Background', 'chart_background', config.chart_background || 'color-mix(in srgb, var(--card-background-color, #303446) 94%, var(--primary-color, #c39ce3))')}
      </div>
    `;
  }

  private _textField(label: string, key: keyof RealElectricityPriceCardConfig, value: unknown): TemplateResult {
    return html`
      <label>
        <span>${label}</span>
        <input
          type="text"
          .value=${String(value ?? '')}
          @input=${(ev: Event) => this._setValue(key, (ev.target as HTMLInputElement).value || undefined)}
        />
      </label>
    `;
  }

  private _numberField(
    label: string,
    key: keyof RealElectricityPriceCardConfig,
    value: unknown,
    min?: number,
    max?: number,
    allowEmpty = false,
  ): TemplateResult {
    return html`
      <label>
        <span>${label}</span>
        <input
          type="number"
          min=${min ?? nothing}
          max=${max ?? nothing}
          .value=${String(value ?? '')}
          @input=${(ev: Event) => {
            const raw = (ev.target as HTMLInputElement).value;
            const numberValue = Number(raw);
            this._setValue(key, allowEmpty && raw === '' ? undefined : Number.isFinite(numberValue) ? numberValue : undefined);
          }}
        />
      </label>
    `;
  }

  private _colorField(label: string, key: keyof RealElectricityPriceCardConfig, value: string): TemplateResult {
    return html`
      <label>
        <span>${label}</span>
        <input
          type="color"
          .value=${value}
          @input=${(ev: Event) => this._setValue(key, (ev.target as HTMLInputElement).value)}
        />
      </label>
    `;
  }

  private _checkbox(label: string, key: keyof RealElectricityPriceCardConfig, checked: boolean): TemplateResult {
    return html`
      <label class="checkbox">
        <input
          type="checkbox"
          .checked=${checked}
          @change=${(ev: Event) => this._setValue(key, (ev.target as HTMLInputElement).checked)}
        />
        <span>${label}</span>
      </label>
    `;
  }

  private _setValue(key: keyof RealElectricityPriceCardConfig, value: unknown): void {
    const config: RealElectricityPriceCardConfig = { ...this._config };
    if (value === undefined || value === '') {
      delete config[key];
    } else {
      (config as Record<string, unknown>)[key] = value;
    }
    this._config = config;
    fireEvent(this, 'config-changed', { config });
  }

  static styles = css`
    :host {
      display: block;
    }

    .editor {
      display: grid;
      gap: 12px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    label {
      display: grid;
      gap: 5px;
      color: var(--primary-text-color);
      font-size: 12px;
      font-weight: 700;
    }

    input,
    select,
    textarea {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.16));
      border-radius: 8px;
      padding: 10px;
      background: var(--secondary-background-color, rgba(255, 255, 255, 0.04));
      color: var(--primary-text-color);
      font: inherit;
      /* 16px keeps iOS from zooming the dashboard when a field is focused. */
      font-size: 16px;
      font-weight: 500;
    }

    input[type="color"] {
      height: 42px;
      padding: 4px;
    }

    textarea {
      min-height: 96px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }

    h3 {
      margin: 8px 0 0;
      font-size: 14px;
    }

    .toggles {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px 12px;
    }

    .checkbox {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .checkbox input {
      width: auto;
    }
  `;
}

if (!customElements.get('real-electricity-price-card')) {
  customElements.define('real-electricity-price-card', RealElectricityPriceCard);
}

if (!customElements.get('real-electricity-price-card-editor')) {
  customElements.define('real-electricity-price-card-editor', RealElectricityPriceCardEditor);
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'real-electricity-price-card',
  name: 'Real Electricity Price Card',
  description: 'Interactive electricity price chart for real-electricity-price',
  preview: false,
  version: CARD_VERSION,
});
