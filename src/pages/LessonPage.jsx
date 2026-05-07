import { getLessonById, getChapterById, TYPE_CONFIG } from '../data/curriculum';
import { TypeBadge, SectionLabel, ExerciseBadge, Card } from '../components/UI';

// Hook detect mobile
function useIsMobile() {
  const [m, setM] = React.useState(() => window.innerWidth < 769);
  React.useEffect(() => {
    const h = () => setM(window.innerWidth < 769);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return m;
}

import React from 'react';

export default function LessonPage({ lessonId, onNav }) {
  const lesson = getLessonById(lessonId);
  if (!lesson) return <div style={{ padding: 32, color: '#6e6e9a' }}>Không tìm thấy tiết học</div>;
  const ch  = getChapterById(lesson.chapterId);
  const cfg = TYPE_CONFIG[lesson.type] || {};
  const mob = useIsMobile();

  return (
    <div className="anim-up">
      {/* ── HEADER ── */}
      <div style={{ background:'#fff', border:'1px solid #e4e4f0', borderRadius: mob?14:20, overflow:'hidden', marginBottom:18 }}>
        <div style={{ height:4, background: ch?.color||'#1a1a2e' }} />
        <div style={{ padding: mob?'16px 16px':'24px 28px' }}>
          {/* Breadcrumb */}
          <div style={{ display:'flex', gap:5, alignItems:'center', fontSize:11.5, color:'#6e6e9a', marginBottom:12, flexWrap:'wrap' }}>
            <span style={{ cursor:'pointer' }} onClick={() => onNav('home')}>Tổng quan</span>
            <span style={{ color:'#e4e4f0' }}>›</span>
            <span style={{ cursor:'pointer' }} onClick={() => onNav(`chapter-${lesson.chapterId}`)}>
              {ch?.emoji} C{lesson.chapterId}
            </span>
            <span style={{ color:'#e4e4f0' }}>›</span>
            <span style={{ color:'#0f0f1a', fontWeight:500 }}>{lesson.num}</span>
          </div>

          <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:10, flexWrap:'wrap' }}>
            <TypeBadge type={lesson.type} size="md" />
            <span style={{ fontSize:12, color:'#6e6e9a' }}>⏱️ {lesson.duration} phút</span>
          </div>

          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize: mob?18:22, fontWeight:700, color:'#0f0f1a', lineHeight:1.3, marginBottom:8 }}>
            {lesson.title}
          </h1>
          <p style={{ fontSize: mob?13:14, color:'#6e6e9a', lineHeight:1.7 }}>{lesson.mota}</p>
        </div>
      </div>

      {/* ── CHUẨN ĐẦU RA — mobile: trên cùng ── */}
      {mob && lesson.chuanDauRa && (
        <div style={{ padding:'12px 14px', borderRadius:10, borderLeft:'3px solid #22c55e', background:'#f0fdf4', display:'flex', gap:9, alignItems:'flex-start', marginBottom:16 }}>
          <span style={{ fontSize:16, flexShrink:0 }}>🎯</span>
          <div>
            <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'#166534', marginBottom:4 }}>Chuẩn đầu ra</div>
            <div style={{ fontSize:13, color:'#166534', lineHeight:1.65 }}>{lesson.chuanDauRa}</div>
          </div>
        </div>
      )}

      {/* ── MAIN LAYOUT ── */}
      <div style={{ display:'grid', gridTemplateColumns: mob?'1fr':'1fr 272px', gap:18, alignItems:'start' }}>

        {/* LEFT: nội dung chính */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

          {/* Theory blocks */}
          {lesson.theory && lesson.theory.length > 0 && (
            <div>
              <SectionLabel>Nội dung lý thuyết chi tiết</SectionLabel>
              {lesson.theory.map((block, i) => <TheoryBlock key={i} block={block} chColor={ch?.color} mob={mob} />)}
            </div>
          )}

          {/* Nội dung chính fallback */}
          {(!lesson.theory || lesson.theory.length === 0) && lesson.noiDungChinh.length > 0 && (
            <Card style={{ padding: mob?'14px 16px':'22px 24px' }}>
              <SectionLabel>Nội dung chính</SectionLabel>
              {lesson.noiDungChinh.map((item, i) => <ContentItem key={i} text={item} chColor={ch?.color} />)}
            </Card>
          )}

          {/* Lab steps */}
          {lesson.labSteps && lesson.labSteps.length > 0 && (
            <div>
              <SectionLabel>🔬 Các bước thực hành Lab</SectionLabel>
              {lesson.labSteps.map((step, i) => <LabStepCard key={i} step={step} index={i} mob={mob} />)}
            </div>
          )}

          {/* Exercises */}
          {lesson.exercises && lesson.exercises.length > 0 && (
            <div>
              <SectionLabel>Bài tập & Thực hành ({lesson.exercises.length})</SectionLabel>
              {lesson.exercises.map((ex, i) => <ExerciseCard key={i} ex={ex} mob={mob} />)}
            </div>
          )}

          {/* Phương pháp */}
          {lesson.phuongPhap && lesson.phuongPhap.length > 0 && (
            <Card style={{ padding: mob?'14px 16px':'18px 22px' }}>
              <SectionLabel>🧪 Phương pháp dạy học</SectionLabel>
              <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
                {lesson.phuongPhap.map(m => (
                  <span key={m} style={{ fontSize:12.5, padding:'5px 11px', borderRadius:9, background:'#f0fdf4', border:'1px solid #bbf7d0', color:'#15803d', fontWeight:500 }}>{m}</span>
                ))}
              </div>
            </Card>
          )}

          {/* Mobile: công cụ + điều hướng */}
          {mob && (
            <>
              {lesson.congCu && lesson.congCu.length > 0 && (
                <Card style={{ padding:'14px 16px' }}>
                  <SectionLabel>🛠️ Công cụ & Phần mềm</SectionLabel>
                  <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
                    {lesson.congCu.map(tool => (
                      <span key={tool} style={{ fontSize:12, padding:'5px 10px', borderRadius:8, background:'#f0f9ff', border:'1px solid #e0f2fe', color:'#0369a1', fontWeight:500 }}>⚙️ {tool}</span>
                    ))}
                  </div>
                </Card>
              )}
              {lesson.tags && lesson.tags.length > 0 && (
                <Card style={{ padding:'14px 16px' }}>
                  <SectionLabel>🏷️ Từ khóa</SectionLabel>
                  <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                    {lesson.tags.map(tag => (
                      <span key={tag} style={{ fontSize:11, padding:'3px 8px', borderRadius:99, background:'#f8f8fd', border:'1px solid #e4e4f0', color:'#6e6e9a' }}>{tag}</span>
                    ))}
                  </div>
                </Card>
              )}
              {/* Mobile nav buttons */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                <button onClick={() => onNav(`chapter-${lesson.chapterId}`)}
                  style={{ padding:'10px 12px', borderRadius:9, border:'1px solid #e4e4f0', fontSize:13, color:'#6e6e9a', background:'#fff', cursor:'pointer', gridColumn:'1/-1' }}>
                  ← Về Chương {lesson.chapterId}
                </button>
                {lesson.id > 1 && (
                  <button onClick={() => onNav(`lesson-${lesson.id - 1}`)}
                    style={{ padding:'10px 12px', borderRadius:9, border:'1px solid #e4e4f0', fontSize:13, color:'#0f0f1a', background:'#fff', cursor:'pointer' }}>
                    ← Tiết {lesson.id - 1}
                  </button>
                )}
                {lesson.id < 45 && (
                  <button onClick={() => onNav(`lesson-${lesson.id + 1}`)}
                    style={{ padding:'10px 12px', borderRadius:9, border:'1px solid #e4e4f0', fontSize:13, color:'#0f0f1a', background:'#fff', cursor:'pointer' }}>
                    Tiết {lesson.id + 1} →
                  </button>
                )}
              </div>
            </>
          )}

          {/* Tài liệu tham khảo */}
          {lesson.thamKhao && lesson.thamKhao.length > 0 && (
            <Card style={{ padding: mob?'14px 16px':'18px 22px' }}>
              <SectionLabel>Tài liệu tham khảo</SectionLabel>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {lesson.thamKhao.map((ref, i) => (
                  <div key={i} style={{ display:'flex', gap:8, fontSize:13, color:'#2d2d50', lineHeight:1.6 }}>
                    <span style={{ color:'#a0a0c0', flexShrink:0, fontFamily:"'JetBrains Mono',monospace" }}>[{i+1}]</span>
                    <span style={{ fontStyle:'italic' }}>{ref}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* RIGHT SIDEBAR — desktop only */}
        {!mob && (
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {/* Chuẩn đầu ra */}
            {lesson.chuanDauRa && (
              <div style={{ padding:'14px 15px', borderRadius:12, borderLeft:'3px solid #22c55e', background:'#f0fdf4', display:'flex', gap:9, alignItems:'flex-start' }}>
                <span style={{ fontSize:16, flexShrink:0 }}>🎯</span>
                <div>
                  <div style={{ fontSize:10.5, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'#166534', marginBottom:5 }}>Chuẩn đầu ra</div>
                  <div style={{ fontSize:13, color:'#166534', lineHeight:1.65 }}>{lesson.chuanDauRa}</div>
                </div>
              </div>
            )}

            {/* Công cụ */}
            {lesson.congCu && lesson.congCu.length > 0 && (
              <Card style={{ padding:'16px 18px' }}>
                <SectionLabel>Công cụ & Phần mềm</SectionLabel>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {lesson.congCu.map(tool => (
                    <div key={tool} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 10px', borderRadius:9, background:'#f0f9ff', border:'1px solid #e0f2fe' }}>
                      <span>⚙️</span>
                      <span style={{ fontSize:12.5, color:'#0369a1', fontWeight:500 }}>{tool}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Tags */}
            {lesson.tags && lesson.tags.length > 0 && (
              <Card style={{ padding:'16px 18px' }}>
                <SectionLabel>🏷️ Từ khóa</SectionLabel>
                <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                  {lesson.tags.map(tag => (
                    <span key={tag} style={{ fontSize:11, padding:'3px 8px', borderRadius:99, background:'#f8f8fd', border:'1px solid #e4e4f0', color:'#6e6e9a' }}>{tag}</span>
                  ))}
                </div>
              </Card>
            )}

            {/* Info */}
            <Card style={{ padding:'16px 18px' }}>
              <SectionLabel>Thông tin</SectionLabel>
              <div style={{ display:'flex', flexDirection:'column', gap:9, fontSize:13 }}>
                {[
                  { icon:'', label:'Số tiết',    val: lesson.num },
                  { icon:'', label:'Thời lượng', val: `${lesson.duration} phút` },
                  { icon:'', label:'Loại tiết',  val: `${cfg.icon} ${cfg.label}` },
                  { icon:'', label:'Chương',     val: `Chương ${lesson.chapterId}` },
                  { icon:'', label:'Bài tập',    val: `${lesson.exercises?.length||0} bài` },
                ].map(r => (
                  <div key={r.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ color:'#6e6e9a', display:'flex', gap:5 }}><span>{r.icon}</span>{r.label}</span>
                    <span style={{ fontWeight:600, color:'#0f0f1a', fontSize:12.5 }}>{r.val}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Nav buttons */}
            <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
              <button onClick={() => onNav(`chapter-${lesson.chapterId}`)}
                style={{ padding:'9px 12px', borderRadius:9, border:'1px solid #e4e4f0', fontSize:13, color:'#6e6e9a', background:'#fff', cursor:'pointer', textAlign:'left' }}>
                ← Về Chương {lesson.chapterId}
              </button>
              {lesson.id > 1 && (
                <button onClick={() => onNav(`lesson-${lesson.id - 1}`)}
                  style={{ padding:'9px 12px', borderRadius:9, border:'1px solid #e4e4f0', fontSize:13, color:'#0f0f1a', background:'#fff', cursor:'pointer', textAlign:'left' }}>
                  ← Tiết {lesson.id - 1}
                </button>
              )}
              {lesson.id < 45 && (
                <button onClick={() => onNav(`lesson-${lesson.id + 1}`)}
                  style={{ padding:'9px 12px', borderRadius:9, border:'1px solid #e4e4f0', fontSize:13, color:'#0f0f1a', background:'#fff', cursor:'pointer', textAlign:'left' }}>
                  Tiết {lesson.id + 1} →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function TheoryBlock({ block, chColor, mob }) {
  return (
    <div style={{ border:'1px solid #e4e4f0', borderRadius:14, overflow:'hidden', marginBottom:12 }}>
      <div style={{ background:'#f8f8fd', padding: mob?'11px 14px':'13px 18px', borderBottom:'1px solid #e4e4f0', display:'flex', gap:10, alignItems:'center' }}>
        <span style={{ fontSize:15 }}></span>
        <span style={{ fontSize: mob?13:13.5, fontWeight:700, color:'#0f0f1a' }}>{block.title}</span>
      </div>
      <div style={{ padding: mob?'14px 14px':'16px 18px' }}>
        <p style={{ fontSize: mob?13:13.5, color:'#2d2d50', lineHeight:1.75, marginBottom:12, background:'#f8f8fd', padding:'11px 13px', borderRadius:9, borderLeft:`3px solid ${chColor||'#4f46e5'}` }}>
          {block.content}
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
          {block.points.map((p, i) => (
            <div key={i} style={{ display:'flex', gap:9, fontSize: mob?13:13.5, color:'#2d2d50', lineHeight:1.65 }}>
              <span style={{ color:chColor||'#4f46e5', flexShrink:0, marginTop:4, fontSize:9 }}>▸</span>
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LabStepCard({ step, index, mob }) {
  return (
    <div style={{ border:'1px solid #e4e4f0', borderRadius:14, overflow:'hidden', marginBottom:10 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, padding: mob?'11px 14px':'13px 18px', background:'linear-gradient(135deg,#1e1e35 0%,#2d2d50 100%)' }}>
        <div style={{ width:26, height:26, borderRadius:'50%', background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#fff', flexShrink:0 }}>
          {String.fromCharCode(65 + index)}
        </div>
        <span style={{ fontSize: mob?12.5:13.5, fontWeight:700, color:'#fff', flex:1, lineHeight:1.35 }}>{step.title}</span>
        <span style={{ fontSize:11, color:'rgba(255,255,255,0.5)', background:'rgba(255,255,255,0.1)', padding:'2px 8px', borderRadius:99, flexShrink:0, whiteSpace:'nowrap' }}>⏱️ {step.time}</span>
      </div>
      <div style={{ padding: mob?'12px 14px':'14px 18px', background:'#fff' }}>
        <ol style={{ paddingLeft:16, display:'flex', flexDirection:'column', gap:6 }}>
          {step.tasks.map((task, j) => (
            <li key={j} style={{ fontSize: mob?13:13.5, color:'#2d2d50', lineHeight:1.7 }}>{task}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function ExerciseCard({ ex, mob }) {
  return (
    <div style={{ border:'1px solid #e4e4f0', borderRadius:14, overflow:'hidden', marginBottom:12 }}>
      <div style={{ padding: mob?'11px 14px':'13px 18px', background:'#f8f8fd', borderBottom:'1px solid #e4e4f0', display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
        <span style={{ fontSize:15 }}></span>
        <span style={{ fontSize: mob?13:14, fontWeight:700, color:'#0f0f1a', flex:1, minWidth:0 }}>{ex.title}</span>
        <ExerciseBadge type={ex.type} />
      </div>
      <div style={{ padding: mob?'12px 14px':'16px 18px' }}>
        <div style={{ fontSize: mob?13:13.5, color:'#2d2d50', lineHeight:1.75, padding:'11px 13px', background:'#f8f8fd', borderRadius:10, marginBottom:12 }}>
          {ex.question}
        </div>
        {ex.hint && (
          <div style={{ display:'flex', gap:9, padding:'10px 12px', borderLeft:'3px solid #d97706', background:'#fef3c7', borderRadius:'0 9px 9px 0', marginBottom:12 }}>
            <span style={{ fontSize:14, flexShrink:0 }}>💡</span>
            <div>
              <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.07em', color:'#92400e', marginBottom:3 }}>Gợi ý</div>
              <div style={{ fontSize: mob?12.5:13, color:'#92400e', lineHeight:1.65 }}>{ex.hint}</div>
            </div>
          </div>
        )}
        {ex.output && (
          <div style={{ display:'flex', gap:9, padding:'10px 12px', borderLeft:'3px solid #38bdf8', background:'#f0f9ff', borderRadius:'0 9px 9px 0' }}>
            <span style={{ fontSize:14, flexShrink:0 }}>📦</span>
            <div>
              <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.07em', color:'#0369a1', marginBottom:3 }}>Sản phẩm nộp</div>
              <div style={{ fontSize: mob?12.5:13, color:'#0369a1', lineHeight:1.65 }}>{ex.output}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ContentItem({ text, chColor }) {
  const isSub = text.startsWith('  ') || text.startsWith('• ');
  const clean = text.replace(/^[\s•]+/, '');
  if (isSub) return (
    <div style={{ display:'flex', gap:8, paddingLeft:16, paddingBottom:5, fontSize:13, color:'#6e6e9a', lineHeight:1.65 }}>
      <span style={{ flexShrink:0, color:'#a0a0c0', marginTop:5, fontSize:9 }}>·</span>
      <span>{clean}</span>
    </div>
  );
  return (
    <div style={{ display:'flex', gap:9, paddingBottom:7, fontSize:13.5, color:'#2d2d50', lineHeight:1.7 }}>
      <span style={{ color:chColor||'#4f46e5', flexShrink:0, marginTop:4, fontSize:9 }}>▸</span>
      <span>{clean}</span>
    </div>
  );
}
