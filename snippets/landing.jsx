// Homepage: "river path" landing. Styles live in /landing.css, scoped to .rv.
// Ported from the Claude Design prototype (Main.dc.html, v13).
// Mintlify keeps only the imported export from a snippet, so data and helpers
// live inside Landing, and helpers are called as functions rather than <Tags>.

export const Landing = ({ work }) => {
  const STOPS = [
    { t: 'job', ghost: '2025', title: 'Design engineer at Ocular AI', start: 'Winter 2025', end: 'Now',
      desc: 'Moved to SF to join Ocular AI (YC W24). I take features from first concept to full implementation on a five-person team, reporting to the founders.' },
    { t: 'job', ghost: '2024', title: 'Fullstack SWE at NoxuData', start: 'Fall 2024', end: 'Winter 2024',
      desc: 'Reported directly to the two founders. Learned API design fundamentals and shipped clean code on a large existing codebase.' },
    { t: 'ms', ghost: '2024', title: 'Graduated Dartmouth', date: 'Spring 2024',
      desc: 'Computer Science and Human-Centered Design, with an honors thesis on accessible development practices.' },
    { t: 'job', ghost: '2023', title: 'Support engineering at Atlassian', start: 'Summer 2023', intern: true,
      desc: 'Talked directly with customers, debugged issues, and ran user research. Saw what product support looks like at scale.' },
    { t: 'job', ghost: '2022', title: 'SWE at JHU Applied Physics Lab', start: 'Spring 2022', intern: true,
      desc: 'Built data visualization tools for global health research. Auditing a legacy internal tool sparked the interest in UX that changed my direction.' },
    { t: 'ms', ghost: '2021', title: 'Started at the DALI Lab', date: 'Spring 2021',
      desc: 'Learned web development and UI/UX fundamentals, then designed and built full-stack on small student teams.' },
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

  // Work previews that fan out of the Case Studies pad
  const WORK = [
    { title: 'Canvas & Annotation Revamp', href: '/work/canvas-annotation-revamp', img: '/images/canvas_study1_newcanvas.png' },
    { title: 'ApiLens', href: '/work/apilens', img: '/images/apilens_study1_polished.png' },
    { title: 'Turn-Based Audio Annotation', href: '/work/turn-based-audio-annotation', img: '/images/audio_study1_blurred.png' },
  ];

  // Hero pond. `slot` fixes each pad's spot: 1 top-left, 2 top-right, 3 bottom-left, 4 bottom-right, 5 centre.
  // Article previews that fan out of the Writing pad
  const WRITING = [
    { title: 'The Design Process Shift', href: '/writing/the-design-process-shift', img: '/images/design_article1_graphic.png' },
    { title: 'UX Friction Coefficient', href: '/writing/ux-friction-coefficient', img: '/images/ux_article1_overall.png' },
  ];

  const PADS = [
    { title: 'Skills', href: '/about/skills', slot: 1, desc: 'An API-style reference of languages, tools, and frameworks.' },
    { title: 'Writing', href: '/writing/overview', slot: 2, fan: WRITING, fanDir: 'down', desc: 'Thoughts on design engineering, UX friction, and building in small teams.' },
    { title: 'API', href: '/api/get-me', path: '/api/get-me', slot: 3, desc: 'A live API about me. Send requests from the playground.' },
    { title: 'Case Studies', href: '/work/overview', slot: 4, fan: WORK, fanDir: 'up' },
    { title: 'About Me', href: ABOUT_ME, path: '/about/me', slot: 5 },
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

  // Meta line under each title: dates (and Internship) in quiet mono.
  const metaLine = (parts) => (
    <div className="rv-meta">
      {parts.filter(Boolean).map((p, i) => (
        <span key={i}>{i > 0 && <span className="rv-meta-sep" aria-hidden="true">·</span>}{p}</span>
      ))}
    </div>
  );

  const stopCard = ({ s }) => {
    if (s.t === 'proj') {
      return (
        <>
          <h2 className="rv-title-proj">{s.title}</h2>
          {metaLine('proj', ['Project', s.meta])}
          {/* Background image, not <img>: Mintlify wraps <img> in its click-to-zoom */}
          <a href={s.links[0].href} className="rv-img rv-gap-top" role="img" aria-label={`${s.title} preview`}
            style={{ backgroundImage: `url('${s.img}')` }} />
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
          <h2 className="rv-title-job">{s.title}</h2>
          {metaLine([s.end ? `${s.start} – ${s.end}` : s.start, s.intern && 'Internship'])}
          <p className="rv-desc">{s.desc}</p>
        </>
      );
    }
    return (
      <>
        <h2 className="rv-title-ms">{s.title}</h2>
        {metaLine([s.date])}
        <p className="rv-desc">{s.desc}</p>
      </>
    );
  };

  const [mode, setMode] = useState('all');
  const [open, setOpenState] = useState(false);
  const [instant, setInstant] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);   // the Ask-about-me sidebar
  const [fanOpen, setFanOpen] = useState(null);      // touch: first tap on a pad with a fan opens it (pad title)
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
    if (fanOpen && !(e.target.closest && e.target.closest('.rv-has-fan'))) setFanOpen(null);
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

  // ── Lotus flowers: one blooms at every stop on the river, and a few float free on the water.
  // All of them can be picked up and dragged; stop lotuses drift back to their stop when let go.
  // Free lotuses live only in the hero pond and the footer, away from the river so they're never
  // mistaken for its stops. Each is positioned by its class in landing.css.
  // ── Header dock: social links + "add a lotus" ───────────────────────────────
  const SOCIALS = [
    { label: 'GitHub', href: 'https://github.com/MariaC27', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/maria-cristoforo/', icon: 'linkedin' },
    { label: 'Medium', href: 'https://medium.com/@maria_cristoforo', icon: 'medium' },
    { label: 'Email maria.h.cristoforo@gmail.com', href: 'mailto:maria.h.cristoforo@gmail.com', icon: 'mail' },
  ];
  const dockIcon = (name) => {
    const p = { width: 18, height: 18, viewBox: '0 0 24 24', 'aria-hidden': 'true' };
    const line = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
    if (name === 'github') return <svg {...p} {...line}><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" /></svg>;
    if (name === 'linkedin') return <svg {...p} {...line}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;
    if (name === 'medium') return <svg {...p} fill="currentColor"><ellipse cx="7" cy="12" rx="5.5" ry="5.8" /><ellipse cx="16.2" cy="12" rx="2.7" ry="5.4" /><ellipse cx="21.3" cy="12" rx="1" ry="4.9" /></svg>;
    return <svg {...p} {...line}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>;
  };

  // Add-a-lotus: drops a new free lotus into open water on screen, with a ripple.
  const LOTUS_CAP = 20;
  const [added, setAdded] = useState([]);
  const addLotus = () => {
    const root = pageRef.current;
    if (!root) return;
    const box = root.getBoundingClientRect();
    const WATER = '.rv, .rv-main, .rv-hero, .rv-hero-inner, .rv-body, .rv-wrap, .rv-reach, .rv-ghost, .rv-lake, .rv-footer, .rv-projects, .rv-projects-inner, .wk';
    let spot = null;
    for (let tries = 0; tries < 24 && !spot; tries++) {
      const x = window.innerWidth * (0.15 + Math.random() * 0.75);
      const y = window.innerHeight * (0.18 + Math.random() * 0.6);
      const el = document.elementFromPoint(x, y);
      if (el && el.closest('.rv') && el.matches(WATER)) spot = { x, y };
    }
    if (!spot) spot = { x: window.innerWidth * 0.6, y: window.innerHeight * 0.4 };
    const id = `${Date.now()}-${Math.random()}`;
    setAdded((a) => [...a.slice(-(LOTUS_CAP - 1)), { id, x: spot.x - box.left, y: spot.y - box.top, size: 0.8 + Math.random() * 0.4 }]);
    setTimeout(() => ripple(spot.x, spot.y, false), 420);
  };

  const freeLotus = (k, size) => (
    <span key={k} className={`rv-lotus-free rv-lotus-${k}`} style={{ '--ls': size }}>
      {lotus(false, 'Drag me around the pond')}
    </span>
  );
  const dragLotus = (e, returnHome) => {
    if (e.button !== undefined && e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();
    const el = e.currentTarget;
    const start = { x: e.clientX, y: e.clientY };
    const base = { x: parseFloat(el.dataset.dx || '0'), y: parseFloat(el.dataset.dy || '0') };
    const host = el.closest('section');
    if (host) host.style.zIndex = '5';
    el.classList.add('rv-lotus-held');
    try { el.setPointerCapture(e.pointerId); } catch (err) { /* not capturable */ }
    const place = (dx, dy) => {
      el.dataset.dx = String(dx);
      el.dataset.dy = String(dy);
      el.style.setProperty('--lx', `${dx}px`);
      el.style.setProperty('--ly', `${dy}px`);
    };
    const move = (ev) => place(base.x + ev.clientX - start.x, base.y + ev.clientY - start.y);
    const up = (ev) => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      el.classList.remove('rv-lotus-held');
      if (!calm()) ripple(ev.clientX, ev.clientY, true);
      if (returnHome) {
        place(0, 0);
        setTimeout(() => { if (host) host.style.zIndex = ''; }, 1600);
      } else if (host) host.style.zIndex = '';
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
  };
  const lotus = (returnHome, label) => {
    const petal = 'M0,0 C-3.6,-3.4 -3.6,-10.5 0,-13.5 C3.6,-10.5 3.6,-3.4 0,0 Z';
    return (
      <span className="rv-lotus" data-dx="0" data-dy="0" title={label}
        onPointerDown={(e) => dragLotus(e, returnHome)}>
        <svg viewBox="-20 -18 40 32" aria-hidden="true">
          <ellipse className="rv-lotus-shadow" cx="1.5" cy="5" rx="15" ry="4.5" />
          <g className="rv-lotus-outer">
            <g transform="scale(1 0.48)">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                <path key={a} className="rv-petal rv-petal-lo" d={petal} transform={`rotate(${a + 22})`} />
              ))}
            </g>
          </g>
          <g className="rv-lotus-inner">
            {[-58, -30, 30, 58, 0].map((a) => (
              <path key={a} className="rv-petal rv-petal-hi" d={petal} transform={`rotate(${a}) scale(${a === 0 ? 1 : 0.92} 1)`} />
            ))}
          </g>
          <ellipse className="rv-lotus-heart" cx="0" cy="-1.5" rx="2.6" ry="1.5" />
        </svg>
      </span>
    );
  };

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
      {freeLotus('p1', 1)}
      {freeLotus('p2', 0.85)}
      {freeLotus('p3', 0.95)}
      {PADS.map((pad, n) => (
        <div key={pad.title} className={`rv-slot rv-slot-${pad.slot || n + 1}${pad.fan ? ` rv-has-fan rv-fan-${pad.fanDir}` : ''}${pad.fan && fanOpen === pad.title ? ' rv-fan-open' : ''}`}>
          {pad.fan && (
            <div className="rv-fan" onPointerDown={(e) => e.stopPropagation()}>
              {pad.fan.map((w, i) => (
                <a key={w.href} href={w.href} className={`rv-fan-card rv-fan-${i + 1}`}>
                  {/* Background image, not <img>: Mintlify wraps <img> in its click-to-zoom */}
                  <span className="rv-fan-img" role="img" aria-label={`${w.title} preview`} style={{ backgroundImage: `url('${w.img}')` }} />
                  <span className="rv-fan-title">{w.title}</span>
                </a>
              ))}
            </div>
          )}
          <a href={pad.href || undefined} tabIndex={0} className={`rv-pad rv-p${pad.slot || n + 1}`}
            onClick={(e) => {
              if (!pad.href) { e.preventDefault(); return; }
              // On touch screens there's no hover: the first tap shows the work, the second navigates
              if (pad.fan && fanOpen !== pad.title && window.matchMedia && window.matchMedia('(hover: none)').matches) {
                e.preventDefault();
                setFanOpen(pad.title);
              }
            }}>
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
  let lastYear = null;   // each big year shows once, beside the first visible stop of that year
  const rows = STOPS.map((s, i) => {
    const vis = shows(mode, s.t);
    const right = k % 2 === 0;
    const first = vis && k === 0;
    const ghost = vis && s.ghost && s.ghost !== lastYear ? s.ghost : null;
    if (ghost) lastYear = ghost;     // first visible stop: the muted headwater runs on to its marker
    if (vis) k++;
    const [p, q] = ps[i] ?? [1, 1];   // p: river drawn, q: card progress
    return {
      s, i, vis, first, ghost,
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
      {added.map((l) => (
        <span key={l.id} className="rv-lotus-free rv-lotus-added" style={{ left: `${l.x}px`, top: `${l.y}px`, '--ls': l.size }}>
          {lotus(false, 'Drag me around the pond')}
        </span>
      ))}

      {/* Header: socials + add a lotus, as plain icons in the corner with a ripple on hover. Clicks here don't drop pond ripples. */}
      <div className={`rv-dock${chatOpen ? ' rv-dock-shift' : ''}`} onPointerDown={(e) => e.stopPropagation()}>
        {SOCIALS.map((so) => (
          <a key={so.icon} href={so.href} className="rv-dock-btn" aria-label={so.label} data-tip={so.label.split(' ')[0]}
            {...(so.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            <span className="rv-dock-ring" aria-hidden="true" />
            {dockIcon(so.icon)}
          </a>
        ))}
        <button type="button" className="rv-dock-btn rv-dock-lotus" onClick={addLotus} aria-label="Add a lotus to the pond" data-tip="Add a lotus">
          <span className="rv-dock-ring" aria-hidden="true" />
          <svg width="22" height="18" viewBox="-14 -14 28 20" aria-hidden="true">
            {[-56, -28, 0, 28, 56].map((a) => (
              <path key={a} d="M0,0 C-3.2,-3 -3.2,-9.5 0,-12 C3.2,-9.5 3.2,-3 0,0 Z" transform={`rotate(${a}) scale(${a === 0 ? 1 : 0.9} 1)`} />
            ))}
          </svg>
          <span className="rv-dock-plus" aria-hidden="true">+</span>
        </button>
      </div>
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
              <div className="rv-rise rv-hero-cta">
                <a href="/api/post-contact" className="rv-btn">Contact me</a>
              </div>
            </div>
            {pond(lakeRef, 'rv-rise rv-lake')}
          </div>
        </header>

        <div className="rv-body" id="river">
          <div className="rv-wrap">
            {/* Section tabs: anchors to the two sections below the hero */}
            <nav className="rv-tabs" aria-label="Sections">
              <a href="#river" className="rv-tab rv-tab-on" aria-current="true">Career path</a>
              <a href="#projects" className="rv-tab">Projects <span aria-hidden="true">↓</span></a>
            </nav>
            {rows.map(({ s, i, vis, first, ghost, x, cardSide, ghostSide, p, cls }) => (
              <section key={i} ref={(el) => { rowsRef.current[i] = el; }}
                className={`rv-reach rv-row-${s.t}${vis ? '' : ' rv-hide'}${first ? ' rv-row-first' : ''}`}>
                {ghost && <div className={`rv-ghost ${ghostSide}`} aria-hidden="true">{ghost}</div>}
                <div className="rv-river">
                  {riverSegment({ d: bend(x), clip: `inset(0 0 ${Math.round((1 - p) * 100)}% 0)` })}
                  <span className={`rv-dot ${cls}`} style={{ left: `${x}%` }}><span className="rv-dot-ripple" />{lotus(true, 'Drag me')}</span>
                </div>
                <div className={`rv-card ${cardSide} rv-card-${s.t} ${cls}`}>
                  {stopCard({ s })}
                </div>
              </section>
            ))}

          </div>
        </div>

        {work && (
          <section className="rv-projects" id="projects" aria-labelledby="rv-projects-label">
            <div className="rv-projects-inner">
              <nav className="rv-tabs" aria-label="Sections">
                <a href="#river" className="rv-tab">Career path <span aria-hidden="true">↑</span></a>
                <span className="rv-tab rv-tab-on" id="rv-projects-label">Projects</span>
              </nav>
              {work}
            </div>
          </section>
        )}

        <footer className="rv-footer">
          <div className="rv-footer-links">
            {/* lotuses floating beside the links, after the river ends: one left, two right */}
            {freeLotus('b1', 1.05)}
            {freeLotus('b2', 1.1)}
            {freeLotus('b3', 0.8)}
            <a href="https://github.com/MariaC27">GitHub</a>
            <a href="/api/post-contact">Contact me</a>
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
