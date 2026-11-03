# Changelog

## 0.3.0 — 2026-11-03

- The price chart is the shared time-series chart from `@bitosome/ha-card-ui` 1.7.0, the same one the weather forecast and printer power charts use. The card keeps its entities, 48-hour midnight window, price colours, cheap threshold, stats, notices and native details dialog.
- `height` is now the exact chart height in pixels at every card width. Before, the chart grew with the card width, so a 190 px chart was about 380 px tall on a 720 px wide card. If you raised `height` for a wide card, the chart is now shorter than before: set `height` to the height you want to see.
- Price axis labels use readable steps that include zero, for example 0.00 / 0.08 / 0.16 / 0.24 / 0.32 € or -0.10 / 0.00 / 0.10 / 0.20 / 0.30 € on a day with negative prices, instead of even splits of a padded range. `axis_decimals` is now a minimum: the axis adds decimals when its step needs them, so two labels never read the same. An explicit `min` and `max` still split the axis evenly. A `min` or `max` alone steps from that bound to the prices in readable steps and leaves at most a quarter of the axis empty where a step within `axis_decimals` allows it, for example -0.10 / 0.00 / 0.10 / 0.20 / 0.30 € for `min: -0.1`, or -0.08 / 0.04 / 0.16 / 0.28 / 0.40 € for `max: 0.4`. Prices beyond an explicit `min` or `max` stop at the plot edge instead of running past it.
- In line mode the area under the step line follows the price colours and fades from 28 % to 4 %. `fill_color` no longer has a default: the old default `rgba(56, 199, 243, 0.18)`, which the visual editor saved into dashboards, is treated as unset and removed on the next editor save. The editor field shows "Follows price colours" when empty. A custom `fill_color` still paints the area through the same fade, so a translucent colour looks fainter than before; an opaque colour works best.
- The step line is 4 px wide (was 4.3 px).
- `grid_color`, `marker_color` and `chart_background` no longer have defaults, so the grid, current-time marker and chart background match the weather and printer charts (theme text colour grid, `--family-active` marker, `--family-surface` tinted background). A value you set overrides the shared `--family-chart-grid`, `--family-chart-now` or `--family-chart-background` variable. The old defaults that the visual editor saved into dashboards (`#38c7f3`, `rgba(255, 255, 255, 0.14)`, `rgba(33, 52, 62, 0.88)`, the `--divider-color` grid and the tinted `--card-background-color` background) are treated as unset and removed on the next editor save. The editor shows "Follows theme" for empty fields, and Marker Color is now a text field so it can be left empty.
- In `selector_mode: hover`, moving the mouse off the chart now returns the selection to the hour you picked (or to the current hour) instead of keeping the last hovered hour; click/tap and drag pick an hour.
- Escape returns the selection to the current hour. Arrow keys, Home/End and Page Up/Down (six hours on a full day) work as before.
- A hovering pen no longer scrubs in `selector_mode: hover`; press and drag as with touch. The slider's spoken value and the chart tooltip now separate time and price with a middle dot, e.g. "3 Nov, 13:00 · 0.1576 €/kWh".
- The selected-interval dot is drawn inside the chart and no longer depends on a separate overlay.
- The 30-second refresh runs while the current-time marker is shown or the selection follows the current time, so past and current hour colours stay up to date with `show_current_marker: false` too. It stops while you have picked another hour.

## 0.2.0 — 2026-11-03

- Bundles `@bitosome/ha-card-ui` 1.4.0.
- Missing price data now shows a shared notice instead of bold red text: "Unavailable" when the price entities exist but have no hourly prices yet, and an error that names the missing entities when neither price source exists.
- A missing "Now" price reads "Unavailable" in the secondary text colour, without a unit, instead of `—`.
- Prices, axis labels and times use the Home Assistant profile: language, number format, 12/24-hour clock and time zone. Dates are shorter, e.g. "3 Nov, 14:00".
- The price axis follows the configured `unit` (for example `€` for `€/kWh` or `c` for `c/kWh`) instead of always showing `€`.
- Chart labels stay at 11 px on every card width instead of shrinking with the chart. Time labels are spaced by their estimated width, so longer 12-hour labels such as "Nov 3, 12:00 AM" never overlap: a default-width card shows three time labels, narrow cards show fewer (down to the start and end) and wide cards show more.
- The Now/Low/Average/High row uses the shared telemetry layout with the unit set apart from the value.
- The title uses the shared title style and a 3 px focus ring, the card follows the theme font, and the selected-interval line, bar outline and dot follow the theme text colour. The private background gradient overlay is removed.
- Editor fields use 16 px text so iOS no longer zooms in on focus.
