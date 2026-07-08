import { LitElement, TemplateResult, css, html, nothing, svg } from 'lit';

const CARD_VERSION = '0.1.10';
const DEFAULT_ENTITY = 'sensor.real_electricity_price_chart_data';
const DEFAULT_CURRENT_PRICE_ENTITY = 'sensor.real_electricity_price_current_price';
const DEFAULT_UNIT = '€/kWh';
const HOUR_MS = 60 * 60 * 1000;
const CHART_HOURS = 48;

type SelectorMode = 'hover' | 'click';

const SENSOR_COLOR_KEYS: Record<string, keyof RealElectricityPriceCardConfig> = {
  '#bfdbfe': 'past_color',
  '#3b82f6': 'current_hour_color',
  '#93c5fd': 'future_color',
  '#bbf7d0': 'cheap_past_color',
  '#86efac': 'cheap_color',
  '#22c55e': 'cheap_current_color',
};

interface HassEntity {
  state: string;
  attributes?: Record<string, unknown>;
}

interface HomeAssistant {
  states: Record<string, HassEntity | undefined>;
  locale?: {
    language?: string;
    time_format?: string;
  };
  config?: {
    time_zone?: string;
  };
}

interface RealElectricityPriceCardConfig {
  type?: string;
  entity?: string;
  current_price_entity?: string;
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
  use_sensor_colors?: boolean;
  past_color?: string;
  current_hour_color?: string;
  future_color?: string;
  cheap_past_color?: string;
  cheap_color?: string;
  cheap_current_color?: string;
  line_color?: string;
  fill_color?: string;
  marker_color?: string;
  grid_color?: string;
  chart_background?: string;
  card_background?: string;
  color_overrides?: Record<string, string>;
}

interface ChartDataItem {
  x?: number | string;
  y?: number | string;
  fillColor?: string;
  start_time?: string;
  formatted_time?: string;
  formatted_price?: string;
}

