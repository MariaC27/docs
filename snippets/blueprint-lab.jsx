// Lab: the blueprint direction, on its own page to iterate on (started from option 1 on
// /lab/styles). The homepage as a floor plan: each room is a section, every room connects through
// doorways back to the entry hall and its front door (the entry's doors swing into the rooms, so the
// hall stays clear), your name sits in the title block, and the career
// path is a set of dimension lines in lanes. Versions stack top to bottom (v1 is the very first
// blueprint; v2 adds the entry and connected doorways, drawn in a style picked with its own switcher,
// and the fuller timeline). Each is a
// 1280×1040 stage scaled to fit; one light/dark toggle covers all of them.
// Reuses the .sl-* styles from the style iterations page plus .bp-* in /style.css.
// Mintlify keeps only the imported export, so everything lives inside BlueprintLab.

export const BlueprintLab = () => {
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
  const [doorStyle, setDoorStyle] = useState('fins');
  const [dark, setDark] = useState(true);
  useEffect(() => { setDark(document.documentElement.classList.contains('dark')); }, []);

  const SECTIONS = {
    about: { title: 'About Me', slug: '/about/me', desc: 'Where I’m from, Dartmouth, and life in San Francisco.', img: '/images/me_boston.jpg' },
    skills: { title: 'Skills', slug: '/about/skills', desc: 'TypeScript, React, Figma and more, as an API reference.' },
    writing: { title: 'Writing', slug: '/writing', desc: 'Essays on design engineering and UX friction.', img: '/images/design_article1_graphic.png' },
    work: { title: 'Case Studies', slug: '/work', desc: 'Four projects, from research to shipped code.', img: '/images/canvas_study1_newcanvas.png' },
    api: { title: 'API', slug: '/api', desc: 'A live API about me. Try GET /me.' },
  };
  const peek = (key) => {
    const s = SECTIONS[key];
    return (
      <span className="sl-peek">
        {s.img && <span className="sl-peek-img" style={{ backgroundImage: `url('${s.img}')` }} />}
        <span className="sl-peek-t">{s.title}</span>
        <span className="sl-peek-d">{s.desc}</span>
        <span className="sl-peek-go">{s.slug} →</span>
      </span>
    );
  };

  // ── the plan ──
  // Building 80,70 → 880,560. Walls are drawn as segments with gaps where the doorways are, so every
  // room is reachable: Entry → About Me, API, Case Studies; About Me → Skills; Skills → Writing,
  // Case Studies; Writing → Case Studies; and the front door from Entry to outside.
  const ROOMS = [
    { key: 'about', x: 80, y: 70, w: 380, h: 250, use: 'Living room' },
    { key: 'skills', x: 460, y: 70, w: 230, h: 200, use: 'Workshop' },
    { key: 'writing', x: 690, y: 70, w: 190, h: 200, use: 'Library' },
    { key: 'work', x: 460, y: 270, w: 420, h: 290, use: 'Gallery' },
    { key: 'api', x: 80, y: 320, w: 200, h: 240, use: 'Utility' },
  ];
  const WALLS_OUTER = 'M80,560 V70 H880 V560 H390 M330,560 H80';               // gap = front door 330–390
  const WALLS_INNER = [
    'M460,70 V160 M460,205 V420 M460,470 V560',                                  // About|Skills, About|Work, Entry|Work
    'M690,70 V150 M690,195 V270',                                                // Skills|Writing
    'M460,270 H540 M585,270 H760 M805,270 H880',                                 // Skills|Work, Writing|Work
    'M80,320 H330 M380,320 H460',                                                // About|API and About|Entry
    'M280,320 V400 M280,450 V560',                                               // API|Entry
  ].join(' ');
  // door leaves, drawn open (perpendicular to the wall), with the swing back to the far jamb
  const DOORS = [
    'M330,560 v-60 a60,60 0 0 1 60,60',      // front door, into the entry
    'M380,320 v-50 a50,50 0 0 0 -50,50',     // entry ↔ about me, into about me
    'M280,450 h-50 a50,50 0 0 1 50,-50',     // entry ↔ api, into the utility room
    'M460,470 h50 a50,50 0 0 0 -50,-50',     // entry ↔ case studies, into the gallery
    'M460,205 h45 a45,45 0 0 0 -45,-45',     // about me ↔ skills, into skills
    'M690,195 h45 a45,45 0 0 0 -45,-45',     // skills ↔ writing, into writing
    'M540,270 v45 a45,45 0 0 0 45,-45',      // skills ↔ case studies, into the gallery
    'M760,270 v45 a45,45 0 0 0 45,-45',      // writing ↔ case studies, into the gallery
  ];

  // ── the career path, as dimension lines in lanes ──
  const X = (yr) => 120 + (yr - 2020) * 150;
  const LANES = [
    [{ org: 'Ocular AI', role: 'Founding Design Engineer', from: 2025, to: 2026.9 }],
    [{ org: 'NoxuData', role: 'Software Engineer', from: 2024.6, to: 2024.95 }],
    [{ org: 'Dartmouth', role: 'B.A. Computer Science + HCD', from: 2020.7, to: 2024.45 }],
    [
      { org: 'JHU APL', role: 'SWE Intern', from: 2022.2, to: 2022.45 },
      { org: 'Atlassian', role: 'Support Engineer Intern', from: 2023.45, to: 2023.65 },
    ],
    [{ org: 'DALI Lab', role: 'Software Engineer & UI/UX Designer', from: 2021.27, to: 2024.45 }],
  ];
  const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026];

  // ── v2 ──
  // Doorways other than the front door: the gap in the wall plus a dotted mark, in one of three
  // styles. Each gap: orientation, position, span (a→b) and which side the room it opens into is on.
  const FRONT_DOOR = 'M330,560 v-60 a60,60 0 0 1 60,60';
  const GAPS = [
    { o: 'h', y: 320, a: 330, b: 380, d: -1 },   // entry ↔ about me
    { o: 'v', x: 280, a: 400, b: 450, d: -1 },   // entry ↔ api
    { o: 'v', x: 460, a: 420, b: 470, d: 1 },    // entry ↔ case studies
    { o: 'v', x: 460, a: 160, b: 205, d: 1 },    // about me ↔ skills
    { o: 'v', x: 690, a: 150, b: 195, d: 1 },    // skills ↔ writing
    { o: 'h', y: 270, a: 540, b: 585, d: 1 },    // skills ↔ case studies
    { o: 'h', y: 270, a: 760, b: 805, d: 1 },    // writing ↔ case studies
  ];
  const DOOR_STYLES = [
    ['fins', 'Full swings'],
    ['threshold', 'Dotted threshold'],
    ['swing', 'Dotted swing'],
    ['ticks', 'Jamb ticks'],
  ];
  const doorMarks = (g, style) => {
    const w = g.b - g.a, sweep = g.d > 0 ? 1 : 0;
    const line = g.o === 'h' ? `M${g.a},${g.y} H${g.b}` : `M${g.x},${g.a} V${g.b}`;
    if (style === 'swing') {
      return [['bp-door-dot', g.o === 'h'
        ? `M${g.b},${g.y} A${w},${w} 0 0 ${sweep} ${g.a},${g.y + g.d * w}`
        : `M${g.x},${g.a} A${w},${w} 0 0 ${sweep} ${g.x + g.d * w},${g.b}`]];
    }
    if (style === 'ticks') {
      return [['bp-door-dot', line], ['bp-door-tick', g.o === 'h'
        ? `M${g.a},${g.y - 8} v16 M${g.b},${g.y - 8} v16`
        : `M${g.x - 8},${g.a} h16 M${g.x - 8},${g.b} h16`]];
    }
    return [['bp-door-dot', line]];
  };
  // Timeline, top to bottom: Dartmouth; the internships and NoxuData; Ocular AI. The full history
  // (DALI Lab and the rest) is one click away on the changelog.
  const LANES_V2 = [
    [{ org: 'Dartmouth', role: 'B.A. Computer Science + HCD', from: 2020.7, to: 2024.45 }],
    [
      { org: 'JHU APL', role: 'SWE Intern', from: 2022.2, to: 2022.45 },
      { org: 'Atlassian', role: 'Support Engineer Intern', from: 2023.45, to: 2023.65 },
      { org: 'NoxuData', role: 'Software Engineer', from: 2024.6, to: 2024.95, anchor: 'start' },
    ],
    [{ org: 'Ocular AI', role: 'Founding Design Engineer', from: 2025, to: 2026.9 }],
  ];

  const VERSIONS = [
    { v: 1, name: 'v1 · Original', note: 'The very first blueprint, as it appeared on the style iterations page: five rooms, four dashed doors, and the career path as three dimension lines.' },
    { v: 2, name: 'v2 · Entry and doorways', note: 'An entry hall with a front door, and a doorway into every room so they all connect. Pick how the doorways are drawn: full swings, or (with only the front door keeping its swing) a dotted mark. The timeline adds the internships, top to bottom: Dartmouth, the internships with NoxuData, then Ocular AI, with a link to the full timeline.' },
  ];
  // v1: the very first blueprint, exactly as it appeared as option 1 on /lab/styles
  const original = (n) => {
    const FIRST = [
      { key: 'about', x: 80, y: 70, w: 380, h: 250, use: 'Living room' },
      { key: 'skills', x: 460, y: 70, w: 230, h: 200, use: 'Workshop' },
      { key: 'writing', x: 690, y: 70, w: 190, h: 200, use: 'Library' },
      { key: 'work', x: 460, y: 270, w: 420, h: 290, use: 'Gallery' },
      { key: 'api', x: 80, y: 320, w: 200, h: 240, use: 'Utility' },
    ];
    const CAREER = [
      { org: 'Ocular AI', role: 'Founding Design Engineer', from: 2025, to: 2026.9 },
      { org: 'NoxuData', role: 'Software Engineer', from: 2024.6, to: 2024.95 },
      { org: 'Dartmouth', role: 'B.A. Computer Science + HCD', from: 2020.7, to: 2024.4 },
    ];
    return (
      <div className="hp-frame" ref={(el) => { frames.current[n] = el; }} style={{ aspectRatio: `${W} / ${H}` }}>
        <div className={`hp-stage sl-stage sl-blueprint ${dark ? 'sl-dark' : 'sl-light'}`} style={{ height: H }}>
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
          {FIRST.map((r) => (
            <a key={r.key} className="sl-room" style={{ left: r.x, top: r.y, width: r.w, height: r.h }}>
              <span className="sl-room-use">{r.use}</span>
              <span className="sl-room-t">{SECTIONS[r.key].title}</span>
              {peek(r.key)}
            </a>
          ))}
          <div className="sl-bp-title">
            <div className="sl-bp-row sl-bp-row-head"><span>Project</span><span>Sheet A-01</span></div>
            <div className="sl-bp-who"><span className="sl-photo" style={{ backgroundImage: "url('/images/mc.jpg')" }} /><div><div className="sl-name">Maria Cristoforo</div><div className="sl-tag">thinks like a designer, executes like an engineer</div></div></div>
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
        </div>
      </div>
    );
  };

  const sheet = ({ v }, n) => {
    if (v === 1) return original(n);
    const lanes = LANES_V2;
    const axisY = 40 + lanes.length * 44 + 6;
    return (
      <div className="hp-frame" ref={(el) => { frames.current[n] = el; }} style={{ aspectRatio: `${W} / ${H}` }}>
          <div className={`hp-stage sl-stage sl-blueprint ${dark ? 'sl-dark' : 'sl-light'}`} style={{ height: H }}>
            <span className="sl-bp-grid" />
            <svg className="sl-full sl-bp-plan" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
              <path d={WALLS_OUTER} className="sl-bp-outer" />
              <path d={WALLS_INNER} className="sl-bp-wall" />
              {doorStyle === 'fins'
                ? DOORS.map((d) => <path key={d} d={d} className="bp-door" />)
                : [<path key="front" d={FRONT_DOOR} className="bp-door" />,
                  ...GAPS.flatMap((g, i) => doorMarks(g, doorStyle).map(([cls, d], j) => <path key={`${i}-${j}`} d={d} className={cls} />))]}
              <path d="M80,620 H880 M80,612 v16 M880,612 v16" className="sl-bp-dim" />
              <text x="480" y="648" className="sl-bp-dimt">24′ – 0″</text>
              <text x="360" y="590" className="bp-in">IN ↑</text>
            </svg>
            {ROOMS.map((r) => (
              <a key={r.key} className="sl-room" style={{ left: r.x, top: r.y, width: r.w, height: r.h }}>
                <span className="sl-room-use">{r.use}</span>
                <span className="sl-room-t">{SECTIONS[r.key].title}</span>
                {peek(r.key)}
              </a>
            ))}
            <div className="bp-entry" style={{ left: 280, top: 320, width: 180, height: 240 }}>
              <span className="sl-room-use">Entry</span>
              <span className="bp-entry-t">Start here</span>
            </div>
            <div className="sl-bp-title">
              <div className="sl-bp-row sl-bp-row-head"><span>Project</span><span>Sheet A-01</span></div>
              <div className="sl-bp-who"><span className="sl-photo" style={{ backgroundImage: "url('/images/mc.jpg')" }} /><div><div className="sl-name">Maria Cristoforo</div><div className="sl-tag">thinks like a designer, executes like an engineer</div></div></div>
              <div className="sl-bp-row"><span>Role</span><span>Design Engineer, Ocular AI (YC W24)</span></div>
              <div className="sl-bp-row"><span>Site</span><span>San Francisco, CA</span></div>
              <div className="sl-bp-row"><span>Scale</span><span>1 : 1 human</span></div>
              <span className="sl-cta">Contact</span>
            </div>
            <div className="bp-career">
              <div className="bp-career-head">
                <div className="sl-label">Section B — Career path</div>
                <a className="bp-more" href="/about/changelog">View full timeline →</a>
              </div>
              <svg viewBox={`0 0 ${W} 320`} aria-hidden="true">
                {lanes.map((lane, li) => lane.map((c) => {
                  const y = 40 + li * 44;
                  return (<g key={c.org}>
                    <path d={`M${X(c.from)},${y} H${X(c.to)} M${X(c.from)},${y - 7} v14 M${X(c.to)},${y - 7} v14`} className="sl-bp-span" />
                    <path d={`M${X(c.from)},${y + 7} V${axisY} M${X(c.to)},${y + 7} V${axisY}`} className="bp-ext" />
                    <text x={c.anchor === 'start' ? X(c.from) : (X(c.from) + X(c.to)) / 2} y={y - 12} className="sl-bp-spant" style={c.anchor === 'start' ? { textAnchor: 'start' } : undefined}>{c.org} · {c.role}</text>
                  </g>);
                }))}
                <path d={`M${X(2020)},${axisY} H${X(2026.9)}`} className="sl-bp-axis" />
                {years.map((y) => (<g key={y}><path d={`M${X(y)},${axisY - 8} v16`} className="sl-bp-axis" /><text x={X(y)} y={axisY + 30} className="sl-bp-year">{y}</text></g>))}
              </svg>
            </div>
          </div>
        </div>
    );
  };

  return (
    <div className="hp sl">
      <div className="sl-bar" role="group" aria-label="Preview mode">
        <span className="sl-bar-label">Mode</span>
        <button type="button" className={!dark ? 'sl-on' : undefined} aria-pressed={!dark} onClick={() => setDark(false)}>Light</button>
        <button type="button" className={dark ? 'sl-on' : undefined} aria-pressed={dark} onClick={() => setDark(true)}>Dark</button>
      </div>
      {VERSIONS.map((ver, n) => (
        <section key={ver.v} className="hp-slide">
          <header className="hp-slide-head">
            <span className="hp-num">{`v${ver.v}`}</span>
            <div><h2>{ver.name}</h2><p>{ver.note}</p></div>
          </header>
          {ver.v === 2 && (
            <div className="bp-picker" role="group" aria-label="Doorway style">
              <span className="sl-bar-label">Doorways</span>
              {DOOR_STYLES.map(([k, label]) => (
                <button key={k} type="button" className={doorStyle === k ? 'sl-on' : undefined} aria-pressed={doorStyle === k} onClick={() => setDoorStyle(k)}>{label}</button>
              ))}
            </div>
          )}
          {sheet(ver, n)}
        </section>
      ))}
    </div>
  );
};
