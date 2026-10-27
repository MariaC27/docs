// A light/dark color swatch row for /lab/design-system.

export const Swatch = ({ name, light, dark, note }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 0', borderBottom: '1px solid rgba(127,140,150,.18)' }}>
    <div style={{ display: 'flex', flex: '0 0 auto', borderRadius: '10px', overflow: 'hidden', boxShadow: 'inset 0 0 0 1px rgba(127,140,150,.3)' }}>
      <span title={`light ${light}`} style={{ width: '44px', height: '44px', background: light, display: 'block' }} />
      <span title={`dark ${dark}`} style={{ width: '44px', height: '44px', background: dark, display: 'block' }} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
      <span style={{ fontWeight: 500 }}>{name}</span>
      <code style={{ fontSize: '12px' }}>{light} / {dark}</code>
      {note && <span style={{ fontSize: '13px', opacity: .75 }}>{note}</span>}
    </div>
  </div>
);
