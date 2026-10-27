// Art direction lab: the same three assets (lily pad, lotus, stone) in two candidate styles,
// "soft 3D" and "watercolor", plus a small composed scene for each. Test page only (/lab/art-styles).
// Mintlify keeps only the imported export from a snippet, so everything lives inside ArtLab.

export const ArtLab = ({ LabNav }) => {
  // ── shared geometry ────────────────────────────────────────────────────────
  const rad = (d) => (d * Math.PI) / 180;
  // a leaf in perspective: wide ellipse with a notch facing the viewer, gently wavy edge
  const leaf = (cx, cy, rx, ry, seed = 1, notch = 40) => {
    const pts = [];
    for (let t = notch + 18; t <= notch + 360; t += 3) {
      const r = 1 + 0.02 * Math.sin(rad(5 * t + seed * 40)) + 0.012 * Math.sin(rad(11 * t + seed * 90));
      pts.push(`${(cx + rx * r * Math.cos(rad(t))).toFixed(1)},${(cy + ry * r * Math.sin(rad(t))).toFixed(1)}`);
    }
    return `M${cx},${cy - 2} L${pts.join(' L')} Z`;
  };
  const veins = (cx, cy, rx, ry, notch = 40) => {
    const out = [];
    for (let t = notch + 34; t < notch + 350; t += 24) {
      const ex = cx + rx * 0.9 * Math.cos(rad(t)), ey = cy + ry * 0.9 * Math.sin(rad(t));
      const qx = cx + rx * 0.5 * Math.cos(rad(t + 5)), qy = cy + ry * 0.5 * Math.sin(rad(t + 5));
      out.push(`M${cx},${cy - 2} Q${qx.toFixed(1)},${qy.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}`);
    }
    return out.join(' ');
  };
  // an irregular pebble outline
  const pebble = (cx, cy, rx, ry, seed = 1) => {
    const pts = [];
    for (let t = 0; t < 360; t += 10) {
      const r = 1 + 0.07 * Math.sin(rad(2 * t + seed * 60)) + 0.04 * Math.sin(rad(3 * t + seed * 20));
      pts.push([cx + rx * r * Math.cos(rad(t)), cy + ry * r * Math.sin(rad(t))]);
    }
    // smooth closed curve through the points (Catmull-Rom → cubic Bézier)
    const n = pts.length;
    let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < n; i++) {
      const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
    }
    return d + ' Z';
  };
  const petal = (len, w) => `M0,0 C${-w},${-len * 0.28} ${-w * 0.9},${-len * 0.82} 0,${-len} C${w * 0.9},${-len * 0.82} ${w},${-len * 0.28} 0,0 Z`;
  // seeded random, so the hand-made irregularity is the same on every render
  const rng = (seed) => { let x = seed * 9301 + 49297; return () => { x = (x * 9301 + 49297) % 233280; return x / 233280; }; };
  // an irregular petal: asymmetric sides, a slightly off-centre, sometimes split tip
  const looseP = (len, w, r) => {
    const a = w * (0.85 + r() * 0.35), b = w * (0.85 + r() * 0.35), tip = (r() - 0.5) * w * 0.35;
    const k1 = 0.22 + r() * 0.12, k2 = 0.75 + r() * 0.12;
    return `M0,0 C${-a},${-len * k1} ${-a * 0.95 + tip},${-len * k2} ${tip},${-len} C${b * 0.9 + tip},${-len * (k2 - 0.04)} ${b},${-len * (k1 + 0.03)} 0,0 Z`;
  };
  // the lotus petal layout, varied per flower: [angle, length, width] for back ring and front fan
  const lotusPlan = (seed) => {
    const r = rng(seed);
    const back = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => [i * 45 + 18 + (r() - 0.5) * 16, 26 + r() * 8, 10 + r() * 3]);
    const front = [-64, -34, -4, 26, 58].map((a, i) => [a + (r() - 0.5) * 12, (i === 2 ? 38 : 31) + r() * 5, 10.5 + r() * 2.5]);
    return { back, front, r };
  };

  // ── SOFT 3D ────────────────────────────────────────────────────────────────
  const Soft = {
    defs: (p) => (
      <defs>
        <radialGradient id={`${p}-pad`} cx="38%" cy="30%" r="80%">
          <stop offset="0" stopColor="#E7F7F1" />
          <stop offset=".45" stopColor="#A9DCCB" />
          <stop offset="1" stopColor="#5FAF98" />
        </radialGradient>
        <linearGradient id={`${p}-padside`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3E8B77" />
          <stop offset="1" stopColor="#2A6B5B" />
        </linearGradient>
        <radialGradient id={`${p}-gloss`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff" stopOpacity=".85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${p}-petal`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#F4EBD6" />
          <stop offset=".35" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FBFEFD" />
        </linearGradient>
        <linearGradient id={`${p}-petalback`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#C9DFD7" />
          <stop offset="1" stopColor="#EEF7F4" />
        </linearGradient>
        <radialGradient id={`${p}-heart`} cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#FFE9A3" />
          <stop offset="1" stopColor="#D9A93A" />
        </radialGradient>
        <radialGradient id={`${p}-stone`} cx="34%" cy="26%" r="85%">
          <stop offset="0" stopColor="#DCE3E6" />
          <stop offset=".5" stopColor="#9DAAB2" />
          <stop offset="1" stopColor="#5D6B74" />
        </radialGradient>
        <linearGradient id={`${p}-wet`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3C8F84" stopOpacity="0" />
          <stop offset="1" stopColor="#2E7C73" stopOpacity=".55" />
        </linearGradient>
        <filter id={`${p}-blur6`} x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="6" /></filter>
        <filter id={`${p}-blur3`} x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="3" /></filter>
        <filter id={`${p}-blur1`} x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="1.2" /></filter>
      </defs>
    ),
    pad: (p, x = 0, y = 0, s = 1, seed = 1) => {
      const d = leaf(150, 100, 128, 56, seed);
      return (
        <g transform={`translate(${x} ${y}) scale(${s})`}>
          <ellipse cx="156" cy="122" rx="124" ry="40" fill="#0B3A33" opacity=".22" filter={`url(#${p}-blur6)`} />
          <path d={d} transform="translate(0 7)" fill={`url(#${p}-padside)`} />
          <path d={d} fill={`url(#${p}-pad)`} />
          <path d={veins(150, 100, 128, 56)} fill="none" stroke="#3E8B77" strokeOpacity=".28" strokeWidth="1.2" strokeLinecap="round" />
          <path d={d} fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.4" />
          <ellipse cx="108" cy="78" rx="46" ry="14" fill={`url(#${p}-gloss)`} opacity=".8" />
        </g>
      );
    },
    lotus: (p, x = 0, y = 0, s = 1) => (
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <ellipse cx="2" cy="10" rx="34" ry="9" fill="#0B3A33" opacity=".25" filter={`url(#${p}-blur3)`} />
        <g transform="scale(1 .5)">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <path key={a} d={petal(30, 11)} transform={`rotate(${a + 22})`} fill={`url(#${p}-petalback)`} />
          ))}
        </g>
        {[-62, -32, 32, 62].map((a) => (
          <path key={a} d={petal(34, 11)} transform={`rotate(${a})`} fill={`url(#${p}-petal)`} stroke="#D7E7E1" strokeWidth=".6" />
        ))}
        <path d={petal(38, 12)} fill={`url(#${p}-petal)`} stroke="#D7E7E1" strokeWidth=".6" />
        <path d="M-3,-34 C-5,-24 -4,-12 -1,-5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".9" />
        <ellipse cx="0" cy="-3" rx="7" ry="4" fill={`url(#${p}-heart)`} />
      </g>
    ),
    stone: (p, x = 0, y = 0, s = 1, seed = 1, icon = null) => (
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <ellipse cx="0" cy="20" rx="40" ry="10" fill="#0B3A33" opacity=".25" filter={`url(#${p}-blur3)`} />
        <path d={pebble(0, 0, 34, 26, seed)} fill={`url(#${p}-stone)`} />
        <path d={pebble(0, 0, 34, 26, seed)} fill={`url(#${p}-wet)`} />
        <ellipse cx="-10" cy="-12" rx="14" ry="6" fill="#fff" opacity=".55" filter={`url(#${p}-blur1)`} />
        <ellipse cx="0" cy="17" rx="40" ry="8" fill="none" stroke="#6FC9BC" strokeOpacity=".5" strokeWidth="1" />
        {icon}
      </g>
    ),
  };

  // ── WATERCOLOR (brush strokes) ─────────────────────────────────────────────
  // Shapes are built from individual strokes laid down with a brush: a pale first wash, then
  // directional strokes on top (overlapping in multiply), a crisp darker edge where the pigment
  // dried, and a broken ink line slightly off-register. No blur: dry, uneven, hand-made.
  const strokeSet = (paths, r, colors, wMin, wMax, oMin, oMax, filt) => paths.map((d, i) => (
    <path key={i} d={d} fill="none" stroke={colors[Math.floor(r() * colors.length)]}
      strokeWidth={(wMin + r() * (wMax - wMin)).toFixed(1)} strokeLinecap="round"
      opacity={(oMin + r() * (oMax - oMin)).toFixed(2)} filter={filt} />
  ));
  const padStrokes = (cx, cy, rx, ry, seed, notch = 40) => {
    const r = rng(seed), out = [];
    for (let t = notch + 30; t < notch + 350; t += 24 + r() * 10) {
      const r0 = 0.12 + r() * 0.25, r1 = 0.78 + r() * 0.2, bend = (r() - 0.5) * 14;
      const x0 = cx + rx * r0 * Math.cos(rad(t)), y0 = cy + ry * r0 * Math.sin(rad(t));
      const x1 = cx + rx * r1 * Math.cos(rad(t + bend / 4)), y1 = cy + ry * r1 * Math.sin(rad(t + bend / 4));
      const mx = (x0 + x1) / 2 + bend, my = (y0 + y1) / 2 + bend * 0.3;
      out.push(`M${x0.toFixed(1)},${y0.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`);
    }
    return out;
  };
  const Water = {
    defs: (p) => (
      <defs>
        {/* rough, slightly irregular edge: no blur, just a small wobble */}
        <filter id={`${p}-rough`} filterUnits="userSpaceOnUse" x="-400" y="-400" width="1600" height="1200">
          <feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3" />
        </filter>
        {/* dry brush: breaks a stroke up with paper texture */}
        <filter id={`${p}-dry`} filterUnits="userSpaceOnUse" x="-400" y="-400" width="1600" height="1200">
          <feTurbulence type="fractalNoise" baseFrequency=".22" numOctaves="3" seed="7" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -3 2.05" result="mask" />
          <feComposite in="SourceGraphic" in2="mask" operator="in" result="broken" />
          <feTurbulence type="fractalNoise" baseFrequency=".07" numOctaves="2" seed="5" result="w" />
          <feDisplacementMap in="broken" in2="w" scale="4" />
        </filter>
        <filter id={`${p}-paper`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3" seed="2" />
          <feColorMatrix type="matrix" values="0 0 0 0 .45  0 0 0 0 .42  0 0 0 0 .36  0 0 0 .1 0" />
        </filter>
      </defs>
    ),
    pad: (p, x = 0, y = 0, s = 1, seed = 1) => {
      const d = leaf(150, 100, 128, 56, seed);
      const r = rng(seed * 7 + 1);
      return (
        <g transform={`translate(${x} ${y}) scale(${s})`}>
          <g style={{ mixBlendMode: 'multiply' }}>
            {/* first wash, pale and uneven */}
            <path d={d} fill="#CFE6CF" opacity=".75" filter={`url(#${p}-rough)`} />
            {/* brush strokes radiating from the notch, like the leaf's growth */}
            {strokeSet(padStrokes(150, 100, 128, 56, seed * 3), r, ['#86BE93', '#78B48A', '#A9D2A9', '#6AA880'], 18, 30, .22, .38, `url(#${p}-dry)`)}
            {/* a darker second pass on the shadow side */}
            <path d={`M70,128 Q150,${150 + seed} 250,120`} fill="none" stroke="#4F8C69" strokeWidth="12" strokeLinecap="round" opacity=".25" filter={`url(#${p}-dry)`} />
            {/* hard edge where the pigment dried */}
            <path d={d} fill="none" stroke="#4A8565" strokeWidth="1.8" opacity=".75" filter={`url(#${p}-rough)`} />
            {/* loose ink veins, off-register */}
            <path d={veins(150, 100, 128, 56)} transform="translate(1.5 -1)" fill="none" stroke="#3D6E55" strokeWidth=".8" opacity=".5" strokeDasharray="22 3 9 2" filter={`url(#${p}-rough)`} />
          </g>
        </g>
      );
    },
    lotus: (p, x = 0, y = 0, s = 1, seed = 3) => {
      const { back, front, r } = lotusPlan(seed);
      return (
        <g transform={`translate(${x} ${y}) scale(${s})`}>
          <g style={{ mixBlendMode: 'multiply' }}>
            <g transform="scale(1 .5)">
              {back.map(([ang, len, w], i) => (
                <g key={i} transform={`rotate(${ang})`}>
                  <path d={looseP(len, w, r)} fill="#BCD9C6" opacity=".7" filter={`url(#${p}-rough)`} />
                  <path d={`M0,-2 Q${(r() - 0.5) * 6},${-len * 0.5} 0,${-len * 0.9}`} fill="none" stroke="#8FBEA3" strokeWidth="4" strokeLinecap="round" opacity=".35" filter={`url(#${p}-dry)`} />
                </g>
              ))}
            </g>
          </g>
          {front.map(([ang, len, w], i) => {
            const d = looseP(len, w, r);
            return (
              <g key={i} transform={`rotate(${ang})`}>
                {/* paper-white body so the flower sits on top of the pad */}
                <path d={d} fill="#FDFAF3" />
                <g style={{ mixBlendMode: 'multiply' }}>
                  {/* two strokes down the petal: cool at the base, a warm blush toward the tip */}
                  <path d={`M0,-3 Q${(r() - 0.5) * 5},${-len * 0.45} ${(r() - 0.5) * 3},${-len * 0.62}`} fill="none" stroke="#D5E5DA" strokeWidth={w * 0.9} strokeLinecap="round" opacity=".55" filter={`url(#${p}-dry)`} />
                  <path d={`M${(r() - 0.5) * 2},${-len * 0.62} L${(r() - 0.5) * 2},${-len * 0.95}`} fill="none" stroke="#E7C9BC" strokeWidth={w * 0.55} strokeLinecap="round" opacity=".5" filter={`url(#${p}-dry)`} />
                  {/* dried edge + a broken ink line, slightly off-register */}
                  <path d={d} fill="none" stroke="#B9A88F" strokeWidth="1.1" opacity=".7" filter={`url(#${p}-rough)`} />
                  <path d={d} transform="translate(.8 -.6)" fill="none" stroke="#6E6252" strokeWidth=".55" opacity=".6" strokeDasharray={`${14 + r() * 10} 3 ${6 + r() * 6} 2`} />
                </g>
              </g>
            );
          })}
          <g style={{ mixBlendMode: 'multiply' }}>
            <path d="M-6,-3 Q0,-7 6,-3" fill="none" stroke="#E0B24A" strokeWidth="4.5" strokeLinecap="round" opacity=".85" filter={`url(#${p}-dry)`} />
            {[-4, -1, 2, 4.5].map((dx, i) => <circle key={i} cx={dx} cy={-4.5 + (i % 2)} r=".8" fill="#9C7420" opacity=".7" />)}
          </g>
        </g>
      );
    },
    stone: (p, x = 0, y = 0, s = 1, seed = 1, icon = null) => {
      const d = pebble(0, 0, 34, 26, seed), r = rng(seed * 5);
      const bands = [-16, -8, 0, 8, 16].map((yy) => `M${-30 + r() * 6},${yy + (r() - 0.5) * 3} Q0,${yy - 6 + r() * 4} ${28 - r() * 6},${yy + (r() - 0.5) * 3}`);
      return (
        <g transform={`translate(${x} ${y}) scale(${s})`}>
          <g style={{ mixBlendMode: 'multiply' }}>
            <path d={`M-44,19 Q0,${27 + seed} 46,18`} fill="none" stroke="#9CC8D0" strokeWidth="7" strokeLinecap="round" opacity=".5" filter={`url(#${p}-dry)`} />
            <path d={d} fill="#C7CED2" opacity=".8" filter={`url(#${p}-rough)`} />
            <clipPath id={`${p}-clip${seed}`}><path d={d} /></clipPath>
            <g clipPath={`url(#${p}-clip${seed})`}>
              {strokeSet(bands, r, ['#9AA6AD', '#8796A0', '#B2BCC1'], 12, 16, .25, .45, `url(#${p}-dry)`)}
              <path d="M-34,14 Q0,30 34,12" fill="none" stroke="#5E6D77" strokeWidth="9" opacity=".45" filter={`url(#${p}-dry)`} />
            </g>
            <path d={d} fill="none" stroke="#56636B" strokeWidth="1.4" opacity=".7" filter={`url(#${p}-rough)`} />
          </g>
          {icon}
        </g>
      );
    },
  };

  // a tiny GitHub mark to show how icons would sit on a stone
  const ghIcon = (color) => (
    <g transform="translate(-9 -11) scale(.75)" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </g>
  );

  const panel = (key, title, blurb, S, water) => (
    <section className={`al-panel al-${key}`}>
      <header className="al-head">
        <h2>{title}</h2>
        <p>{blurb}</p>
      </header>
      <div className="al-row">
        <figure>
          <svg viewBox="0 0 300 170">{S.defs(`${key}a`)}{S.pad(`${key}a`, 0, 0, 1, 2)}</svg>
          <figcaption>Lily pad</figcaption>
        </figure>
        <figure>
          <svg viewBox="-50 -50 100 70">{S.defs(`${key}b`)}{S.lotus(`${key}b`, 0, 0, 1)}</svg>
          <figcaption>Lotus</figcaption>
        </figure>
        <figure>
          <svg viewBox="-60 -40 120 75">{S.defs(`${key}c`)}{S.stone(`${key}c`, 0, 0, 1, 3, ghIcon(key === 'soft' ? '#2F3B42' : '#3F4B52'))}</svg>
          <figcaption>Stone (header icon)</figcaption>
        </figure>
      </div>
      <figure className="al-scene">
        <svg viewBox="0 0 640 300">
          {S.defs(`${key}s`)}
          {water}
          {S.pad(`${key}s`, 10, 40, 1, 1)}
          {S.pad(`${key}s`, 300, 96, .78, 4)}
          {S.lotus(`${key}s`, 150, 132, 1.15, 5)}
          {S.lotus(`${key}s`, 560, 66, .8, 9)}
          {S.stone(`${key}s`, 548, 258, .7, 2)}
          {S.stone(`${key}s`, 604, 246, .52, 5)}
          {S.stone(`${key}s`, 486, 270, .42, 7)}
        </svg>
        <figcaption>Together on the water</figcaption>
      </figure>
    </section>
  );

  return (
    <div className="lab-root">
      {LabNav && <LabNav current="art-styles" />}
      <div className="al-intro">
        <span className="al-eyebrow">Design lab · prototype</span>
        <h1>Soft 3D vs. watercolor</h1>
        <p>The same three assets in two styles. Soft 3D is the original version; watercolor is round 2, built from brush strokes instead of blur.</p>
      </div>
      <div className="al-grid">
        {panel('soft', 'Soft 3D', 'Rendered and tactile: rounded forms, one light source from the top-left, glossy highlights, thickness and soft contact shadows.', Soft,
          <rect x="0" y="0" width="640" height="300" fill="url(#softs-gloss)" opacity="0" />)}
        {panel('wc', 'Watercolor', 'Hand-painted: broad brush strokes in overlapping washes, a crisp dried edge, a loose ink line slightly off-register, and paper texture.', Water,
          <g>
            <rect x="0" y="0" width="640" height="300" fill="#F7F3EA" />
            <g style={{ mixBlendMode: 'multiply' }}>
              {[70, 110, 150, 190, 230, 268].map((yy, i) => (
                <path key={yy} d={`M${20 + (i % 3) * 18},${yy} Q320,${yy + (i % 2 ? 10 : -8)} ${620 - (i % 2) * 30},${yy + 4}`}
                  fill="none" stroke={i % 2 ? '#B5D7DC' : '#C8E2E4'} strokeWidth={30 + (i % 3) * 8} strokeLinecap="round" opacity=".45" filter="url(#wcs-rough)" />
              ))}
            </g>
            <rect x="0" y="0" width="640" height="300" filter="url(#wcs-paper)" />
          </g>)}
      </div>
    </div>
  );
};
