import React from 'react';
import { FACULTY } from '../data/curriculum';
import { Card, SectionLabel } from '../components/UI';

function useIsMobile() {
  const [m, setM] = React.useState(() => window.innerWidth < 769);
  React.useEffect(() => {
    const h = () => setM(window.innerWidth < 769);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return m;
}

export default function FacultyPage() {
  const mob = useIsMobile();

  return (
    <div className="anim-up">
      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0f0f1a 0%,#1e1e35 60%,#1a103e 100%)', borderRadius: mob?16:24, padding: mob?'24px 18px':'40px 36px', marginBottom:20, position:'relative', overflow:'hidden', color:'#fff' }}>
        <div style={{ position:'absolute', top:-80, right:-80, width:320, height:320, borderRadius:'50%', background:'radial-gradient(circle,rgba(99,102,241,.2) 0%,transparent 70%)' }} />

        <div style={{ position:'relative', zIndex:1 }}>
          {/* Avatar + basic info */}
          <div style={{ display:'flex', gap: mob?14:28, alignItems: mob?'center':'flex-start', flexWrap:'wrap', marginBottom: mob?16:0 }}>
            <div style={{ width: mob?70:110, height: mob?70:110, borderRadius:'50%', flexShrink:0, background:'linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)', display:'flex', alignItems:'center', justifyContent:'center', fontSize: mob?32:48, border:'3px solid rgba(255,255,255,0.18)', boxShadow:'0 8px 32px rgba(79,70,229,.3)' }}>
              {FACULTY.avatar}
            </div>
            <div style={{ flex:1, minWidth: mob?0:200 }}>
              <div style={{ fontSize: mob?9:10, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.38)', marginBottom:6 }}>Giảng viên phụ trách</div>
              <h1 style={{ fontFamily:"'Fraunces',serif", fontSize: mob?20:28, fontWeight:700, marginBottom:5, lineHeight:1.2 }}>{FACULTY.name}</h1>
              <div style={{ fontSize: mob?13:15, color:'rgba(255,255,255,0.65)', marginBottom:3 }}>{FACULTY.title}</div>
              <div style={{ fontSize: mob?11.5:13, color:'rgba(255,255,255,0.42)', marginBottom:14 }}>{FACULTY.department}</div>

              {/* Contact chips */}
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {[
                  { icon:'✉️', text: FACULTY.email },
                  { icon:'📞', text: FACULTY.phone },
                  { icon:'🏛️', text: mob ? FACULTY.office.split('—')[0].trim() : FACULTY.office },
                  { icon:'🕐', text: mob ? 'Xem lịch →' : FACULTY.officeHours },
                ].map(c => (
                  <div key={c.text} style={{ display:'flex', alignItems:'center', gap:6, fontSize: mob?11:12, color:'rgba(255,255,255,0.6)', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.1)', padding: mob?'5px 10px':'6px 12px', borderRadius:9 }}>
                    <span>{c.icon}</span> {c.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content — mobile: single col, desktop: 2 col */}
      <div style={{ display:'grid', gridTemplateColumns: mob?'1fr':'1fr 340px', gap:18, alignItems:'start' }}>

        {/* LEFT */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Bio */}
          <Card style={{ padding: mob?'14px 16px':'22px 24px' }}>
            <SectionLabel> Giới thiệu</SectionLabel>
            <p style={{ fontSize: mob?13:14, color:'#2d2d50', lineHeight:1.75 }}>{FACULTY.bio}</p>
          </Card>

          {/* Expertise */}
          <Card style={{ padding: mob?'14px 16px':'22px 24px' }}>
            <SectionLabel> Lĩnh vực chuyên môn</SectionLabel>
            <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
              {FACULTY.expertise.map(e => (
                <span key={e} style={{ fontSize: mob?11.5:12.5, padding: mob?'5px 10px':'6px 13px', borderRadius:99, background:'#eef2ff', border:'1px solid #c7d2fe', color:'#4f46e5', fontWeight:600 }}>{e}</span>
              ))}
            </div>
          </Card>

          {/* Publications */}
          <Card style={{ padding: mob?'14px 16px':'22px 24px' }}>
            <SectionLabel>📄 Công trình nghiên cứu</SectionLabel>
            {FACULTY.publications.map((pub, i) => (
              <div key={i} style={{ display:'flex', gap:12, padding:'13px 0', borderBottom: i < FACULTY.publications.length-1 ? '1px solid #f0f0f8':'none' }}>
                <div style={{ fontSize:11, fontWeight:700, color:'#4f46e5', fontFamily:"'JetBrains Mono',monospace", minWidth:34, paddingTop:2, flexShrink:0 }}>{pub.year}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize: mob?12.5:14, fontWeight:600, color:'#0f0f1a', marginBottom:3, lineHeight:1.4 }}>{pub.title}</div>
                  <div style={{ fontSize: mob?11:12, color:'#6e6e9a', fontStyle:'italic' }}>{pub.venue}</div>
                  <span style={{ display:'inline-block', marginTop:5, fontSize:10, fontWeight:700, padding:'2px 7px', borderRadius:99, background: pub.type==='journal'?'#dbeafe':'#dcfce7', color: pub.type==='journal'?'#1e40af':'#166534' }}>
                    {pub.type==='journal'?'📰 Tạp chí':'🎤 Hội thảo'}
                  </span>
                </div>
              </div>
            ))}
          </Card>

          {/* Projects */}
          <Card style={{ padding: mob?'14px 16px':'22px 24px' }}>
            <SectionLabel> Dự án & Hợp tác</SectionLabel>
            <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
              {FACULTY.projects.map((p, i) => (
                <div key={i} style={{ padding:'12px 14px', borderRadius:11, background:'#f8f8fd', border:'1px solid #e4e4f0' }}>
                  <div style={{ fontSize: mob?13:14, fontWeight:600, color:'#0f0f1a', marginBottom:5 }}>{p.name}</div>
                  <div style={{ display:'flex', gap:10, flexWrap:'wrap', fontSize: mob?11:12, color:'#6e6e9a' }}>
                    <span>📅 {p.year}</span>
                    <span>👤 {p.role}</span>
                    <span>💰 {p.funder}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT — on mobile shown below */}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {/* Degree */}
          <Card style={{ padding: mob?'14px 16px':'18px 20px' }}>
            <SectionLabel> Học vấn</SectionLabel>
            <div style={{ fontSize: mob?12.5:13.5, color:'#2d2d50', lineHeight:1.6, marginBottom:7 }}>{FACULTY.degree}</div>
            <div style={{ fontSize: mob?12:12.5, color:'#6e6e9a' }}>{FACULTY.experience}</div>
          </Card>

          {/* Certifications */}
          <Card style={{ padding: mob?'14px 16px':'18px 20px' }}>
            <SectionLabel> Chứng chỉ chuyên môn</SectionLabel>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {FACULTY.certifications.map((c, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:9, padding:'9px 11px', borderRadius:9, background:'#f8f8fd', border:'1px solid #e4e4f0' }}>
                  <span style={{ fontSize:18 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: mob?12:12.5, fontWeight:600, color:'#0f0f1a' }}>{c.name}</div>
                    <div style={{ fontSize:10.5, color:'#6e6e9a' }}>{c.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Schedule */}
          <Card style={{ padding: mob?'14px 16px':'18px 20px' }}>
            <SectionLabel> Lịch dạy & Tư vấn</SectionLabel>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {FACULTY.schedule.map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: mob?11.5:12, fontWeight:700, color:'#4f46e5', marginBottom:4 }}>{s.day}</div>
                  {s.slots.map((slot, j) => (
                    <div key={j} style={{ fontSize: mob?12:12.5, color:'#2d2d50', paddingLeft:9, borderLeft:'2px solid #e4e4f0', marginBottom:4, lineHeight:1.5 }}>{slot}</div>
                  ))}
                </div>
              ))}
            </div>
          </Card>

          {/* Contact CTA */}
          <div style={{ background:'linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)', borderRadius:16, padding: mob?'16px':'20px', color:'#fff' }}>
            <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.6)', marginBottom:9 }}>Liên hệ tư vấn</div>
            <div style={{ fontSize: mob?12.5:13, color:'rgba(255,255,255,0.85)', lineHeight:1.7, marginBottom:13 }}>
              Gặp trực tiếp tại phòng {FACULTY.office} hoặc gửi email để được hỗ trợ.
            </div>
            <a href={`mailto:${FACULTY.email}`} style={{ display:'block', textAlign:'center', padding:'9px 14px', borderRadius:10, background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.25)', color:'#fff', fontSize: mob?12.5:13, fontWeight:600 }}>
              ✉️ {FACULTY.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
