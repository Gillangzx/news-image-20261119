# V1 design brief — news-image-20261119 "The day as it unfolded"

## Form
A broadsheet front page on cream paper (#f4ead5-ish), 1024x1024. The page reads
TOP-TO-BOTTOM as Thursday unfolds — a chronological timeline, NOT a grid.
A thin hour-rail runs down the left edge of the middle section with hour
dots (00:00, MORNING, MIDDAY, AFTERNOON, EVENING). Every story carries an
epistemic tag: REPORTED (green) / CLAIM (amber) / FORECAST (blue).
Times are LOCAL time, in order (same convention as rank 2's strip).

## Layout (1024 tall, top to bottom)
1. Top bar: "THE WORLD IN ONE DAY" left; "40 STORIES · EVERY CONTINENT · ALL FROM THIS ONE DAY" right. Thin rule.
2. Headline (huge serif, ~72px): "Thursday 19 November 2026"
3. Red subhead (italic serif): "Trump, Xi and Putin share one table · The World Court finds genocide in Myanmar · COP31's draft drops fossil fuels"
4. Stat strip (6 cells): 3 presidents at one table | 9–6 World Court genocide vote | $120bn aid goal cut at COP31 | $81.3bn Anthropic's record IPO | 200,000 evacuated ahead of Cyclone Akvan | 4.9% Australian jobless rate
5. Timeline section (hour rail on left):
   - OVERNIGHT 00:00 — LEAD 1 (illustrated): GTA VI goes on sale after a 13-year wait. Midnight local, New Zealand first; 15.9m pre-orders, $79.99. [REPORTED]
   - MORNING — LEAD 2 (illustrated): World Court: Myanmar committed genocide. ICJ 9–6, The Hague; reparations ordered. [REPORTED]
   - MIDDAY — LEAD 3 (illustrated): Trump, Xi and Putin hold first three-way summit. APEC Shenzhen; "Declaration on Peace"; nuclear risk and UN reform. [REPORTED]
   - Tiles (10, in time order, each with small flat illustration + tag):
     a. 08:40 SEOUL — Korea's Suneung exam: 551,864 sit, flights pause. [REPORTED]
     b. 04:42 RIYADH — Saudis shoot down Houthi missiles; debris, no casualties. [REPORTED]
     c. 09:30 JAKARTA — Indonesia passes asset-seizure law after 18 years. [REPORTED]
     d. MORNING GREENLAND — Denmark backs Arctic pact with US, 109–0. [REPORTED]
     e. MIDDAY ANTALYA — COP31 draft drops fossil fuels, $120bn adaptation aid. [REPORTED]
     f. 09:30 NEW YORK — Anthropic starts trading on Nasdaq as ANT, $83, $81.3bn IPO, largest on record. [REPORTED]
     g. AFTERNOON KERCH — Ukraine hits Crimea bridge again; third strike in a week. [REPORTED]
     h. AFTERNOON GAZA — Israel ends tank raid past truce line. [REPORTED]
     i. AFTERNOON BOGOTÁ — Colombia's unions hold national strike. [REPORTED]
     j. EVENING ODISHA — Cyclone Akvan nears India's east coast; 200,000 evacuated. [REPORTED]
6. "SINCE YESTERDAY" delta strip (4 items):
   - COP31: Wednesday's draft kept fossil fuels in; Thursday's text drops them.
   - GTA VI: yesterday 15.9m pre-orders; today it is on sale.
   - Anthropic: priced Wednesday at $83; shares begin trading today.
   - World Court: yesterday a ruling was expected; today Myanmar is guilty, 9–6.
7. World map (small, left) + numbered list 14–40 (right, 2 columns):
   14 SHENZHEN — Xi urges ban on all nuclear arms. [REPORTED]
   15 SHENZHEN — Albanese to Putin: "End your war, end it now." [REPORTED]
   16 SHENZHEN — APEC leaders adopt the Shenzhen Declaration. [REPORTED]
   17 KRASNODAR — Kyiv says it hit two oil refineries. [CLAIM]
   18 HORMUZ — Iran says mines set 3 tankers ablaze. [CLAIM]
   19 PARIS — French left splits over Mélenchon. [REPORTED]
   20 NAIROBI — Marathon champion banned for doping, 3 years. [REPORTED]
   21 CANBERRA — Australia's jobless rate hits 4.9%. [REPORTED]
   22 FLORIDA — Floods shut South Florida schools again. [REPORTED]
   23 JAZAN — Saudi Arabia says danger has passed. [REPORTED]
   24 SCIENCE — Earth's missing billion years explained (Nature). [REPORTED]
   25 SPACE — Red giant seen eating a Sun-sized star. [REPORTED]
   26 BRUSSELS — EU delays methane rules two years. [REPORTED]
   27 UK — Inquiry: yacht Bayesian was vulnerable to wind. [REPORTED]
   28 ZURICH — Two rivals to challenge FIFA's Infantino. [REPORTED]
   29 ROME — Author Corrado Augias dies at 91. [REPORTED]
   30 MOGADISHU — Somalia expels UAE ambassador. [REPORTED]
   31 SUDAN — Court sentences absent RSF chief to death. [REPORTED]
   32 PRETORIA — Central bank holds rate at 7.25%. [REPORTED]
   33 CANARIES — Record 11,000 migrants in 15 days. [REPORTED]
   34 WELLINGTON — Court: pay equity cuts broke rights law. [REPORTED]
   35 TONGA — Drought emergency takes effect. [REPORTED]
   36 COOK ISLANDS — Cyclone Xavier weakens to category 4. [REPORTED]
   37 KYIV — Zelensky: no talks about Ukraine without Ukraine. [REPORTED]
   38 PARIS — IEA: Hormuz crisis is the largest energy-security threat in history. [REPORTED]
   39 DHAKA — Awami League shutdown shuts parts of Bangladesh. [REPORTED]
   40 SANAA — Houthi media report Saudi air strikes on Yemen's capital. [CLAIM]
8. DATE CHECK footer (red box): "DATE CHECK ✓ — First reported Wednesday 18 Nov, so NOT on this page as news: the Iranian drone interceptions · the EU's proposed €45bn loan for Ukraine · the House Democrats' 251–11 vote nominating Hakeem Jeffries · Voyager 1 crossing one light-day (10:16 GMT Wed) · Van Gogh's record $190.4m sale · Pew's projection that Islam becomes the largest religion by 2035 · the first COP31 draft (Monday) · Petrola's Alaska win."
9. Sources line: "Every story here happened, or was first reported, on Thursday 19 November 2026. Claims are attributed, not stated as fact. Sources: Reuters, AP, AFP, BBC, Al Jazeera, UN News, Euronews, ABC, RNZ, Xinhua, Nature. Pictures and map: original, drawn in code."

## Visual style
Cream paper background (#f5ecd7), near-black ink (#1a1a1a), red accents (#b01e1e),
dark navy for the map panel (#1e2a3a). Serif display headline (Georgia / 'Times New Roman',
bold), sans for labels/tiles (Arial / Helvetica). Flat vector illustrations in
simple geometric shapes (like rank 1–5: summit table with 3 flags, courthouse
with scales, neon city skyline, cyclone spiral, etc.). No photos. No garbled
text — every word spelled correctly, all text legible at 300px wide.
Epistemic tag chips: REPORTED = green bg white text; CLAIM = amber bg dark text;
FORECAST = blue bg white text. Small (9–10px), top-right of each tile.

## Render
One HTML file, 1024x1024, inline CSS + inline SVG, no external assets, no
network. Rendered with headless Chrome --screenshot at --window-size=1024,1024.
Output entry.png must be ≤1 MiB.
