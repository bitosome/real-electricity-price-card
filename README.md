# Real Electricity Price Card

A standalone Home Assistant Lovelace card for the `real-electricity-price` integration.

The card renders a fixed 48-hour electricity price chart using the integration's raw hourly price sensors for today and tomorrow. It does not use ApexCharts, and it is intended to be installed as a separate HACS frontend plugin.

## Features

- Uses `sensor.real_electricity_price_hourly_prices_today` and `sensor.real_electricity_price_hourly_prices_tomorrow` by default.
- Falls back to `sensor.real_electricity_price_chart_data` when hourly sensors are unavailable, or when explicitly configured.
- Fixed 48-hour chart window from the current Home Assistant timezone day start.
- Missing tomorrow prices remain empty future space, so it is clear when next-day data has not arrived yet.
- Normalizes the integration's `01:00..00:00` hourly sequence into calendar `00:00..23:00` chart slots.
- Bar or line chart rendering.
- Interactive selector for hour-by-hour price inspection, with hover or click/tap modes.
- Live current-time marker uses the exact current minute while selection snaps by hourly price interval.
- Optional title. Leave `name` empty or omit it to hide the title.
- Card-owned colors for past, current, future, and cheap hours.
- Cheap-hour colors can use `number.real_electricity_price_acceptable_price` or a fixed threshold.
- Configurable graph height, horizontal grid lines, units, decimals, y-axis bounds, and colors.
- Lovelace visual editor support.

## Installation

### HACS Custom Repository

1. Open HACS.
2. Add a custom repository:
   - Repository: `https://github.com/bitosome/real-electricity-price-card`
   - Category: `Dashboard`
3. Install **Real Electricity Price Card**.
4. Refresh the browser cache.

### Manual

Copy `dist/real-electricity-price-card.js` to:

```text
/config/www/community/real-electricity-price-card/real-electricity-price-card.js
```

Then add this Lovelace resource:

```yaml
url: /local/community/real-electricity-price-card/real-electricity-price-card.js
type: module
```

## Basic Usage

```yaml
type: custom:real-electricity-price-card
```

With default `real-electricity-price` entity names, no extra YAML is required.

## Full Example

```yaml
type: custom:real-electricity-price-card
name: Electricity Price
data_source: auto
today_entity: sensor.real_electricity_price_hourly_prices_today
tomorrow_entity: sensor.real_electricity_price_hourly_prices_tomorrow
entity: sensor.real_electricity_price_chart_data
current_price_entity: sensor.real_electricity_price_current_price
cheap_price_entity: number.real_electricity_price_acceptable_price
chart_type: bar
selector_mode: hover
height: 190
horizontal_lines: 5
price_decimals: 4
axis_decimals: 2
unit: €/kWh
show_current_marker: true
show_extremes: true
show_stats: true
past_color: "#bfdbfe"
current_hour_color: "#3b82f6"
future_color: "#93c5fd"
cheap_past_color: "#bbf7d0"
cheap_color: "#86efac"
cheap_current_color: "#22c55e"
marker_color: "#38c7f3"
grid_color: "rgba(255, 255, 255, 0.14)"
```

## Configuration

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `data_source` | `auto`, `hourly`, or `chart_data` | `auto` | `auto` uses today/tomorrow hourly sensors first and falls back to chart data. |
| `today_entity` | string | `sensor.real_electricity_price_hourly_prices_today` | Sensor whose `attributes.hourly_prices` array contains today's prices. |
| `tomorrow_entity` | string | `sensor.real_electricity_price_hourly_prices_tomorrow` | Sensor whose `attributes.hourly_prices` array contains tomorrow's prices. |
| `entity` | string | `sensor.real_electricity_price_chart_data` | Fallback chart-data sensor whose `attributes.chart_data` array can be rendered. |
| `current_price_entity` | string | `sensor.real_electricity_price_current_price` | Optional sensor used for the current price in the stats row. |
| `cheap_price_entity` | string | `number.real_electricity_price_acceptable_price` | Entity used as the cheap-hour threshold when `cheap_threshold` is not set. |
| `cheap_threshold` | number | entity value | Fixed cheap-hour threshold. Overrides `cheap_price_entity` when set. |
| `name` | string | empty | Optional card title. If omitted or blank, no title is rendered. |
| `chart_type` | `bar` or `line` | `bar` | Chart rendering mode. |
| `selector_mode` | `hover` or `click` | `hover` | `hover` updates while moving over the graph on desktop and still supports touch drag. `click` updates on click/tap and drag. |
| `height` | number | `190` | SVG graph height in pixels. |
| `horizontal_lines` | number | `5` | Number of horizontal grid lines and right-side axis labels. |
| `price_decimals` | number | `4` | Decimal places for selected/current price values. |
| `axis_decimals` | number | `2` | Decimal places for right-side axis labels. |
| `unit` | string | `€/kWh` | Price unit label. |
| `show_current_marker` | boolean | `true` | Shows a vertical marker for the exact current time when visible in the 48-hour window. |
| `show_extremes` | boolean | `true` | Shows H/L labels on the highest and lowest visible prices. |
| `show_stats` | boolean | `true` | Shows current, low, average, and high summary chips. |
| `use_sensor_colors` | boolean | `true` | Only affects `chart_data` fallback. Uses each chart-data point's `fillColor` when available. |
| `past_color` | string | `#bfdbfe` | Color for past non-cheap hours. |
| `current_hour_color` | string | `#3b82f6` | Color for the current non-cheap hour. |
| `future_color` | string | `#93c5fd` | Color for future non-cheap hours. |
| `cheap_past_color` | string | `#bbf7d0` | Color for past cheap hours. |
| `cheap_color` | string | `#86efac` | Color for future cheap hours. |
| `cheap_current_color` | string | `#22c55e` | Color for the current cheap hour. |
| `line_color` | string | `#ffc928` | Single line color when chart-data colors are disabled in line mode. |
| `fill_color` | string | `rgba(56, 199, 243, 0.18)` | Area fill color for line mode. |
| `marker_color` | string | `#38c7f3` | Current-time marker and selector accent. |
| `grid_color` | string | `rgba(255, 255, 255, 0.14)` | Grid line color. |
| `chart_background` | string | `rgba(33, 52, 62, 0.88)` | Inner chart background. |
| `card_background` | string | Home Assistant card background | Outer card background. |
| `min` | number | automatic | Optional fixed y-axis minimum. |
| `max` | number | automatic | Optional fixed y-axis maximum. |
| `color_overrides` | object | `{}` | Exact map of chart-data `fillColor` values to replacement colors. |

## Hourly Sensor Data Format

The default source expects `attributes.hourly_prices` on the today and tomorrow sensors. Each item should include a timestamp and a price:

```json
{
  "start_time": "2026-07-08T15:00:00+03:00",
  "end_time": "2026-07-08T16:00:00+03:00",
  "actual_price": 0.089243,
  "nord_pool_price": 0.0578,
  "tariff": 0.031443
}
```

The card reads `actual_price` first, then falls back to `price`, `y`, or `nord_pool_price`.

## Chart Data Fallback Format

When `data_source: chart_data` is selected, or when `data_source: auto` cannot find hourly data, the card can still render `attributes.chart_data` objects:

```json
{
  "x": 1782997200000,
  "y": 0.113553,
  "fillColor": "#22c55e",
  "start_time": "2026-07-02T16:00:00+03:00",
  "formatted_time": "16:00",
  "formatted_price": "0.1136 €/kWh"
}
```

The `x` value may be a Unix timestamp in milliseconds or a parseable date string. The `y` value must be numeric.
