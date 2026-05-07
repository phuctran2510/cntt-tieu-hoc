import { TYPE_CONFIG } from '../data/curriculum';

export function TypeBadge({ type, size = 'sm' }) {
  const c = TYPE_CONFIG[type] || { label: type, color: '#555', bg: '#eee', icon: '📌' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: size === 'sm' ? 11 : 12.5,
      fontWeight: 700, padding: size === 'sm' ? '3px 8px' : '4px 12px',
      borderRadius: 99, background: c.bg, color: c.color, whiteSpace: 'nowrap',
    }}>
      {c.icon} {c.label}
    </span>
  );
}

export function SectionLabel({ children, style = {} }) {
  return (
    <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6e6e9a', marginBottom: 12, ...style }}>
      {children}
    </div>
  );
}

export function Card({ children, style = {}, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: '#fff', border: '1px solid #e4e4f0',
      borderRadius: 18, overflow: 'hidden', ...style,
      cursor: onClick ? 'pointer' : 'default',
    }}>
      {children}
    </div>
  );
}

export function InfoBox({ type = 'outcome', children }) {
  const s = {
    outcome: { bg: '#f0fdf4', border: '#22c55e', color: '#166534', icon: '🎯' },
    product: { bg: '#f0f9ff', border: '#38bdf8', color: '#0369a1', icon: '📦' },
    note: { bg: '#fffbeb', border: '#f59e0b', color: '#92400e', icon: '💡' },
    theory: { bg: '#eef2ff', border: '#818cf8', color: '#4f46e5', icon: '📚' },
  }[type];
  return (
    <div style={{ display: 'flex', gap: 10, padding: '13px 15px', borderRadius: 10, borderLeft: `3px solid ${s.border}`, background: s.bg, color: s.color, fontSize: 13.5, lineHeight: 1.65, alignItems: 'flex-start' }}>
      <span style={{ flexShrink: 0, marginTop: 1 }}>{s.icon}</span>
      <span>{children}</span>
    </div>
  );
}

export function ExerciseBadge({ type }) {
  const cfg = { easy: { bg: '#dcfce7', color: '#166534', label: '⭐ Cơ bản' }, medium: { bg: '#fef3c7', color: '#92400e', label: '⭐⭐ Trung bình' }, hard: { bg: '#fee2e2', color: '#991b1b', label: '⭐⭐⭐ Nâng cao' } }[type] || {};
  return (
    <span style={{ fontSize: 10.5, fontWeight: 700, padding: '3px 9px', borderRadius: 99, background: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </span>
  );
}
