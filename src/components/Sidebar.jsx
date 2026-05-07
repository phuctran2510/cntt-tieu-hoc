import { CHAPTERS } from '../data/curriculum';

const MAIN_NAV = [
  { key: 'home', icon: '🏠', label: 'Tổng quan' },
  { key: 'faculty', icon: '👩‍🏫', label: 'Giảng viên' },
  { key: 'search', icon: '🔍', label: 'Tìm kiếm' },
  { key: 'overview', icon: '📋', label: 'Lịch học 45 tiết' },
];

export default function Sidebar({ current, onNav }) {
  return (
    <aside className="sidebar">
      {/* Brand */}
      <div style={{ padding: '18px 18px 14px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 7 }}>
          Giáo trình 2024–2026
        </div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.35, marginBottom: 10 }}>
          Ứng dụng CNTT<br />Giáo dục Tiểu học
        </div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {['45 tiết', '6 chương', '3 TC', '12 Lab'].map(t => (
            <span key={t} style={{ fontSize: 9.5, padding: '2px 7px', borderRadius: 99, background: 'rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Main nav */}
      <div style={{ padding: '8px 0 4px' }}>
        <div style={{ padding: '5px 18px 3px', fontSize: 9, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>
          Điều hướng
        </div>
        {MAIN_NAV.map(item => (
          <SbItem key={item.key} item={item} active={current === item.key} onClick={() => onNav(item.key)} />
        ))}
      </div>

      {/* Chapters */}
      <div style={{ padding: '4px 0 16px' }}>
        <div style={{ padding: '5px 18px 3px', fontSize: 9, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>
          Các chương
        </div>
        {CHAPTERS.map(ch => (
          <SbItem
            key={ch.id}
            item={{ key: `chapter-${ch.id}`, icon: ch.emoji, label: `C${ch.id}: ${ch.title}`, count: `${ch.soTiet}t` }}
            active={current === `chapter-${ch.id}`}
            onClick={() => onNav(`chapter-${ch.id}`)}
          />
        ))}
      </div>

      {/* Footer */}
      <div style={{ marginTop: 'auto', padding: '12px 18px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 10.5, color: 'rgba(255,255,255,0.22)', lineHeight: 1.7 }}>
        Phù hợp CTGDPT 2018<br />
        Khung DigComp 2.2
      </div>
    </aside>
  );
}

function SbItem({ item, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 9,
        width: '100%', padding: '8px 18px',
        fontSize: 12.5, textAlign: 'left', cursor: 'pointer',
        color: active ? '#fff' : 'rgba(255,255,255,0.52)',
        background: active ? 'rgba(255,255,255,0.09)' : 'transparent',
        borderLeft: `2.5px solid ${active ? '#818cf8' : 'transparent'}`,
        transition: 'all 0.13s',
        border: 'none', borderLeft: `2.5px solid ${active ? '#818cf8' : 'transparent'}`,
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'rgba(255,255,255,0.52)'; e.currentTarget.style.background = 'transparent'; } }}
    >
      <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
      {item.count && (
        <span style={{ fontSize: 9.5, padding: '1px 6px', borderRadius: 99, background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>
          {item.count}
        </span>
      )}
    </button>
  );
}
