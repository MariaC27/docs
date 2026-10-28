// Lab prototypes: the homepage's first screen in several layouts, drawn as 16:9 "slides".
// Each slide is a fixed 1280×720 stage scaled to fit its frame, so layouts compare exactly.
// Visuals reuse the homepage's language (perspective lily pads, lotuses, the river, the photo).
// Mintlify keeps only the imported export from a snippet, so everything lives inside HeroProtos.

export const HeroProtos = () => {
  const W = 1280, H = 720;

  // scale every stage to its frame width
  const frames = useRef([]);
  useEffect(() => {
    const fit = () => frames.current.forEach((f) => {
      if (!f) return;
      f.style.setProperty('--hp-s', String(f.clientWidth / W));
    });
    fit();
    const ro = window.ResizeObserver ? new ResizeObserver(fit) : null;
    frames.current.forEach((f) => f && ro && ro.observe(f));
    window.addEventListener('resize', fit);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', fit); };
  }, []);

  // ── shared pieces ─────────────────────────────────────────────────────────
  const rad = (d) => (d * Math.PI) / 180;
  const leafPath = (seed, left) => {
    const CX = 150, CY = 120, RX = 135, RY = 56;
    const a1 = left ? 124 : 38, a2 = left ? 142 : 56, pts = [];
    for (let t = a2; t <= a1 + 360; t += 3) {
      const r = 1 + 0.022 * Math.sin(rad(5 * t + seed * 40)) + 0.012 * Math.sin(rad(11 * t + seed * 90));
      pts.push(`${(CX + RX * r * Math.cos(rad(t))).toFixed(1)},${(CY + RY * r * Math.sin(rad(t))).toFixed(1)}`);
    }
    return `M${CX},${CY - 2} L${pts.join(' L')} Z`;
  };
  const veins = () => {
    const out = [];
    for (let t = 72; t < 396; t += 26) {
      const ex = 150 + 135 * 0.9 * Math.cos(rad(t)), ey = 120 + 56 * 0.9 * Math.sin(rad(t));
      const qx = 150 + 135 * 0.5 * Math.cos(rad(t + 5)), qy = 120 + 56 * 0.5 * Math.sin(rad(t + 5));
      out.push(`M150,118 Q${qx.toFixed(1)},${qy.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}`);
    }
    return out.join(' ');
  };
  let uid = 0;
  // a lily pad centred at (x, y), w px wide, optionally with a title + slug on it
  const Pad = ({ x, y, w = 200, title, slug, seed = 1, left = false, ratio = 250 }) => {
    const id = `hp${uid++}`, d = leafPath(seed, left), h = w * ratio / 300;
    return (
      <div className="hp-pad" style={{ left: x - w / 2, top: y - h * 0.6, width: w, height: h }}>
        <svg viewBox="0 0 300 250" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <radialGradient id={`${id}t`} cx="42%" cy="38%" r="70%"><stop offset="0" stopColor="#EEF8F6" /><stop offset="1" stopColor="#CFE9E4" /></radialGradient>
            <linearGradient id={`${id}r`} gradientUnits="userSpaceOnUse" x1="0" y1="64" x2="0" y2="176"><stop offset=".35" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#fff" /></linearGradient>
            <filter id={`${id}b`} x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
          </defs>
          <ellipse cx="154" cy="134" rx="131" ry="48" fill="rgba(11,22,32,.16)" filter={`url(#${id}b)`} />
          <path d={d} transform="translate(0 3)" fill="rgba(18,163,148,.22)" />
          <path d={d} fill={`url(#${id}t)`} stroke="#12A394" strokeOpacity=".35" strokeWidth=".8" />
          <path d={veins()} fill="none" stroke="rgba(11,116,105,.16)" strokeWidth=".9" strokeLinecap="round" />
          <path d={d} fill="none" stroke={`url(#${id}r)`} strokeWidth="1.2" opacity=".6" />
        </svg>
        {title && (
          <span className="hp-pad-label" style={{ fontSize: Math.max(14, w * 0.11) }}>
            {title}<em>{slug}</em>
          </span>
        )}
      </div>
    );
  };
  const Lotus = ({ x, y, s = 1 }) => {
    const petal = 'M0,0 C-3.6,-3.4 -3.6,-10.5 0,-13.5 C3.6,-10.5 3.6,-3.4 0,0 Z';
    return (
      <svg className="hp-lotus" viewBox="-20 -18 40 32" style={{ left: x - 24 * s, top: y - 20 * s, width: 48 * s, height: 40 * s }} aria-hidden="true">
        <ellipse cx="1.5" cy="5" rx="15" ry="4.5" fill="rgba(11,22,32,.14)" />
        <g transform="scale(1 .48)">{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <path key={a} d={petal} transform={`rotate(${a + 22})`} fill="#DCEFEB" stroke="rgba(18,163,148,.45)" strokeWidth=".5" />)}</g>
        {[-58, -30, 30, 58, 0].map((a) => <path key={a} d={petal} transform={`rotate(${a})`} fill="#fff" stroke="rgba(18,163,148,.45)" strokeWidth=".5" />)}
        <ellipse cx="0" cy="-1.5" rx="2.6" ry="1.5" fill="#D8C67A" />
      </svg>
    );
  };
  const Photo = ({ x, y, size = 80 }) => (
    <span className="hp-photo" style={{ left: x, top: y, width: size, height: size, backgroundImage: "url('/images/mc.jpg')" }} />
  );
  const River = ({ d, faint }) => (
    <svg className="hp-river" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <path d={d} stroke="#12A394" strokeOpacity={faint ? .07 : .1} strokeWidth="22" fill="none" />
      <path d={d} stroke="#12A394" strokeOpacity={faint ? .14 : .24} strokeWidth="6" fill="none" />
      <path d={d} stroke="#12A394" strokeOpacity={faint ? .3 : .8} strokeWidth="1.5" fill="none" />
    </svg>
  );
  const Btn = ({ x, y, center }) => (
    <span className={`hp-btn${center ? ' hp-c' : ''}`} style={{ left: x, top: y }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 7l8.5 6 8.5-6" /></svg>
      Contact me
    </span>
  );
  const Icons = () => (
    <span className="hp-icons" aria-hidden="true"><i /><i /><i /><i /><b /></span>
  );
  const T = ({ x, y, w, cls, center, children, style }) => (
    <div className={`hp-t ${cls}${center ? ' hp-c' : ''}`} style={{ left: x, top: y, width: w, ...style }}>{children}</div>
  );
  const ROLE = 'Design Engineer at Ocular AI (YC W24)';
  const WHERE = 'San Francisco, CA';
  const TAG = 'thinks like a designer, executes like an engineer';
  const meta = <>{ROLE}<span className="hp-dot" />{WHERE}</>;

  // ── the layouts ───────────────────────────────────────────────────────────
  const SLIDES = [
    {
      key: 'current', name: 'Current', note: 'Baseline for comparison: text block on the left, pond on the right.',
      stage: (
        <>
          <River faint d="M190,250 C220,330 300,330 360,420 S560,560 640,720" />
          <Photo x={110} y={210} size={80} />
          <T x={214} y={204} cls="hp-name" style={{ fontSize: 96 }}>Maria Cristoforo</T>
          <T x={110} y={320} cls="hp-tag">{TAG}</T>
          <T x={110} y={366} cls="hp-meta">{meta}</T>
          <Btn x={110} y={410} />
          <Pad x={830} y={180} w={210} title="Skills" slug="/about/skills" seed={3} />
          <Pad x={1110} y={170} w={200} title="Writing" slug="/writing/overview" seed={4} left />
          <Pad x={1000} y={330} w={200} title="About Me" slug="/about/me" seed={5} />
          <Pad x={840} y={490} w={210} title="API" slug="/api/get-me" seed={6} left />
          <Pad x={1120} y={480} w={210} title="Case Studies" slug="/work/overview" seed={7} />
          <Lotus x={960} y={170} s={.8} /><Lotus x={870} y={350} s={.7} /><Lotus x={1160} y={330} s={.7} />
        </>
      ),
    },
    {
      key: 'centered', name: 'Centered, pads around the edges',
      note: 'You in the middle of the pond. Photo on top, name centered, and the five pads float around the edges like a frame. Calm and symmetric, more "portrait" than "page".',
      stage: (
        <>
          <River faint d="M640,560 C640,620 600,670 640,720" />
          <Photo x={600} y={150} size={80} />
          <T x={140} y={248} w={1000} center cls="hp-name" style={{ fontSize: 104 }}>Maria Cristoforo</T>
          <T x={240} y={372} w={800} center cls="hp-tag">{TAG}</T>
          <T x={240} y={418} w={800} center cls="hp-meta">{meta}</T>
          <Btn x={640} y={462} center />
          <Pad x={170} y={150} w={190} title="Skills" slug="/about/skills" seed={3} />
          <Pad x={1110} y={140} w={190} title="Writing" slug="/writing/overview" seed={4} left />
          <Pad x={180} y={560} w={200} title="API" slug="/api/get-me" seed={6} left />
          <Pad x={1100} y={570} w={210} title="Case Studies" slug="/work/overview" seed={7} />
          <Pad x={640} y={640} w={180} title="About Me" slug="/about/me" seed={5} />
          <Lotus x={330} y={330} s={.8} /><Lotus x={960} y={300} s={.7} /><Lotus x={400} y={640} s={.6} /><Lotus x={880} y={650} s={.7} />
        </>
      ),
    },
    {
      key: 'on-pad', name: 'You on the big pad',
      note: 'One large lily pad in the middle holds your photo, name and details, and the smaller pads around it are the navigation. The intro becomes part of the pond instead of sitting next to it.',
      stage: (
        <>
          <River faint d="M640,600 C620,650 670,690 640,720" />
          <Pad x={640} y={380} w={880} seed={2} ratio={300} />
          <Photo x={600} y={196} size={80} />
          <T x={240} y={286} w={800} center cls="hp-name" style={{ fontSize: 82 }}>Maria Cristoforo</T>
          <T x={290} y={386} w={700} center cls="hp-tag" style={{ fontSize: 20 }}>{TAG}</T>
          <T x={290} y={426} w={700} center cls="hp-meta">{meta}</T>
          <Btn x={640} y={464} center />
          <Pad x={150} y={130} w={170} title="Skills" slug="/about/skills" seed={3} />
          <Pad x={1130} y={120} w={170} title="Writing" slug="/writing/overview" seed={4} left />
          <Pad x={140} y={620} w={180} title="API" slug="/api/get-me" seed={6} left />
          <Pad x={1130} y={620} w={190} title="Case Studies" slug="/work/overview" seed={7} />
          <Pad x={640} y={90} w={160} title="About Me" slug="/about/me" seed={5} />
          <Lotus x={300} y={360} s={.8} /><Lotus x={1000} y={600} s={.7} /><Lotus x={1080} y={330} s={.6} />
        </>
      ),
    },
    {
      key: 'caption', name: 'The pond is the hero',
      note: 'The pads spread across the whole screen as the first thing you see, and your intro is a small caption in the corner, like a label beside a painting. Confident and unusual, and the least "template" feeling.',
      stage: (
        <>
          <River faint d="M160,560 C260,520 300,600 420,620 S600,700 640,720" />
          <Pad x={280} y={170} w={230} title="Skills" slug="/about/skills" seed={3} />
          <Pad x={650} y={130} w={220} title="Writing" slug="/writing/overview" seed={4} left />
          <Pad x={1010} y={210} w={240} title="Case Studies" slug="/work/overview" seed={7} />
          <Pad x={500} y={350} w={230} title="About Me" slug="/about/me" seed={5} />
          <Pad x={880} y={420} w={220} title="API" slug="/api/get-me" seed={6} left />
          <Lotus x={450} y={210} s={.9} /><Lotus x={780} y={300} s={.8} /><Lotus x={1150} y={360} s={.7} /><Lotus x={300} y={360} s={.7} />
          <div className="hp-caption">
            <Photo x={0} y={0} size={56} />
            <div style={{ marginLeft: 74 }}>
              <div className="hp-name" style={{ fontSize: 44, position: 'static' }}>Maria Cristoforo</div>
              <div className="hp-tag" style={{ fontSize: 17, position: 'static', marginTop: 4 }}>{TAG}</div>
              <div className="hp-meta" style={{ position: 'static', marginTop: 10 }}>{meta}</div>
            </div>
          </div>
          <Btn x={1090} y={640} />
        </>
      ),
    },
    {
      key: 'name-across', name: 'Name across the water',
      note: 'Your name runs very large across the bottom of the screen, like a title card, with the pads floating above it and the photo set in among them. Bold and editorial; the name does the work.',
      stage: (
        <>
          <Pad x={230} y={160} w={200} title="Skills" slug="/about/skills" seed={3} />
          <Pad x={560} y={210} w={190} title="Writing" slug="/writing/overview" seed={4} left />
          <Pad x={870} y={150} w={200} title="About Me" slug="/about/me" seed={5} />
          <Pad x={1130} y={240} w={190} title="Case Studies" slug="/work/overview" seed={7} />
          <Pad x={390} y={360} w={170} title="API" slug="/api/get-me" seed={6} left />
          <Lotus x={720} y={300} s={.8} /><Lotus x={1010} y={330} s={.7} /><Lotus x={120} y={330} s={.6} />
          <Photo x={700} y={376} size={64} />
          <T x={784} y={378} w={480} cls="hp-tag" style={{ fontSize: 19, whiteSpace: 'nowrap' }}>{TAG}</T>
          <T x={784} y={414} w={480} cls="hp-meta" style={{ whiteSpace: 'nowrap', fontSize: 11.5 }}>{meta}</T>
          <T x={70} y={470} w={1200} cls="hp-name" style={{ fontSize: 196, letterSpacing: '-0.03em' }}>Maria Cristoforo</T>
          <Btn x={80} y={420} />
        </>
      ),
    },
    {
      key: 'stacked', name: 'Stacked name, pads in the gap',
      note: 'First and last name stacked large on opposite sides with the pond flowing diagonally between them. Asymmetric and magazine-like, and it uses the space in a less predictable way.',
      stage: (
        <>
          <River faint d="M0,640 C300,600 400,420 640,380 S1000,160 1280,120" />
          <T x={80} y={90} cls="hp-name" style={{ fontSize: 168 }}>Maria</T>
          <T x={560} y={470} w={660} cls="hp-name" style={{ fontSize: 168, textAlign: 'right' }}>Cristoforo</T>
          <Photo x={500} y={140} size={70} />
          <T x={84} y={288} w={520} cls="hp-tag" style={{ fontSize: 20, whiteSpace: 'nowrap' }}>{TAG}</T>
          <T x={84} y={326} w={520} cls="hp-meta" style={{ whiteSpace: 'nowrap', fontSize: 11.5 }}>{meta}</T>
          <Btn x={84} y={366} />
          <Pad x={760} y={160} w={190} title="Skills" slug="/about/skills" seed={3} />
          <Pad x={1080} y={250} w={190} title="Writing" slug="/writing/overview" seed={4} left />
          <Pad x={640} y={340} w={180} title="About Me" slug="/about/me" seed={5} />
          <Pad x={250} y={560} w={190} title="API" slug="/api/get-me" seed={6} left />
          <Pad x={930} y={390} w={190} title="Case Studies" slug="/work/overview" seed={7} />
          <Lotus x={900} y={260} s={.7} /><Lotus x={460} y={490} s={.8} /><Lotus x={1150} y={110} s={.6} />
        </>
      ),
    },
  ];

  return (
    <div className="hp">
      {SLIDES.map((sl, n) => (
        <section key={sl.key} className="hp-slide">
          <header className="hp-slide-head">
            <span className="hp-num">{String(n + 1).padStart(2, '0')}</span>
            <div>
              <h2>{sl.name}</h2>
              <p>{sl.note}</p>
            </div>
          </header>
          <div className="hp-frame" ref={(el) => { frames.current[n] = el; }}>
            <div className="hp-stage">
              <Icons />
              {sl.stage}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};
