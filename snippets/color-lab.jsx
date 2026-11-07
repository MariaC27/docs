// Lab: one tinted colour scale for the whole site, taken from the background painting, plus an audit of every colour in use today.
// Read-only research page: nothing here changes the site. Data was generated from the repo on
// 2026-11-03 (style.css minus its lab section, landing.css, docs.json, production snippets, pages).
// Styles in /style.css (.cs-*). Mintlify keeps only the imported export, so everything lives inside ColorLab.

export const ColorLab = () => {
  const DATA = {"scale":[{"step":50,"hex":"#F2FAF8","onWhite":1.06,"onBlack":19.81},{"step":100,"hex":"#E5F2F0","onWhite":1.15,"onBlack":18.29},{"step":200,"hex":"#CFE5E2","onWhite":1.32,"onBlack":15.96},{"step":300,"hex":"#AFD1CD","onWhite":1.64,"onBlack":12.82},{"step":400,"hex":"#8BB6B3","onWhite":2.22,"onBlack":9.44},{"step":500,"hex":"#699A97","onWhite":3.15,"onBlack":6.67},{"step":600,"hex":"#50807E","onWhite":4.44,"onBlack":4.73},{"step":700,"hex":"#3B6666","onWhite":6.41,"onBlack":3.28},{"step":800,"hex":"#2C4F4F","onWhite":8.98,"onBlack":2.34},{"step":900,"hex":"#1B3536","onWhite":13.05,"onBlack":1.61},{"step":950,"hex":"#0C1D1D","onWhite":17.37,"onBlack":1.21},{"step":975,"hex":"#060E0F","onWhite":19.49,"onBlack":1.08}],"rows":[{"hex":"#0B1620","uses":25,"family":"slate blue","files":["style.css","landing.css \u00b7 old river","landing.css \u00b7 painted pond"],"nearest":950,"de":0.03,"role":"Light text, shadows and hairlines everywhere"},{"hex":"#6FE3D6","uses":21,"family":"teal/aqua","files":["style.css","landing.css \u00b7 old river","landing.css \u00b7 painted pond","docs.json"],"nearest":300,"de":0.072,"role":"Dark-mode accent: Mintlify links + active nav (docs.json colors.light), river, ACTIVE badge"},{"hex":"#E8EEF2","uses":16,"family":"neutral","files":["style.css","landing.css \u00b7 old river"],"nearest":100,"de":0.012,"role":"Dark text and dark hairlines"},{"hex":"#FFFFFF","uses":14,"family":"neutral","files":["style.css","landing.css \u00b7 old river","landing.css \u00b7 painted pond"],"nearest":50,"de":0.023,"role":"Surfaces, highlights"},{"hex":"#12A394","uses":12,"family":"teal/aqua","files":["style.css","landing.css \u00b7 old river"],"nearest":500,"de":0.06,"role":"Light-mode water: river, ACTIVE badge fill, pad outlines"},{"hex":"#F4F8F9","uses":10,"family":"neutral","files":["landing.css \u00b7 painted pond"],"nearest":50,"de":0.006,"role":"Painted pond: light text on deep water"},{"hex":"#000000","uses":8,"family":"neutral","files":["style.css","landing.css \u00b7 old river","landing.css \u00b7 painted pond"],"nearest":975,"de":0.156,"role":"Shadows and hover fills"},{"hex":"#0B7469","uses":6,"family":"teal/aqua","files":["style.css","landing.css \u00b7 old river","docs.json"],"nearest":700,"de":0.048,"role":"Brand primary (docs.json), light-mode accent"},{"hex":"#5F6E7B","uses":6,"family":"slate blue","files":["style.css","landing.css \u00b7 old river"],"nearest":600,"de":0.054,"role":"Labels, dates, captions"},{"hex":"#8C99A5","uses":6,"family":"slate blue","files":["style.css","landing.css \u00b7 old river"],"nearest":500,"de":0.051,"role":"Dark labels"},{"hex":"#F3F6F8","uses":5,"family":"neutral","files":["style.css","landing.css \u00b7 old river","docs.json"],"nearest":50,"de":0.01,"role":"Light content panel (docs.json background)"},{"hex":"#06090D","uses":5,"family":"neutral","files":["style.css","landing.css \u00b7 old river","docs.json"],"nearest":975,"de":0.02,"role":"Dark content panel (docs.json background)"},{"hex":"#A35A12","uses":4,"family":"warm","files":["style.css","landing.css \u00b7 old river"],"nearest":600,"de":0.165,"role":"FLUENT badge (light)"},{"hex":"#E9A458","uses":4,"family":"warm","files":["style.css","landing.css \u00b7 old river"],"nearest":400,"de":0.156,"role":"FLUENT badge (dark)"},{"hex":"#0B1118","uses":4,"family":"slate blue","files":["style.css","landing.css \u00b7 old river"],"nearest":975,"de":0.023,"role":"Dark surfaces"},{"hex":"#4A5866","uses":3,"family":"slate blue","files":["style.css","landing.css \u00b7 old river"],"nearest":700,"de":0.046,"role":"Muted text, FAMILIAR badge"},{"hex":"#A9B5BF","uses":3,"family":"slate blue","files":["style.css","landing.css \u00b7 old river"],"nearest":400,"de":0.044,"role":"Dark muted text"},{"hex":"#C6E3DC","uses":3,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":200,"de":0.015,"role":"Painted pond: light ground"},{"hex":"#2C4A4D","uses":3,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":800,"de":0.016,"role":"Painted pond: dark ground"},{"hex":"#061416","uses":3,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":975,"de":0.025,"role":""},{"hex":"#BDDED6","uses":3,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":200,"de":0.033,"role":"Painted pond: light ground (current)"},{"hex":"#EAF0F3","uses":2,"family":"neutral","files":["style.css","landing.css \u00b7 old river"],"nearest":100,"de":0.01,"role":"Light chrome around the content panel"},{"hex":"#080C11","uses":2,"family":"neutral","files":["style.css","landing.css \u00b7 old river"],"nearest":975,"de":0.011,"role":"Dark chrome"},{"hex":"#EEF8F6","uses":2,"family":"neutral","files":["style.css","landing.css \u00b7 old river"],"nearest":50,"de":0.008,"role":""},{"hex":"#CFE9E4","uses":2,"family":"teal/aqua","files":["style.css","landing.css \u00b7 old river"],"nearest":200,"de":0.01,"role":""},{"hex":"#133532","uses":2,"family":"teal/aqua","files":["style.css","landing.css \u00b7 old river"],"nearest":900,"de":0.012,"role":""},{"hex":"#08171A","uses":2,"family":"teal/aqua","files":["style.css","landing.css \u00b7 old river"],"nearest":950,"de":0.024,"role":""},{"hex":"#96B9D7","uses":2,"family":"slate blue","files":["landing.css \u00b7 old river"],"nearest":400,"de":0.054,"role":"Old hero wash"},{"hex":"#0B2824","uses":2,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":950,"de":0.04,"role":""},{"hex":"#0A1E14","uses":2,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":950,"de":0.02,"role":""},{"hex":"#0F1720","uses":1,"family":"slate blue","files":["style.css"],"nearest":950,"de":0.026,"role":""},{"hex":"#DCE6EC","uses":1,"family":"neutral","files":["landing.css \u00b7 old river"],"nearest":200,"de":0.023,"role":""},{"hex":"#33424F","uses":1,"family":"slate blue","files":["landing.css \u00b7 old river"],"nearest":800,"de":0.043,"role":""},{"hex":"#E6EDF1","uses":1,"family":"neutral","files":["landing.css \u00b7 old river"],"nearest":100,"de":0.014,"role":""},{"hex":"#1C2630","uses":1,"family":"slate blue","files":["landing.css \u00b7 old river"],"nearest":900,"de":0.051,"role":""},{"hex":"#C9D2DA","uses":1,"family":"neutral","files":["landing.css \u00b7 old river"],"nearest":300,"de":0.04,"role":""},{"hex":"#0A0D10","uses":1,"family":"neutral","files":["landing.css \u00b7 old river"],"nearest":975,"de":0.009,"role":""},{"hex":"#DCEFEB","uses":1,"family":"teal/aqua","files":["landing.css \u00b7 old river"],"nearest":100,"de":0.016,"role":""},{"hex":"#D8C67A","uses":1,"family":"warm","files":["landing.css \u00b7 old river"],"nearest":300,"de":0.106,"role":"Old lotus heart"},{"hex":"#E9F4F2","uses":1,"family":"neutral","files":["landing.css \u00b7 old river"],"nearest":100,"de":0.008,"role":""},{"hex":"#8FC3BA","uses":1,"family":"teal/aqua","files":["landing.css \u00b7 old river"],"nearest":400,"de":0.036,"role":""},{"hex":"#CDBB6E","uses":1,"family":"warm","files":["landing.css \u00b7 old river"],"nearest":300,"de":0.116,"role":"Old lotus heart (dark)"},{"hex":"#3B6FD8","uses":1,"family":"slate blue","files":["landing.css \u00b7 old river"],"nearest":600,"de":0.161,"role":"API \"POST\" method label"},{"hex":"#8FB0F5","uses":1,"family":"slate blue","files":["landing.css \u00b7 old river"],"nearest":400,"de":0.104,"role":"API \"POST\" method label (dark)"},{"hex":"#ADD7CE","uses":1,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":300,"de":0.016,"role":""},{"hex":"#B5D8D0","uses":1,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":300,"de":0.021,"role":""},{"hex":"#F4FAF8","uses":1,"family":"neutral","files":["landing.css \u00b7 painted pond"],"nearest":50,"de":0.003,"role":""},{"hex":"#A9D0C7","uses":1,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":300,"de":0.012,"role":""},{"hex":"#2E4448","uses":1,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":800,"de":0.035,"role":""},{"hex":"#3F575B","uses":1,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":800,"de":0.04,"role":""},{"hex":"#22363A","uses":1,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":900,"de":0.012,"role":""},{"hex":"#0E8073","uses":1,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":600,"de":0.05,"role":"Painted pond: light river"},{"hex":"#0B6157","uses":1,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":700,"de":0.047,"role":"Painted pond: light buttons"},{"hex":"#DDEEEA","uses":1,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":100,"de":0.016,"role":""},{"hex":"#233E41","uses":1,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":900,"de":0.035,"role":""},{"hex":"#1F383B","uses":1,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":900,"de":0.014,"role":""},{"hex":"#35575A","uses":1,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":800,"de":0.031,"role":""},{"hex":"#CFEFEA","uses":1,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":200,"de":0.025,"role":"Painted pond: dark buttons"},{"hex":"#0B3F3A","uses":1,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":900,"de":0.034,"role":""},{"hex":"#24403F","uses":1,"family":"teal/aqua","files":["landing.css \u00b7 painted pond"],"nearest":900,"de":0.041,"role":""},{"hex":"#FBFAF4","uses":1,"family":"neutral","files":["landing.css \u00b7 painted pond"],"nearest":50,"de":0.012,"role":""}]};
  const SCALE = DATA.scale;
  const ROWS = DATA.rows;
  const step = (n) => SCALE.find((s) => s.step === n).hex;

  // WCAG contrast, computed live so the role table stays honest if the scale changes
  const lum = (hex) => {
    const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const ink = (hex) => (lum(hex) > 0.3 ? step(975) : step(50));

  const FAMILY = {
    'slate blue': { label: 'Slate blue', note: 'The old neutrals. Hue ~245°, the source of the blue cast on inner pages.' },
    'teal/aqua': { label: 'Teal / aqua', note: 'Already the brand family, but at many different saturations.' },
    neutral: { label: 'Neutral', note: 'White, black and near-greys with almost no tint.' },
    warm: { label: 'Warm', note: 'Amber badges and the old lotus gold.' },
  };
  const status = (de) => (de < 0.03 ? ['on', 'On the scale'] : de < 0.06 ? ['near', 'Close'] : ['off', 'Off the scale']);

  // Proposed roles: which step each job uses, in each mode
  const ROLES = [
    { role: 'Page background', where: 'Content panel, homepage center', light: 50, dark: 975 },
    { role: 'Chrome', where: 'Sidebar, rail, the frame around the content panel', light: 100, dark: 950 },
    { role: 'Surface', where: 'Cards, chat panel, polaroids, code blocks', light: 50, dark: 950, note: 'Separated from the page by a border and shadow, not a different fill' },
    { role: 'Subtle fill', where: 'Hover rows, badge fills, selected tab', light: 100, dark: 900 },
    { role: 'Border', where: 'Hairlines, card edges, dividers', light: 200, dark: 900 },
    { role: 'Strong border', where: 'Inputs, focused cards', light: 300, dark: 800 },
    { role: 'Water', where: 'The river, ripples, pad outlines', light: 600, dark: 400, note: 'Replaces the neon #6FE3D6 / #12A394', check: true },
    { role: 'Accent', where: 'Links, buttons, active nav, ACTIVE badge', light: 700, dark: 300, check: true },
    { role: 'Accent hover', where: 'Pressed and hovered accent', light: 800, dark: 200, check: true },
    { role: 'Muted text', where: 'Dates, labels, captions, slugs', light: 800, dark: 400, check: true },
    { role: 'Body text', where: 'Paragraphs, descriptions', light: 900, dark: 200, check: true },
    { role: 'Headings', where: 'Titles, my name', light: 950, dark: 50, check: true },
  ];
  const bg = { light: 50, dark: 975 };

  const [filter, setFilter] = useState('all');
  const shown = ROWS.filter((r) => filter === 'all' || r.family === filter || (filter === 'off' && r.de >= 0.06));
  const totalUses = ROWS.reduce((n, r) => n + r.uses, 0);
  const famUses = Object.keys(FAMILY).map((f) => [f, ROWS.filter((r) => r.family === f).reduce((n, r) => n + r.uses, 0)]);
  const counts = ROWS.reduce((c, r) => { c[status(r.de)[0]] += 1; return c; }, { on: 0, near: 0, off: 0 });

  // a small inner-page mock painted only with scale steps, per mode
  const mock = (mode) => {
    const r = Object.fromEntries(ROLES.map((x) => [x.role, step(x[mode])]));
    return (
      <div className="cs-mock" style={{ background: r.Chrome, borderColor: r.Border }}>
        <div className="cs-mock-side" style={{ color: r['Muted text'] }}>
          <div className="cs-mock-group">About</div>
          <div style={{ color: r.Accent, background: r['Subtle fill'] }} className="cs-mock-item">Skills</div>
          <div className="cs-mock-item">Changelog</div>
          <div className="cs-mock-group">Case studies</div>
          <div className="cs-mock-item">ApiLens</div>
        </div>
        <div className="cs-mock-page" style={{ background: r['Page background'], color: r['Body text'] }}>
          <div className="cs-mock-eyebrow" style={{ color: r['Muted text'] }}>Case studies</div>
          <div className="cs-mock-h1" style={{ color: r.Headings }}>ApiLens</div>
          <p style={{ margin: '8px 0 14px', color: r['Body text'] }}>A versioning and visual diff tool for OpenAPI specs. <span style={{ color: r.Accent, textDecoration: 'underline' }}>Read the code</span>.</p>
          <div className="cs-mock-card" style={{ background: r.Surface, borderColor: r.Border }}>
            <span className="cs-mock-badge" style={{ color: r.Accent, background: r['Subtle fill'], borderColor: r['Strong border'] }}>ACTIVE</span>
            <span style={{ color: r['Muted text'], fontSize: 12.5 }}>last_used · 2026</span>
            <svg viewBox="0 0 200 40" className="cs-mock-river" aria-hidden="true">
              <path d="M0,20 C40,0 60,40 100,20 S160,0 200,20" fill="none" stroke={r.Water} strokeWidth="2.5" />
            </svg>
          </div>
          <span className="cs-mock-btn" style={{ background: r.Accent, color: ink(r.Accent) }}>Contact</span>
        </div>
      </div>
    );
  };

  return (
    <div className="cs">
      <h2>The scale</h2>
      <p>Built from the background painting rather than the old brand teal. The painting is soft and grey-green: its colors never get more saturated than about 0.055 (OKLCH chroma), and its hue drifts from aqua in the sunlit water to a bluer green in the deep water. The scale does the same: even lightness steps, low saturation that peaks in the middle, and a hue that moves from 184° at the light end to 200° at the dark end. Two steps are the painting itself: <strong>300 is the sunlit water</strong> (<code>#ADD7CE</code>) and <strong>800 is the deep water</strong> (<code>#2C4A4D</code>). Step 700, <code>#3B6666</code>, is the new brand accent.</p>
      <div className="cs-scale">
        {SCALE.map((s) => (
          <div key={s.step} className={`cs-chip${s.step === 700 ? ' cs-base' : ''}`}>
            <div className="cs-chip-fill" style={{ background: s.hex, color: ink(s.hex) }}>
              <span>{s.step}</span>{s.step === 700 && <em>accent</em>}{s.step === 300 && <em>sunlit water</em>}{s.step === 800 && <em>deep water</em>}
            </div>
            <div className="cs-chip-meta">
              <code>{s.hex}</code>
              <span title="Contrast against white / against black">{s.onWhite.toFixed(1)} · {s.onBlack.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="cs-fine">Numbers under each swatch: contrast against white, then against black. 4.5 is the minimum for body text, 3 for large text and graphics.</p>

      <h2>Audit: what was in use</h2>
      <p className="cs-fine">A snapshot from before the cyan was removed (November 3), measured against the pond scale.</p>
      <div className="cs-stats">
        <div><strong>{ROWS.length}</strong><span>different colors</span></div>
        <div><strong>{totalUses}</strong><span>places they're used</span></div>
        <div><strong>{counts.on}</strong><span>already on the scale</span></div>
        <div><strong>{counts.off}</strong><span>far off it</span></div>
      </div>
      <div className="cs-bar" aria-label="Uses by color family">
        {famUses.map(([f, n]) => (
          <span key={f} className={`cs-bar-${f.replace(/[^a-z]/g, '')}`} style={{ flexGrow: n }} title={`${FAMILY[f].label}: ${n} uses`}>{FAMILY[f].label} · {n}</span>
        ))}
      </div>

      <h3>Findings</h3>
      <ol>
        <li><strong>The neutrals are blue, not teal.</strong> Every grey for text, labels, borders and shadows (<code>#0B1620</code>, <code>#5F6E7B</code>, <code>#4A5866</code>, <code>#8C99A5</code>, <code>#A9B5BF</code>, <code>#E8EEF2</code>) has a slate-blue hue around 245°, while the brand and the painted pond sit around 180–200°. That's the cool, separate feel of the inner pages: {famUses.find((f) => f[0] === 'slate blue')[1]} uses.</li>
        <li><strong>The bright cyan came from Mintlify's theme.</strong> <em>Removed November 3: every use now points at pond steps 300–700.</em> <code>docs.json</code> sets <code>colors.light: #6FE3D6</code>, which Mintlify uses in dark mode for every link, the active sidebar item, focus rings and highlights. The same neon also draws the homepage river in dark mode, the dark ACTIVE badge and the overview pad rims. It's about three times as saturated as anything in the painting (OKLCH chroma 0.107 vs 0.036 at step 300).</li>
        <li><strong>The homepage has two palettes stacked.</strong> <code>landing.css</code> still defines the original river tokens (36 colors), then the painted-pond block overrides almost all of them. The old ones are dead code, which makes it hard to tell which colors are real.</li>
        <li><strong>The painted-pond colors were picked one by one.</strong> 28 hand-chosen values, but nearly all within a small step of the scale, so they snap cleanly.</li>
        <li><strong>Inner pages and the homepage don't share variables.</strong> Inner pages use Mintlify's <code>--primary</code> plus hard-coded hexes in <code>style.css</code>; the homepage uses its own <code>--rv-*</code> tokens. The same role (e.g. muted text) has 4 different values across them.</li>
        <li><strong>A few colors sit outside any system:</strong> the amber FLUENT badge, the blue API <code>POST</code> label, and pure black shadows.</li>
      </ol>

      <h2>Proposed roles</h2>
      <p>One step per job, in each mode. The contrast column checks each text and accent role against that mode's page background.</p>
      <div className="cs-table-wrap">
        <table className="cs-table">
          <thead><tr><th>Role</th><th>Used for</th><th>Light</th><th>Dark</th></tr></thead>
          <tbody>
            {ROLES.map((r) => (
              <tr key={r.role}>
                <td><strong>{r.role}</strong>{r.note && <div className="cs-fine">{r.note}</div>}</td>
                <td>{r.where}</td>
                {['light', 'dark'].map((m) => {
                  const c = ratio(step(r[m]), step(bg[m]));
                  return (
                    <td key={m}>
                      <span className="cs-dot" style={{ background: step(r[m]) }} />
                      <span className="cs-step">{r[m]}</span>
                      {r.check && <span className={`cs-ratio ${c >= 4.5 ? 'cs-pass' : c >= 3 ? 'cs-large' : 'cs-fail'}`}>{c.toFixed(1)}</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cs-mocks">
        <figure>{mock('light')}<figcaption>Inner page, light</figcaption></figure>
        <figure>{mock('dark')}<figcaption>Inner page, dark</figcaption></figure>
      </div>
      <p>The homepage keeps its painting. Its flat colors already sit on the scale: the light center is close to 200 (today <code>#BDDED6</code>) and the dark ground is 800, the deep water (today <code>#2C4A4D</code>, a near-exact match). Once both share these variables, a change in one place updates both.</p>

      <h3>Kept outside the scale on purpose</h3>
      <ul>
        <li><strong>The painting and the watercolor pads and lotuses,</strong> including their pink and gold. They're artwork, not UI.</li>
        <li><strong>One warm accent:</strong> the amber FLUENT badge. Either keep it as the single warm note (and give it its own short scale) or move FLUENT onto teal step 500 and let the three badges differ by strength instead of hue.</li>
        <li><strong>API method colors</strong> (GET, POST…), if they're meant to read as code. Otherwise POST's blue moves onto the scale too.</li>
      </ul>

      <h2>Every color in use</h2>
      <div className="cs-filters" role="group" aria-label="Filter colors">
        {[['all', 'All'], ['slate blue', 'Slate blue'], ['teal/aqua', 'Teal / aqua'], ['neutral', 'Neutral'], ['warm', 'Warm'], ['off', 'Off the scale']].map(([k, l]) => (
          <button key={k} type="button" className={filter === k ? 'cs-on' : undefined} aria-pressed={filter === k} onClick={() => setFilter(k)}>{l}</button>
        ))}
      </div>
      <div className="cs-table-wrap">
        <table className="cs-table">
          <thead><tr><th>Color</th><th>Uses</th><th>Role today</th><th>Where</th><th>Nearest step</th></tr></thead>
          <tbody>
            {shown.map((r) => {
              const [k, label] = status(r.de);
              return (
                <tr key={r.hex}>
                  <td><span className="cs-dot" style={{ background: r.hex }} /><code>{r.hex}</code><div className="cs-fine">{FAMILY[r.family].label}</div></td>
                  <td>{r.uses}</td>
                  <td>{r.role || <span className="cs-fine">one-off</span>}</td>
                  <td className="cs-fine">{r.files.join(', ')}</td>
                  <td><span className="cs-dot" style={{ background: step(r.nearest) }} /><span className="cs-step">{r.nearest}</span><span className={`cs-status cs-${k}`}>{label}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="cs-fine">Counted from style.css (minus the lab styles), landing.css, docs.json, the homepage and overview snippets, and every non-lab page. Transparent versions of a color (like <code>rgba(18, 163, 148, .1)</code>) count as that color. "Close" and "off" use the distance between colors in OKLab: under 0.03 is a match, over 0.06 is visibly different.</p>

      <h2>Suggested order of changes</h2>
      <ol>
        <li>Define the 12 steps once, as shared CSS variables, and map each role above to a step.</li>
        <li><s>Remove the cyan</s>: done. <code>docs.json</code> now uses <code>primary</code> 700 and <code>light</code> 300, and the river, badges and overview pads use steps 300–700. Still to do: point the <code>docs.json</code> backgrounds at 50 / 975.</li>
        <li>Swap the slate-blue greys in <code>style.css</code> for the role variables.</li>
        <li>Delete the dead river tokens in <code>landing.css</code> and point the painted-pond tokens at the same variables.</li>
        <li>Update the design system page in this lab to match.</li>
      </ol>
    </div>
  );
};
