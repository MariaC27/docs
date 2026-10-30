// Lab: type pairings for the site, each shown on the same real content (hero + a river stop + a pad label).
// Fonts load from Google Fonts only on this page. Fonts are set inline, and class names avoid "mono" and
// "content" because style.css forces Geist Mono / Instrument Serif on those with !important.
// Mintlify keeps only the imported export from a snippet, so everything lives inside FontLab.

export const FontLab = () => {
  const PAIRS = [
    { key: 'current', name: 'Current', display: 'Instrument Serif', body: 'Geist', code: 'Geist Mono',
      note: 'Baseline. A narrow, high-contrast serif with one weight, a neutral modern sans and its matching mono.' },
    { key: 'fraunces', name: 'Soft and warm', display: 'Fraunces', body: 'Inter', code: 'JetBrains Mono',
      note: 'Fraunces has rounded, slightly wonky curves that feel hand-made, a better match for a painterly pond. Inter is the safest body face there is.' },
    { key: 'cormorant', name: 'Elegant', display: 'Cormorant Garamond', body: 'Karla', code: 'IBM Plex Mono',
      note: 'A delicate, calligraphic display serif. The most "lotus" of the set, but thin strokes get fragile at small sizes and on busy backgrounds.' },
    { key: 'newsreader', name: 'Editorial', display: 'Newsreader', body: 'Geist', code: 'Geist Mono',
      note: 'Keeps Geist, swaps the headline for a sturdier book serif. Reads more like a well-set magazine, less like a fashion title.' },
    { key: 'dm', name: 'One family', display: 'DM Serif Display', body: 'DM Sans', code: 'DM Mono',
      note: 'A matched superfamily, so serif, sans and mono share proportions. Friendly and cohesive, a little more common.' },
    { key: 'playfair', name: 'High contrast', display: 'Playfair Display', body: 'Work Sans', code: 'Space Mono',
      note: 'Bold contrast and a quirky mono. More personality and more drama; risks feeling like a wedding invitation.' },
    { key: 'garamond', name: 'Classic book', display: 'EB Garamond', body: 'Manrope', code: 'Fragment Mono',
      note: 'An old-style Garamond against a geometric sans. Quiet and literary; the italic is lovely for the name.' },
    { key: 'gloock', name: 'Chunky serif', display: 'Gloock', body: 'Instrument Sans', code: 'Geist Mono',
      note: 'A heavy, ink-trap display serif with a lot of presence. Upright only, so no italic name.', noItalic: true },
    { key: 'geist', name: 'All sans', display: 'Geist', body: 'Geist', code: 'Geist Mono', displayWeight: 500, displayTrack: '-0.03em',
      note: 'No serif at all: tight, medium-weight Geist headlines. The most "product" option; loses the softness the pond gives.', noItalic: true },
  ];

  // load every family once, only on this page
  useEffect(() => {
    if (document.getElementById('font-lab-fonts')) return;
    const fams = [
      'Fraunces:ital,wght@0,400;1,400', 'Inter:wght@400;500', 'JetBrains+Mono:wght@400;500',
      'Cormorant+Garamond:ital,wght@0,500;1,500', 'Karla:wght@400;500', 'IBM+Plex+Mono:wght@400;500',
      'Newsreader:ital,wght@0,400;1,400', 'DM+Serif+Display:ital@0;1', 'DM+Sans:wght@400;500', 'DM+Mono:wght@400;500',
      'Playfair+Display:ital,wght@0,400;1,400', 'Work+Sans:wght@400;500', 'Space+Mono',
      'EB+Garamond:ital,wght@0,400;1,400', 'Manrope:wght@400;500', 'Fragment+Mono',
      'Gloock', 'Instrument+Sans:wght@400;500',
    ];
    const link = document.createElement('link');
    link.id = 'font-lab-fonts';
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${fams.map((f) => `family=${f}`).join('&')}&display=swap`;
    document.head.appendChild(link);
  }, []);

  const [name, setName] = useState('Maria Cristoforo');
  const [dark, setDark] = useState(false);

  const ink = dark ? '#E8EEF2' : '#0B1620';
  const soft = dark ? '#A9B5BF' : '#4A5866';
  const label = dark ? '#8C99A5' : '#5F6E7B';
  const water = dark ? '#6FE3D6' : '#12A394';
  const fam = (f, fallback) => `'${f}', ${fallback}`;

  return (
    <div className="fl">
      <div className="fl-controls">
        <label className="fl-field">
          <span>Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button type="button" className="fl-toggle" onClick={() => setDark(!dark)}>{dark ? 'Light' : 'Dark'} preview</button>
      </div>

      {PAIRS.map((p, n) => {
        const disp = fam(p.display, 'serif');
        const body = fam(p.body, 'sans-serif');
        const code = fam(p.code, 'monospace');
        const head = { fontFamily: disp, fontWeight: p.displayWeight || 400, letterSpacing: p.displayTrack || 'normal', color: ink };
        return (
          <section key={p.key} className="hp-slide">
            <header className="hp-slide-head">
              <span className="hp-num">{String(n + 1).padStart(2, '0')}</span>
              <div>
                <h2>{p.name}</h2>
                <p>{p.note}</p>
                <div className="fl-specs">
                  <span>Display · {p.display}</span><span>Body · {p.body}</span><span>Code · {p.code}</span>
                </div>
              </div>
            </header>
            <div className="fl-card" style={{ background: dark ? '#06090D' : '#F3F6F8', borderColor: dark ? 'rgba(255,255,255,.08)' : undefined }}>
              <div className="fl-hero">
                <div style={{ ...head, fontStyle: p.noItalic ? 'normal' : 'italic', fontSize: 64, lineHeight: 1 }}>{name}</div>
                <div style={{ fontFamily: body, fontSize: 19, color: ink, marginTop: 12 }}>thinks like a designer, executes like an engineer</div>
                <div style={{ fontFamily: code, fontSize: 11.5, letterSpacing: '.12em', textTransform: 'uppercase', color: label, marginTop: 12 }}>
                  Design Engineer at Ocular AI (YC W24) <span style={{ color: water }}>•</span> San Francisco, CA
                </div>
                <div className="fl-pads">
                  {['Skills', 'Writing', 'Case Studies'].map((t) => (
                    <span key={t} className="fl-pad" style={{ ...head, fontSize: 24, background: dark ? 'linear-gradient(160deg,#133532,#08171A)' : undefined, borderColor: dark ? 'rgba(111,227,214,.3)' : undefined }}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="fl-stop" style={{ borderColor: dark ? 'rgba(111,227,214,.35)' : undefined }}>
                <div style={{ ...head, fontSize: 34, lineHeight: 1.05 }}>Ocular AI</div>
                <div style={{ fontFamily: body, fontSize: 16, fontWeight: 500, color: soft, marginTop: 4 }}>Founding Design Engineer</div>
                <div style={{ fontFamily: code, fontSize: 11.5, letterSpacing: '.1em', textTransform: 'uppercase', color: water, marginTop: 10 }}>Jan 2025 – Now</div>
                <div style={{ fontFamily: body, fontSize: 15.5, lineHeight: 1.6, color: soft, marginTop: 12 }}>
                  Operate at the intersection of product design and software engineering on a small, fast-paced team, taking features from initial concept to full implementation.
                </div>
                <div style={{ fontFamily: code, fontSize: 13, color: soft, marginTop: 16 }}>
                  <span style={{ color: water }}>POST</span> /ask
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};
