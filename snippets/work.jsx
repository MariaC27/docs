// Homepage "Projects" section, rendered below the river by <Landing work={...} />.
// One item per row; the image alternates sides like the river's stops. The cards behave like
// they're floating: they bob as they come into view, the image tilts toward the cursor, and a
// ripple spreads behind it on hover. Styles live in /landing.css (.wk-*).
// Mintlify keeps only the imported export from a snippet, so everything lives inside Work.

export const Work = ({ items = [] }) => {
  const listRef = useRef(null);

  // Bob once as each row scrolls into view, like the lily pads.
  useEffect(() => {
    const list = listRef.current;
    if (!list || !window.IntersectionObserver) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('wk-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.25 });
    list.querySelectorAll('.wk-row').forEach((row) => io.observe(row));
    return () => io.disconnect();
  }, []);

  // Tilt the image toward the pointer.
  const tilt = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--wk-rx', `${(-py * 6).toFixed(2)}deg`);
    el.style.setProperty('--wk-ry', `${(px * 8).toFixed(2)}deg`);
  };
  const untilt = (e) => {
    e.currentTarget.style.setProperty('--wk-rx', '0deg');
    e.currentTarget.style.setProperty('--wk-ry', '0deg');
  };

  return (
    <div className="wk" ref={listRef}>
      {items.map((it, n) => (
        <article key={it.href} className={`wk-row${n % 2 ? ' wk-flip' : ''}`}>
          <a href={it.href} className="wk-media" onPointerMove={tilt} onPointerLeave={untilt}
            aria-label={`${it.title}: ${it.kind === 'article' ? 'read the article' : 'read the case study'}`}>
            <span className="wk-ripple" aria-hidden="true" />
            {/* Background image, not <img>: Mintlify wraps <img> in its click-to-zoom */}
            <span className="wk-img" style={{ backgroundImage: `url('${it.img}')` }} />
          </a>
          <div className="wk-text">
            <div className="wk-meta">
              <span className="wk-kind">{it.kind === 'article' ? 'Writing' : 'Project'}</span>
              {(it.meta || []).map((m) => <span key={m}><span className="wk-sep" aria-hidden="true">·</span>{m}</span>)}
            </div>
            <h3 className="wk-title"><a href={it.href}>{it.title}</a></h3>
            <p className="wk-summary">{it.summary}</p>
            {it.outcome && <p className="wk-outcome">{it.outcome}</p>}
            <div className="wk-links">
              <a href={it.href} className="wk-pill wk-pill-main">
                {it.kind === 'article' ? 'Read the article' : 'Read the case study'}
              </a>
              {(it.links || []).map((l) => (
                <a key={l.href} href={l.href} className="wk-pill" target="_blank" rel="noopener noreferrer">
                  {l.label}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7" /><path d="M8 7h9v9" /></svg>
                </a>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};
