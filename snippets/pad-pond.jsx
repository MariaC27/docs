// Overview pages: lily pads holding each page's preview. Styles in /style.css (.lp-*).
// Images are background images, not <img>: Mintlify wraps <img> in its click-to-zoom.
// Mintlify keeps only the imported export from a snippet, so everything lives inside PadPond.
// Each pad is a leaf lying flat in perspective with the preview standing on it on an easel.
// Leaf wobble varies per pad and the notch alternates sides, so no two pads match.

export const PadPond = ({ items = [] }) => {
  // 3D pad, drawn already in perspective (an ellipse) in a 300×190 box.
  const CX = 150, CY = 120, RX = 135, RY = 56;
  const rad = (d) => (d * Math.PI) / 180;
  const at = (t, r) => [CX + RX * r * Math.cos(rad(t)), CY + RY * r * Math.sin(rad(t))];
  const pt = ([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`;
  const leafPath = (seed, left) => {
    // the notch faces the viewer (y grows toward them), front-right or front-left
    const a1 = left ? 124 : 38, a2 = left ? 142 : 56;
    const pts = [];
    for (let t = a2; t <= a1 + 360; t += 3) {
      const r = 1 + 0.022 * Math.sin(rad(5 * t + seed * 40)) + 0.012 * Math.sin(rad(11 * t + seed * 90));
      pts.push(pt(at(t, r)));
    }
    return `M${CX},${CY - 2} L${pts.join(' L')} Z`;
  };
  const veins = () => {
    const out = [];
    for (let t = 72; t < 396; t += 26) {
      const [ex, ey] = at(t, 0.9), [qx, qy] = at(t + 5, 0.5);
      out.push(`M${CX},${CY - 2} Q${qx.toFixed(1)},${qy.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}`);
    }
    return out.join(' ');
  };

  const easelPad = (it, n) => {
    const id = `lp${n}`;
    const leaf = leafPath(n + 1, n % 2 === 1);
    return (
      <span className="lp-scene">
        <svg className="lp-art" viewBox="0 0 300 190" aria-hidden="true">
          <defs>
            <radialGradient id={`${id}-top`} cx="42%" cy="38%" r="70%">
              <stop offset="0" className="lp-s-hi" />
              <stop offset="1" className="lp-s-lo" />
            </radialGradient>
            <linearGradient id={`${id}-rim`} gradientUnits="userSpaceOnUse" x1="0" y1={CY - RY} x2="0" y2={CY + RY}>
              <stop offset="0.35" className="lp-s-rim" stopOpacity="0" />
              <stop offset="1" className="lp-s-rim" />
            </linearGradient>
            <filter id={`${id}-blur`} x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
            <filter id={`${id}-blur2`} x="-30%" y="-100%" width="160%" height="300%">
              <feGaussianBlur stdDeviation="3.5" />
            </filter>
          </defs>
          {/* water: flattened ripple rings around the pad */}
          <ellipse className="lp-ring lp-ring-1" cx={CX} cy={CY + 4} rx={RX * 1.08} ry={RY * 1.1} />
          <ellipse className="lp-ring lp-ring-2" cx={CX} cy={CY + 4} rx={RX * 1.08} ry={RY * 1.1} />
          {/* shadow under the pad, then its thickness, then the top surface */}
          <ellipse className="lp-shadow" cx={CX + 4} cy={CY + 14} rx={RX * 0.97} ry={RY * 0.85} filter={`url(#${id}-blur)`} />
          <path className="lp-under" d={leaf} transform="translate(0 3)" />
          <path className="lp-top" d={leaf} fill={`url(#${id}-top)`} />
          <path className="lp-veins" d={veins()} />
          <path className="lp-rim" d={leaf} stroke={`url(#${id}-rim)`} />
          {/* the easel's shadow falling back across the leaf */}
          <ellipse className="lp-shadow" cx={CX + 20} cy={CY - 8} rx="72" ry="10" filter={`url(#${id}-blur2)`} />
          {/* stand: a slim hairline A-frame — back leg, then the two front legs */}
          <path className="lp-easel-leg lp-easel-back" d="M150,10 L158,100" />
          <path className="lp-easel-leg" d="M150,4 L86,140 M150,4 L214,140" />
        </svg>
        <span className="lp-card" style={{ backgroundImage: `url('${it.img}')` }} role="img" aria-label={`${it.title} preview`} />
      </span>
    );
  };

  return (
    <div className="lp-pond">
      {items.map((it, n) => (
        <a key={it.href} href={it.href} className={`lp-pad lp-p${(n % 4) + 1}`}>
          {easelPad(it, n)}
          <span className="lp-title">{it.title}</span>
          <span className="lp-desc">{it.desc}</span>
          <span className="lp-path">{it.href}</span>
        </a>
      ))}
    </div>
  );
};
