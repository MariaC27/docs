// Lab: lily pad asset options, shown on both paintings with real labels, the way the homepage uses them.
// Images in /images/lab/pads/. Mintlify keeps only the imported export, so everything lives inside PadLab.

export const PadLab = () => {
  const PADS = [
    { key: 'a-current', name: '1 · Current', note: 'The watercolor asset on the site today. Sharp edges, high contrast and glossy droplets: the most realistic thing on the page.' },
    { key: 'b-soft', name: '2 · Softened', note: 'The same leaf with its fine texture smoothed out and the contrast lowered. Calmer, but it starts to look muddy and grey.' },
    { key: 'c-painted', name: '3 · Cut from the painting', note: 'The lily pad painted into the background, lifted out. Same brushwork, colors and flat perspective as the painting, so it can’t clash.' },
    { key: 'c1-light', name: '3a · Lightly muted', note: 'Option 3 with the droplets painted out and a touch less contrast and color. The smallest step away from realistic.' },
    { key: 'c2-muted', name: '3b · Muted', note: 'Broader brush fields, softer contrast, a little lighter. Detail turns into washes, but it keeps its color, unlike option 2.' },
    { key: 'c3-painterly', name: '3c · Painterly', note: 'Reduced to a handful of flat washes, like the color fields in the painting. Of the 3a–3e versions, the most like an illustration.' },
    { key: 'c4-in-water', name: '3d · In the water', note: 'Muted, then washed toward the pond\u2019s water color and made slightly see-through, so it sits in the scene instead of on top of it.' },
    { key: 'c5-airy', name: '3e · Airy', note: 'Lighter and paler, washed toward a soft sage. The gentlest on the sunlit pond; on the dark pond it glows a little.' },
    { key: 'd-flat', name: '4 · Flat watercolor', note: 'One soft wash in the painting’s greens with faint veins and no droplets. The least realistic: closer to an illustration.' },
  ];
  const LABELS = ['Skills', 'Writing', 'Case Studies', 'API'];
  return (
    <div className="pl">
      {PADS.map((p, n) => (
        <section key={p.key} className="hp-slide">
          <header className="hp-slide-head">
            <div><h2>{p.name}</h2><p>{p.note}</p></div>
          </header>
          <div className="pl-water" style={{ backgroundImage: "url('/images/pond/pond.jpg')" }}>
            {LABELS.map((l, i) => (
              <div key={l} className={`pl-pad pl-p${i + 1}`}>
                <span className="pl-leaf" style={{ backgroundImage: `url('/images/lab/pads/${p.key}.png')`, transform: `rotate(${[-6, 8, -3, 5][i]}deg) scaleX(${i % 2 ? -1 : 1})` }} />
                <span className="pl-label">{l}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