interface PricePoint {
  timestamp: number;
  value: number;
  color?: string;
  sourceTimestamp?: number;
  startTime?: string;
  formattedTime?: string;
  formattedPrice?: string;
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

function colorValue(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

function normalizedColor(value: string | undefined): string | undefined {
  return value ? value.trim().toLowerCase() : undefined;
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

function parsePricePoints(entity: HassEntity | undefined): PricePoint[] {
  const data = entity?.attributes?.chart_data;
  if (!Array.isArray(data)) return [];
  return data.reduce<PricePoint[]>((points, item) => {
    const raw = item as ChartDataItem | [unknown, unknown];
    const timestamp = Array.isArray(raw)
      ? parseTimestamp(raw[0])
      : parseTimestamp(raw.x) ?? parseTimestamp(raw.start_time);
    const value = Number(Array.isArray(raw) ? raw[1] : raw.y);
    if (timestamp === undefined || !Number.isFinite(value)) return points;
    points.push({
      timestamp,
      value,
      color: Array.isArray(raw) ? undefined : colorValue(raw.fillColor),
      startTime: Array.isArray(raw) ? undefined : raw.start_time,
      formattedTime: Array.isArray(raw) ? undefined : raw.formatted_time,
      formattedPrice: Array.isArray(raw) ? undefined : raw.formatted_price,
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

function formatPrice(value: number | undefined, config: RealElectricityPriceCardConfig, decimals = priceDecimals(config)): string {
  if (value === undefined || !Number.isFinite(value)) return '—';
  return `${value.toFixed(decimals)} ${config.unit || DEFAULT_UNIT}`;
}

function formatAxisPrice(value: number, config: RealElectricityPriceCardConfig): string {
  return `${value.toFixed(axisDecimals(config))}€`;
}

function timeFormatOptions(hass?: HomeAssistant): Intl.DateTimeFormatOptions {
  const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
  const format = String(hass?.locale?.time_format || '').toLowerCase();
  if (format === '12') options.hour12 = true;
  if (format === '24') options.hour12 = false;
  return options;
}

function homeTimeZone(hass?: HomeAssistant): string | undefined {
  const zone = hass?.config?.time_zone;
  return typeof zone === 'string' && zone.trim() ? zone.trim() : undefined;
}

function formatInHomeTimeZone(hass: HomeAssistant | undefined, timestamp: number, options: Intl.DateTimeFormatOptions): string {
  const zone = homeTimeZone(hass);
  const date = new Date(timestamp);
  try {
    return new Intl.DateTimeFormat(hass?.locale?.language, zone ? { ...options, timeZone: zone } : options).format(date);
  } catch {
    return new Intl.DateTimeFormat(hass?.locale?.language, options).format(date);
  }
}

function formatDateLabel(hass: HomeAssistant | undefined, timestamp: number): string {
  return formatInHomeTimeZone(hass, timestamp, {
    day: 'numeric',
    month: 'long',
  });
}

function formatTimeOnly(hass: HomeAssistant | undefined, timestamp: number): string {
  return formatInHomeTimeZone(hass, timestamp, {
    ...timeFormatOptions(hass),
  });
}

function formatDateTime(hass: HomeAssistant | undefined, timestamp: number): string {
  return `${formatDateLabel(hass, timestamp)} ${formatTimeOnly(hass, timestamp)}`;
}

function formatTimeLabel(hass: HomeAssistant | undefined, timestamp: number): string {
  return formatDateTime(hass, timestamp);
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

function pointsInDomain(points: PricePoint[], domain: ChartDomain): PricePoint[] {
  return points.filter((point) => point.timestamp >= domain.start && point.timestamp < domain.end);
}

function closeTimestamp(a: number, b: number): boolean {
  return Math.abs(a - b) < 60_000;
}

function pointsForFixedDomain(points: PricePoint[], domain: ChartDomain): PricePoint[] {
  const ordered = [...points].sort((a, b) => a.timestamp - b.timestamp);
  for (let index = 0; index <= ordered.length - CHART_HOURS; index += 1) {
    const slice = ordered.slice(index, index + CHART_HOURS);
    const startsOneHourLate = closeTimestamp(slice[0].timestamp, domain.start + HOUR_MS);
    const endsAtDomainEnd = closeTimestamp(slice[slice.length - 1].timestamp, domain.end);
    if (startsOneHourLate && endsAtDomainEnd) {
      return slice.map((point, pointIndex) => ({
        ...point,
        sourceTimestamp: point.timestamp,
        timestamp: domain.start + (pointIndex * HOUR_MS),
      }));
    }
  }
  return pointsInDomain(ordered, domain);
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

function columnCenterPoint(point: ChartPoint, barSlotWidth: number): ChartPoint {
  return {
    ...point,
    x: point.x + (barSlotWidth / 2),
    sourceTimestamp: point.sourceTimestamp ?? point.timestamp,
  };
}

function domainTicks(domain: ChartDomain): number[] {
  return [0, CHART_HOURS / 3, (CHART_HOURS * 2) / 3, CHART_HOURS]
    .map((hours) => domain.start + (hours * HOUR_MS));
}

function smoothPath(points: ChartPoint[]): string {
  if (!points.length) return '';
  if (points.length === 1) return `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  let path = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    const previous = points[index - 1] || current;
    const afterNext = points[index + 2] || next;
    const cp1x = current.x + (next.x - previous.x) / 6;
    const cp1y = current.y + (next.y - previous.y) / 6;
    const cp2x = next.x - (afterNext.x - current.x) / 6;
    const cp2y = next.y - (afterNext.y - current.y) / 6;
    path += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${next.x.toFixed(2)} ${next.y.toFixed(2)}`;
  }
  return path;
}

function areaPath(points: ChartPoint[], baseline: number): string {
  if (!points.length) return '';
  const first = points[0];
  const last = points[points.length - 1];
  return `${smoothPath(points)} L ${last.x.toFixed(2)} ${baseline.toFixed(2)} L ${first.x.toFixed(2)} ${baseline.toFixed(2)} Z`;
}

function average(points: PricePoint[]): number | undefined {
  if (!points.length) return undefined;
  return points.reduce((sum, point) => sum + point.value, 0) / points.length;
}

function resolvePointColor(point: PricePoint, config: RealElectricityPriceCardConfig): string {
  const original = normalizedColor(point.color);
  const exactOverride = original ? config.color_overrides?.[original] || config.color_overrides?.[point.color || ''] : undefined;
  if (exactOverride) return exactOverride;
  const semanticKey = original ? SENSOR_COLOR_KEYS[original] : undefined;
  if (semanticKey && colorValue(config[semanticKey])) return String(config[semanticKey]);
  if (config.use_sensor_colors !== false && point.color) return point.color;
  return config.line_color || '#ffc928';
}

function currentPriceValue(hass: HomeAssistant | undefined, config: RealElectricityPriceCardConfig): number | undefined {
  const entityId = config.current_price_entity || DEFAULT_CURRENT_PRICE_ENTITY;
  const raw = hass?.states[entityId]?.state;
  const value = Number(raw);
  return Number.isFinite(value) ? value : undefined;
}

function normalizeConfig(config: RealElectricityPriceCardConfig): RealElectricityPriceCardConfig {
  return {
    entity: DEFAULT_ENTITY,
    current_price_entity: DEFAULT_CURRENT_PRICE_ENTITY,
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
    use_sensor_colors: true,
    line_color: '#ffc928',
    fill_color: 'rgba(56, 199, 243, 0.18)',
    marker_color: '#38c7f3',
    grid_color: 'rgba(255, 255, 255, 0.14)',
    chart_background: 'rgba(33, 52, 62, 0.88)',
    card_background: 'var(--ha-card-background, var(--card-background-color, #1f1f1f))',
    color_overrides: {},
    ...config,
  };
}

class RealElectricityPriceCard extends LitElement {
  public hass?: HomeAssistant;

  private _config?: RealElectricityPriceCardConfig;

  private _selectedIndex?: number;

  private _dragging = false;

  private _clockTimer?: number;

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _selectedIndex: { state: true },
  };

  public static async getConfigElement(): Promise<HTMLElement> {
    await customElements.whenDefined('real-electricity-price-card-editor');
    return document.createElement('real-electricity-price-card-editor');
  }

  public static getStubConfig(): RealElectricityPriceCardConfig {
    return {
      type: 'custom:real-electricity-price-card',
      entity: DEFAULT_ENTITY,
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
  }

  disconnectedCallback(): void {
    if (this._clockTimer !== undefined) {
      window.clearInterval(this._clockTimer);
      this._clockTimer = undefined;
    }
    super.disconnectedCallback();
  }

  public getCardSize(): number {
    const height = chartHeight(this._config || {});
    return Math.max(3, Math.ceil((height + 150) / 50));
  }

  protected render(): TemplateResult {
    if (!this._config) return html``;
    const config = normalizeConfig(this._config);
    const entityId = config.entity || DEFAULT_ENTITY;
    const entity = this.hass?.states[entityId];
    const rawPoints = parsePricePoints(entity);

    if (!entity) {
      return this._renderError(`Entity not found: ${entityId}`);
    }
    if (!rawPoints.length) {
      return this._renderError(`No chart_data found on ${entityId}`);
    }

    const type = chartType(config);
    const selector = selectorMode(config);
    const title = typeof config.name === 'string' ? config.name.trim() : '';
    const box: ChartBox = { width: 360, height: chartHeight(config), left: 8, right: 34, top: 15, bottom: 24 };
    const domain = fixedChartDomain(this.hass);
    const visibleRawPoints = pointsForFixedDomain(rawPoints, domain);
    const chartRawPoints = visibleRawPoints.length ? visibleRawPoints : rawPoints;
    const range = valueRange(chartRawPoints, config);
    const points = buildChartPoints(chartRawPoints, box, range, domain);
    const barSlotWidth = (box.width - box.left - box.right) / CHART_HOURS;
    const now = Date.now();
    const hasManualSelection = this._selectedIndex !== undefined;
    const selectedIndex = Math.max(0, Math.min(points.length - 1, hasManualSelection ? this._selectedIndex ?? 0 : pointIndexAtTimestamp(points, now)));
    const selected = hasManualSelection
      ? type === 'bar' ? columnCenterPoint(points[selectedIndex], barSlotWidth) : points[selectedIndex]
      : currentSelectionPoint(points, now, domain, box);
    const minPoint = points.reduce((best, point) => point.value < best.value ? point : best, points[0]);
    const maxPoint = points.reduce((best, point) => point.value > best.value ? point : best, points[0]);
    const current = currentPriceValue(this.hass, config);

    return html`
      <ha-card class="price-card" style=${`--rep-card-bg:${config.card_background};--rep-chart-bg:${config.chart_background};--rep-grid:${config.grid_color};--rep-marker:${config.marker_color};`}>
        <div class="price-content">
          ${title ? html`
            <div class="price-head">
              <button class="price-title" @click=${() => this._openMoreInfo(entityId)}>
                <span>${title}</span>
              </button>
            </div>
          ` : nothing}

          ${config.show_stats === false ? nothing : this._renderStats(config, chartRawPoints, minPoint, maxPoint, current)}

          <div class="price-chart-frame">
            <div class="price-chart-head">
              <div class="price-selected">
                <span>${formatDateTime(this.hass, selected.timestamp)}</span>
                <strong>${formatPrice(selected.value, config)}</strong>
              </div>
            </div>
            <div class="price-chart-body">
              ${this._renderChart(config, box, points, selected, minPoint, maxPoint, range, type, selector, domain)}
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

  private _renderError(message: string): TemplateResult {
    return html`
      <ha-card class="price-card">
        <div class="price-content price-error">${message}</div>
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
      <div class="price-stats">
        <div class="price-stat">
          <span>Now</span>
          <strong>${formatPrice(current, config)}</strong>
        </div>
        <div class="price-stat">
          <span>Low</span>
          <strong>${formatPrice(minPoint.value, config)}</strong>
        </div>
        <div class="price-stat">
          <span>Average</span>
          <strong>${formatPrice(average(points), config)}</strong>
        </div>
        <div class="price-stat">
          <span>High</span>
          <strong>${formatPrice(maxPoint.value, config)}</strong>
        </div>
      </div>
    `;
  }

  private _renderChart(
    config: RealElectricityPriceCardConfig,
    box: ChartBox,
    points: ChartPoint[],
    selected: ChartPoint,
    minPoint: ChartPoint,
    maxPoint: ChartPoint,
    range: PriceRange,
    type: 'bar' | 'line',
    selector: SelectorMode,
    domain: ChartDomain,
  ): TemplateResult {
    const baseline = box.height - box.bottom;
    const zeroY = Math.max(box.top, Math.min(baseline, box.top + ((range.max - 0) / (range.max - range.min)) * (box.height - box.top - box.bottom)));
    const plotWidth = box.width - box.left - box.right;
    const barSlotWidth = plotWidth / CHART_HOURS;
    const barWidth = Math.max(2, Math.min(14, barSlotWidth * 0.9));
    const ticks = domainTicks(domain);
    const currentX = xForTimestamp(Date.now(), domain, box);
    const showCurrent = config.show_current_marker !== false && currentX >= box.left && currentX <= box.width - box.right;
    const minLabelX = type === 'bar' ? minPoint.x + (barSlotWidth / 2) : minPoint.x;
    const maxLabelX = type === 'bar' ? maxPoint.x + (barSlotWidth / 2) : maxPoint.x;
    const gradientId = 'rep-line-fill';
    const lineGradientId = 'rep-line-color';
    const gradientSpan = Math.max(1, box.width - box.left - box.right);

    return html`
      <svg
        class="price-chart"
        viewBox=${`0 0 ${box.width} ${box.height}`}
        preserveAspectRatio="none"
        role="img"
        aria-label="Electricity price chart"
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
            ${points.map((point) => svg`
              <stop offset=${`${Math.max(0, Math.min(100, ((point.x - box.left) / gradientSpan) * 100))}%`} stop-color=${resolvePointColor(point, config)}></stop>
            `)}
          </linearGradient>
        </defs>
        ${this._renderGrid(config, box, range, ticks, domain)}
        ${type === 'line'
          ? this._renderLineChart(points, baseline, gradientId, lineGradientId, config)
          : this._renderBarChart(points, zeroY, barWidth, barSlotWidth, selected, config)}
        ${showCurrent ? svg`<line class="price-current-line" x1=${currentX} x2=${currentX} y1=${box.top} y2=${baseline}></line>` : nothing}
        ${config.show_extremes === false ? nothing : svg`
          <text class="price-extreme" x=${minLabelX} y=${Math.max(11, minPoint.y - 9)}>L</text>
          <text class="price-extreme" x=${maxLabelX} y=${Math.max(11, maxPoint.y - 9)}>H</text>
        `}
        <line class="price-selected-line" x1=${selected.x} x2=${selected.x} y1=${box.top} y2=${baseline}></line>
        <title>${formatDateTime(this.hass, selected.timestamp)} ${formatPrice(selected.value, config)}</title>
        <desc>${points.length} available hourly electricity price points in a fixed ${CHART_HOURS}-hour chart window.</desc>
      </svg>
    `;
  }

  private _renderGrid(
    config: RealElectricityPriceCardConfig,
    box: ChartBox,
    range: PriceRange,
    ticks: number[],
    domain: ChartDomain,
  ): TemplateResult[] {
    const baseline = box.height - box.bottom;
    const lines = horizontalLineCount(config);
    return [
      ...Array.from({ length: lines }, (_, index) => {
        const ratio = 1 - (index / (lines - 1));
        const y = box.top + (index / (lines - 1)) * (baseline - box.top);
        const value = range.min + ((range.max - range.min) * ratio);
        return svg`
          <line class="price-grid-line" x1=${box.left} x2=${box.width - box.right} y1=${y} y2=${y}></line>
          <text class="price-axis-label" x=${box.width - 2} y=${y}>${formatAxisPrice(value, config)}</text>
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
          <text class=${`price-time-label${edgeClass}`} x=${x} y=${box.height - 6}>${formatTimeLabel(this.hass, timestamp)}</text>
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
          fill=${resolvePointColor(point, config)}
        ></rect>
      `;
    });
  }

  private _renderLineChart(points: ChartPoint[], baseline: number, fillGradientId: string, lineGradientId: string, config: RealElectricityPriceCardConfig): TemplateResult {
    const path = smoothPath(points);
    const fillPath = areaPath(points, baseline);
    const stroke = config.use_sensor_colors === false ? (config.line_color || '#ffc928') : `url(#${lineGradientId})`;
    return svg`
      <path class="price-line-area" d=${fillPath} fill=${`url(#${fillGradientId})`}></path>
      <path class="price-line-shadow" d=${path}></path>
      <path class="price-line" d=${path} stroke=${stroke}></path>
    `;
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
    ev.preventDefault();
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
    fireEvent(this, 'hass-more-info', { entityId });
  }

  static styles = css`
    :host {
      display: block;
      color: var(--primary-text-color);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
    }

    ha-card.price-card {
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--rep-card-bg);
      box-shadow: var(--ha-card-box-shadow, none);
    }

    .price-content {
      padding: 16px;
      border-radius: inherit;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.025), rgba(0, 0, 0, 0.08));
      box-sizing: border-box;
    }

    .price-error {
      color: var(--error-color, #ff5252);
      font-weight: 700;
    }

    .price-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 12px;
    }

    .price-title {
      max-width: min(70%, 460px);
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--primary-text-color);
      font: inherit;
      font-size: 22px;
      font-weight: 800;
      line-height: 1.18;
      text-align: left;
      cursor: pointer;
    }

    .price-title:focus {
      outline: none;
    }

    .price-title:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 3px;
      border-radius: 4px;
    }

    .price-selected {
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      justify-content: end;
      gap: 5px;
      max-width: min(58%, 172px);
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--secondary-text-color);
      font-size: 9px;
      line-height: 1;
      font-weight: 750;
    }

    .price-selected span {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .price-selected strong {
      color: var(--primary-text-color);
      font-size: 14px;
      line-height: 1;
      font-weight: 850;
      letter-spacing: 0;
      white-space: nowrap;
    }

    .price-stats {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
      margin-bottom: 12px;
    }

    .price-stat {
      min-width: 0;
      padding: 8px 10px;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.12);
      box-sizing: border-box;
    }

    .price-stat span,
    .price-stat strong {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .price-stat span {
      color: var(--secondary-text-color);
      font-size: 11px;
      font-weight: 800;
      line-height: 1.1;
    }

    .price-stat strong {
      margin-top: 3px;
      color: var(--primary-text-color);
      font-size: 13px;
      font-weight: 850;
      line-height: 1.1;
    }

    .price-chart-frame {
      position: relative;
      width: 100%;
      min-width: 0;
      display: grid;
      gap: 5px;
      padding: 7px 8px 6px;
      box-sizing: border-box;
      border-radius: 10px;
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
      touch-action: none;
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
      stroke: rgba(255, 255, 255, 0.36);
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
    }

    .price-bar {
      opacity: 0.95;
      transition: opacity 120ms ease;
    }

    .price-bar-selected {
      opacity: 1;
      stroke: rgba(255, 255, 255, 0.72);
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

    .price-axis-label,
    .price-time-label,
    .price-extreme {
      fill: var(--secondary-text-color);
      font-size: 9px;
      font-weight: 750;
      text-anchor: middle;
      dominant-baseline: middle;
    }

    .price-axis-label {
      text-anchor: end;
    }

    .price-time-label {
      font-size: 7.6px;
    }

    .price-time-label-start {
      text-anchor: start;
    }

    .price-time-label-end {
      text-anchor: end;
    }

    .price-extreme {
      fill: var(--primary-text-color);
      font-size: 11px;
      font-weight: 850;
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
      border: 1px solid rgba(255, 255, 255, 0.54);
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.28);
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.18);
      transform: translate(-50%, -50%);
      pointer-events: none;
    }

    .price-selected-dot::after {
      content: "";
      position: absolute;
      inset: 4px;
      border-radius: 50%;
      background: var(--primary-text-color);
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4);
    }

    @media (max-width: 480px) {
      .price-content {
        padding: 12px;
      }

      .price-head {
        gap: 10px;
      }

      .price-title {
        max-width: 64%;
        font-size: 18px;
      }

      .price-stats {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  `;
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
        ${this._textField('Chart Data Entity', 'entity', config.entity || DEFAULT_ENTITY)}
        ${this._textField('Current Price Entity', 'current_price_entity', config.current_price_entity || DEFAULT_CURRENT_PRICE_ENTITY)}
        <label>
          <span>Chart Type</span>
          <select .value=${chartType(config)} @change=${(ev: Event) => this._setValue('chart_type', (ev.target as HTMLSelectElement).value)}>
            <option value="bar">Bars</option>
            <option value="line">Line</option>
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
        </div>
        <div class="toggles">
          ${this._checkbox('Use Sensor Colors', 'use_sensor_colors', config.use_sensor_colors !== false)}
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
          ${this._colorField('Line', 'line_color', config.line_color || '#ffc928')}
          ${this._colorField('Marker', 'marker_color', config.marker_color || '#38c7f3')}
        </div>
        ${this._textField('Area Fill Color', 'fill_color', config.fill_color || 'rgba(56, 199, 243, 0.18)')}
        ${this._textField('Grid Color', 'grid_color', config.grid_color || 'rgba(255, 255, 255, 0.14)')}
        ${this._textField('Chart Background', 'chart_background', config.chart_background || 'rgba(33, 52, 62, 0.88)')}
        <label>
          <span>Exact Color Overrides JSON</span>
          <textarea
            .value=${JSON.stringify(config.color_overrides || {}, null, 2)}
            @change=${(ev: Event) => this._setColorOverrides((ev.target as HTMLTextAreaElement).value)}
          ></textarea>
        </label>
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

  private _setColorOverrides(value: string): void {
    try {
      const parsed = JSON.parse(value || '{}') as Record<string, string>;
      this._setValue('color_overrides', parsed && typeof parsed === 'object' ? parsed : {});
    } catch {
      // Keep the previous valid value.
    }
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
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
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
      font-weight: 500;
    }

    input[type="color"] {
      height: 42px;
      padding: 4px;
    }

    textarea {
      min-height: 96px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 12px;
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
