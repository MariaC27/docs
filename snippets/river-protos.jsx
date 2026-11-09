// Lab prototypes: layout options for the homepage river (career path) stops.
// Each option renders the same real stops in a fixed 1280px-wide frame, scaled to fit.
// Mintlify keeps only the imported export from a snippet, so everything lives inside RiverProtos.

export const RiverProtos = () => {
  const W = 1280;
  const frames = useRef([]);
  useEffect(() => {
    const fit = () => frames.current.forEach((f) => { if (f) f.style.setProperty('--rp-s', String(f.clientWidth / W)); });
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  const STOPS = [
    { org: 'Ocular AI', role: 'Founding Design Engineer', dates: 'Jan 2025 – Now', year: '2025',
      desc: 'Operate at the intersection of product design and software engineering on a small, fast-paced founding team.' },
    { org: 'NoxuData', role: 'Software Engineer', dates: 'Aug 2024 – Dec 2024', year: '2024',
      desc: 'Fullstack SWE reporting directly to the founders, shipping features for an AI-powered data analytics platform.' },
    { org: 'Dartmouth College', role: 'B.A. Computer Science + Human-Centered Design', dates: 'Spring 2024', year: '2024', ms: true,
      desc: 'Honors thesis on accessible development practices.' },
    { org: 'Atlassian', role: 'Support Engineer Intern', dates: 'Jun – Aug 2023', year: '2023',
      desc: 'Talked directly with customers, debugged issues, and conducted user research to improve the Confluence Cloud UX.' },
  ];

  // a lotus marker (same as the homepage)
  const Lotus = ({ s = 1 }) => {
    const petal = 'M0,0 C-3.6,-3.4 -3.6,-10.5 0,-13.5 C3.6,-10.5 3.6,-3.4 0,0 Z';
    return (
      <svg className="rp-lotus" viewBox="-20 -18 40 32" style={{ width: 40 * s, height: 32 * s }} aria-hidden="true">
        <ellipse cx="1.5" cy="5" rx="15" ry="4.5" fill="rgba(11,22,32,.14)" />
        <g transform="scale(1 .48)">{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <path key={a} d={petal} transform={`rotate(${a + 22})`} fill="#DCEFEB" stroke="rgba(18,163,148,.45)" strokeWidth=".5" />)}</g>
        {[-58, -30, 30, 58, 0].map((a) => <path key={a} d={petal} transform={`rotate(${a})`} fill="#fff" stroke="rgba(18,163,148,.45)" strokeWidth=".5" />)}
        <ellipse cx="0" cy="-1.5" rx="2.6" ry="1.5" fill="#D8C67A" />
      </svg>
    );
  };
  // a gently winding vertical river through x, from y0 to y1
  const River = ({ x, y0 = 0, y1, wiggle = 40, h }) => {
    let d = `M${x},${y0}`;
    const seg = 220;
    for (let y = y0, i = 0; y < y1; y += seg, i++) {
      const dir = i % 2 ? -1 : 1;
      d += ` C${x + dir * wiggle},${y + seg * 0.33} ${x + dir * wiggle},${y + seg * 0.66} ${x},${Math.min(y + seg, y1)}`;
    }
    return (
      <svg className="rp-river" viewBox={`0 0 ${W} ${h}`} style={{ height: h }} aria-hidden="true">
        <path d={d} stroke="#12A394" strokeOpacity=".1" strokeWidth="18" fill="none" />
        <path d={d} stroke="#12A394" strokeOpacity=".24" strokeWidth="6" fill="none" />
        <path d={d} stroke="#12A394" strokeWidth="2.2" fill="none" />
      </svg>
    );
  };

  // Every option uses the current homepage layout (alternating sides, same river and spacing);
  // only how each stop's content is displayed changes.
  const layout = (render, h = 900) => () => (
    <>
      <River x={640} y1={h} h={h} />
      {STOPS.map((st, i) => {
        const left = i % 2 === 1, top = 50 + i * 205;
        return (
          <div key={i}>
            <div className="rp-mark" style={{ left: 640 + (left ? -40 : 40) - 20, top: top + 6 }}><Lotus /></div>
            <div className={`rp-block ${left ? 'rp-r-al' : ''}`} style={{ top, left: left ? 160 : 760, width: 360 }}>
              {render(st, left)}
            </div>
          </div>
        );
      })}
    </>
  );
  const org = (st) => (st.ms ? 'Dartmouth College' : st.org);

  const OPTIONS = [
    {
      key: 'current', name: 'Current', note: 'Baseline: company as the serif title, role in medium sans, dates in teal mono, then the description. Four lines of near-equal weight compete.',
      body: layout((st) => (<>
        <div className="rp-serif" style={{ fontSize: 30 }}>{st.ms ? 'Graduated Dartmouth' : st.org}</div>
        {!st.ms && <div className="rp-role">{st.role}</div>}
        <div className="rp-date">{st.dates}</div>
        <div className="rp-desc">{st.desc}</div>
      </>)),
    },
    {
      key: 'kicker', name: 'Date as a kicker',
      note: 'Dates move to a small line above, like a magazine kicker, so the eye lands on the company first. Role sits on the same line as the company in a lighter italic serif, which ties the two together.',
      body: layout((st, left) => (<>
        <div className="rp-date" style={{ marginTop: 0, marginBottom: 6 }}>{st.dates}</div>
        <div className="rp-serif" style={{ fontSize: 32 }}>{org(st)}</div>
        <div className="rp-serif rp-it" style={{ fontSize: 20, color: '#4A5866', marginTop: 2 }}>{st.role}</div>
        <div className="rp-desc">{st.desc}</div>
      </>)),
    },
    {
      key: 'role-led', name: 'Role as the headline',
      note: 'What you did leads: the role is the serif headline and the company becomes a quiet teal label above it with the dates. Best if you want the career path to read as a story of roles rather than a list of companies.',
      body: layout((st, left) => (<>
        <div className="rp-kicker" style={{ justifyContent: left ? 'flex-end' : 'flex-start' }}>{org(st)}<span className="rp-dot" />{st.dates}</div>
        <div className="rp-serif" style={{ fontSize: 30, marginTop: 6 }}>{st.ms ? 'Graduated' : st.role}</div>
        <div className="rp-desc">{st.desc}</div>
      </>)),
    },
    {
      key: 'one-line', name: 'Title and role on one line',
      note: 'Company and role share a single line ("Ocular AI, Founding Design Engineer") with the role muted, so there is one heading instead of two. Dates sit quietly beneath; the description gets the most room.',
      body: layout((st) => (<>
        <div><span className="rp-serif" style={{ fontSize: 30 }}>{org(st)}</span><span className="rp-sub">, {st.role}</span></div>
        <div className="rp-meta-muted">{st.dates}</div>
        <div className="rp-desc">{st.desc}</div>
      </>)),
    },
    {
      key: 'chip', name: 'Dates as a chip',
      note: 'The date becomes a small tinted pill beside the company name, so it is scannable but not loud. Role in regular sans underneath; description slightly smaller and lighter so it reads as detail.',
      body: layout((st, left) => (<>
        <div className="rp-chiprow" style={{ justifyContent: left ? 'flex-end' : 'flex-start' }}>
          <span className="rp-serif" style={{ fontSize: 30 }}>{org(st)}</span>
          <span className="rp-chip">{st.dates}</span>
        </div>
        <div className="rp-role" style={{ fontWeight: 400 }}>{st.role}</div>
        <div className="rp-desc" style={{ fontSize: 14, color: '#5F6E7B' }}>{st.desc}</div>
      </>)),
    },
    {
      key: 'rule', name: 'Underlined title, short description',
      note: 'A thin teal rule under the company name anchors each stop and points back toward the river. Role and dates share one small line; the description is trimmed to one short sentence so each stop stays compact.',
      body: layout((st, left) => (<>
        <div className="rp-serif" style={{ fontSize: 30 }}>{org(st)}</div>
        <div className="rp-rule" style={{ marginLeft: left ? 'auto' : 0 }} />
        <div className="rp-meta-muted" style={{ marginTop: 10 }}>{st.role}<span className="rp-sep"> · </span>{st.dates}</div>
        <div className="rp-desc">{st.desc.split(/(?<=\.)\s/)[0]}</div>
      </>)),
    },
  ];

  return (
    <div className="rp">
      {OPTIONS.map((o, n) => (
        <section key={o.key} className="hp-slide">
          <header className="hp-slide-head">
            <span className="hp-num">{String(n + 1).padStart(2, '0')}</span>
            <div><h2>{o.name}</h2><p>{o.note}</p></div>
          </header>
          <div className="rp-frame" ref={(el) => { frames.current[n] = el; }} style={{ aspectRatio: `${W} / 900` }}>
            <div className="rp-stage" style={{ height: 900 }}>{o.body()}</div>
          </div>
        </section>
      ))}
    </div>
  );
};
