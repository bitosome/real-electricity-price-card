import { LitElement, TemplateResult, css, html, nothing } from 'lit';
import { designTokens } from './shared/design-tokens';
import {
  chartFrame,
  chartStyles,
  componentStyles,
  FamilyChartController,
  familyStyles,
  formatHassDateTime,
  formatHassNumber,
  hassTimeZone,
  headerStyles,
  isAvailableValue,
  notice,
  showEntityMoreInfo,
  stepDecimals,
  telemetryStyles,
  UI_ICONS,
  UNAVAILABLE_TEXT,
  type ChartDomain,
  type ChartPoint,
} from '@bitosome/ha-card-ui';

const CARD_VERSION = '0.3.0';
const DEFAULT_YESTERDAY_ENTITY = 'sensor.real_electricity_price_hourly_prices_yesterday';
const DEFAULT_TODAY_ENTITY = 'sensor.real_electricity_price_hourly_prices_today';
const DEFAULT_TOMORROW_ENTITY = 'sensor.real_electricity_price_hourly_prices_tomorrow';
const DEFAULT_CURRENT_PRICE_ENTITY = 'sensor.real_electricity_price_current_price';
const DEFAULT_CHEAP_PRICE_ENTITY = 'number.real_electricity_price_acceptable_price';
const DEFAULT_UNIT = '€/kWh';
const HOUR_MS = 60 * 60 * 1000;
const CHART_HOURS = 48;
const TICK_STEP_HOURS = [6, 8, 12, 16, 24, 48];
// Up to 0.2.0 these were the chart colour defaults, and the visual editor saved them into
// dashboards. They are treated as unset, so the area follows the price colours and the
// grid, now marker and background follow the shared family chart colours.
const LEGACY_CHART_COLORS: Record<ChartColorKey, string[]> = {
  fill_color: ['rgba(56, 199, 243, 0.18)'],
  marker_color: ['#38c7f3'],
  grid_color: ['rgba(255, 255, 255, 0.14)', 'var(--divider-color, rgba(127, 127, 127, 0.25))'],
  chart_background: [
    'rgba(33, 52, 62, 0.88)',
    'color-mix(in srgb, var(--card-background-color, #303446) 94%, var(--primary-color, #c39ce3))',
  ],
};

type ChartColorKey = 'fill_color' | 'marker_color' | 'grid_color' | 'chart_background';

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

