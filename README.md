# Real Electricity Price Card

A standalone Home Assistant Lovelace card for the `real-electricity-price` integration.

The card renders `sensor.real_electricity_price_chart_data` directly, using the sensor's `attributes.chart_data` array. It does not use ApexCharts and is intended to be installed as a separate HACS frontend plugin.

## Features

- Bar or line chart rendering.
- Interactive selector for hour-by-hour price inspection, with hover or click/tap modes.
- Live current-time marker uses the exact current minute while selection snaps by hourly price interval.
- Optional title. Leave `name` empty or omit it to hide the title.
- Fixed 48-hour chart window from the current Home Assistant timezone day start, so missing next-day prices appear as empty future space.
- Uses the integration-provided `fillColor` values by default.
- Optional color overrides for past, current, future, and cheap-hour colors.
- Optional exact `color_overrides` map for replacing any color emitted by the sensor.
- Configurable graph height, horizontal grid lines, units, and decimals.
- Lovelace visual editor support.

## Installation

### HACS custom repository

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
entity: sensor.real_electricity_price_chart_data
current_price_entity: sensor.real_electricity_price_current_price
```

## Full Example

```yaml
type: custom:real-electricity-price-card
name: Electricity Price
entity: sensor.real_electricity_price_chart_data
current_price_entity: sensor.real_electricity_price_current_price
chart_type: bar
selector_mode: hover
height: 190
horizontal_lines: 5
price_decimals: 4
axis_decimals: 2
unit: €/kWh
show_current_marker: true
use_sensor_colors: true
cheap_color: "#86efac"
cheap_current_color: "#22c55e"
future_color: "#93c5fd"
current_hour_color: "#3b82f6"
past_color: "#bfdbfe"
color_overrides:
  "#bbf7d0": "#a7f3d0"
```

## Configuration

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `entity` | string | `sensor.real_electricity_price_chart_data` | Sensor whose `attributes.chart_data` array is rendered. |
| `current_price_entity` | string | `sensor.real_electricity_price_current_price` | Optional sensor used for the current price in the header. |
| `name` | string | empty | Optional card title. If omitted or blank, no title is rendered. |
| `chart_type` | `bar` or `line` | `bar` | Chart rendering mode. |
| `selector_mode` | `hover` or `click` | `hover` | `hover` updates the selector while moving over the graph on desktop and still supports touch drag. `click` updates on click/tap and drag. |
| `height` | number | `190` | SVG graph height in pixels. |
| `horizontal_lines` | number | `5` | Number of horizontal grid lines and right-side axis labels. |
| `price_decimals` | number | `4` | Decimal places for selected/current price values. |
| `axis_decimals` | number | `2` | Decimal places for right-side axis labels. |
| `unit` | string | `€/kWh` | Price unit label. |
| `show_current_marker` | boolean | `true` | Shows a vertical marker for the exact current time when visible in the 48-hour window. |
| `show_extremes` | boolean | `true` | Shows H/L labels on the highest and lowest visible prices. |
| `show_stats` | boolean | `true` | Shows min, average, and max summary chips below the header. |
| `use_sensor_colors` | boolean | `true` | Uses each data point's `fillColor` unless overridden. |
| `past_color` | string | sensor color | Override for the integration's past-hour color. |
| `current_hour_color` | string | sensor color | Override for the integration's current-hour color. |
| `future_color` | string | sensor color | Override for the integration's future-hour color. |
| `cheap_past_color` | string | sensor color | Override for the integration's cheap past-hour color. |
| `cheap_color` | string | sensor color | Override for the integration's cheap future-hour color. |
| `cheap_current_color` | string | sensor color | Override for the integration's cheap current-hour color. |
| `line_color` | string | `#ffc928` | Line color when `use_sensor_colors` is disabled or when no sensor color exists. |
| `fill_color` | string | `rgba(56, 199, 243, 0.18)` | Area fill color for line mode. |
| `marker_color` | string | `#38c7f3` | Current-hour marker and selector accent. |
| `grid_color` | string | `rgba(255, 255, 255, 0.14)` | Grid line color. |
| `min` | number | automatic | Optional fixed y-axis minimum. |
| `max` | number | automatic | Optional fixed y-axis maximum. |
| `color_overrides` | object | `{}` | Exact map of sensor `fillColor` values to replacement colors. |

## Sensor Data Format

The card expects `attributes.chart_data` to contain objects like:

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
