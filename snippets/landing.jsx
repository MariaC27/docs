// Homepage: "river path" landing. Styles live in /landing.css, scoped to .rv.
// Ported from the Claude Design prototype (Main.dc.html, v13).
// Mintlify keeps only the imported export from a snippet, so data and helpers
// live inside Landing, and helpers are called as functions rather than <Tags>.

export const Landing = () => {
  const STOPS = [
    { t: 'job', ghost: '2025', title: 'Design engineer at Ocular AI', start: 'Winter 2025', end: 'Now', bar: 'long',
      desc: 'Moved to SF to join Ocular AI (YC W24). I take features from first concept to full implementation on a five-person team, reporting to the founders.' },
    { t: 'proj', ghost: '01', title: 'ApiLens', meta: 'Open source', img: 'APILENS PREVIEW IMAGE',
      desc: 'A versioning and visual diff tool for OpenAPI specs. It snapshots the spec on each merge to main and shows color-coded, field-level diffs.',
      outcome: 'Published to PyPI as openapi-lens.',
      links: [
        { label: 'Read the case study', href: '/work/apilens' },
        { label: 'GitHub', href: 'https://github.com/MariaC27/api-lens' },
        { label: 'PyPI', href: 'https://pypi.org/project/openapi-lens/' },
      ] },
    { t: 'proj', ghost: '02', title: 'Turn-Based Audio Annotation', meta: 'Late 2025 to early 2026', img: 'AUDIO ANNOTATION PREVIEW IMAGE',
      desc: 'A new interface for annotating multi-speaker audio. Each turn is a row with its transcript and rubric fields, tied to a full-width waveform.',
      outcome: 'Prototyped with AI tools, validated with the partner, then built for production.',
      links: [{ label: 'Read the case study', href: '/work/turn-based-audio-annotation' }] },
    { t: 'proj', ghost: '03', title: 'Canvas & Annotation Revamp', meta: 'At Ocular AI', img: 'CANVAS PREVIEW IMAGE',
      desc: "A full redesign of Ocular's image annotation canvas. I ran the research, worked through 8+ wireframe iterations in Figma, and built it.",
      outcome: 'Held up for over a year as the canvas expanded to other modalities.',
      links: [{ label: 'Read the case study', href: '/work/canvas-annotation-revamp' }] },
    { t: 'job', ghost: '2024', title: 'Fullstack SWE at NoxuData', start: 'Fall 2024', end: 'Winter 2024', bar: 'short',
      desc: 'Reported directly to the two founders. Learned API design fundamentals and shipped clean code on a large existing codebase.' },
    { t: 'ms', ghost: '2024', title: 'Graduated Dartmouth', date: 'Spring 2024',
      desc: 'Computer Science and Human-Centered Design, with an honors thesis on accessible development practices.' },
    { t: 'job', ghost: '2023', title: 'Support engineering at Atlassian', start: 'Summer 2023', intern: true,
      desc: 'Talked directly with customers, debugged issues, and ran user research. Saw what product support looks like at scale.' },
    { t: 'job', ghost: '2022', title: 'SWE at JHU Applied Physics Lab', start: 'Spring 2022', intern: true,
      desc: 'Built data visualization tools for global health research. Auditing a legacy internal tool sparked the interest in UX that changed my direction.' },
    { t: 'job', ghost: '2021', title: 'First startup internship', start: 'Summer 2021', intern: true,
      desc: 'Built the redesigned company website from scratch and shipped a customer-facing site with a small team.' },
    { t: 'ms', ghost: '2021', title: 'Started at the DALI Lab', date: 'Spring 2021',
      desc: 'Learned web development and UI/UX fundamentals, then designed and built full-stack on small student teams.' },
    { t: 'ms', ghost: '2020', title: 'Enrolled at Dartmouth College', date: 'Fall 2020',
      desc: 'Started out in Computer Science and Math.' },
    { t: 'ms', ghost: '2017', title: 'First line of code', date: 'Spring 2017',
      desc: 'Java, written for the FIRST Robotics Competition in high school.' },
  ];

  const NAV = [
    { group: 'About', links: [['Skills API', '/about/skills'], ['Changelog', '/about/changelog']] },
    { group: 'Case Studies', links: [
      ['Overview', '/work/overview'],
      ['Canvas Annotation Revamp', '/work/canvas-annotation-revamp'],
      ['Turn-Based Audio Annotation', '/work/turn-based-audio-annotation'],
      ['ApiLens', '/work/apilens'],
      ['This Portfolio', '/work/portfolio'],
    ] },
    { group: 'Writing', links: [
      ['Overview', '/writing/overview'],
      ['The Design Process Shift', '/writing/the-design-process-shift'],
      ['UX Friction Coefficient', '/writing/ux-friction-coefficient'],
    ] },
    { group: 'API Reference', code: true, links: [
      ['GET /me', '/api/get-me'],
      ['GET /skills', '/api/get-skills'],
      ['GET /availability', '/api/get-availability'],
      ['POST /hire', '/api/post-hire'],
      ['POST /contact', '/api/post-contact'],
    ] },
  ];

  const PADS = [
    { title: 'Case Studies', href: '/work/overview', desc: 'Selected projects covering problem, approach, outcomes, and learnings.', rot: 62 },
    { title: 'Writing', href: '/writing/overview', desc: 'Thoughts on design engineering, UX friction, and building in small teams.', rot: -128 },
    { title: 'Skills', href: '/about/skills', desc: 'An API-style reference of languages, tools, and frameworks.', rot: 118 },
    { title: 'Experience', href: '/about/changelog', desc: 'Roles, companies, and milestones formatted as a software changelog.', rot: -64 },
  ];

  const FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'projects', label: 'Projects', mark: 'proj' },
    { key: 'jobs', label: 'Roles', mark: 'job' },
    { key: 'milestones', label: 'Milestones', mark: 'ms' },
  ];

  const shows = (mode, t) =>
    mode === 'all' || (mode === 'projects' && t === 'proj') || (mode === 'jobs' && t === 'job') || (mode === 'milestones' && t === 'ms');

  // Every segment leaves and rejoins the column's center, so any filtered subset
  // still joins into one line; it bows toward the side the card sits on.
  const bend = (x) => `M50,0 C50,30 ${x},20 ${x},50 C${x},80 50,70 50,100`;

  const railIcon = ({ name }) => {
    const paths = {
      panel: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16" /></>,
      about: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c1-4 3.8-6 7-6s6 2 7 6" /></>,
      work: <><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></>,
      writing: <><path d="M4 20l1-5L16 4l4 4L9 19l-5 1z" /><path d="M14 6l4 4" /></>,
      api: <><path d="M8 7l-5 5 5 5" /><path d="M16 7l5 5-5 5" /></>,
    };
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {paths[name]}
      </svg>
    );
  };

  const riverSegment = ({ d, clip }) => (
    <div className="rv-clip" style={{ clipPath: clip }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d={d} className="rv-w1" vectorEffect="non-scaling-stroke" />
        <path d={d} className="rv-w2" vectorEffect="non-scaling-stroke" />
        <path d={d} className="rv-w3" vectorEffect="non-scaling-stroke" />
        <path d={d} className="rv-flow" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );

  const stopCard = ({ s }) => {
    if (s.t === 'proj') {
      return (
        <>
          <div className="rv-img">[{s.img}]</div>
          <div className="rv-eyebrow rv-gap-top"><span className="rv-tag rv-tag-proj">Project</span><span>{s.meta}</span></div>
          <h2 className="rv-title-proj">{s.title}</h2>
          <p className="rv-desc">{s.desc}</p>
          <p className="rv-outcome">{s.outcome}</p>
          <div className="rv-links">
            {s.links.map((l) => <a key={l.href} href={l.href} className="rv-link">{l.label}</a>)}
          </div>
        </>
      );
    }
    if (s.t === 'job') {
      return (
        <>
          <div className="rv-eyebrow">
            <span className="rv-tag rv-tag-job">Role</span>
            {s.intern && <span>Internship</span>}
          </div>
          <h2 className="rv-title-job">{s.title}</h2>
          <div className="rv-span">
            <span>{s.start}</span>
            {s.end && <><span className={`rv-bar rv-bar-${s.bar}`} /><span>{s.end}</span></>}
          </div>
          <p className="rv-desc">{s.desc}</p>
        </>
      );
    }
    return (
      <>
        <div className="rv-eyebrow"><span className="rv-tag rv-tag-ms">Milestone</span><span>{s.date}</span></div>
        <h3 className="rv-title-ms">{s.title}</h3>
        <p className="rv-desc rv-desc-sm">{s.desc}</p>
      </>
    );
  };

  const [mode, setMode] = useState('all');
  const [open, setOpen] = useState(false);
  const [ps, setPs] = useState([]);
  const rowsRef = useRef([]);
  const pageRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const root = pageRef.current;
      if (!root) return;
      const vh = window.innerHeight;
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // When the page can't scroll, show everything fully drawn.
      const still = reduce || root.getBoundingClientRect().height <= vh + 40;
      const line = vh * 0.7;
      const next = STOPS.map((_, i) => {
        const el = rowsRef.current[i];
        const r = el ? el.getBoundingClientRect() : null;
        if (still || !r || !r.height) return 1;
        return Math.round(Math.max(0, Math.min(1, (line - r.top) / r.height)) * 100) / 100;
      });
      setPs((prev) => (prev.join() === next.join() ? prev : next));
    };
    const tick = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = 0; measure(); });
    };
    window.addEventListener('scroll', tick, true);
    window.addEventListener('resize', tick);
    measure();
    const late = setTimeout(tick, 400);
    return () => {
      window.removeEventListener('scroll', tick, true);
      window.removeEventListener('resize', tick);
      clearTimeout(late);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mode]);

  let k = 0;
  const rows = STOPS.map((s, i) => {
    const vis = shows(mode, s.t);
    const right = k % 2 === 0;
    if (vis) k++;
    const p = ps[i] ?? 1;
    return {
      s, i, vis,
      x: right ? 70 : 30,
      cardSide: right ? 'rv-side-right' : 'rv-side-left',
      ghostSide: right ? 'rv-side-left' : 'rv-side-right',
      p, cls: p >= 0.5 ? 'rv-in' : 'rv-out',
    };
  });

  return (
    <div className="rv" ref={pageRef}>
      <nav className={`rv-rail${open ? ' rv-open' : ''}`} aria-label="Site">
        <div className="rv-rail-inner">
          <div className="rv-rail-head">
            <button type="button" className="rv-rail-toggle" onClick={() => setOpen(!open)}
              aria-label={open ? 'Collapse navigation' : 'Expand navigation'} aria-expanded={open}>
              {railIcon({ name: 'panel' })}
            </button>
            <a className="rv-rail-name" href="/">Maria Cristoforo</a>
          </div>
          {!open && (
            <div className="rv-rail-icons">
              <a href="/about/skills" aria-label="About">{railIcon({ name: 'about' })}</a>
              <a href="/work/overview" aria-label="Case studies">{railIcon({ name: 'work' })}</a>
              <a href="/writing/overview" aria-label="Writing">{railIcon({ name: 'writing' })}</a>
              <a href="/api/get-me" aria-label="API reference">{railIcon({ name: 'api' })}</a>
            </div>
          )}
          {open && (
            <div className="rv-tree">
              {NAV.map((g) => (
                <div key={g.group} className="rv-tree-group">
                  <div className="rv-tree-label">{g.group}</div>
                  {g.links.map(([label, href]) => (
                    <a key={href} href={href} className={g.code ? 'rv-tree-code' : undefined}>{label}</a>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main className="rv-main">
        <header className="rv-hero">
          <div className="rv-hero-inner">
            <div className="rv-rise rv-hero-meta">
              <span>San Francisco, CA</span>
              <span className="rv-hero-sep" aria-hidden="true" />
              <span>Building at Ocular AI (YC W24)</span>
            </div>
            <h1 className="rv-rise rv-name">Maria<br />Cristoforo</h1>
            <p className="rv-rise rv-tagline">thinks like a designer, executes like an engineer</p>
            <p className="rv-rise rv-bio">I work at the intersection of design and engineering, owning features end-to-end on small, fast-moving teams.</p>
            <div className="rv-rise rv-hero-cta">
              <a href="/api/post-contact" className="rv-btn">Say hello</a>
              <a href="#river" className="rv-link" onClick={() => setMode('projects')}>Jump to projects</a>
            </div>
          </div>
        </header>

        <div className="rv-body">
          <div className="rv-wrap">
            <div className="rv-filter" id="river">
              <div role="group" aria-label="Filter the timeline" className="rv-filter-pill">
                {FILTERS.map((f) => (
                  <button key={f.key} type="button" className={`rv-seg${mode === f.key ? ' rv-on' : ''}`}
                    aria-pressed={mode === f.key} onClick={() => setMode(f.key)}>
                    {f.mark && <span className={`rv-mark rv-mark-${f.mark}`} />}
                    <span>{f.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rv-reach rv-end rv-end-top">
              <div className="rv-river">
                <span className="rv-pulse" />
                <span className="rv-spring" />
              </div>
              <div className="rv-card rv-side-right rv-end-label">Now</div>
            </div>

            {rows.map(({ s, i, vis, x, cardSide, ghostSide, p, cls }) => (
              <section key={i} ref={(el) => { rowsRef.current[i] = el; }}
                className={`rv-reach rv-row-${s.t}${vis ? '' : ' rv-hide'}`}>
                <div className={`rv-ghost ${ghostSide}`} aria-hidden="true">{s.ghost}</div>
                <div className="rv-river">
                  {riverSegment({ d: bend(x), clip: `inset(0 0 ${Math.round((1 - p) * 100)}% 0)` })}
                  <span className={`rv-dot rv-dot-${s.t} ${cls}`} style={{ left: `${x}%` }} />
                </div>
                <div className={`rv-card ${cardSide} rv-card-${s.t} ${cls}`}>
                  {stopCard({ s })}
                </div>
              </section>
            ))}

            <div className="rv-reach rv-end rv-end-bottom">
              <div className="rv-river">
                <span className="rv-pulse" />
                <span className="rv-spring" />
              </div>
              <div className="rv-card rv-side-right rv-end-label">The source</div>
            </div>
          </div>
        </div>

        <section className="rv-explore">
          <div className="rv-explore-inner">
            <div className="rv-label">Explore</div>
            <div className="rv-pond">
              {PADS.map((pad, n) => (
                <a key={pad.href} href={pad.href} className={`rv-pad rv-p${n + 1}`}>
                  <span className="rv-ripple" aria-hidden="true" />
                  <svg className="rv-leaf" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={{ transform: `rotate(${pad.rot}deg)` }}>
                    <path className="rv-leaf-body" d="M50,50 L62.4,3.6 A48,48 0 1,1 37.6,3.6 Z" vectorEffect="non-scaling-stroke" />
                    <path className="rv-leaf-veins" d="M50,50 L50,98 M50,50 L16,84 M50,50 L84,84 M50,50 L3,52 M50,50 L97,52 M50,50 L14,18 M50,50 L86,18" vectorEffect="non-scaling-stroke" />
                  </svg>
                  <span className="rv-pad-title">{pad.title}</span>
                  <span className="rv-pad-desc">{pad.desc}</span>
                  <span className="rv-pad-path">{pad.href}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <footer className="rv-footer">
          <div className="rv-status"><span className="rv-status-dot" /><span>Status: open</span></div>
          <h2 className="rv-footer-title">Open to chat</h2>
          <p className="rv-bio">Based in San Francisco, currently building at Ocular AI (YC W24).</p>
          <a href="/api/post-contact" className="rv-btn rv-gap-top">Say hello</a>
          <div className="rv-footer-links">
            <a href="https://github.com/MariaC27">GitHub</a>
            <a href="/about/changelog">Full changelog</a>
            <a href="/work/portfolio">How this portfolio was built</a>
          </div>
        </footer>
      </main>
    </div>
  );
};
