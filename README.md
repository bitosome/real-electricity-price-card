# Real Electricity Price Card

A standalone Home Assistant Lovelace card for the `real-electricity-price` integration.

The card renders a fixed 48-hour electricity price chart from the integration's raw hourly price sensors for today and tomorrow. It does not use ApexCharts and does not use the legacy chart-data sensor.

## Features

- Uses raw `attributes.hourly_prices` from today and tomorrow price sensors.
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
fill_color: "rgba(56, 199, 243, 0.18)"
marker_color: "#38c7f3"
grid_color: "rgba(255, 255, 255, 0.14)"
```

## Configuration

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `today_entity` | string | `sensor.real_electricity_price_hourly_prices_today` | Sensor whose `attributes.hourly_prices` array contains today's prices. |
| `tomorrow_entity` | string | `sensor.real_electricity_price_hourly_prices_tomorrow` | Sensor whose `attributes.hourly_prices` array contains tomorrow's prices. |
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
| `past_color` | string | `#bfdbfe` | Color for past non-cheap hours. |
| `current_hour_color` | string | `#3b82f6` | Color for the current non-cheap hour. |
| `future_color` | string | `#93c5fd` | Color for future non-cheap hours. |
| `cheap_past_color` | string | `#bbf7d0` | Color for past cheap hours. |
| `cheap_color` | string | `#86efac` | Color for future cheap hours. |
| `cheap_current_color` | string | `#22c55e` | Color for the current cheap hour. |
| `fill_color` | string | `rgba(56, 199, 243, 0.18)` | Area fill color for line mode. |
| `marker_color` | string | `#38c7f3` | Current-time marker and selector accent. |
| `grid_color` | string | `rgba(255, 255, 255, 0.14)` | Grid line color. |
| `chart_background` | string | `rgba(33, 52, 62, 0.88)` | Inner chart background. |
| `card_background` | string | Home Assistant card background | Outer card background. |
| `min` | number | automatic | Optional fixed y-axis minimum. |
| `max` | number | automatic | Optional fixed y-axis maximum. |

## Hourly Sensor Data Format

The card expects `attributes.hourly_prices` on the today and tomorrow sensors. Each item should include a timestamp and a price:

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

## Design System & UI Implementation

This card is part of the `bitosome` Home Assistant card family and follows a shared design system. The **single source of truth** is [`space-hub-card`](https://github.com/bitosome/space-hub-card) — specifically `space-hub-card/src/shared/design-tokens.ts`. See its [Design System & UI Implementation](https://github.com/bitosome/space-hub-card#design-system--ui-implementation) section for the full approach and file map.

- The design tokens are **vendored** into this repo at `src/shared/design-tokens.ts` and carry an `AUTO-SYNCED … DO NOT EDIT` banner. Update tokens in `space-hub-card` and run its `scripts/sync-design-tokens.sh` — never edit the vendored copy directly.
- Compose the tokens into the card's Lit styles: `static styles = [designTokens, css\`…\`]`.

Rules when implementing or changing UI (these mirror `space-hub-card`, so every card looks and behaves the same):

1. **Never hardcode** colors, spacing, radii, or shadows. Reference the CSS custom properties instead — e.g. `var(--tile-border-radius)`, `var(--tile-shadow-default)`, `var(--large-gap)`, `var(--status-active-color)`.
2. **Reuse Home Assistant primitives** (`ha-card`, `ha-icon`, and `ha-control-button` where applicable) rather than reimplementing them.
3. **Selection/glow layers render below surfaces**: a glow/selection layer uses `z-index: 0`, the tile/panel surface uses `z-index: 1`, and the group container is a **single stacking context** so a glow never paints over a neighbouring tile. Individual tile wrappers must not create their own stacking context.
4. **Use the semantic status palette** (`--status-*`) for state colors.