/** The user's chart colour; blank and the legacy defaults mean the chart keeps the shared colours. */
function customChartColor(config: RealElectricityPriceCardConfig, key: ChartColorKey): string | undefined {
  const value = config[key];
  const color = typeof value === 'string' ? value.trim() : '';
  const compact = (text: string) => text.replace(/\s+/g, '').toLowerCase();
  if (!color || LEGACY_CHART_COLORS[key].some((legacy) => compact(legacy) === compact(color))) return undefined;
  return color;
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

/** At least `axis_decimals`, and more when the axis step needs them, so labels never repeat. */
function formatAxisPrice(hass: HomeAssistant | undefined, value: number, step: number, config: RealElectricityPriceCardConfig): string {
  return formatHassNumber(hass, value, { digits: Math.max(axisDecimals(config), stepDecimals(step)), unit: axisUnit(config) });
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
  const normalized: RealElectricityPriceCardConfig = {
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
    card_background: 'var(--ha-card-background, var(--card-background-color, #1f1f1f))',
    ...config,
  };
  // Dropping the legacy defaults here also removes them from the YAML on the next editor save.
  for (const key of Object.keys(LEGACY_CHART_COLORS) as ChartColorKey[]) {
    const color = customChartColor(normalized, key);
    if (color) normalized[key] = color;
    else delete normalized[key];
  }
  return normalized;
}

class RealElectricityPriceCard extends LitElement {
  public hass?: HomeAssistant;

  private _config?: RealElectricityPriceCardConfig;

  // Measures the chart, keeps the selected interval and re-renders every 30 s for the now marker.
  private _charts = new FamilyChartController(this);

  static properties = {
    hass: { attribute: false },
    _config: { state: true },
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

    const title = typeof config.name === 'string' ? config.name.trim() : '';
    const pricePoints = priceData.points;
    const minPoint = pricePoints.reduce((best, point) => point.value < best.value ? point : best, pricePoints[0]);
    const maxPoint = pricePoints.reduce((best, point) => point.value > best.value ? point : best, pricePoints[0]);
    const current = currentPriceValue(this.hass, config);
    const moreInfoEntityId = priceData.moreInfoEntityId || config.current_price_entity || DEFAULT_CURRENT_PRICE_ENTITY;
    const chart = this._renderChart(config, pricePoints, domain);

    return html`
      <ha-card class="price-card" style=${this._cardStyle(config)}>
        <div class="price-content">
          ${title ? html`
            <div class="price-head">
              <button type="button" class="price-title family-title" aria-haspopup="dialog" aria-label=${`${title}: details`} title="Details" @click=${() => this._openMoreInfo(moreInfoEntityId)}>
                <span>${title}</span>
                <ha-icon .icon=${UI_ICONS.details} aria-hidden="true"></ha-icon>
              </button>
            </div>
          ` : nothing}

          ${config.show_stats === false ? nothing : this._renderStats(config, pricePoints, minPoint, maxPoint, current)}

          ${chart}
        </div>
      </ha-card>
    `;
  }

  /** Custom chart colours override the shared chart variables; unset ones keep the family defaults. */
  private _cardStyle(config: RealElectricityPriceCardConfig): string {
    return [
      `--rep-card-bg:${config.card_background}`,
      config.chart_background && `--family-chart-background:${config.chart_background}`,
      config.grid_color && `--family-chart-grid:${config.grid_color}`,
      config.marker_color && `--family-chart-now:${config.marker_color}`,
    ].filter(Boolean).join(';');
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

  private _renderChart(config: RealElectricityPriceCardConfig, pricePoints: PricePoint[], domain: ChartDomain): TemplateResult {
    const now = Date.now();
    const cheapThreshold = cheapPriceThreshold(this.hass, config);
    const points: ChartPoint<PricePoint>[] = pricePoints.map((point) => ({ t: point.timestamp, v: point.value, data: point }));
    const view = this._charts.render<PricePoint>({
      id: 'price',
      label: 'Electricity price interval',
      description: `${points.length} available hourly electricity price points in a fixed ${CHART_HOURS}-hour chart window.`,
      series: [{
        id: 'price',
        label: 'Price',
        kind: chartType(config),
        curve: 'step',
        intervalMs: HOUR_MS,
        points,
        colorAt: (point) => resolvePointColor(point.data as PricePoint, config, cheapThreshold, now),
        areaColor: config.fill_color,
        extremes: config.show_extremes !== false,
        format: (value) => formatPrice(this.hass, value, config),
      }],
      domain,
      height: chartHeight(config),
      lines: horizontalLineCount(config),
      axes: {
        primary: {
          min: parseNumberValue(config.min),
          max: parseNumberValue(config.max),
          includeZero: true,
          decimals: axisDecimals(config),
          format: (value, axis) => formatAxisPrice(this.hass, value, axis.step, config),
        },
      },
      hass: this.hass,
      timeLabel: (timestamp) => formatDateTime(this.hass, timestamp),
      tickStepsMs: TICK_STEP_HOURS.map((hours) => hours * HOUR_MS),
      now,
      nowMarker: config.show_current_marker !== false,
      selectOn: selectorMode(config) === 'click' ? 'press' : 'hover',
    });
    return chartFrame({ readout: view.readout, body: view.svg });
  }

  private _openMoreInfo(entityId?: string): void {
    if (!entityId) return;
    showEntityMoreInfo(this, entityId);
  }

  static styles = [designTokens, familyStyles, componentStyles, headerStyles, telemetryStyles, chartStyles, css`
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

    .price-card { container-type:inline-size; }
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
        </div>
        ${this._textField('Area Fill Color', 'fill_color', config.fill_color || '', 'Follows price colours')}
        ${this._textField('Marker Color', 'marker_color', config.marker_color || '', 'Follows theme')}
        ${this._textField('Grid Color', 'grid_color', config.grid_color || '', 'Follows theme')}
        ${this._textField('Chart Background', 'chart_background', config.chart_background || '', 'Follows theme')}
      </div>
    `;
  }

  private _textField(label: string, key: keyof RealElectricityPriceCardConfig, value: unknown, placeholder?: string): TemplateResult {
    return html`
      <label>
        <span>${label}</span>
        <input
          type="text"
          placeholder=${placeholder ?? nothing}
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
