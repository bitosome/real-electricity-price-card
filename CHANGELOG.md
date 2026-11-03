# Changelog

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
