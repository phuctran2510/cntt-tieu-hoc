import React from 'react';
import { CHAPTERS, TYPE_CONFIG } from '../data/curriculum';

function useIsMobile() {
  const [m, setM] = React.useState(() => window.innerWidth < 769);
  React.useEffect(() => {
    const h = () => setM(window.innerWidth < 769);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return m;
}

export default function OverviewPage({ onNav }) {
  const mob = useIsMobile();
  const all = CHAPTERS.flatMap(ch => ch.lessons.map(l => ({ ...l, ch })));

  return (
    <div className="anim-up">
      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0f0f1a 0%,#1e1e35 100%)', borderRadius: mob?14:20, padding: mob?'20px 16px':'28px 28px', marginBottom:18, color:'#fff' }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.13em', textTransform:'uppercase', color:'rgba(255,255,255,0.38)', marginBottom:7 }}> Lịch học toàn khóa</div>
        <h1 style={{ fontFamily:"'Fraunces',serif", fontSize: mob?18:22, fontWeight:700, marginBottom:7 }}>45 Tiết học — Toàn khóa</h1>
        <p style={{ fontSize: mob?12.5:13.5, color:'rgba(255,255,255,0.55)', marginBottom:16 }}>Tổng quan lịch trình học tập theo từng chương và loại tiết.</p>
        <div style={{ display:'flex', gap: mob?8:12, flexWrap:'wrap' }}>
          {Object.entries(TYPE_CONFIG).map(([k, v]) => (
            <div key={k} style={{ display:'flex', alignItems:'center', gap:5, fontSize: mob?11:12 }}>
              <span style={{ width:8, height:8, borderRadius:3, background:v.color, display:'inline-block' }} />
              <span style={{ color:'rgba(255,255,255,0.65)' }}>{v.icon} {mob ? '' : v.label}{mob ? v.label.split(' ')[0] : ''}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Visual map */}
      <div style={{ background:'#fff', border:'1px solid #e4e4f0', borderRadius: mob?12:18, padding: mob?'14px 14px':'20px 22px', marginBottom:18 }}>
        <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#6e6e9a', marginBottom:12 }}>Bản đồ 45 tiết</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap: mob?4:6 }}>
          {all.map(l => {
            const cfg = TYPE_CONFIG[l.type];
            const sz  = mob ? 34 : 42;
            return (
              <div key={l.id} onClick={() => onNav(`lesson-${l.id}`)} title={`${l.num}: ${l.title}`}
                style={{ width:sz, height:sz, borderRadius: mob?7:9, background:cfg.bg, border:`1.5px solid ${cfg.color}30`, display:'flex', alignItems:'center', justifyContent:'center', fontSize: mob?10:12, fontWeight:700, color:cfg.color, cursor:'pointer', transition:'all .12s', fontFamily:"'JetBrains Mono',monospace" }}
                onMouseEnter={e => { e.currentTarget.style.transform='scale(1.18)'; e.currentTarget.style.boxShadow=`0 4px 12px ${cfg.color}40`; }}
                onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}>
                {l.id}
              </div>
            );
          })}
        </div>
      </div>

      {/* Chapter tables */}
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {CHAPTERS.map((ch, ci) => (
          <div key={ch.id} style={{ background:'#fff', border:'1px solid #e4e4f0', borderRadius: mob?12:18, overflow:'hidden', animation:`fadeUp .3s ease ${ci*.06}s both` }}>
            {/* Chapter header */}
            <div onClick={() => onNav(`chapter-${ch.id}`)}
              style={{ background:ch.color, padding: mob?'11px 14px':'14px 20px', display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
              <span style={{ fontSize: mob?17:20 }}>{ch.emoji}</span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize: mob?9:10, fontWeight:700, color:'rgba(255,255,255,0.6)', letterSpacing:'0.08em', textTransform:'uppercase' }}>
                  Chương {ch.id} · Tiết {ch.tietRange}
                </div>
                <div style={{ fontSize: mob?13:15, fontWeight:700, color:'#fff', overflow:'hidden', textOverflow:'ellipsis', whiteSpace: mob?'nowrap':'normal' }}>{ch.title}</div>
              </div>
              <div style={{ display:'flex', gap:6, flexShrink:0 }}>
                <span style={{ fontSize: mob?10:11.5, color:'rgba(255,255,255,0.7)', background:'rgba(255,255,255,0.12)', padding:'2px 8px', borderRadius:99 }}>
                   {ch.soTiet}t
                </span>
                {!mob && (
                  <>
                    <span style={{ fontSize:11.5, color:'rgba(255,255,255,0.7)', background:'rgba(255,255,255,0.12)', padding:'2px 8px', borderRadius:99 }}> {ch.lessons.filter(l=>l.type==='lab').length} Lab</span>
                    <span style={{ fontSize:11.5, color:'rgba(255,255,255,0.7)', background:'rgba(255,255,255,0.12)', padding:'2px 8px', borderRadius:99 }}> {ch.lessons.reduce((s,l)=>s+(l.exercises?.length||0),0)} BT</span>
                  </>
                )}
              </div>
            </div>

            {/* Lesson rows */}
            {ch.lessons.map((lesson, li) => {
              const cfg = TYPE_CONFIG[lesson.type];
              const hasEx = (lesson.exercises?.length||0) > 0;
              const hasLab = (lesson.labSteps?.length||0) > 0;
              const hasTheory = (lesson.theory?.length||0) > 0;
              return (
                <div key={lesson.id} onClick={() => onNav(`lesson-${lesson.id}`)}
                  style={{ display:'grid', gridTemplateColumns: mob?'50px 1fr auto':'90px 1fr auto', gap: mob?8:12, padding: mob?'10px 14px':'12px 20px', borderBottom: li<ch.lessons.length-1?'1px solid #f0f0f8':'none', cursor:'pointer', alignItems:'center', transition:'background .12s' }}
                  onMouseEnter={e => e.currentTarget.style.background='#f8f8fd'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                  <div style={{ fontSize: mob?10.5:12, fontWeight:600, color:'#6e6e9a', fontFamily:"'JetBrains Mono',monospace" }}>{lesson.num}</div>
                  <div>
                    <div style={{ fontSize: mob?12.5:13.5, fontWeight:600, color:'#0f0f1a', marginBottom: mob?0:3, lineHeight:1.35 }}>{lesson.title}</div>
                    {!mob && (
                      <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginTop:3 }}>
                        {hasTheory && <span style={{ fontSize:9.5, padding:'1px 5px', borderRadius:4, background:'#eef2ff', color:'#4f46e5', fontWeight:600 }}> LT</span>}
                        {hasLab    && <span style={{ fontSize:9.5, padding:'1px 5px', borderRadius:4, background:'#fef3c7', color:'#92400e', fontWeight:600 }}> Lab</span>}
                        {hasEx     && <span style={{ fontSize:9.5, padding:'1px 5px', borderRadius:4, background:'#dcfce7', color:'#166534', fontWeight:600 }}> {lesson.exercises.length}BT</span>}
                      </div>
                    )}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:4, padding: mob?'2px 7px':'3px 9px', borderRadius:99, background:cfg.bg, color:cfg.color, fontSize: mob?10:11, fontWeight:700, whiteSpace:'nowrap' }}>
                    {cfg.icon} {mob ? '' : cfg.label}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
