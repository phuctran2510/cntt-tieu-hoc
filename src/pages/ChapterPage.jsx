import React from 'react';
import { getChapterById, TYPE_CONFIG } from '../data/curriculum';
import { TypeBadge, SectionLabel, Card } from '../components/UI';

function useIsMobile() {
  const [m, setM] = React.useState(() => window.innerWidth < 769);
  React.useEffect(() => {
    const h = () => setM(window.innerWidth < 769);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return m;
}

export default function ChapterPage({ chapterId, onNav }) {
  const ch  = getChapterById(chapterId);
  const mob = useIsMobile();
  if (!ch) return <div style={{ padding:32 }}>Không tìm thấy chương</div>;

  const typeCounts = Object.entries(TYPE_CONFIG)
    .map(([k, v]) => ({ ...v, key:k, count: ch.lessons.filter(l => l.type === k).length }))
    .filter(t => t.count > 0);

  return (
    <div className="anim-up">
      {/* Chapter hero */}
      <div style={{ borderRadius: mob?14:20, overflow:'hidden', marginBottom:18, border:'1px solid #e4e4f0' }}>
        <div style={{ background:ch.color, padding: mob?'20px 16px':'28px 28px 22px', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-40, right:-40, width:180, height:180, borderRadius:'50%', background:'rgba(255,255,255,0.08)' }} />
          <div style={{ position:'relative', zIndex:1 }}>
            <div style={{ display:'flex', gap: mob?10:16, alignItems:'flex-start' }}>
              <div style={{ width: mob?40:52, height: mob?40:52, borderRadius:14, background:'rgba(255,255,255,0.18)', display:'flex', alignItems:'center', justifyContent:'center', fontSize: mob?20:24, flexShrink:0 }}>
                {ch.emoji}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize: mob?9.5:10.5, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.6)', marginBottom:5 }}>
                  Chương {ch.id} · Tiết {ch.tietRange} · {ch.soTiet} tiết
                </div>
                <h1 style={{ fontFamily:"'Fraunces',serif", fontSize: mob?17:22, fontWeight:700, color:'#fff', lineHeight:1.25, marginBottom:7 }}>
                  {ch.title}
                </h1>
                <p style={{ fontSize: mob?12.5:13.5, color:'rgba(255,255,255,0.72)', lineHeight:1.65 }}>
                  {ch.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ background:'#fff', padding: mob?'10px 14px':'12px 28px', display:'flex', gap: mob?12:20, flexWrap:'wrap', alignItems:'center' }}>
          {typeCounts.map(t => (
            <div key={t.key} style={{ display:'flex', alignItems:'center', gap:5 }}>
              <span style={{ fontSize:13 }}>{t.icon}</span>
              <span style={{ fontSize:12.5, fontWeight:700, color:t.color }}>{t.count}</span>
              <span style={{ fontSize:11.5, color:'#6e6e9a' }}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Layout: mobile = stacked, desktop = 2 col */}
      <div style={{ display:'grid', gridTemplateColumns: mob?'1fr':'1fr 300px', gap:18, alignItems:'start' }}>

        {/* Lessons list */}
        <div>
          <SectionLabel>{ch.lessons.length} Bài học trong chương</SectionLabel>
          <Card>
            {ch.lessons.map((lesson, i) => (
              <LessonRow key={lesson.id} lesson={lesson} ch={ch}
                isLast={i === ch.lessons.length - 1}
                onClick={() => onNav(`lesson-${lesson.id}`)}
                mob={mob}
              />
            ))}
          </Card>
        </div>

        {/* Sidebar — stacked below on mobile */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {/* Mục tiêu */}
          <Card style={{ padding: mob?'14px 16px':'18px 20px' }}>
            <SectionLabel>🎯 Mục tiêu chương</SectionLabel>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {ch.mucTieu.map((obj, i) => (
                <div key={i} style={{ display:'flex', gap:8, fontSize: mob?12.5:13, color:'#2d2d50', lineHeight:1.55 }}>
                  <span style={{ color:ch.color, fontWeight:700, flexShrink:0 }}>✓</span>
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Tài liệu */}
          {ch.taiLieu.length > 0 && (
            <Card style={{ padding: mob?'14px 16px':'18px 20px' }}>
              <SectionLabel>📚 Tài liệu tham khảo</SectionLabel>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {ch.taiLieu.map((ref, i) => (
                  <div key={i} style={{ padding:'9px 11px', border:'1px solid #e4e4f0', borderRadius:9, fontSize:12.5 }}>
                    <div style={{ fontWeight:600, color:'#0f0f1a', marginBottom:2 }}>{ref.ten}</div>
                    <div style={{ fontSize:11, color:'#6e6e9a' }}>{ref.loai}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <button onClick={() => onNav('home')}
            style={{ padding:'10px', borderRadius:10, border:'1px solid #e4e4f0', fontSize:13, color:'#6e6e9a', background:'#fff', cursor:'pointer', textAlign:'center' }}>
            ← Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}

function LessonRow({ lesson, ch, isLast, onClick, mob }) {
  const hasTheory = lesson.theory && lesson.theory.length > 0;
  const hasLab    = lesson.labSteps && lesson.labSteps.length > 0;
  const exCount   = lesson.exercises?.length || 0;

  return (
    <div onClick={onClick}
      style={{ display:'flex', gap: mob?10:14, padding: mob?'12px 14px':'14px 22px', borderBottom:isLast?'none':'1px solid #f0f0f8', cursor:'pointer', transition:'background .12s', alignItems:'flex-start' }}
      onMouseEnter={e => e.currentTarget.style.background='#f8f8fd'}
      onMouseLeave={e => e.currentTarget.style.background='transparent'}
    >
      <div style={{ fontSize:11, fontWeight:600, color:'#6e6e9a', fontFamily:"'JetBrains Mono',monospace", minWidth: mob?40:54, paddingTop:2, flexShrink:0 }}>
        {lesson.num}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize: mob?13:14, fontWeight:600, color:'#0f0f1a', marginBottom:4, lineHeight:1.35 }}>{lesson.title}</div>
        {!mob && <div style={{ fontSize:12.5, color:'#6e6e9a', lineHeight:1.5, marginBottom:6 }}>{lesson.mota}</div>}
        <div style={{ display:'flex', gap:5, flexWrap:'wrap', alignItems:'center' }}>
          {hasTheory && <span style={{ fontSize:10, padding:'2px 6px', borderRadius:5, background:'#eef2ff', color:'#4f46e5', fontWeight:600 }}>📚 LT</span>}
          {hasLab    && <span style={{ fontSize:10, padding:'2px 6px', borderRadius:5, background:'#fef3c7', color:'#92400e', fontWeight:600 }}>🔬 Lab</span>}
          {exCount > 0 && <span style={{ fontSize:10, padding:'2px 6px', borderRadius:5, background:'#dcfce7', color:'#166534', fontWeight:600 }}>✏️ {exCount}BT</span>}
        </div>
      </div>
      <div style={{ flexShrink:0, paddingTop:2 }}>
        <TypeBadge type={lesson.type} />
      </div>
    </div>
  );
}
