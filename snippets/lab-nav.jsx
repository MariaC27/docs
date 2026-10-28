// Navigation shared by the lab pages (/lab/*). The lab is a standalone, unlisted area: no site
// sidebar or navbar, only this bar to move between its pages. Styles in /style.css (.al-*).

export const LabNav = ({ current }) => {
  const pages = [
    ['overview', 'Lab', '/lab/overview'],
    ['design-system', 'Design system', '/lab/design-system'],
    ['process', 'Process log', '/lab/process'],
    ['prototypes', 'Prototypes', '/lab/prototypes'],
    ['art-styles', 'Art direction', '/lab/art-styles'],
  ];
  return (
    <nav className="al-nav" aria-label="Lab">
      <span className="al-nav-mark">Maria’s Design Lab</span>
      <div className="al-nav-links">
        {pages.map(([key, label, href]) => (
          <a key={key} href={href} className={key === current ? 'al-nav-on' : undefined} aria-current={key === current ? 'page' : undefined}>{label}</a>
        ))}
      </div>
    </nav>
  );
};
