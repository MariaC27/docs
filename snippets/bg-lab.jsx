// Lab: background treatments for the homepage hero, all on the same simplified first screen
// (pads, name, CTA), using only the watercolor pad and lotus assets. Each option is a fixed 1280×720 stage scaled to fit, like the layout prototypes.
// The painting is /images/lab/pond-open.jpg. Styles in /style.css (.hp-*, .bl-*).
// Mintlify keeps only the imported export from a snippet, so everything lives inside BgLab.

export const BgLab = () => {
  const W = 1280;
  // two candidate paintings; the switcher at the top applies one to every option.
  // pad: where the painting's own lily pad sits (stage coords), so the hero photo can rest on it
  const BGS = [
    { key: 'open-2', label: 'Pond 2', src: '/images/lab/pond-open-2.jpg', pad: { x: 200, y: 586 },
      alt: 'Painting of a pond with an open channel of water, one lily pad bottom-left and pink lotuses at the edges' },
    { key: 'open', label: 'Pond 1', src: '/images/lab/pond-open.jpg', pad: { x: 151, y: 553 },
      alt: 'Painting of a pond with an open channel of water, lily pads and pink lotuses along both sides' },
  ];
  const [bgKey, setBgKey] = useState(BGS[0].key);
  const BG = BGS.find((b) => b.key === bgKey) || BGS[0];
  const IMG = `url('${BG.src}')`;

  const frames = useRef([]);
  useEffect(() => {
    const fit = () => frames.current.forEach((f) => { if (f) f.style.setProperty('--hp-s', String(f.clientWidth / W)); });
    fit();
    const ro = window.ResizeObserver ? new ResizeObserver(fit) : null;
    frames.current.forEach((f) => f && ro && ro.observe(f));
    window.addEventListener('resize', fit);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', fit); };
  }, []);

  // watercolor assets (cut from images/lab/assets-sheet-src.png): a lily pad and a lotus, both transparent PNGs
  const PAD_IMG = "url('/images/lab/lily-pad.png')", LOTUS_IMG = "url('/images/lab/lotus.png')";
  const WPADS = [
    { x: 360, y: 190, w: 220, title: 'Skills', rot: -6 },
    { x: 760, y: 140, w: 200, title: 'Writing', rot: 8, flip: true },
    { x: 1020, y: 290, w: 220, title: 'Case Studies', rot: -3 },
    { x: 560, y: 360, w: 200, title: 'About Me', rot: 5, flip: true },
    { x: 860, y: 450, w: 180, title: 'API', rot: -9 },
  ];
  const LOTUSES = [{ x: 470, y: 250, w: 74 }, { x: 1110, y: 360, w: 62 }, { x: 260, y: 420, w: 54 }];
  // a watercolor pad centred at (x, y); labels stay upright while the leaf turns
  const wpad = ({ x, y, w, title, rot = 0, flip = false }, label = 'light') => (
    <div key={title} className="bl-wpad" style={{ left: x - w / 2, top: y - w * 0.33, width: w, height: w * 0.664 }}>
      <span className="bl-wpad-leaf" style={{ backgroundImage: PAD_IMG, transform: `rotate(${rot}deg) scaleX(${flip ? -1 : 1})` }} />
      <span className={`bl-wpad-label bl-wpad-${label}`}>{title}</span>
    </div>
  );
  const wlotus = ({ x, y, w }, i) => <span key={`l${i}`} className="bl-wlotus" style={{ left: x - w / 2, top: y - w * 0.42, width: w, height: w * 0.84, backgroundImage: LOTUS_IMG }} />;
  const wpads = (label) => WPADS.map((p) => wpad(p, label));
  const wlotuses = () => LOTUSES.map(wlotus);

  // ── hero text ──
  const hero = (ink, { x = 96, y = 540, center = false } = {}) => {
    const light = ink === 'light';
    const c = light ? '#F4F8F9' : '#0B1620', l = light ? 'rgba(244,248,249,.82)' : '#5F6E7B';
    const shadow = light ? '0 1px 18px rgba(0,0,0,.35)' : 'none';
    return (
      <div className="bl-hero" style={{ left: center ? 0 : x, right: center ? 0 : 'auto', top: y, textAlign: center ? 'center' : 'left', alignItems: center ? 'center' : 'flex-start', textShadow: shadow }}>
        <div className="bl-hero-row" style={{ justifyContent: center ? 'center' : 'flex-start' }}>
          {!center && <span className="hp-photo bl-photo" style={{ backgroundImage: "url('/images/mc.jpg')" }} />}
          <div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 66, lineHeight: 1, color: c }}>Maria Cristoforo</div>
            <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 19, marginTop: 10, color: c }}>thinks like a designer, executes like an engineer</div>
            <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11.5, letterSpacing: '.12em', textTransform: 'uppercase', marginTop: 10, color: l }}>
              Design Engineer at Ocular AI (YC W24) <span style={{ color: light ? '#6FE3D6' : '#12A394' }}>•</span> San Francisco, CA
            </div>
          </div>
        </div>
      </div>
    );
  };
  const cta = (light, pos = { right: 96, top: 560 }) => (
    <span className="bl-cta" style={{ ...pos, background: light ? '#E8F7F4' : '#0B7469', color: light ? '#0B4F48' : '#fff' }}>Contact</span>
  );
  const layer = (style, key) => <div key={key} className="bl-layer" style={style} />;
  const photo = (extra = {}) => ({ backgroundImage: IMG, backgroundSize: 'cover', backgroundPosition: 'center', ...extra });

  // the painting has one painted lily pad, bottom-left; at x=142, y=505 the hero photo rests on it
  const ON_PAD = { x: BG.pad.x - 58, y: BG.pad.y - 81 };
  const photoOnPad = () => <span key="ph" className="hp-photo bl-photo bl-photo-abs" style={{ left: BG.pad.x - 58, top: BG.pad.y - 58, backgroundImage: "url('/images/mc.jpg')" }} />;
  const plain = 'radial-gradient(60% 50% at 50% 70%, rgba(18,163,148,.07), transparent 70%), #F3F6F8';

  // the top of the career path below the hero: tabs, the river, and the first stop
  const riverStart = ({ ink, river }) => {
    const light = ink === 'light';
    const c = light ? '#F4F8F9' : '#0B1620', soft = light ? 'rgba(244,248,249,.78)' : '#33424F';
    return (
      <>
        <div key="tabs" className="bl-tabs" style={{ color: soft }}><span style={{ color: c, borderColor: river }}>Career path</span><span>Projects ↓</span></div>
        <svg key="river" className="bl-river" viewBox="0 0 1280 1000" aria-hidden="true">
          <path d="M640,790 C690,840 690,880 660,920 C630,960 630,985 660,1000" stroke={river} strokeOpacity=".2" strokeWidth="14" fill="none" />
          <path d="M640,790 C690,840 690,880 660,920 C630,960 630,985 660,1000" stroke={river} strokeWidth="2.2" fill="none" />
        </svg>
        {wlotus({ x: 676, y: 868, w: 46 }, 'stop')}
        <div key="stop" className="bl-stop" style={{ color: c }}>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, lineHeight: 1 }}>Ocular AI</div>
          <div style={{ fontSize: 15, fontWeight: 500, color: soft, marginTop: 4 }}>Founding Design Engineer</div>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: river, marginTop: 8 }}>Jan 2025 – Now</div>
        </div>
      </>
    );
  };

  const OPTIONS = [
    {
      key: 'assets-flat', name: 'Watercolor assets, plain ground',
      note: 'No painting: the watercolor pads and lotuses on the current ground. The safest step, and it shows whether the painted assets hold up on their own.',
      body: () => (<>{layer({ background: plain }, 'g')}{wpads('light')}{wlotuses()}{hero('dark')}{cta()}</>),
    },
    {
      key: 'painting', name: 'Painting, photo on the painted pad',
      note: 'The full painting with the watercolor section pads. My photo rests on the one lily pad that\'s painted into the scene, so the hero sits in the picture instead of on top of it.',
      body: () => (<>{layer(photo(), 'p')}{wpads('light')}{wlotuses()}{hero('light', ON_PAD)}{cta(true)}</>),
    },
    {
      key: 'centered', name: 'Name in the open water',
      note: 'My name centered in the painting\'s open channel, with the pads around it and my photo on the painted pad. The most immersive layout.',
      body: () => (<>
        {layer(photo(), 'p')}
        {[{ x: 330, y: 170, w: 200, title: 'Skills', rot: -6 }, { x: 980, y: 150, w: 190, title: 'Writing', rot: 7, flip: true },
          { x: 1090, y: 520, w: 210, title: 'Case Studies', rot: -4 }, { x: 480, y: 600, w: 190, title: 'About Me', rot: 4, flip: true },
          { x: 800, y: 620, w: 160, title: 'API', rot: -8 }].map((p) => wpad(p, 'light'))}
        {[{ x: 1180, y: 330, w: 60 }, { x: 600, y: 150, w: 54 }].map(wlotus)}
        {photoOnPad()}
        {hero('light', { y: 270, center: true })}
        {cta(true, { left: 590, top: 450 })}
      </>),
    },
    // #4 in three ground colors sampled from the painting's water, each in a taller frame that runs
    // into the start of the career path, to check the hero can fade into the river section.
    ...[
      { key: 'frame-sage', name: 'Painting around the edges: sage mist', ground: '#A7BFBC', ink: 'dark', river: '#0B7469',
        note: 'The center opens onto a soft grey-green taken from the painting\'s lightest water. Still light enough for dark text, but no longer bright white.' },
      { key: 'frame-water', name: 'Painting around the edges: pond water', ground: '#4F7C80', ink: 'light', river: '#BDEFE8',
        note: 'The average color of the painting\'s open channel, so the fade is almost invisible. Text turns light; the whole page reads as being under water.' },
      { key: 'frame-deep', name: 'Painting around the edges: deep water', ground: '#2C4A4D', ink: 'light', river: '#6FE3D6',
        note: 'The darkest water at the painting\'s edges. The most dramatic, the painting glows around it, and it doubles as a dark mode.' },
    ].map((v) => ({
      key: v.key, name: v.name, note: v.note, h: 1000,
      body: () => (<>
        {layer({ background: v.ground }, 'g')}
        {layer(photo({ bottom: 'auto', height: 720, WebkitMaskImage: 'radial-gradient(ellipse 66% 66% at 50% 60%, transparent 52%, #000 100%)', maskImage: 'radial-gradient(ellipse 66% 66% at 50% 60%, transparent 52%, #000 100%)' }), 'p')}
        {layer({ top: 520, bottom: "auto", height: 220, background: `linear-gradient(to bottom, transparent, ${v.ground} 85%)` }, 'f')}
        {wpads('light')}{wlotuses()}{hero(v.ink, ON_PAD)}{cta(v.ink === 'light')}
        {riverStart(v)}
      </>),
    })),
    {
      key: 'glass', name: 'Glass hero',
      note: 'The full painting and pads, with my name on a frosted panel so the text always reads without dulling the image.',
      body: () => (<>{layer(photo(), 'p')}{WPADS.map((p) => wpad(p.title === 'API' ? { ...p, y: 395 } : p, 'light'))}{wlotuses()}<div className="bl-glass" />{hero('dark', { x: 120 })}{cta(false, { right: 120, top: 572 })}</>),
    },
  ];

  return (
    <div className="hp">
      <div className="bl-switch" role="radiogroup" aria-label="Background painting">
        <span className="bl-switch-label">Background</span>
        {BGS.map((b) => (
          <button key={b.key} type="button" role="radio" aria-checked={b.key === bgKey} className={`bl-switch-opt ${b.key === bgKey ? 'bl-switch-on' : ''}`} onClick={() => setBgKey(b.key)}>
            <span className="bl-switch-img" style={{ backgroundImage: `url('${b.src}')` }} role="img" aria-label={b.alt} />
            <span>{b.label}</span>
          </button>
        ))}
      </div>
      {OPTIONS.map((o, n) => (
        <section key={o.key} className="hp-slide">
          <header className="hp-slide-head">
            <span className="hp-num">{String(n + 1).padStart(2, '0')}</span>
            <div><h2>{o.name}</h2><p>{o.note}</p></div>
          </header>
          <div className="hp-frame" ref={(el) => { frames.current[n] = el; }} style={o.h ? { aspectRatio: `${W} / ${o.h}` } : undefined}>
            <div className="hp-stage" style={{ background: 'none', height: o.h || 720 }}>{o.body()}</div>
          </div>
        </section>
      ))}
    </div>
  );
};
