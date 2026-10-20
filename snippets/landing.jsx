// Homepage: "river path" landing. Styles live in /landing.css, scoped to .rv.
// Ported from the Claude Design prototype (Main.dc.html, v13).
// Mintlify keeps only the imported export from a snippet, so data and helpers
// live inside Landing, and helpers are called as functions rather than <Tags>.

export const Landing = () => {
  const STOPS = [
    { t: 'job', ghost: '2025', title: 'Design engineer at Ocular AI', start: 'Winter 2025', end: 'Now', bar: 'long',
      desc: 'Moved to SF to join Ocular AI (YC W24). I take features from first concept to full implementation on a five-person team, reporting to the founders.' },
    { t: 'proj', title: 'ApiLens', meta: 'Open source', img: '/images/apilens_study1_polished.png',
      desc: 'A versioning and visual diff tool for OpenAPI specs. It snapshots the spec on each merge to main and shows color-coded, field-level diffs.',
      outcome: 'Published to PyPI as openapi-lens.',
      links: [
        { label: 'Read the case study', href: '/work/apilens' },
        { label: 'GitHub', href: 'https://github.com/MariaC27/api-lens' },
        { label: 'PyPI', href: 'https://pypi.org/project/openapi-lens/' },
      ] },
    { t: 'proj', title: 'Turn-Based Audio Annotation', meta: 'Late 2025 to early 2026', img: '/images/audio_study1_blurred.png',
      desc: 'A new interface for annotating multi-speaker audio. Each turn is a row with its transcript and rubric fields, tied to a full-width waveform.',
      outcome: 'Prototyped with AI tools, validated with the partner, then built for production.',
      links: [{ label: 'Read the case study', href: '/work/turn-based-audio-annotation' }] },
    { t: 'proj', title: 'Canvas & Annotation Revamp', meta: 'At Ocular AI', img: '/images/canvas_study1_newcanvas.png',
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
    { group: 'About', icon: 'about', links: [['Skills API', '/about/skills'], ['Changelog', '/about/changelog']] },
    { group: 'Case Studies', icon: 'work', links: [
      ['Overview', '/work/overview'],
      ['Canvas Annotation Revamp', '/work/canvas-annotation-revamp'],
      ['Turn-Based Audio Annotation', '/work/turn-based-audio-annotation'],
      ['ApiLens', '/work/apilens'],
      ['This Portfolio', '/work/portfolio'],
    ] },
    { group: 'Writing', icon: 'writing', links: [
      ['Overview', '/writing/overview'],
      ['The Design Process Shift', '/writing/the-design-process-shift'],
      ['UX Friction Coefficient', '/writing/ux-friction-coefficient'],
    ] },
    { group: 'API Reference', icon: 'api', code: true, links: [
      ['GET /me', '/api/get-me'],
      ['GET /skills', '/api/get-skills'],
      ['GET /availability', '/api/get-availability'],
    ['POST /ask', '/api/post-ask'],
      ['POST /hire', '/api/post-hire'],
      ['POST /contact', '/api/post-contact'],
    ] },
  ];

  // About pad's destination. null keeps it inert; set to '/about/me' once that page exists.
  const ABOUT_ME = null;

  const PADS = [
    { title: 'Case Studies', href: '/work/overview', desc: 'Selected projects covering problem, approach, outcomes, and learnings.' },
    { title: 'Writing', href: '/writing/overview', desc: 'Thoughts on design engineering, UX friction, and building in small teams.' },
    { title: 'Skills', href: '/about/skills', desc: 'An API-style reference of languages, tools, and frameworks.' },
    { title: 'Experience', href: '/about/changelog', desc: 'Roles, companies, and milestones formatted as a software changelog.' },
    { title: 'About Me', href: ABOUT_ME, path: '/about/me' },
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
      sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
      moon: <><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /></>,
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
          {/* Background image, not <img>: Mintlify wraps <img> in its click-to-zoom */}
        <a href={s.links[0].href} className="rv-img" role="img" aria-label={`${s.title} preview`}
          style={{ backgroundImage: `url('${s.img}')` }} />
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
  const [open, setOpenState] = useState(false);
  const [instant, setInstant] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);   // the Ask-about-me sidebar
  // Mintlify re-mounts the page when the theme changes, which would reset the rail.
  // Remember it for the session and restore it without animating.
  const setOpen = (v) => {
    setOpenState(v);
    try { sessionStorage.setItem('rv-rail-open', v ? '1' : '0'); } catch (e) { /* storage blocked */ }
  };
  useEffect(() => {
    let saved = null;
    try { saved = sessionStorage.getItem('rv-rail-open'); } catch (e) { /* storage blocked */ }
    if (saved !== '1') return;
    setInstant(true);
    setOpenState(true);
    const t = setTimeout(() => setInstant(false), 50);
    return () => clearTimeout(t);
  }, []);
  const [dark, setDark] = useState(false);

  // Mintlify's navbar (and its theme switch) is hidden here, so the rail carries one.
  // It clicks Mintlify's own toggle, which stays in the page, so the choice persists site-wide.
  useEffect(() => {
    const html = document.documentElement;
    const sync = () => setDark(html.classList.contains('dark'));
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(html, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);
  const flipTheme = () => {
    const native = document.querySelector('button[aria-label="Toggle dark mode"]');
    if (native) { native.click(); return; }
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('isDarkMode', next ? 'dark' : 'light'); } catch (e) { /* storage blocked */ }
  };
  const [ps, setPs] = useState([]);
  const rowsRef = useRef([]);
  const pageRef = useRef(null);
  const lakeRef = useRef(null);
  const mainRef = useRef(null);
  const stoneRef = useRef(null);
  const heroTextRef = useRef(null);
  const [waters, setWaters] = useState(null);

  // Waterways, measured so they follow the layout and the filter:
  // headwater: a faint river from the photo, meandering behind the hero text into the timeline;
  // tailwater: where the timeline ends, the river meanders on and fades out.
  useEffect(() => {
    const trace = () => {
      const main = mainRef.current, stone = stoneRef.current, text = heroTextRef.current;
      const visible = rowsRef.current.filter((el) => el && el.offsetHeight);
      if (!main || !stone || !text || !visible.length) return;
      const m = main.getBoundingClientRect();
      const rel = (r) => ({ l: r.left - m.left, t: r.top - m.top, w: r.width, h: r.height });
      const st = rel(stone.getBoundingClientRect()), tx = rel(text.getBoundingClientRect());
      const first = rel(visible[0].querySelector('.rv-river').getBoundingClientRect());
      const last = rel(visible[visible.length - 1].querySelector('.rv-river').getBoundingClientRect());

      const px = st.l + st.w / 2, py = st.t + st.h / 2;
      const nx = first.l + first.w / 2, ny = first.t;
      const mx = tx.l + tx.w * 0.5;                        // mid-column of the hero text
      // Below the hero text, or below the pond when it stacks under the text (narrower screens)
      const lake = lakeRef.current ? rel(lakeRef.current.getBoundingClientRect()) : null;
      const low = lake && lake.t > tx.t + tx.h ? lake.t + lake.h : tx.t + tx.h + 40;
      const midY = (py + low) / 2;
      const head = `M${px},${py} C${px + 10},${py + 90} ${mx - 170},${midY - 80} ${mx},${midY} ` +
        `S${mx + 50},${low - 30} ${(mx + nx) / 2},${low + 40} ` +
        `S${nx},${ny - 130} ${nx},${ny}`;

      const lx = last.l + last.w / 2, ly = last.t + last.h;
      const cx = lx - 10, cy = ly + 170;                  // where it has faded away, above the footer
      const ty = (ly + cy) / 2;
      const tail = `M${lx},${ly} C${lx},${ly + 50} ${lx + 40},${ty - 35} ${lx + 30},${ty} ` +
        `S${cx},${cy - 50} ${cx},${cy}`;
      setWaters({ head, tail, from: [lx, ly], to: [cx, cy], h: main.scrollHeight });
    };
    trace();
    const late = [setTimeout(trace, 400), setTimeout(trace, 1400)];
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(trace);
    window.addEventListener('resize', trace);
    return () => { late.forEach(clearTimeout); window.removeEventListener('resize', trace); };
  }, [mode, open, chatOpen]);   // re-measure when the filter changes or a sidebar opens/closes
  const [drops, setDrops] = useState([]);

  // Pond: pads drift away from the pointer.
  const calm = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stir = (e) => {
    const lake = e.currentTarget;
    if (calm()) return;
    lake.querySelectorAll('.rv-slot').forEach((slot) => {
      const r = slot.getBoundingClientRect();   // includes layout shifts like the mid-width arc
      const dx = r.left + r.width / 2 - e.clientX;
      const dy = r.top + r.height / 2 - e.clientY;
      const d = Math.hypot(dx, dy) || 1;
      const push = Math.max(0, 1 - d / 280) * 24;
      slot.style.setProperty('--dx', `${((dx / d) * push).toFixed(1)}px`);
      slot.style.setProperty('--dy', `${((dy / d) * push).toFixed(1)}px`);
    });
  };
  const settle = (e) => {
    const lake = e.currentTarget;
    lake.querySelectorAll('.rv-slot').forEach((slot) => {
      slot.style.setProperty('--dx', '0px');
      slot.style.setProperty('--dy', '0px');
    });
  };
  // Any press on the page drops a ripple where it lands.
  const drop = (e) => {
    if (calm()) return;
    ripple(e.clientX, e.clientY, false);
  };
  const ripple = (clientX, clientY, soft) => {
    const root = pageRef.current;
    if (!root) return;
    const box = root.getBoundingClientRect();
    const id = `${Date.now()}-${Math.random()}`;
    setDrops((d) => [...d.slice(-7), { id, soft, x: clientX - box.left, y: clientY - box.top }]);
    setTimeout(() => setDrops((d) => d.filter((q) => q.id !== id)), soft ? 2800 : 1800);
  };

  // Ambient ripples: every few seconds a faint ring rises somewhere in open water (never on text).
  useEffect(() => {
    const WATER = '.rv, .rv-main, .rv-hero, .rv-hero-inner, .rv-body, .rv-wrap, .rv-reach, .rv-ghost, .rv-lake, .rv-footer';
    let timer;
    const rise = () => {
      if (!calm() && !document.hidden) {
        for (let tries = 0; tries < 8; tries++) {
          const x = Math.random() * window.innerWidth, y = Math.random() * window.innerHeight;
          const el = document.elementFromPoint(x, y);
          if (el && el.closest('.rv') && el.matches(WATER)) { ripple(x, y, true); break; }
        }
      }
      timer = setTimeout(rise, 3500 + Math.random() * 3500);
    };
    timer = setTimeout(rise, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Pads bob as they come into view, as if the current just reached them.
  useEffect(() => {
    const root = pageRef.current;
    if (!root || !window.IntersectionObserver) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting || calm()) return;
        const slot = en.target;
        slot.classList.remove('rv-bob');
        void slot.offsetWidth;                // restart the animation
        slot.classList.add('rv-bob');
      });
    }, { threshold: 0.6 });
    root.querySelectorAll('.rv-slot').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const root = pageRef.current;
      if (!root) return;
      const vh = window.innerHeight;
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // When the page can't scroll, or there's nothing left to scroll, show everything fully drawn.
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      const still = reduce || atEnd || root.getBoundingClientRect().height <= vh + 40;
      // The river draws to just past the bottom edge, so it always runs off the screen;
      // cards fade in a little earlier, once their middle passes 85% of the viewport.
      const riverLine = vh + 40, cardLine = vh * 0.85;
      const prog = (line, r) => Math.round(Math.max(0, Math.min(1, (line - r.top) / r.height)) * 100) / 100;
      const next = STOPS.map((_, i) => {
        const el = rowsRef.current[i];
        const r = el ? el.getBoundingClientRect() : null;
        if (still || !r || !r.height) return [1, 1];
        return [prog(riverLine, r), prog(cardLine, r)];
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
  }, [mode, open, chatOpen]);   // re-measure when the filter changes or a sidebar opens/closes

  // 3D lily pad, drawn already in perspective (an ellipse) in a 300×190 box — the same
  // leaf as the overview pages (snippets/pad-pond.jsx), minus the easel.
  const LCX = 150, LCY = 120, LRX = 135, LRY = 56;
  const lrad = (d) => (d * Math.PI) / 180;
  const lat = (t, r) => [LCX + LRX * r * Math.cos(lrad(t)), LCY + LRY * r * Math.sin(lrad(t))];
  const leafPath = (seed, left) => {
    const a1 = left ? 124 : 38, a2 = left ? 142 : 56;   // the notch, facing the viewer
    const pts = [];
    for (let t = a2; t <= a1 + 360; t += 3) {
      const r = 1 + 0.022 * Math.sin(lrad(5 * t + seed * 40)) + 0.012 * Math.sin(lrad(11 * t + seed * 90));
      const [x, y] = lat(t, r);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return `M${LCX},${LCY - 2} L${pts.join(' L')} Z`;
  };
  const leafVeins = () => {
    const out = [];
    for (let t = 72; t < 396; t += 26) {
      const [ex, ey] = lat(t, 0.9), [qx, qy] = lat(t + 5, 0.5);
      out.push(`M${LCX},${LCY - 2} Q${qx.toFixed(1)},${qy.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}`);
    }
    return out.join(' ');
  };
  const leaf3d = (n) => {
    const id = `rvp${n}`, d = leafPath(n + 3, n % 2 === 1);
    return (
      <svg className="rv-leaf3d" viewBox="0 0 300 190" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <radialGradient id={`${id}-top`} cx="42%" cy="38%" r="70%">
            <stop offset="0" className="rv-s-hi" />
            <stop offset="1" className="rv-s-lo" />
          </radialGradient>
          <linearGradient id={`${id}-rim`} gradientUnits="userSpaceOnUse" x1="0" y1={LCY - LRY} x2="0" y2={LCY + LRY}>
            <stop offset="0.35" className="rv-s-rim" stopOpacity="0" />
            <stop offset="1" className="rv-s-rim" />
          </linearGradient>
          <filter id={`${id}-blur`} x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <ellipse className="rv-leaf-shadow" cx={LCX + 4} cy={LCY + 14} rx={LRX * 0.97} ry={LRY * 0.85} filter={`url(#${id}-blur)`} />
        <path className="rv-leaf-under" d={d} transform="translate(0 3)" />
        <path className="rv-leaf-top" d={d} fill={`url(#${id}-top)`} />
        <path className="rv-leaf-veins" d={leafVeins()} />
        <path className="rv-leaf-rim" d={d} stroke={`url(#${id}-rim)`} />
      </svg>
    );
  };

  // The lily-pad pond beside the intro.
  const pond = (ref, cls) => (
    <div className={cls} ref={ref} onPointerMove={stir} onPointerLeave={settle}>
      {PADS.map((pad, n) => (
        <div key={pad.title} className={`rv-slot rv-slot-${n + 1}`}>
          <a href={pad.href || undefined} tabIndex={0} className={`rv-pad rv-p${n + 1}`}
            onClick={(e) => { if (!pad.href) e.preventDefault(); }}>
            <span className="rv-ripple" aria-hidden="true" />
            <span className="rv-pad-face">
              {leaf3d(n)}
              <span className="rv-pad-title">{pad.title}</span>
              {pad.desc && <span className="rv-pad-desc">{pad.desc}</span>}
              <span className="rv-pad-path">{pad.path || pad.href}</span>
            </span>
          </a>
        </div>
      ))}
    </div>
  );

  // ── "Ask about me": a floating chat that answers from the whole site (maria-api POST /api/ask) ──
  const ASK_URL = 'https://maria-api.vercel.app/api/ask';
  const STARTERS = [
    'What does Maria work on at Ocular?',
    'Tell me about ApiLens',
    "What's her design process like?",
    'What are her strongest skills?',
  ];
  const [chat, setChatState] = useState([]);        // [{ role: 'user' | 'assistant', content, error? }]
  const [chatInput, setChatInput] = useState('');
  const [chatBusy, setChatBusy] = useState(false);
  const chatLogRef = useRef(null);
  const chatInputRef = useRef(null);
  // Mintlify re-mounts the page on theme change; keep the conversation for the session.
  const setChat = (updater) => setChatState((prev) => {
    const next = typeof updater === 'function' ? updater(prev) : updater;
    try { sessionStorage.setItem('rv-chat', JSON.stringify(next.filter((m) => !m.error))); } catch (e) { /* storage blocked */ }
    return next;
  });
  useEffect(() => {
    try { const saved = JSON.parse(sessionStorage.getItem('rv-chat') || '[]'); if (saved.length) setChatState(saved); } catch (e) { /* ignore */ }
  }, []);
  useEffect(() => {
    if (chatOpen && chatInputRef.current) chatInputRef.current.focus();
    if (!chatOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setChatOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [chatOpen]);
  useEffect(() => {
    const log = chatLogRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [chat, chatOpen]);

  const ask = async (q) => {
    const question = (q ?? chatInput).trim();
    if (!question || chatBusy) return;
    const history = chat.filter((m) => !m.error).map(({ role, content }) => ({ role, content }));
    setChatInput('');
    setChatBusy(true);
    setChat((c) => [...c, { role: 'user', content: question }, { role: 'assistant', content: '' }]);
    const setAnswer = (fn) => setChat((c) => {
      const next = c.slice();
      next[next.length - 1] = fn(next[next.length - 1]);
      return next;
    });
    try {
      const res = await fetch(ASK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, history }),
      });
      if (!res.ok || !res.body) {
        let msg = 'Something went wrong. Try again, or use the [contact form](/api/post-contact).';
        try { msg = (await res.json()).error || msg; } catch (e) { /* not JSON */ }
        setAnswer(() => ({ role: 'assistant', content: msg, error: true }));
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        setAnswer((m) => ({ ...m, content: m.content + text }));
      }
    } catch (e) {
      setAnswer(() => ({ role: 'assistant', content: "Couldn't reach the server. Check your connection and try again.", error: true }));
    } finally {
      setChatBusy(false);
    }
  };

  // Answers use light markdown: [links](/path) and **bold**. Rendered as elements, never as HTML.
  const renderAnswer = (text) => text.split(/(\[[^\]]+\]\([^)\s]+\)|\*\*[^*]+\*\*)/g).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link && /^(\/|https?:\/\/)/.test(link[2])) {
      const external = link[2].startsWith('http');
      return <a key={i} href={link[2]} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{link[1]}</a>;
    }
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={i}>{bold[1]}</strong>;
    return part;
  });

  let k = 0;
  const rows = STOPS.map((s, i) => {
    const vis = shows(mode, s.t);
    const right = k % 2 === 0;
    const first = vis && k === 0;     // first visible stop: the muted headwater runs on to its marker
    if (vis) k++;
    const [p, q] = ps[i] ?? [1, 1];   // p: river drawn, q: card progress
    return {
      s, i, vis, first,
      x: right ? 70 : 30,
      cardSide: right ? 'rv-side-right' : 'rv-side-left',
      ghostSide: right ? 'rv-side-left' : 'rv-side-right',
      p, cls: q >= 0.5 ? 'rv-in' : 'rv-out',
    };
  });

  return (
    <div className="rv" ref={pageRef} onPointerDown={drop}>
      <span className="rv-shimmer" aria-hidden="true" />
      {drops.map((q) => (
        <span key={q.id} className={`rv-drop${q.soft ? ' rv-drop-soft' : ''}`} style={{ left: `${q.x}px`, top: `${q.y}px` }} aria-hidden="true" />
      ))}
      <nav className={`rv-rail${open ? ' rv-open' : ''}${instant ? ' rv-instant' : ''}`} aria-label="Site">
        <div className="rv-rail-inner">
          <div className="rv-rail-head">
            <button type="button" className="rv-rail-toggle" onClick={() => setOpen(!open)}
              aria-label={open ? 'Collapse navigation' : 'Expand navigation'} aria-expanded={open}>
              {railIcon({ name: 'panel' })}
            </button>
            <a className="rv-rail-name" href="/">Maria Cristoforo</a>
            <button type="button" className="rv-theme rv-theme-head" onClick={flipTheme}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
              {railIcon({ name: dark ? 'sun' : 'moon' })}
            </button>
          </div>
          {!open && (
            <div className="rv-rail-icons">
              {/* Collapsed rail: hovering (or focusing) an icon previews that section's pages;
                  clicking it opens the full sidebar rather than jumping to a page. */}
              {NAV.map((g) => (
                <div key={g.group} className="rv-fly">
                  <button type="button" className="rv-fly-btn" onClick={() => setOpen(true)}
                    aria-label={`${g.group}: open navigation`}>
                    {railIcon({ name: g.icon })}
                  </button>
                  <div className="rv-fly-panel">
                    <div className="rv-fly-card">
                      <div className="rv-tree-label">{g.group}</div>
                      {g.links.map(([label, href]) => (
                        <a key={href} href={href} className={g.code ? 'rv-tree-code' : undefined}>{label}</a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" className="rv-theme" onClick={flipTheme}
                aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
                {railIcon({ name: dark ? 'sun' : 'moon' })}
              </button>
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

      <main className="rv-main" ref={mainRef}>
        {waters && (
          <svg className="rv-waterways" style={{ height: `${waters.h}px` }} aria-hidden="true">
            <defs>
              <linearGradient id="rv-tail" gradientUnits="userSpaceOnUse"
                x1={waters.from[0]} y1={waters.from[1]} x2={waters.to[0]} y2={waters.to[1]}>
                <stop offset="0" className="rv-tail-stop" />
                <stop offset="1" className="rv-tail-stop" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g className="rv-headwater">
              <path d={waters.head} className="rv-w1" />
              <path d={waters.head} className="rv-w2" />
              <path d={waters.head} className="rv-w3" />
              <path d={waters.head} className="rv-flow" />
            </g>
            <g className="rv-tailwater">
              <path d={waters.tail} className="rv-w1" />
              <path d={waters.tail} className="rv-w2" />
              <path d={waters.tail} className="rv-w3" />
              <path d={waters.tail} className="rv-flow" />
            </g>
          </svg>
        )}
        <header className="rv-hero">
          <div className="rv-hero-inner">
            <div className="rv-hero-text" ref={heroTextRef}>
              <div className="rv-rise rv-hero-meta">
                <span>Design Engineer at Ocular AI (YC W24)</span>
                <span className="rv-hero-sep" aria-hidden="true" />
                <span>San Francisco, CA</span>
              </div>
              <div className="rv-rise rv-name-row">
                {/* Photo is a background image, not <img>: Mintlify wraps <img> in its click-to-zoom */}
                <span className="rv-stone" ref={stoneRef}>
                  <span className="rv-stone-ring" aria-hidden="true" />
                  <span className="rv-stone-ring" aria-hidden="true" />
                  <span className="rv-stone-ring" aria-hidden="true" />
                  <span className="rv-photo" role="img" aria-label="Maria Cristoforo" style={{ backgroundImage: "url('/images/mc.jpg')" }} />
                </span>
                <h1 className="rv-name">Maria Cristoforo</h1>
              </div>
              <p className="rv-rise rv-tagline">thinks like a designer, executes like an engineer</p>
              <p className="rv-rise rv-bio">I work at the intersection of design and engineering, owning features end-to-end on small, fast-moving teams.</p>
              <div className="rv-rise rv-hero-cta">
                <a href="/api/post-contact" className="rv-btn">Contact me</a>
              </div>
            </div>
            {pond(lakeRef, 'rv-rise rv-lake')}
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

            {rows.map(({ s, i, vis, first, x, cardSide, ghostSide, p, cls }) => (
              <section key={i} ref={(el) => { rowsRef.current[i] = el; }}
                className={`rv-reach rv-row-${s.t}${vis ? '' : ' rv-hide'}${first ? ' rv-row-first' : ''}`}>
                {s.ghost && <div className={`rv-ghost ${ghostSide}`} aria-hidden="true">{s.ghost}</div>}
                <div className="rv-river">
                  {riverSegment({ d: bend(x), clip: `inset(0 0 ${Math.round((1 - p) * 100)}% 0)` })}
                  <span className={`rv-dot rv-dot-${s.t} ${cls}`} style={{ left: `${x}%` }} />
                </div>
                <div className={`rv-card ${cardSide} rv-card-${s.t} ${cls}`}>
                  {stopCard({ s })}
                </div>
              </section>
            ))}

          </div>
        </div>

        <footer className="rv-footer">
          <div className="rv-footer-links">
            <a href="https://github.com/MariaC27">GitHub</a>
            <a href="/about/changelog">Full changelog</a>
            <a href="/work/portfolio">How this portfolio was built</a>
          </div>
        </footer>
      </main>

      {/* Ask about me: a right sidebar, same width as the expanded left rail, that pushes the
          page over like the rail does. Clicks inside don't drop pond ripples. */}
      <aside className={`rv-askbar${chatOpen ? ' rv-open' : ''}`} onPointerDown={(e) => e.stopPropagation()}>
        <div className="rv-askbar-inner">
          {chatOpen && (
              <section className="rv-ask-panel" role="dialog" aria-label="Ask about Maria">
                <header className="rv-ask-head">
                  <span className="rv-ask-title">Ask about Maria</span>
                  <span className="rv-ask-sub">Answers from this site</span>
                  {chat.length > 0 && (
                    <button type="button" className="rv-ask-new" onClick={() => setChat([])} disabled={chatBusy}>New chat</button>
                  )}
                  <button type="button" className="rv-ask-close" onClick={() => setChatOpen(false)} aria-label="Close chat">×</button>
                </header>
                <div className="rv-ask-log" ref={chatLogRef} aria-live="polite">
                  {chat.length === 0 && (
                    <div className="rv-ask-empty">
                      <p>Ask anything about Maria's work, skills, or experience.</p>
                      <div className="rv-ask-starters">
                        {STARTERS.map((q) => (
                          <button key={q} type="button" onClick={() => ask(q)}>{q}</button>
                        ))}
                      </div>
                    </div>
                  )}
                  {chat.map((m, i) => (
                    <div key={i} className={`rv-ask-msg rv-ask-${m.role}${m.error ? ' rv-ask-error' : ''}`}>
                      {m.role === 'assistant' && !m.content
                        ? <span className="rv-ask-typing" aria-label="Thinking"><span /><span /><span /></span>
                        : (m.role === 'assistant' ? renderAnswer(m.content) : m.content)}
                    </div>
                  ))}
                </div>
                <form className="rv-ask-form" onSubmit={(e) => { e.preventDefault(); ask(); }}>
                  <input ref={chatInputRef} value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask a question…" maxLength={600} aria-label="Your question" />
                  <button type="submit" disabled={chatBusy || !chatInput.trim()} aria-label="Send">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5" /><path d="M5 12l7-7 7 7" /></svg>
                  </button>
                </form>
              </section>
          )}
        </div>
      </aside>
      {!chatOpen && (
        <button type="button" className="rv-ask-pill" onClick={() => setChatOpen(true)} onPointerDown={(e) => e.stopPropagation()}>
          <span className="rv-ask-dot" aria-hidden="true" />
          Ask about me
        </button>
      )}
    </div>
  );
};
