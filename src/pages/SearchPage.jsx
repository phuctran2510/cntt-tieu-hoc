import React, { useState, useMemo } from 'react';
import { getAllLessons, TYPE_CONFIG, CHAPTERS } from '../data/curriculum';
import { TypeBadge } from '../components/UI';

function useIsMobile() {
  const [m, setM] = React.useState(() => window.innerWidth < 769);
  React.useEffect(() => {
    const h = () => setM(window.innerWidth < 769);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return m;
}

export default function SearchPage({ onNav }) {
  const [q,     setQ]     = useState('');
  const [typeF, setTypeF] = useState('all');
  const [chF,   setChF]   = useState('all');
  const mob = useIsMobile();
  const all = useMemo(() => getAllLessons(), []);

  const results = useMemo(() => {
    const ql = q.toLowerCase().trim();
    return all.filter(l => {
      if (typeF !== 'all' && l.type !== typeF) return false;
      if (chF !== 'all' && l.chapterId !== Number(chF)) return false;
      if (!ql) return true;
      const hay = [
        l.title, l.mota, l.num,
        ...(l.noiDungChinh || []),
        ...(l.tags || []),
        ...(l.congCu || []),
        ...(l.phuongPhap || []),
        l.chuanDauRa || '',
        ...(l.theory || []).flatMap(t => [t.title, t.content, ...(t.points||[])]),
        ...(l.exercises || []).flatMap(e => [e.title, e.question]),
      ].join(' ').toLowerCase();
      return hay.includes(ql);
    });
  }, [q, typeF, chF, all]);

  const hl = (text, query) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi'));
    return parts.map((p, i) => p.toLowerCase() === query.toLowerCase()
      ? <mark key={i} style={{ background:'#fef08a', borderRadius:2, padding:'0 1px' }}>{p}</mark> : p
    );
  };

  return (
    <div className="anim-up">
      <div style={{ marginBottom:18 }}>
        <h1 style={{ fontFamily:"'Fraunces',serif", fontSize: mob?20:24, fontWeight:700, marginBottom:5 }}>🔍 Tìm kiếm</h1>
        <p style={{ fontSize: mob?12.5:13.5, color:'#6e6e9a' }}>Tìm trong 45 tiết — lý thuyết, bài tập, lab, công cụ, từ khóa</p>
      </div>

      {/* Search bar */}
      <div style={{ display:'flex', alignItems:'center', gap:9, background:'#fff', border:'1.5px solid #e4e4f0', borderRadius:13, padding: mob?'10px 13px':'11px 16px', marginBottom:13, boxShadow:'0 2px 8px rgba(15,15,26,.05)' }}>
        <span style={{ fontSize:17, flexShrink:0 }}>🔍</span>
        <input autoFocus value={q} onChange={e => setQ(e.target.value)}
          placeholder="Kahoot, Scratch, AI, Bloom, Canva..."
          style={{ border:'none', outline:'none', fontSize: mob?14:14.5, width:'100%', color:'#0f0f1a', background:'none', fontFamily:"'Plus Jakarta Sans',sans-serif" }} />
        {q && <button onClick={() => setQ('')} style={{ color:'#a0a0c0', fontSize:16, padding:4, flexShrink:0, background:'none', border:'none', cursor:'pointer' }}>✕</button>}
      </div>

      {/* Filters */}
      <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:16 }}>
        {/* Type filter */}
        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
          <Chip label="Tất cả" active={typeF==='all'} onClick={() => setTypeF('all')} />
          {Object.entries(TYPE_CONFIG).map(([k, v]) => (
            <Chip key={k} label={`${v.icon}${mob?' ':' '}${mob?v.label.split(' ')[0]:v.label}`} active={typeF===k} color={v.color} bg={v.bg} onClick={() => setTypeF(k)} />
          ))}
        </div>
        {/* Chapter filter */}
        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
          <Chip label="Tất cả chương" active={chF==='all'} onClick={() => setChF('all')} />
          {CHAPTERS.map(ch => (
            <Chip key={ch.id} label={`${ch.emoji} C${ch.id}`} active={chF===String(ch.id)} color={ch.color} onClick={() => setChF(String(ch.id))} />
          ))}
        </div>
      </div>

      {/* Count */}
      <div style={{ fontSize:12.5, color:'#6e6e9a', marginBottom:12 }}>
        {q ? <span>Tìm thấy <strong style={{ color:'#0f0f1a' }}>{results.length}</strong> kết quả cho "<em>{q}</em>"</span>
           : <span>Hiển thị <strong style={{ color:'#0f0f1a' }}>{results.length}</strong> tiết học</span>}
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div style={{ textAlign:'center', padding:'40px 20px', color:'#6e6e9a' }}>
          <div style={{ fontSize:36, marginBottom:10 }}>🔍</div>
          <div style={{ fontSize:15, fontWeight:600, color:'#0f0f1a', marginBottom:5 }}>Không tìm thấy kết quả</div>
          <div style={{ fontSize:13 }}>Thử từ khóa: Kahoot, Scratch, Google Forms, OBS, AI...</div>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {results.map((l, i) => {
            const ch = CHAPTERS.find(c => c.id === l.chapterId);
            const matchSnippet = q ? [
              ...(l.theory||[]).flatMap(t=>t.points||[]),
              ...(l.noiDungChinh||[]),
              ...(l.exercises||[]).map(e=>e.question),
            ].find(s => s.toLowerCase().includes(q.toLowerCase())) : null;

            return (
              <div key={l.id} onClick={() => onNav(`lesson-${l.id}`)}
                style={{ background:'#fff', border:'1px solid #e4e4f0', borderRadius: mob?11:14, padding: mob?'12px 13px':'14px 18px', cursor:'pointer', transition:'all .12s', animation:`fadeUp .2s ease ${i*.025}s both`, display:'flex', gap:12, alignItems:'flex-start' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='#c8c8e4'; e.currentTarget.style.boxShadow='0 4px 12px rgba(15,15,26,.07)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='#e4e4f0'; e.currentTarget.style.boxShadow='none'; }}>
                <div style={{ width:4, borderRadius:4, background:ch?.color||'#ccc', alignSelf:'stretch', flexShrink:0 }} />
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', gap:7, alignItems:'center', marginBottom:5, flexWrap:'wrap' }}>
                    <span style={{ fontSize:11, color:ch?.color, fontWeight:700 }}>{ch?.emoji} C{l.chapterId}</span>
                    <span style={{ color:'#e4e4f0' }}>·</span>
                    <span style={{ fontSize:11, color:'#6e6e9a', fontFamily:"'JetBrains Mono',monospace" }}>{l.num}</span>
                    <TypeBadge type={l.type} />
                    <span style={{ fontSize:11, color:'#6e6e9a', marginLeft:'auto' }}>⏱ {l.duration}p</span>
                  </div>
                  <div style={{ fontSize: mob?13.5:14.5, fontWeight:700, color:'#0f0f1a', marginBottom:3 }}>{hl(l.title, q)}</div>
                  <div style={{ fontSize: mob?12:12.5, color:'#6e6e9a', lineHeight:1.55, marginBottom: matchSnippet?7:0 }}>{hl(l.mota, q)}</div>
                  {matchSnippet && (
                    <div style={{ fontSize:11.5, color:'#6e6e9a', background:'#fffbeb', border:'1px solid #fef3c7', borderRadius:6, padding:'5px 9px', marginBottom:7 }}>
                      📍 {hl(matchSnippet.replace(/^[\s•]+/,'').substring(0,110), q)}{matchSnippet.length>110&&'…'}
                    </div>
                  )}
                  {(l.tags||[]).length > 0 && (
                    <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
                      {l.tags.slice(0, mob?4:6).map(tag => (
                        <span key={tag} style={{ fontSize:10.5, padding:'2px 7px', borderRadius:99, background: q&&tag.toLowerCase().includes(q.toLowerCase())?'#fef08a':'#f8f8fd', border:'1px solid #e4e4f0', color:'#6e6e9a' }}>
                          {hl(tag, q)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Chip({ label, active, color, bg, onClick }) {
  return (
    <button onClick={onClick} style={{ padding:'5px 11px', borderRadius:99, border:`1px solid ${active&&color?color:'#e4e4f0'}`, fontSize:12, fontWeight:active?700:500, color:active&&color?color:active?'#0f0f1a':'#6e6e9a', background:active&&bg?bg:active?'#f0f0f8':'#fff', cursor:'pointer', transition:'all .12s' }}>
      {label}
    </button>
  );
}
