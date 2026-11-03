# Real Electricity Price Card

A standalone Home Assistant Lovelace card for the `real-electricity-price` integration.

The card renders a fixed 48-hour electricity price chart from the integration's raw hourly price sensors. It does not use ApexCharts and does not use the legacy chart-data sensor.

## Features

- Uses raw `attributes.hourly_prices` from yesterday, today, and tomorrow price sensors.
- Fixed 48-hour chart window from the current Home Assistant timezone day start.
- Missing tomorrow prices remain empty future space, so it is clear when next-day data has not arrived yet.
- Uses each raw `start_time` as the chart position; prices are not shifted or normalized into different hours.
- Uses yesterday's raw sensor to fill the current day's `00:00 -> 01:00` boundary interval, because the integration stores that interval in yesterday's array.
- Bar or step-line chart rendering.
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
yesterday_entity: sensor.real_electricity_price_hourly_prices_yesterday
today_entity: sensor.real_electricity_price_hourly_prices_today
tomorrow_entity: sensor.real_electricity_price_hourly_prices_tomorrow
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
```

## Configuration

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `yesterday_entity` | string | `sensor.real_electricity_price_hourly_prices_yesterday` | Sensor used to fill the current day's `00:00 -> 01:00` interval. |
| `today_entity` | string | `sensor.real_electricity_price_hourly_prices_today` | Sensor whose `attributes.hourly_prices` array contains today's prices. |
| `tomorrow_entity` | string | `sensor.real_electricity_price_hourly_prices_tomorrow` | Sensor whose `attributes.hourly_prices` array contains tomorrow's prices. |
| `current_price_entity` | string | `sensor.real_electricity_price_current_price` | Optional sensor used for the current price in the stats row. |
| `cheap_price_entity` | string | `number.real_electricity_price_acceptable_price` | Entity used as the cheap-hour threshold when `cheap_threshold` is not set. |
| `cheap_threshold` | number | entity value | Fixed cheap-hour threshold. Overrides `cheap_price_entity` when set. |
| `name` | string | empty | Optional card title. If omitted or blank, no title is rendered. |
| `chart_type` | `bar` or `line` | `bar` | Chart rendering mode. `line` renders hourly prices as a step line, without interpolating between hours. |
| `selector_mode` | `hover` or `click` | `hover` | `hover` previews the hour under the mouse and returns to the picked hour (or now) when the mouse leaves; click/tap and drag pick an hour. `click` updates only on click/tap and drag. |
| `height` | number | `190` | Chart height in pixels (120–360). The chart keeps this height at every card width. |
| `horizontal_lines` | number | `5` | Number of horizontal grid lines and right-side axis labels. |
| `price_decimals` | number | `4` | Decimal places for selected/current price values. |
| `axis_decimals` | number | `2` | Minimum decimal places for right-side axis labels; more are added when the axis step needs them. |
| `unit` | string | `€/kWh` | Price unit label. |
| `show_current_marker` | boolean | `true` | Shows a vertical marker for the exact current time when visible in the 48-hour window. |
| `show_extremes` | boolean | `true` | Shows H/L labels on the highest and lowest visible prices. |
| `show_stats` | boolean | `true` | Shows current, low, average, and high summary chips. |
| `past_color` | string | `#bfdbfe` | Color for past non-cheap hours. |
| `current_hour_color` | string | `#3b82f6` | Color for the current non-cheap hour. |
| `future_color` | string | `#93c5fd` | Color for future non-cheap hours. |
| `cheap_past_color` | string | `#bbf7d0` | Color for past cheap hours. |
| `cheap_color` | string | `#86efac` | Color for future cheap hours. |
| `cheap_current_color` | string | `#22c55e` | Color for the current cheap hour. |
| `fill_color` | string | follows price colours | Optional area color for line mode, faded from top to bottom. The default up to card version 0.2.0, `rgba(56, 199, 243, 0.18)`, is treated as unset. |
| `marker_color` | string | follows theme | Optional current-time marker color (`--family-chart-now`). By default it matches the other family charts. |
| `grid_color` | string | follows theme | Optional grid line color (`--family-chart-grid`). |
| `chart_background` | string | follows theme | Optional inner chart background (`--family-chart-background`). |
| `card_background` | string | Home Assistant card background | Outer card background. |
| `min` | number | automatic | Optional fixed y-axis minimum. With `max` as well, the axis splits evenly between them; alone, it steps up to the highest price in readable steps. |
| `max` | number | automatic | Optional fixed y-axis maximum. Alone, the axis steps down to the lowest negative price, or down to zero, in readable steps. |

## Hourly Sensor Data Format

The card expects `attributes.hourly_prices` on the yesterday, today, and tomorrow sensors. Each item should include a timestamp and a price:

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

## Shared UI library and accessible chart

Version 0.3.0 bundles the pinned [`@bitosome/ha-card-ui`](https://github.com/bitosome/ha-card-ui) 1.7.0 package, including its shared time-series chart. Space Hub remains the visual reference. Shared tokens, typography, theme surfaces and native HA more-info behavior come from the library; `src/shared` import paths are compatibility re-exports, not vendored copies.

The chart is the shared time-series chart from `@bitosome/ha-card-ui` 1.7.0, shared with the Space Hub weather forecast and the 3D printer power history. It remains directly interactive: arrow keys, Home/End and Page Up/Down select intervals and Escape returns to the current hour; touch preserves vertical scrolling and horizontal scrubbing. Selected time, sign and unit stay visible, missing readings remain gaps, and negative prices remain negative. A chart does not need an extra modal merely to match device cards.

Chart labels stay at 11 px and the chart keeps its configured height whatever the card width, and time ticks thin out on narrow cards. Prices, axis labels and times follow the Home Assistant profile (language, number format, 12/24-hour clock and time zone). A missing price reads "Unavailable" without a unit, and a card without price data shows a shared notice instead of red text.

Run `npm run check` for typecheck, build and interaction regressions. Tagged releases publish the self-contained dashboard bundle. Shared library updates require an explicit dependency/lockfile update, rebuild and card release; no extra HACS resource is required.

The optional card title includes the common information icon and opens native Home Assistant entity details. It is a labeled dialog launcher with a 44px minimum target; long titles wrap without losing the details affordance. Price-chart configuration stays in Home Assistant’s native card editor. The chart colour options are empty by default, so the grid, current-time marker and chart background match the other family charts; the defaults that versions up to 0.2.0 saved into dashboards are treated as unset.
