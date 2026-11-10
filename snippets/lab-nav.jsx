// Header shared by every lab page (/lab/*). The lab is a standalone, unlisted area: no site
// sidebar or navbar, only this bar. Pages are grouped into Layouts, Art and UI menus (open on
// hover, or on focus/tap), with the process log and design system as their own links.
// Styles in /style.css (.al-nav*). Every lab page sits in the same 1240px frame, so this bar
// is in the same place on every page.

export const LabNav = ({ current }) => {
  const NAV = [
    { group: 'Layouts', pages: [
      ['prototypes', 'Homepage layouts', '/lab/prototypes'],
      ['river', 'River layouts', '/lab/river'],
    ] },
    { group: 'Art', pages: [
      ['art-styles', 'Art direction', '/lab/art-styles'],
      ['pads', 'Lily pads', '/lab/pads'],
    ] },
    { group: 'UI', pages: [
      ['ui', 'Backgrounds & fonts', '/lab/ui'],
      ['colors', 'Colors', '/lab/colors'],
    ] },
    { key: 'process', label: 'Process log', href: '/lab/process' },
    { key: 'design-system', label: 'Design system', href: '/lab/design-system' },
  ];
  const on = (key) => (key === current ? 'al-nav-on' : undefined);
  return (
    <nav className="al-nav" aria-label="Lab">
      <a className={`al-nav-mark${current === 'overview' ? ' al-nav-mark-on' : ''}`} href="/lab/overview">Maria’s Design Lab</a>
      <div className="al-nav-links">
        {NAV.map((item) => (item.group ? (
          <div key={item.group} className={`al-nav-group${item.pages.some(([k]) => k === current) ? ' al-nav-group-on' : ''}`}>
            <button type="button" className="al-nav-trigger" aria-haspopup="true">
              {item.group}
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className="al-nav-menu">
              {item.pages.map(([key, label, href]) => (
                <a key={key} href={href} className={on(key)} aria-current={key === current ? 'page' : undefined}>{label}</a>
              ))}
            </div>
          </div>
        ) : (
          <a key={item.key} href={item.href} className={`al-nav-top ${on(item.key) || ''}`} aria-current={item.key === current ? 'page' : undefined}>{item.label}</a>
        )))}
      </div>
    </nav>
  );
};
