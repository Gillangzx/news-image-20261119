// news-image-20261119 — "The day as it unfolded" (V1)
// Self-contained render program: the whole 1024x1024 front page lives in this
// file as an HTML string (inline CSS + inline SVG, no external assets, no
// network). Renders with headless Chromium when available, else falls back to
// the committed entry.png. Validates the output PNG (1024x1024, >= 10 KB).
// Render fallback: if no headless Chromium is found (or the render is
// invalid), main() copies the committed entry.png to the output dir.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const PAGE_HTML = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1024px;height:1024px;background:#f5ecd7;color:#1a1a1a;font-family:Arial,Helvetica,sans-serif;overflow:hidden}
.page{width:1024px;height:1024px;padding:12px 18px 10px}
.topbar{display:flex;justify-content:space-between;border-bottom:3px solid #1a1a1a;padding-bottom:5px}
.topbar .l{font:bold 15px Arial;letter-spacing:3px}
.topbar .r{font:11px Arial;letter-spacing:1px;color:#333}
h1{font:700 52px Georgia,'Times New Roman',serif;text-align:center;line-height:1.05;margin:6px 0 2px}
.subhead{font:italic 700 15px Georgia,serif;color:#b01e1e;text-align:center;margin-bottom:6px}
.stats{display:flex;border-top:1px solid #999;border-bottom:1px solid #999;margin-bottom:6px}
.stats div{flex:1;text-align:center;font:9px Arial;padding:5px 3px;border-right:1px solid #ccc}
.stats div:last-child{border-right:0}
.stats b{display:block;font-size:13px;color:#b01e1e}
.strip{background:#1e2a3a;color:#ffd54f;font:bold 10px Arial;letter-spacing:2px;padding:4px 10px;display:flex;justify-content:space-between;margin-bottom:6px}
.strip span{color:#fff;font-weight:normal;letter-spacing:1px}
.leads{display:flex;gap:10px;margin-bottom:6px}
.lead{flex:1;border:1px solid #c9b98a;background:#fbf3dd;padding:6px}
.lead svg{display:block;width:100%;height:56px;background:#22303f}
.kicker{font:bold 8.5px Arial;letter-spacing:.5px;color:#555;text-transform:uppercase;margin:4px 0 2px}
.kicker .n{color:#b01e1e}
.tag{float:right;font:bold 8px Arial;padding:1px 4px;border-radius:2px}
.tag.reported{background:#2e7d32;color:#fff}
.tag.claim{background:#e6a700;color:#1a1a1a}
.lead h2{font:700 15px Georgia,serif;line-height:1.15;margin-bottom:2px}
.lead p{font:10.5px Arial;line-height:1.3;color:#333}
.tiles{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:6px}
.tile{border:1px solid #c9b98a;background:#fbf3dd;padding:5px}
.tile svg{display:block;width:100%;height:30px;background:#22303f}
.tile h3{font:700 11.5px Georgia,serif;line-height:1.15;margin:3px 0 1px}
.tile p{font:9.5px Arial;line-height:1.25;color:#333}
.since{background:#1e2a3a;color:#fff;padding:6px 10px;margin-bottom:6px;font:10px Arial}
.since b{color:#ffd54f;letter-spacing:1px;font-size:10px}
.since span{margin-right:14px}
.bottom{display:flex;gap:10px;margin-bottom:6px}
.mapbox{flex:0 0 300px;width:300px;padding:8px;background:#1e2a3a}
.mapbox .t{font:bold 11px sans-serif;letter-spacing:2px;color:#ffd54f;margin-bottom:5px}
.mapbox .cap{font:9px sans-serif;color:#d7e0ea;margin-top:4px}
.list{flex:1}
.list .t{font:bold 10px Arial;letter-spacing:1px;border-bottom:2px solid #1a1a1a;padding-bottom:2px;margin-bottom:4px}
.list .cols{column-count:2;column-gap:16px}
.list .it{font:10px Arial;line-height:1.3;margin-bottom:3px;break-inside:avoid}
.list .it b{color:#b01e1e}
.list .it .src{color:#666;font-size:8.5px}
.datecheck{border:2px solid #b01e1e;border-top:3px solid #1a1a1a;background:#fbe9e7;padding:6px 10px;font:10.5px Arial;line-height:1.35;margin:18px 0 5px}
.datecheck b{color:#b01e1e;letter-spacing:1px}
.sources{font:9px Arial;color:#555;text-align:center;line-height:1.4}
.rail{flex:0 0 22px;width:22px;position:relative}
.rail .line{position:absolute;left:10px;top:8px;bottom:8px;width:2px;background:#b01e1e}
.rail .dot{position:absolute;left:6px;width:10px;height:10px;border-radius:50%;background:#b01e1e;border:2px solid #f5ecd7}
.rail .lab{position:absolute;left:0;width:22px;text-align:center;font:bold 6.5px Arial;color:#b01e1e;letter-spacing:.5px}
.mid{display:flex;gap:6px}
.mid .col{flex:1}
</style></head><body><div class="page">
  <div class="topbar"><span class="l">THE WORLD IN ONE DAY</span><span class="r">40 STORIES &middot; EVERY CONTINENT &middot; ALL FROM THIS ONE DAY</span></div>
  <h1>Thursday 19 November 2026</h1>
  <div class="subhead">Trump, Xi and Putin share one table &middot; The World Court finds genocide in Myanmar &middot; COP31&rsquo;s draft drops fossil fuels</div>
  <div class="stats">
    <div><b>3</b>presidents at one table</div>
    <div><b>9&ndash;6</b>World Court genocide vote</div>
    <div><b>$120bn</b>aid goal cut at COP31</div>
    <div><b>$81.3bn</b>Anthropic record IPO</div>
    <div><b>200,000</b>evacuated for Cyclone Akvan</div>
    <div><b>4.9%</b>Australian jobless rate</div>
  </div>
  <!-- Timeline strip: the day in five bands — overnight, morning, midday, afternoon, evening — matching the rail dots on the left. -->
  <div class="strip"><span>THE DAY AS IT UNFOLDED</span><span>00:00 OVERNIGHT &middot; MORNING &middot; MIDDAY &middot; AFTERNOON &middot; EVENING</span></div>
  <div class="mid">
    <div class="rail"><div class="line"></div>
      <div class="dot" style="top:6px"></div><div class="lab" style="top:18px">00:00</div>
      <div class="dot" style="top:90px"></div><div class="lab" style="top:102px">MORN</div>
      <div class="dot" style="top:180px"></div><div class="lab" style="top:192px">MID</div>
      <div class="dot" style="top:270px"></div><div class="lab" style="top:282px">AFT</div>
      <div class="dot" style="top:350px"></div><div class="lab" style="top:362px">EVE</div>
    </div>
    <div class="col">
      <!-- Leads: the three biggest stories of the day — GTA VI on sale (Auckland), the World Court genocide ruling (The Hague), and the first Trump–Xi–Putin summit (Shenzhen). -->
      <div class="leads">
        <div class="lead">
          <svg viewBox="0 0 300 56"><rect width="300" height="56" fill="#17112c"/><rect x="0" y="44" width="300" height="12" fill="#0c0a18"/><rect x="18" y="22" width="14" height="22" fill="#2a2140"/><rect x="36" y="14" width="14" height="30" fill="#3a2d5c"/><rect x="54" y="26" width="14" height="18" fill="#2a2140"/><rect x="72" y="10" width="14" height="34" fill="#4a3a6e"/><circle cx="252" cy="12" r="7" fill="#f6e7b8"/><text x="150" y="34" font-family="sans-serif" font-size="26" font-weight="bold" fill="#ff4fd8" text-anchor="middle">VI</text><rect x="196" y="38" width="52" height="8" rx="3" fill="#ff4fd8"/><circle cx="206" cy="47" r="3" fill="#111"/><circle cx="238" cy="47" r="3" fill="#111"/></svg>
          <div class="kicker"><span class="n">1</span> &middot; Overnight 00:00 &middot; Auckland &middot; Games<span class="tag reported">REPORTED</span></div>
          <h2>GTA VI goes on sale after a 13-year wait</h2>
          <p>Midnight local, New Zealand first; 15.9m pre-orders, $79.99 on PS5 and Xbox.</p>
        </div>
        <div class="lead">
          <svg viewBox="0 0 300 56"><rect width="300" height="56" fill="#22303f"/><polygon points="150,8 210,44 90,44" fill="#e8dcc0"/><rect x="130" y="44" width="40" height="8" fill="#c9b98a"/><rect x="146" y="24" width="8" height="20" fill="#8a7a52"/><circle cx="128" cy="20" r="6" fill="#b01e1e"/><text x="128" y="23" font-family="sans-serif" font-size="8" font-weight="bold" fill="#fff" text-anchor="middle">9-6</text><circle cx="172" cy="20" r="6" fill="#f6e7b8"/><text x="172" y="23" font-family="sans-serif" font-size="6" font-weight="bold" fill="#1a1a1a" text-anchor="middle">ICJ</text></svg>
          <div class="kicker"><span class="n">2</span> &middot; Morning 10:00 &middot; The Hague &middot; Justice<span class="tag reported">REPORTED</span></div>
          <h2>World Court: Myanmar committed genocide</h2>
          <p>The ICJ votes 9-6 and orders reparations for the Rohingya &mdash; a first for any state.</p>
        </div>
        <div class="lead">
          <svg viewBox="0 0 300 56"><rect width="300" height="56" fill="#22303f"/><rect x="92" y="32" width="116" height="14" rx="4" fill="#8a6d3b"/><circle cx="105" cy="27" r="8" fill="#f0c9a0"/><rect x="97" y="14" width="16" height="10" fill="#b22234"/><circle cx="160" cy="27" r="8" fill="#e8b98c"/><rect x="152" y="14" width="16" height="10" fill="#de2910"/><circle cx="215" cy="27" r="8" fill="#f0c9a0"/><rect x="207" y="14" width="16" height="10" fill="#fff"/><rect x="207" y="14" width="16" height="3" fill="#0039a6"/><rect x="207" y="21" width="16" height="3" fill="#d52b1e"/></svg>
          <div class="kicker"><span class="n">3</span> &middot; Midday &middot; Shenzhen &middot; Summit<span class="tag reported">REPORTED</span></div>
          <h2>Trump, Xi and Putin hold first three-way summit</h2>
          <p>The three nuclear powers meet at APEC in Shenzhen; a Declaration on Peace on nuclear risk.</p>
        </div>
      </div>
      <!-- Tiles: stories 4–13 in local-time order, morning in Seoul to evening in Odisha. -->
      <div class="tiles">
        <div class="tile">
          <svg viewBox="0 0 180 30"><rect width="180" height="30" fill="#22303f"/><rect x="20" y="12" width="60" height="10" fill="#8a6d3b"/><rect x="26" y="6" width="48" height="8" fill="#f6e7b8"/><line x1="90" y1="8" x2="150" y2="8" stroke="#ffd54f" stroke-width="2"/><circle cx="166" cy="9" r="6" fill="#fff8e7" stroke="#263d4a" stroke-width="1.5"/><path d="M166 9V4M166 9l4 2" stroke="#263d4a" stroke-width="1.5"/></svg>
          <div class="kicker">08:40 &middot; Seoul &middot; Education<span class="tag reported">REPORTED</span></div>
          <h3>Korea&rsquo;s Suneung exam: 551,864 sit</h3>
          <p>Flights pause for the listening test.</p>
        </div>
        <div class="tile">
          <svg viewBox="0 0 180 30"><rect width="180" height="30" fill="#22303f"/><path d="M20 22 L40 8 L60 22 Z" fill="#b01e1e"/><circle cx="90" cy="12" r="6" fill="#ffd54f"/><path d="M84 6 L96 6 L90 0 Z" fill="#ffd54f"/><circle cx="140" cy="15" r="8" fill="#2e7d32"/><path d="M132 15h16M140 7v16" stroke="#fff" stroke-width="2"/></svg>
          <div class="kicker">04:42 &middot; Riyadh &middot; Defence<span class="tag reported">REPORTED</span></div>
          <h3>Saudis shoot down Houthi missiles</h3>
          <p>Debris falls on the capital; no casualties.</p>
        </div>
        <div class="tile">
          <svg viewBox="0 0 180 30"><rect width="180" height="30" fill="#22303f"/><rect x="70" y="4" width="40" height="20" fill="#e8dcc0"/><rect x="74" y="8" width="32" height="3" fill="#555"/><rect x="74" y="13" width="32" height="3" fill="#555"/><rect x="74" y="18" width="20" height="3" fill="#555"/><circle cx="30" cy="15" r="8" fill="#c9a227"/><path d="M22 15h16M30 7v16" stroke="#fff" stroke-width="1.5"/></svg>
          <div class="kicker">09:30 &middot; Jakarta &middot; Law<span class="tag reported">REPORTED</span></div>
          <h3>Indonesia passes asset-seizure law</h3>
          <p>After 18 years, two agencies can seize suspect assets.</p>
        </div>
        <div class="tile">
          <svg viewBox="0 0 180 30"><rect width="180" height="30" fill="#22303f"/><polygon points="30,26 44,8 58,26" fill="#dceef7"/><polygon points="58,26 72,14 86,26" fill="#bfe0f2"/><rect x="120" y="8" width="30" height="14" fill="#b01e1e"/><rect x="120" y="8" width="30" height="7" fill="#fff"/><circle cx="130" cy="15" r="3" fill="#b01e1e"/></svg>
          <div class="kicker">Morning &middot; Greenland &middot; Pact<span class="tag reported">REPORTED</span></div>
          <h3>Denmark backs Arctic pact with US</h3>
          <p>Parliament approves the Greenland security deal 109-0.</p>
        </div>
        <div class="tile">
          <svg viewBox="0 0 180 30"><rect width="180" height="30" fill="#22303f"/><circle cx="40" cy="15" r="9" fill="#ffd54f"/><path d="M60 22 Q80 6 100 18 T140 14" stroke="#4caf50" stroke-width="3" fill="none"/><circle cx="140" cy="14" r="4" fill="#4caf50"/><circle cx="160" cy="10" r="3" fill="#81c784"/></svg>
          <div class="kicker">Midday &middot; Antalya &middot; Climate<span class="tag reported">REPORTED</span></div>
          <h3>COP31 draft drops fossil fuels</h3>
          <p>$120bn adaptation aid in the text; ministers take over.</p>
        </div>
        <div class="tile">
          <svg viewBox="0 0 180 30"><rect width="180" height="30" fill="#22303f"/><rect x="24" y="18" width="10" height="8" fill="#4caf50"/><rect x="40" y="12" width="10" height="14" fill="#81c784"/><rect x="56" y="6" width="10" height="20" fill="#c8e6c9"/><text x="120" y="20" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffd54f">$83</text></svg>
          <div class="kicker">09:30 &middot; New York &middot; Markets<span class="tag reported">REPORTED</span></div>
          <h3>Anthropic starts trading on Nasdaq</h3>
          <p>ANT at $83; $81.3bn IPO, largest on record.</p>
        </div>
        <div class="tile">
          <svg viewBox="0 0 180 30"><rect width="180" height="30" fill="#22303f"/><path d="M16 24 Q50 10 90 18 T164 14" stroke="#e8dcc0" stroke-width="4" fill="none"/><line x1="40" y1="20" x2="40" y2="26" stroke="#e8dcc0" stroke-width="3"/><line x1="90" y1="16" x2="90" y2="26" stroke="#e8dcc0" stroke-width="3"/><line x1="140" y1="15" x2="140" y2="26" stroke="#e8dcc0" stroke-width="3"/><circle cx="90" cy="10" r="4" fill="#ff7043"/></svg>
          <div class="kicker">Afternoon &middot; Kerch &middot; War<span class="tag reported">REPORTED</span></div>
          <h3>Ukraine hits Crimea bridge again</h3>
          <p>Third strike in a week halts trains to Russia.</p>
        </div>
        <div class="tile">
          <svg viewBox="0 0 180 30"><rect width="180" height="30" fill="#22303f"/><path d="M20 20 Q50 8 80 16 T140 12" stroke="#ffd54f" stroke-width="2" fill="none"/><circle cx="150" cy="12" r="5" fill="#fff"/><path d="M145 12h10" stroke="#263d4a" stroke-width="1.5"/><rect x="90" y="18" width="40" height="6" fill="#8d6e63"/></svg>
          <div class="kicker">Afternoon &middot; Gaza &middot; Ceasefire<span class="tag reported">REPORTED</span></div>
          <h3>Israel ends tank raid past truce line</h3>
          <p>Armour pulls back; the Yellow Line holds.</p>
        </div>
        <div class="tile">
          <svg viewBox="0 0 180 30"><rect width="180" height="30" fill="#22303f"/><circle cx="50" cy="12" r="5" fill="#f0c9a0"/><circle cx="80" cy="12" r="5" fill="#d49a73"/><circle cx="110" cy="12" r="5" fill="#bd7658"/><rect x="42" y="18" width="16" height="8" fill="#b01e1e"/><rect x="72" y="18" width="16" height="8" fill="#2e7d32"/><rect x="102" y="18" width="16" height="8" fill="#1565c0"/></svg>
          <div class="kicker">Afternoon &middot; Bogot&aacute; &middot; Labour<span class="tag reported">REPORTED</span></div>
          <h3>Colombia&rsquo;s unions hold national strike</h3>
          <p>Marches in three cities against the rescue bill.</p>
        </div>
        <div class="tile">
          <svg viewBox="0 0 180 30"><rect width="180" height="30" fill="#22303f"/><path d="M90 15 m-2 0 a10,10 0 1,1 4,0 a7,7 0 1,1 -3,0 a4,4 0 1,1 2,0" stroke="#bfe0f2" stroke-width="2" fill="none"/><circle cx="140" cy="12" r="6" fill="#ffd54f"/><path d="M134 12h12M140 6v12" stroke="#b01e1e" stroke-width="1.5"/></svg>
          <div class="kicker">Evening &middot; Odisha &middot; Storm<span class="tag reported">REPORTED</span></div>
          <h3>Cyclone Akvan nears India&rsquo;s coast</h3>
          <p>200,000 evacuated; landfall near Puri on Friday.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="since"><b>SINCE YESTERDAY</b> &nbsp; <span><b>COP31</b> &mdash; Thursday text drops fossil fuels.</span> <span><b>GTA VI</b> &mdash; Pre-orders yesterday; on sale today.</span> <span><b>Anthropic</b> &mdash; Priced at $83 Wed; trading starts today.</span> <span><b>World Court</b> &mdash; Expected yesterday; guilty today, 9-6.</span></div>
  <div class="bottom">
    <!-- Map: red dots 1–13 mark the leads and tiles above (1 Auckland … 13 Odisha); positions are approximate. -->
    <div class="mapbox">
      <div class="t">WHERE IT HAPPENED</div>
      <svg viewBox="0 0 284 150" width="284" height="150" style="display:block;background:#bcd6e8">
        <g fill="#e8d9a8" stroke="#d5c697" stroke-width="0.6">
          <path d="M18 34 L30 23 L47 20 L58 27 L75 24 L88 34 L102 39 L108 50 L97 59 L91 71 L79 75 L72 88 L61 81 L53 70 L39 69 L34 59 L23 56 L18 46 Z"/>
          <path d="M85 82 L100 78 L112 90 L108 112 L100 128 L92 116 L88 98 L82 90 Z"/>
          <path d="M91 19 L103 12 L115 15 L122 25 L115 34 L100 28 Z"/>
          <path d="M129 42 L137 36 L149 38 L154 45 L147 51 L135 50 Z"/>
          <path d="M140 57 L153 53 L166 61 L171 77 L163 94 L156 110 L147 97 L140 80 L134 68 Z"/>
          <path d="M154 42 L167 34 L183 36 L192 30 L211 34 L226 30 L246 39 L263 50 L270 61 L258 69 L245 65 L235 73 L221 70 L211 79 L198 74 L189 84 L177 77 L164 82 L157 71 L144 66 L147 52 Z"/>
          <path d="M217 107 L228 102 L243 106 L252 115 L244 125 L227 123 L215 115 Z"/>
        </g>
        <!-- Map dots: number -> story location (viewBox 0 0 284 150)
             1 Auckland - GTA VI
             2 The Hague - World Court
             3 Shenzhen - Summit
             4 Seoul - Suneung
             5 Riyadh - Saudis
             6 Jakarta - Indonesia
             7 Greenland - Denmark
             8 Antalya - COP31
             9 New York - Anthropic
             10 Kerch - Ukraine
             11 Gaza - ceasefire
             12 Bogota - Colombia strike
             13 Odisha - Cyclone Akvan -->
        <g font-family="sans-serif" font-size="8" font-weight="bold" text-anchor="middle" dominant-baseline="central">
          <g><circle cx="263" cy="132" r="6" fill="#b01e1e"/><text x="263" y="132" fill="#fff">1</text></g>
          <g><circle cx="145" cy="48" r="6" fill="#b01e1e"/><text x="145" y="48" fill="#fff">2</text></g>
          <g><circle cx="235" cy="61" r="6" fill="#b01e1e"/><text x="235" y="61" fill="#fff">3</text></g>
          <g><circle cx="249" cy="50" r="6" fill="#b01e1e"/><text x="249" y="50" fill="#fff">4</text></g>
          <g><circle cx="176" cy="76" r="6" fill="#b01e1e"/><text x="176" y="76" fill="#fff">5</text></g>
          <g><circle cx="214" cy="98" r="6" fill="#b01e1e"/><text x="214" y="98" fill="#fff">6</text></g>
          <g><circle cx="99" cy="21" r="6" fill="#b01e1e"/><text x="99" y="21" fill="#fff">7</text></g>
          <g><circle cx="157" cy="59" r="6" fill="#b01e1e"/><text x="157" y="59" fill="#fff">8</text></g>
          <g><circle cx="69" cy="54" r="6" fill="#b01e1e"/><text x="69" y="54" fill="#fff">9</text></g>
          <g><circle cx="160" cy="52" r="6" fill="#b01e1e"/><text x="160" y="52" fill="#fff">10</text></g>
          <g><circle cx="158" cy="65" r="6" fill="#b01e1e"/><text x="158" y="65" fill="#fff">11</text></g>
          <g><circle cx="99" cy="91" r="6" fill="#b01e1e"/><text x="99" y="91" fill="#fff">12</text></g>
          <g><circle cx="197" cy="66" r="6" fill="#b01e1e"/><text x="197" y="66" fill="#fff">13</text></g>
        </g>
      </svg>
      <div class="cap">Red numbers mark stories 1&ndash;13 (leads and tiles above). Positions are approximate.</div>
    </div>
    <!-- Also on Thursday: the remaining 27 verified stories of the day, numbered 14–40. -->
    <div class="list">
      <div class="t">ALSO ON THURSDAY 19 NOVEMBER &mdash; 27 MORE STORIES</div>
      <div class="cols">
        <div class="it"><b>14 SHENZHEN</b> &mdash; Xi urges ban on all nuclear arms. <span class="src">Al Jazeera</span></div>
        <div class="it"><b>15 SHENZHEN</b> &mdash; Albanese to Putin: &ldquo;End your war, end it now.&rdquo; <span class="src">ABC</span></div>
        <div class="it"><b>16 SHENZHEN</b> &mdash; APEC leaders adopt the Shenzhen Declaration. <span class="src">AP</span></div>
        <div class="it"><b>17 KRASNODAR</b> &mdash; Kyiv says it hit two oil refineries. <span class="tag claim">CLAIM</span> <span class="src">Euronews</span></div>
        <div class="it"><b>18 HORMUZ</b> &mdash; Iran says mines set 3 tankers ablaze. <span class="tag claim">CLAIM</span> <span class="src">Al Jazeera</span></div>
        <div class="it"><b>19 PARIS</b> &mdash; French left splits over M&eacute;lenchon. <span class="src">AP</span></div>
        <div class="it"><b>20 NAIROBI</b> &mdash; Marathon champion banned for doping, 3 years. <span class="src">ABC</span></div>
        <div class="it"><b>21 CANBERRA</b> &mdash; Australia&rsquo;s jobless rate hits 4.9%. <span class="src">ABC</span></div>
        <div class="it"><b>22 FLORIDA</b> &mdash; Floods shut South Florida schools again. <span class="src">CBS</span></div>
        <div class="it"><b>23 JAZAN</b> &mdash; Saudi Arabia says danger has passed. <span class="src">Reuters</span></div>
        <div class="it"><b>24 SCIENCE</b> &mdash; Earth&rsquo;s missing billion years explained. <span class="src">Nature</span></div>
        <div class="it"><b>25 SPACE</b> &mdash; Red giant seen eating a Sun-sized star. <span class="src">Nature</span></div>
        <div class="it"><b>26 BRUSSELS</b> &mdash; EU delays methane rules two years. <span class="src">Euronews</span></div>
        <div class="it"><b>27 UK</b> &mdash; Inquiry: yacht Bayesian was vulnerable to wind. <span class="src">Euronews</span></div>
        <div class="it"><b>28 ZURICH</b> &mdash; Two rivals to challenge FIFA&rsquo;s Infantino. <span class="src">ABC</span></div>
        <div class="it"><b>29 ROME</b> &mdash; Author Corrado Augias dies at 91. <span class="src">Euronews</span></div>
        <div class="it"><b>30 MOGADISHU</b> &mdash; Somalia expels UAE ambassador. <span class="src">Al Jazeera</span></div>
        <div class="it"><b>31 SUDAN</b> &mdash; Court sentences absent RSF chief to death. <span class="src">AP</span></div>
        <div class="it"><b>32 PRETORIA</b> &mdash; Central bank holds rate at 7.25%. <span class="src">SABC</span></div>
        <div class="it"><b>33 CANARIES</b> &mdash; Record 11,000 migrants in 15 days. <span class="src">Africanews</span></div>
        <div class="it"><b>34 WELLINGTON</b> &mdash; Court: pay equity cuts broke rights law. <span class="src">RNZ</span></div>
        <div class="it"><b>35 TONGA</b> &mdash; Drought emergency takes effect. <span class="src">RNZ</span></div>
        <div class="it"><b>36 COOK ISLANDS</b> &mdash; Cyclone Xavier weakens to category 4. <span class="src">RNZ</span></div>
        <div class="it"><b>37 KYIV</b> &mdash; Zelensky: no talks about Ukraine without Ukraine. <span class="src">ABC</span></div>
        <div class="it"><b>38 PARIS</b> &mdash; IEA: Hormuz crisis is the biggest energy-security threat. <span class="src">ABC</span></div>
        <div class="it"><b>39 DHAKA</b> &mdash; Awami League shutdown shuts parts of Bangladesh. <span class="src">AP</span></div>
        <div class="it"><b>40 SANAA</b> &mdash; Houthi media report Saudi strikes on the capital. <span class="tag claim">CLAIM</span> <span class="src">Al Jazeera</span></div>
      </div>
    </div>
  </div>
  <!-- DATE CHECK: Wednesday stories that were left out, so nothing here is yesterday's news. -->
  <div class="datecheck"><b>DATE CHECK &#10003;</b> &mdash; First reported Wednesday 18 Nov, so NOT on this page as news: the Iranian drone interceptions &middot; the EU&rsquo;s proposed &euro;45bn loan for Ukraine &middot; the House Democrats&rsquo; 251&ndash;11 vote nominating Hakeem Jeffries &middot; Voyager 1 crossing one light-day (10:16 GMT Wed) &middot; Van Gogh&rsquo;s record $190.4m sale &middot; Pew&rsquo;s projection that Islam becomes the largest religion by 2035 &middot; the first COP31 draft (Monday) &middot; Petrola&rsquo;s Alaska win.</div>
  <!-- Sources: every story here happened, or was first reported, on Thursday 19 November 2026. -->
  <div class="sources">Every story here happened, or was first reported, on Thursday 19 November 2026. Claims are attributed, not stated as fact. Sources: Reuters, AP, AFP, BBC, Al Jazeera, UN News, Euronews, ABC, RNZ, Xinhua, Nature. Pictures and map: original, drawn in code.</div>
</div></body></html>`;

function findChromium(): string | null {
  const cands: string[] = [];
  if (process.env.CHROMIUM_PATH) cands.push(process.env.CHROMIUM_PATH);
  const home = process.env.HOME || "";
  try {
    const base = path.join(home, ".cache", "ms-playwright");
    for (const d of fs.readdirSync(base)) {
      if (d.startsWith("chromium-")) {
        cands.push(path.join(base, d, "chrome-linux64", "chrome"));
        cands.push(path.join(base, d, "chrome-linux", "chrome"));
      }
    }
  } catch {
    // no playwright cache
  }
  cands.push("/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable");
  for (const c of cands) {
    try {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
    } catch {
      // ignore
    }
  }
  return null;
}

function validPng(buf: Buffer): boolean {
  if (buf.length < 10240) return false;
  if (buf[0] !== 0x89 || buf[1] !== 0x50 || buf[2] !== 0x4e || buf[3] !== 0x47) return false;
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  return w === 1024 && h === 1024;
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || ".";
  const outFile = path.join(outDir, "entry.png");
  fs.mkdirSync(outDir, { recursive: true });
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const fallback = path.join(scriptDir, "entry.png");

  const chrome = findChromium();
  if (chrome) {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "news19-"));
    const htmlPath = path.join(tmp, "page.html");
    const shot = path.join(tmp, "entry.png");
    fs.writeFileSync(htmlPath, PAGE_HTML);
    try {
      execFileSync(chrome, [
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--hide-scrollbars",
        "--force-device-scale-factor=1",
        "--window-size=1024,1024",
        "--virtual-time-budget=5000",
        `--screenshot=${shot}`,
        `file://${htmlPath}`,
      ], { timeout: 60000, stdio: "ignore" });
      const buf = fs.readFileSync(shot);
      if (validPng(buf)) {
        fs.copyFileSync(shot, outFile);
        console.log(`rendered with ${chrome} -> ${outFile}`);
        return;
      }
      console.log("render produced an invalid PNG, falling back to committed entry.png");
    } catch (e) {
      console.log(`render failed (${e instanceof Error ? e.message : String(e)}), falling back to committed entry.png`);
    }
  } else {
    console.log("no headless Chromium found, falling back to committed entry.png");
  }

  if (!fs.existsSync(fallback)) {
    console.error("no Chromium and no committed entry.png to fall back to");
    process.exit(1);
  }
  fs.copyFileSync(fallback, outFile);
  console.log(`copied committed entry.png -> ${outFile}`);
}

main();
