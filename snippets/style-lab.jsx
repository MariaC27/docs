// Lab: style iterations. Five directions other than the painted pond, each with its own metaphor
// rather than floating shapes on a background: a blueprint, a night sky, a trail map, a code editor
// and an editorial contents page. Each shows the homepage's job (name and intro, the five sections
// with a preview on hover, Contact) and a slice of the career path told its own way.
// Frames are a fixed 1280×1040 stage scaled to fit; a toggle flips them all between light and dark.
// Styles in /style.css (.sl-*). Mintlify keeps only the imported export, so everything lives inside StyleLab.

export const StyleLab = () => {
  const W = 1280, H = 1040;
  const frames = useRef([]);
  useEffect(() => {
    const fit = () => frames.current.forEach((f) => { if (f) f.style.setProperty('--hp-s', String(f.clientWidth / W)); });
    fit();
    const ro = window.ResizeObserver ? new ResizeObserver(fit) : null;
    frames.current.forEach((f) => f && ro && ro.observe(f));
    window.addEventListener('resize', fit);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', fit); };
  }, []);
  const [dark, setDark] = useState(true);
  useEffect(() => { setDark(document.documentElement.classList.contains('dark')); }, []);

  const SECTIONS = {
    about: { title: 'About Me', slug: '/about/me', desc: 'Where I’m from, Dartmouth, and life in San Francisco.', img: '/images/me_boston.jpg' },
    skills: { title: 'Skills', slug: '/about/skills', desc: 'TypeScript, React, Figma and more, as an API reference.' },
    writing: { title: 'Writing', slug: '/writing', desc: 'Essays on design engineering and UX friction.', img: '/images/design_article1_graphic.png' },
    work: { title: 'Case Studies', slug: '/work', desc: 'Four projects, from research to shipped code.', img: '/images/canvas_study1_newcanvas.png' },
    api: { title: 'API', slug: '/api', desc: 'A live API about me. Try GET /me.' },
  };
  const CAREER = [
    { org: 'Ocular AI', role: 'Founding Design Engineer', when: 'Jan 2025 – Now', from: 2025, to: 2026.9 },
    { org: 'NoxuData', role: 'Software Engineer', when: 'Aug – Dec 2024', from: 2024.6, to: 2024.95 },
    { org: 'Dartmouth', role: 'B.A. Computer Science + HCD', when: '2020 – 2024', from: 2020.7, to: 2024.4 },
  ];
  const PHOTO = { backgroundImage: "url('/images/mc.jpg')" };
  // a preview card that appears on hover
  const peek = (key, cls = '') => {
    const s = SECTIONS[key];
    return (
      <span className={`sl-peek ${cls}`}>
        {s.img && <span className="sl-peek-img" style={{ backgroundImage: `url('${s.img}')` }} />}
        <span className="sl-peek-t">{s.title}</span>
        <span className="sl-peek-d">{s.desc}</span>
        <span className="sl-peek-go">{s.slug} →</span>
      </span>
    );
  };

  // ── 1 · Blueprint: a floor plan; each room is a section ──
  const blueprint = () => {
    const ROOMS = [
      { key: 'about', x: 80, y: 70, w: 380, h: 250, use: 'Living room' },
      { key: 'skills', x: 460, y: 70, w: 230, h: 200, use: 'Workshop' },
      { key: 'writing', x: 690, y: 70, w: 190, h: 200, use: 'Library' },
      { key: 'work', x: 460, y: 270, w: 420, h: 290, use: 'Gallery' },
      { key: 'api', x: 80, y: 320, w: 200, h: 240, use: 'Utility' },
    ];
    const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
    const X = (yr) => 120 + (yr - 2020) * 150;
    return (<>
      <span className="sl-bp-grid" />
      <svg className="sl-full sl-bp-plan" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <rect x="80" y="70" width="800" height="490" className="sl-bp-outer" />
        <path d="M280,320 V560 M460,70 V560 M690,70 V270 M460,270 H880 M80,320 H460" className="sl-bp-wall" />
        <path d="M300,560 v-40 a40,40 0 0 1 40,40" className="sl-bp-door" />
        <path d="M460,180 h-36 a36,36 0 0 0 36,36" className="sl-bp-door" />
        <path d="M690,170 h36 a36,36 0 0 1 -36,36" className="sl-bp-door" />
        <path d="M560,270 v36 a36,36 0 0 0 36,-36" className="sl-bp-door" />
        <path d="M80,600 H880 M80,592 v16 M880,592 v16" className="sl-bp-dim" />
        <text x="480" y="628" className="sl-bp-dimt">24′ – 0″</text>
      </svg>
      {ROOMS.map((r) => (
        <a key={r.key} className="sl-room" style={{ left: r.x, top: r.y, width: r.w, height: r.h }}>
          <span className="sl-room-use">{r.use}</span>
          <span className="sl-room-t">{SECTIONS[r.key].title}</span>
          {peek(r.key)}
        </a>
      ))}
      <div className="sl-bp-title">
        <div className="sl-bp-row sl-bp-row-head"><span>Project</span><span>Sheet A-01</span></div>
        <div className="sl-bp-who"><span className="sl-photo" style={PHOTO} /><div><div className="sl-name">Maria Cristoforo</div><div className="sl-tag">thinks like a designer, executes like an engineer</div></div></div>
        <div className="sl-bp-row"><span>Role</span><span>Design Engineer, Ocular AI (YC W24)</span></div>
        <div className="sl-bp-row"><span>Site</span><span>San Francisco, CA</span></div>
        <div className="sl-bp-row"><span>Scale</span><span>1 : 1 human</span></div>
        <span className="sl-cta">Contact</span>
      </div>
      <div className="sl-bp-career">
        <div className="sl-label">Section B — Career path</div>
        <svg viewBox={`0 0 ${W} 300`} aria-hidden="true">
          <path d={`M${X(2020)},150 H${X(2026.9)}`} className="sl-bp-axis" />
          {years.map((y) => (<g key={y}><path d={`M${X(y)},142 v16`} className="sl-bp-axis" /><text x={X(y)} y="182" className="sl-bp-year">{y}</text></g>))}
          {CAREER.map((c, i) => {
            const y = 108 - i * 34;
            return (<g key={c.org}>
              <path d={`M${X(c.from)},${y} H${X(c.to)} M${X(c.from)},${y - 7} v14 M${X(c.to)},${y - 7} v14`} className="sl-bp-span" />
              <text x={(X(c.from) + X(c.to)) / 2} y={y - 12} className="sl-bp-spant">{c.org} · {c.role}</text>
            </g>);
          })}
        </svg>
      </div>
    </>);
  };

  // ── 2 · Night sky: the sections are a constellation ──
  const sky = () => {
    const STARS = [
      { key: 'about', x: 520, y: 330, s: 1.2 },
      { key: 'skills', x: 640, y: 150, s: 1 },
      { key: 'writing', x: 880, y: 110, s: .9 },
      { key: 'work', x: 1060, y: 260, s: 1.3 },
      { key: 'api', x: 860, y: 400, s: .9 },
    ];
    const lines = 'M520,330 L640,150 L880,110 L1060,260 L860,400 L520,330';
    const dust = Array.from({ length: 70 }, (_, i) => [((i * 197) % 1240) + 20, ((i * 113) % 640) + 20, (i % 3) + 1]);
    return (<>
      <span className="sl-blob sl-blob-1" /><span className="sl-blob sl-blob-2" /><span className="sl-blob sl-blob-3" />
      {dust.map(([x, y, s], i) => <span key={i} className="sl-dust" style={{ left: x, top: y, width: s, height: s, animationDelay: `${(i % 7) * .7}s` }} />)}
      <svg className="sl-full" viewBox={`0 0 ${W} ${H}`} aria-hidden="true"><path d={lines} className="sl-const" /></svg>
      {STARS.map((s) => (
        <a key={s.key} className="sl-star" style={{ left: s.x, top: s.y, '--s': s.s }}>
          <span className="sl-star-dot" />
          <span className="sl-star-t">{SECTIONS[s.key].title}</span>
          {peek(s.key)}
        </a>
      ))}
      <div className="sl-hero sl-sky-hero">
        <span className="sl-photo" style={PHOTO} />
        <div><div className="sl-name">Maria Cristoforo</div><div className="sl-tag">thinks like a designer, executes like an engineer</div><div className="sl-role">Design Engineer at Ocular AI (YC W24) · San Francisco</div></div>
      </div>
      <span className="sl-cta sl-sky-cta">Contact</span>
      <div className="sl-label sl-sky-label">Career path</div>
      <svg className="sl-full" viewBox={`0 0 ${W} ${H}`} aria-hidden="true"><path d="M120,960 C380,760 820,760 1160,900" className="sl-orbit" /></svg>
      {CAREER.map((c, i) => {
        const pts = [[1010, 836], [700, 778], [360, 830]];
        const [x, y] = pts[i];
        return (<div key={c.org} className="sl-sky-stop" style={{ left: x, top: y }}><span className="sl-star-dot" /><div className="sl-sky-stop-t"><b>{c.org}</b><span>{c.role}</span><em>{c.when}</em></div></div>);
      })}
    </>);
  };

  // ── 3 · Trail map: the sections are landmarks; the career path is an elevation profile ──
  const trail = () => {
    const centers = [[300, 220, 1], [980, 200, 2], [640, 420, 3], [140, 760, 4], [1140, 820, 5]];
    const contours = [];
    centers.forEach(([cx, cy, seed]) => {
      for (let r = 30; r < 280; r += 24) {
        const pts = [];
        for (let a = 0; a <= 360; a += 8) {
          const t = (a * Math.PI) / 180;
          const k = 1 + 0.08 * Math.sin(3 * t + seed) + 0.05 * Math.sin(5 * t + seed * 2 + r / 40);
          pts.push(`${(cx + Math.cos(t) * r * 1.35 * k).toFixed(1)},${(cy + Math.sin(t) * r * 0.8 * k).toFixed(1)}`);
        }
        contours.push(`M${pts.join(' L')}Z`);
      }
    });
    const MARKS = [
      { key: 'about', x: 300, y: 220, icon: '1' },
      { key: 'skills', x: 640, y: 150, icon: '2' },
      { key: 'writing', x: 980, y: 200, icon: '3' },
      { key: 'work', x: 820, y: 430, icon: '4' },
      { key: 'api', x: 520, y: 470, icon: '5' },
    ];
    const trailPath = 'M300,220 C420,120 520,140 640,150 S900,120 980,200 S900,380 820,430 S600,520 520,470';
    return (<>
      <svg className="sl-full sl-contours" viewBox={`0 0 ${W} ${H}`} aria-hidden="true"><g className="sl-contours-g">{contours.map((d, i) => <path key={i} d={d} />)}</g></svg>
      <svg className="sl-full" viewBox={`0 0 ${W} ${H}`} aria-hidden="true"><path d={trailPath} className="sl-trailpath" /></svg>
      {MARKS.map((m) => (
        <a key={m.key} className="sl-mark" style={{ left: m.x, top: m.y }}>
          <span className="sl-mark-pin"><b>{m.icon}</b></span>
          <span className="sl-mark-t">{SECTIONS[m.key].title}</span>
          {peek(m.key)}
        </a>
      ))}
      <div className="sl-legend">
        <div className="sl-label">Legend</div>
        <div className="sl-hero-row"><span className="sl-photo" style={PHOTO} /><div><div className="sl-name">Maria Cristoforo</div><div className="sl-tag">thinks like a designer, executes like an engineer</div></div></div>
        <div className="sl-role">Design Engineer at Ocular AI (YC W24) · San Francisco</div>
        <div className="sl-legend-keys"><span><i className="sl-k-trail" />Trail</span><span><i className="sl-k-pin">1</i>Landmark</span></div>
        <span className="sl-cta">Contact</span>
      </div>
      <div className="sl-compass" aria-hidden="true">N</div>
      <div className="sl-profile">
        <div className="sl-label">Career path · elevation profile</div>
        <svg viewBox="0 0 1120 220" aria-hidden="true">
          <path d="M0,200 L160,170 L380,150 L560,110 L700,96 L840,60 L1120,24 L1120,220 L0,220Z" className="sl-prof-fill" />
          <path d="M0,200 L160,170 L380,150 L560,110 L700,96 L840,60 L1120,24" className="sl-prof-line" />
          {[[560, 110, 'Dartmouth', '2024'], [840, 60, 'NoxuData', '2024'], [1080, 30, 'Ocular AI', '2025 – now']].map(([x, y, t, d]) => (
            <g key={t}><circle cx={x} cy={y} r="6" className="sl-prof-pt" /><text x={x} y={y - 16} className="sl-prof-t">{t}</text><text x={x} y={y - 2} dy="32" className="sl-prof-d">{d}</text></g>
          ))}
        </svg>
      </div>
    </>);
  };

  // ── 4 · Code editor: the site as a repo; the career path is a commit graph ──
  const editor = () => {
    const FILES = [
      { key: 'about', name: 'about/me.md' },
      { key: 'skills', name: 'skills.ts' },
      { key: 'writing', name: 'writing/' },
      { key: 'work', name: 'case-studies/' },
      { key: 'api', name: 'api/openapi.yaml' },
    ];
    const CODE = [
      [['k', 'export const '], ['v', 'maria'], ['p', ' = {']],
      [['i', '  name: '], ['s', '"Maria Cristoforo"'], ['p', ',']],
      [['i', '  role: '], ['s', '"Design Engineer @ Ocular AI (YC W24)"'], ['p', ',']],
      [['i', '  motto: '], ['s', '"thinks like a designer, executes like an engineer"'], ['p', ',']],
      [['i', '  based: '], ['s', '"San Francisco, CA"'], ['p', ',']],
      [['p', '};']],
    ];
    return (<>
      <div className="sl-win">
        <div className="sl-win-bar"><i /><i /><i /><span>maria.tsx — portfolio</span></div>
        <div className="sl-tree">
          <div className="sl-label">Explorer</div>
          {FILES.map((f) => (
            <a key={f.key} className="sl-file"><span className="sl-file-ic">{f.name.endsWith('/') ? '▸' : '·'}</span>{f.name}{peek(f.key, 'sl-peek-side')}</a>
          ))}
          <span className="sl-file sl-file-on"><span className="sl-file-ic">·</span>maria.tsx</span>
        </div>
        <div className="sl-code">
          <div className="sl-tabsbar"><span className="sl-tab-file">maria.tsx</span></div>
          <div className="sl-code-body">
            <span className="sl-photo sl-code-photo" style={PHOTO} />
            {CODE.map((ln, i) => (
              <div key={i} className="sl-ln"><span className="sl-ln-n">{i + 1}</span>{ln.map(([c, t], j) => <span key={j} className={`sl-c-${c}`}>{t}</span>)}</div>
            ))}
            <div className="sl-ln"><span className="sl-ln-n">7</span></div>
            <div className="sl-ln"><span className="sl-ln-n">8</span><span className="sl-cta sl-run">▶ contact(maria)</span></div>
          </div>
        </div>
      </div>
      <div className="sl-git">
        <div className="sl-label">Career path · git log --graph</div>
        <svg viewBox="0 0 1120 250" aria-hidden="true">
          <path d="M40,20 V250" className="sl-git-main" />
          <path d="M40,120 C40,150 100,150 100,180 V230 C100,245 40,240 40,250" className="sl-git-branch" />
          {[[40, 40], [40, 120], [100, 190]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="8" className="sl-git-pt" />)}
        </svg>
        {[
          ['a3f9c21', 'feat: join Ocular AI as founding design engineer', 'Jan 2025', 32],
          ['7be0d14', 'feat: software engineer at NoxuData', 'Aug 2024', 112],
          ['v2.0.0', 'release: graduate Dartmouth, B.A. CS + HCD', 'Jun 2024', 182],
        ].map(([h, m, d, y]) => (
          <div key={h} className="sl-commit" style={{ top: y + 46 }}><b>{h}</b><span>{m}</span><em>{d}</em></div>
        ))}
      </div>
    </>);
  };

  // ── 5 · Editorial index: a magazine contents page ──
  const index = () => {
    const ORDER = ['about', 'skills', 'work', 'writing', 'api'];
    return (<>
      <div className="sl-mast">
        <div className="sl-issue"><span>Vol. 3</span><span>Design engineering</span><span>San Francisco</span></div>
        <div className="sl-name">Maria Cristoforo</div>
        <div className="sl-mast-row">
          <span className="sl-photo" style={PHOTO} />
          <div className="sl-tag">thinks like a designer, executes like an engineer</div>
          <span className="sl-cta">Contact</span>
        </div>
      </div>
      <div className="sl-toc">
        <div className="sl-label">Contents</div>
        {ORDER.map((k, i) => (
          <a key={k} className="sl-toc-row">
            <span className="sl-toc-n">{String(i + 1).padStart(2, '0')}</span>
            <span className="sl-toc-t">{SECTIONS[k].title}</span>
            <span className="sl-toc-lead" />
            <span className="sl-toc-d">{SECTIONS[k].desc}</span>
            {peek(k, 'sl-peek-float')}
          </a>
        ))}
      </div>
      <div className="sl-tl">
        <div className="sl-label">Career path</div>
        {CAREER.map((c) => (
          <div key={c.org} className="sl-tl-row"><span className="sl-tl-when">{c.when}</span><span className="sl-tl-org">{c.org}</span><span className="sl-tl-role">{c.role}</span></div>
        ))}
      </div>
    </>);
  };

  const STYLES = [
    { key: 'blueprint', name: 'Blueprint', render: blueprint,
      note: 'The site as a floor plan: each room is a section (hover one to see what’s inside), your name sits in the drawing’s title block, and the career path is a set of dimension lines over the years. Technical and witty, and right at home next to docs pages.' },
    { key: 'sky', name: 'Night sky', render: sky,
      note: 'The five sections form a constellation over slowly drifting aurora light; hover a star to read it. The career path is an arc of stars. Atmospheric, with the glassy feel of Mintlify’s own panels.' },
    { key: 'trail', name: 'Trail map', render: trail,
      note: 'A topographic map: sections are landmarks joined by a trail, your intro is the map legend, and the career path is an elevation profile that climbs over time. Cartographic and calm.' },
    { key: 'editor', name: 'Code editor', render: editor,
      note: 'The portfolio as a repo: a file tree of the sections (hover to preview), you as an object in maria.tsx, and the career path as a git commit graph. Leans into “design engineer” and the changelog idea.' },
    { key: 'index', name: 'Editorial index', render: index,
      note: 'A magazine contents page: a big masthead, numbered sections with a picture that appears on hover, and the career path as a typographic timeline. The quietest option and the closest to plain docs.' },
  ];

  return (
    <div className="hp sl">
      <div className="sl-bar" role="group" aria-label="Preview mode">
        <span className="sl-bar-label">Mode</span>
        <button type="button" className={!dark ? 'sl-on' : undefined} aria-pressed={!dark} onClick={() => setDark(false)}>Light</button>
        <button type="button" className={dark ? 'sl-on' : undefined} aria-pressed={dark} onClick={() => setDark(true)}>Dark</button>
      </div>
      {STYLES.map((st, n) => (
        <section key={st.key} className="hp-slide">
          <header className="hp-slide-head">
            <span className="hp-num">{String(n + 1).padStart(2, '0')}</span>
            <div><h2>{st.name}</h2><p>{st.note}</p></div>
          </header>
          <div className="hp-frame" ref={(el) => { frames.current[n] = el; }} style={{ aspectRatio: `${W} / ${H}` }}>
            <div className={`hp-stage sl-stage sl-${st.key} ${dark ? 'sl-dark' : 'sl-light'}`} style={{ height: H }}>{st.render()}</div>
          </div>
        </section>
      ))}
    </div>
  );
};
