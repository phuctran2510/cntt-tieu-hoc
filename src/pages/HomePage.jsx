import React from 'react';
import { CHAPTERS, META, TYPE_CONFIG, getTotalLabs, getTotalExercises } from '../data/curriculum';

function useIsMobile() {
  const [m, setM] = React.useState(() => window.innerWidth < 769);
  React.useEffect(() => {
    const h = () => setM(window.innerWidth < 769);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return m;
}

export default function HomePage({ onNav }) {
  const mob = useIsMobile();

  return (
    <div>
      {/* Hero */}
      <div className="anim-up" style={{ background:'linear-gradient(135deg,#0f0f1a 0%,#1e1e35 55%,#14103a 100%)', borderRadius: mob?16:24, padding: mob?'24px 18px':'40px 36px', marginBottom:18, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-60, right:-60, width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle,rgba(99,102,241,.18) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(255,255,255,0.38)', marginBottom:9 }}>
            📚 Mã môn: {META.code} · {META.version}
          </div>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize: mob?22:30, fontWeight:700, color:'#fff', lineHeight:1.2, marginBottom:9, maxWidth:560 }}>
            {META.title}
          </h1>
          <p style={{ fontSize: mob?13:14, color:'rgba(255,255,255,0.55)', maxWidth:560, lineHeight:1.7, marginBottom:20 }}>
            {META.description}
          </p>
          <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
            {['CTGDPT 2018','DigComp 2.2','AI & EdTech','Lab 60%'].map(t => (
              <span key={t} style={{ fontSize: mob?11:11.5, padding: mob?'4px 10px':'5px 13px', borderRadius:99, border:'1px solid rgba(255,255,255,0.14)', color:'rgba(255,255,255,0.65)', background:'rgba(255,255,255,0.06)' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="anim-up-1" style={{ display:'grid', gridTemplateColumns: mob?'repeat(3,1fr)':'repeat(6,1fr)', gap: mob?8:12, marginBottom:18 }}>
        {[
          { icon:'', num:45,                    label:'Tổng tiết'  },
          { icon:'', num:6,                     label:'Chương'     },
          { icon:'', num:getTotalLabs(),         label:'Lab'        },
          { icon:'', num:getTotalExercises(),    label:'Bài tập'    },
          { icon:'', num:META.credits,           label:'Tín chỉ'    },
          { icon:'', num:'100%',                 label:'TH máy'     },
        ].map(s => (
          <div key={s.label} style={{ background:'#fff', border:'1px solid #e4e4f0', borderRadius: mob?10:14, padding: mob?'12px 10px':'18px 20px', textAlign: mob?'center':'left' }}>
            <div style={{ fontSize: mob?16:20, marginBottom: mob?5:8 }}>{s.icon}</div>
            <div style={{ fontFamily:"'Fraunces',serif", fontSize: mob?22:30, fontWeight:700, color:'#0f0f1a', lineHeight:1 }}>{s.num}</div>
            <div style={{ fontSize: mob?10.5:12, color:'#6e6e9a', marginTop:3, fontWeight:500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Type distribution */}
      <div className="anim-up-2" style={{ background:'#fff', border:'1px solid #e4e4f0', borderRadius: mob?12:18, padding: mob?'14px 14px':'20px 24px', marginBottom:18 }}>
        <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#6e6e9a', marginBottom:12 }}>Phân bố loại tiết học</div>
        <div style={{ display:'flex', gap: mob?8:10, flexWrap:'wrap' }}>
          {Object.entries(TYPE_CONFIG).map(([k, v]) => {
            const count = CHAPTERS.flatMap(c=>c.lessons).filter(l=>l.type===k).length;
            return (
              <div key={k} style={{ display:'flex', alignItems:'center', gap:9, padding: mob?'9px 12px':'11px 16px', borderRadius:12, background:v.bg, flex:'1 1 120px' }}>
                <span style={{ fontSize: mob?17:20 }}>{v.icon}</span>
                <div>
                  <div style={{ fontFamily:"'Fraunces',serif", fontSize: mob?20:24, fontWeight:700, color:v.color, lineHeight:1 }}>{count}</div>
                  <div style={{ fontSize: mob?10:11, color:v.color, opacity:.8, fontWeight:600 }}>{v.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chapter grid */}
      <div className="anim-up-3">
        <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#6e6e9a', marginBottom:12 }}>6 Chương học</div>
        <div style={{ display:'grid', gridTemplateColumns: mob?'1fr':'repeat(auto-fill,minmax(300px,1fr))', gap: mob?10:14, marginBottom:18 }}>
          {CHAPTERS.map((ch, i) => <ChapterCard key={ch.id} ch={ch} delay={i*.05} onClick={() => onNav(`chapter-${ch.id}`)} mob={mob} />)}
        </div>
      </div>

      {/* Quick links */}
      <div className="anim-up-4" style={{ background:'#fff', border:'1px solid #e4e4f0', borderRadius: mob?12:18, padding: mob?'14px 14px':'20px 24px' }}>
        <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#6e6e9a', marginBottom:12 }}>Truy cập nhanh</div>
        <div style={{ display:'grid', gridTemplateColumns: mob?'1fr 1fr':'repeat(auto-fill,minmax(180px,1fr))', gap:8 }}>
          {[
            { label:' Giảng viên',         key:'faculty'   },
            { label:' Lịch học 45 tiết',     key:'overview'  },
            { label:' Tìm kiếm nội dung',    key:'search'    },
            { label:' C5: AI & Công nghệ',   key:'chapter-5' },
            { label:' C4: Đánh giá số',      key:'chapter-4' },
            { label:' C2: Thiết kế học liệu',key:'chapter-2' },
          ].map(a => (
            <button key={a.key} onClick={() => onNav(a.key)} style={{ padding: mob?'10px 8px':'9px 14px', borderRadius:9, border:'1px solid #e4e4f0', fontSize: mob?12:12.5, color:'#2d2d50', background:'#f8f8fd', cursor:'pointer', textAlign:'left', transition:'all .13s' }}
              onMouseEnter={e => { e.currentTarget.style.background='#fff'; e.currentTarget.style.borderColor='#c8c8e4'; }}
              onMouseLeave={e => { e.currentTarget.style.background='#f8f8fd'; e.currentTarget.style.borderColor='#e4e4f0'; }}>
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChapterCard({ ch, delay, onClick, mob }) {
  return (
    <div onClick={onClick}
      style={{ background:'#fff', border:'1px solid #e4e4f0', borderRadius: mob?12:16, overflow:'hidden', cursor:'pointer', transition:'all .18s', animation:`fadeUp .3s ease ${delay}s both` }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 10px 30px rgba(15,15,26,.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}>
      <div style={{ height:4, background:ch.color }} />
      <div style={{ padding: mob?'14px 14px':'18px 20px' }}>
        <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
          <div style={{ width: mob?34:40, height: mob?34:40, borderRadius:10, background:ch.bgLight, display:'flex', alignItems:'center', justifyContent:'center', fontSize: mob?17:20, flexShrink:0 }}>
            {ch.emoji}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize: mob?9.5:10.5, fontWeight:700, color:'#6e6e9a', letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:3 }}>
              Chương {ch.id} · Tiết {ch.tietRange}
            </div>
            <h3 style={{ fontSize: mob?13.5:14.5, fontWeight:700, color:'#0f0f1a', lineHeight:1.3, marginBottom: mob?5:7 }}>{ch.title}</h3>
            {!mob && <p style={{ fontSize:12.5, color:'#6e6e9a', lineHeight:1.6, marginBottom:12 }}>{ch.description}</p>}
          </div>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop: mob?10:12, borderTop:'1px solid #f0f0f8', marginTop: mob?8:0 }}>
          <div style={{ display:'flex', gap: mob?8:12, fontSize: mob?11:12, color:'#6e6e9a' }}>
            <span>📅 {ch.soTiet}t</span>
            <span>🔬 {ch.lessons.filter(l=>l.type==='lab').length} Lab</span>
          </div>
          <span style={{ fontSize:12, color:ch.color, fontWeight:700 }}>Xem →</span>
        </div>
      </div>
    </div>
  );
}
