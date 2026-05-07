import { Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback, useRef } from 'react'
import './index.css'
import HomePage     from './pages/HomePage'
import FacultyPage  from './pages/FacultyPage'
import ChapterPage  from './pages/ChapterPage'
import LessonPage   from './pages/LessonPage'
import OverviewPage from './pages/OverviewPage'
import SearchPage   from './pages/SearchPage'
import { CHAPTERS } from './data/curriculum'

const PASSWORD   = 'cntt2026'
const STORAGE_KEY = 'cntt_auth'

const MAIN_NAV = [
  { to:'/',         icon:'', label:'Tổng quan'        },
  { to:'/faculty',  icon:'', label:'Giảng viên'       },
  { to:'/overview', icon:'', label:'Lịch học 45 tiết'  },
  { to:'/search',   icon:'', label:'Tìm kiếm'          },
]

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 769)
  useEffect(() => {
    const h = () => setM(window.innerWidth < 769)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return m
}

/* ══════════════════════════════════
   LOGIN
══════════════════════════════════ */
function LoginScreen({ onAuth }) {
  const [pw, setPw]   = useState('')
  const [err, setErr] = useState('')
  const [show, setShow] = useState(false)
  const [shake, setShake] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (pw === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, '1')
      onAuth()
    } else {
      setErr('Mật khẩu không đúng!')
      setPw('')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#0f0f1a 0%,#1e1e35 55%,#14103a 100%)', padding:20, position:'relative', overflow:'hidden' }}>
      {/* Decorative blobs */}
      <div style={{ position:'absolute', top:-100, right:-100, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(99,102,241,.18) 0%,transparent 70%)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:-100, left:-100, width:350, height:350, borderRadius:'50%', background:'radial-gradient(circle,rgba(167,139,250,.12) 0%,transparent 70%)', pointerEvents:'none' }} />

      <div style={{
        background:'#fff', borderRadius:24, padding:'40px 36px',
        width:'100%', maxWidth:400,
        boxShadow:'0 32px 80px rgba(0,0,0,.45)',
        animation: shake ? 'shake .4s ease' : 'fadeUp .4s ease both',
        position:'relative', zIndex:1,
      }}>
        <style>{`
          @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        `}</style>

        {/* Icon */}
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ width:72, height:72, borderRadius:20, margin:'0 auto 16px', background:'linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32, boxShadow:'0 8px 24px rgba(79,70,229,.35)' }}>
            📚
          </div>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:21, fontWeight:700, color:'#0f0f1a', marginBottom:6, lineHeight:1.3 }}>
            Ứng dụng CNTT<br/>Giáo dục Tiểu học
          </h1>
          <p style={{ fontSize:12.5, color:'#6e6e9a' }}>Trường ĐH Đà Lạt · Khoa Công nghệ Thông Tin</p>
        </div>

        {/* Form */}
        <form onSubmit={submit}>
          <label style={{ fontSize:12.5, fontWeight:600, color:'#2d2d50', display:'block', marginBottom:6 }}>
            🔑 Mật khẩu truy cập
          </label>
          <div style={{ position:'relative' }}>
            <input
              type={show ? 'text' : 'password'}
              value={pw}
              onChange={e => { setPw(e.target.value); setErr('') }}
              placeholder="Nhập mật khẩu..."
              autoFocus
              style={{
                width:'100%', padding:'12px 44px 12px 16px', borderRadius:10,
                border:`1.5px solid ${err ? '#fca5a5' : '#e4e4f0'}`,
                fontSize:15, fontFamily:"'Plus Jakarta Sans',sans-serif",
                outline:'none', background:'#f8f8fd',
                letterSpacing:'0.12em', boxSizing:'border-box',
                transition:'border-color .15s',
              }}
              onFocus={e => e.target.style.borderColor = '#818cf8'}
              onBlur={e => e.target.style.borderColor = err ? '#fca5a5' : '#e4e4f0'}
            />
            <button type="button" onClick={() => setShow(!show)}
              style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#6e6e9a', fontSize:16, padding:4 }}>
              {show ? '🙈' : '👁️'}
            </button>
          </div>

          {err && (
            <div style={{ background:'#fee2e2', color:'#991b1b', borderRadius:8, padding:'9px 14px', fontSize:13.5, marginTop:10, textAlign:'center', fontWeight:500 }}>
              ❌ {err}
            </div>
          )}

          <button type="submit"
            style={{ width:'100%', padding:13, borderRadius:10, border:'none', background:'linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%)', color:'#fff', fontSize:15, fontWeight:700, fontFamily:"'Plus Jakarta Sans',sans-serif", cursor:'pointer', marginTop:16, transition:'all .15s' }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 8px 20px rgba(79,70,229,.35)' }}
            onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
          >
            Đăng nhập →
          </button>
        </form>

        <p style={{ textAlign:'center', fontSize:12, color:'#a0a0c0', marginTop:18 }}>
          Liên hệ giảng viên để nhận mật khẩu
        </p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════
   SIDEBAR
══════════════════════════════════ */
function Sidebar({ open, onClose }) {
  const mob  = useIsMobile()
  const loc  = useLocation()
  const prev = useRef(loc.pathname)

  useEffect(() => {
    if (prev.current !== loc.pathname) { prev.current = loc.pathname; onClose() }
  }, [loc.pathname, onClose])

  return (
    <>
      {open && mob && (
        <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.62)', zIndex:198, backdropFilter:'blur(2px)' }} />
      )}

      <aside className={`layout-sidebar${open ? ' open' : ''}`}>
        {/* Brand */}
        <div style={{ padding:'16px 18px 14px', borderBottom:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
          <div>
            <div style={{ fontSize:9.5, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:6 }}>Trần vĩnh Phúc</div>
            <div style={{ fontFamily:"'Fraunces',serif", fontSize:14.5, fontWeight:700, color:'#fff', lineHeight:1.35, marginBottom:10 }}>
              Ứng dụng CNTT<br/>Giáo dục Tiểu học
            </div>
            <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
              {['45 tiết','6 chương','3 TC'].map(t => (
                <span key={t} style={{ fontSize:9.5, padding:'2px 7px', borderRadius:99, background:'rgba(255,255,255,0.09)', color:'rgba(255,255,255,0.5)', fontWeight:600 }}>{t}</span>
              ))}
            </div>
          </div>
          {mob && (
            <button onClick={onClose} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)', cursor:'pointer', fontSize:20, padding:'2px 4px', lineHeight:1, marginTop:2 }}>✕</button>
          )}
        </div>

        {/* Main nav */}
        <nav style={{ padding:'8px 0 4px' }}>
          <SbLabel>Điều hướng</SbLabel>
          {MAIN_NAV.map(n => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} style={sbStyle}>
              <span style={{ fontSize:14, flexShrink:0 }}>{n.icon}</span>
              <span>{n.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Chapters */}
        <nav style={{ padding:'4px 0 16px' }}>
          <SbLabel>Các chương</SbLabel>
          {CHAPTERS.map(ch => (
            <NavLink key={ch.id} to={`/chapter/${ch.id}`} style={sbStyle}>
              <span style={{ fontSize:14, flexShrink:0 }}>{ch.emoji}</span>
              <span style={{ flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>C{ch.id}: {ch.title}</span>
              <span style={{ fontSize:9.5, padding:'1px 6px', borderRadius:99, background:'rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.4)', flexShrink:0 }}>{ch.soTiet}t</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ marginTop:'auto', padding:'12px 18px', borderTop:'1px solid rgba(255,255,255,0.06)', fontSize:10.5, color:'rgba(255,255,255,0.25)', lineHeight:1.7 }}>
          Khoa Công nghệ Thông Tin - DLU
          phuctv@dlu.edu.vn
        </div>
      </aside>
    </>
  )
}

const SbLabel = ({ children }) => (
  <div style={{ padding:'5px 18px 3px', fontSize:9, fontWeight:700, letterSpacing:'0.13em', textTransform:'uppercase', color:'rgba(255,255,255,0.22)' }}>{children}</div>
)

const sbStyle = ({ isActive }) => ({
  display:'flex', alignItems:'center', gap:9,
  padding:'8px 18px', fontSize:12.5, textDecoration:'none',
  color: isActive ? '#fff' : 'rgba(255,255,255,0.52)',
  background: isActive ? 'rgba(255,255,255,0.09)' : 'transparent',
  borderLeft:`2.5px solid ${isActive ? '#818cf8' : 'transparent'}`,
  transition:'all 0.13s',
})

/* ══════════════════════════════════
   TOPBAR
══════════════════════════════════ */
function Topbar({ onMenu, onLogout }) {
  const mob = useIsMobile()
  const loc = useLocation()
  const curNav = MAIN_NAV.find(n => {
    if (n.to === '/') return loc.pathname === '/'
    return loc.pathname.startsWith(n.to)
  })

  return (
    <div className="topbar">
      {/* Hamburger — mobile only */}
      {mob && (
        <button onClick={onMenu} style={{ background:'#f8f8fd', border:'1px solid #e4e4f0', color:'#0f0f1a', cursor:'pointer', fontSize:16, borderRadius:8, width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          ☰
        </button>
      )}

      {/* Title / breadcrumb */}
      <div style={{ flex:1, overflow:'hidden' }}>
        {mob ? (
          <span style={{ fontWeight:700, fontSize:14, color:'#0f0f1a', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', display:'block' }}>
            {curNav?.label || 'CNTT Tiểu học'}
          </span>
        ) : (
          <Breadcrumb />
        )}
      </div>

      {/* Desktop: quick links */}
      {!mob && (
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          {[{to:'/faculty',l:'👩‍🏫 GV'},{to:'/search',l:'🔍 Tìm'},{to:'/overview',l:'📋 Lịch'}].map(b => (
            <NavLink key={b.to} to={b.to}
              style={({ isActive }) => ({ padding:'5px 12px', borderRadius:8, border:`1px solid ${isActive?'#818cf8':'#e4e4f0'}`, fontSize:12.5, color:isActive?'#4f46e5':'#6e6e9a', background:isActive?'#eef2ff':'#f8f8fd', textDecoration:'none', fontWeight:isActive?600:400, transition:'all .12s' })}>
              {b.l}
            </NavLink>
          ))}
          <button onClick={onLogout} style={{ padding:'5px 12px', borderRadius:8, border:'1px solid #fee2e2', fontSize:12.5, color:'#991b1b', background:'#fff5f5', cursor:'pointer' }}>
            🔓 Thoát
          </button>
        </div>
      )}

      {/* Mobile: logout icon */}
      {mob && (
        <button onClick={onLogout} style={{ background:'#fff5f5', border:'1px solid #fee2e2', color:'#991b1b', cursor:'pointer', fontSize:13, borderRadius:8, padding:'5px 10px', flexShrink:0 }}>
          🔓
        </button>
      )}
    </div>
  )
}

function Breadcrumb() {
  const loc = useLocation()
  const crumbs = [{ label:'Tổng quan', to:'/' }]
  if (loc.pathname.startsWith('/chapter/')) {
    const id = Number(loc.pathname.split('/')[2])
    const ch = CHAPTERS.find(c => c.id === id)
    if (ch) crumbs.push({ label:`${ch.emoji} Chương ${ch.id}: ${ch.title}`, to:`/chapter/${id}` })
  } else if (loc.pathname.startsWith('/lesson/')) {
    const id = loc.pathname.split('/')[2]
    crumbs.push({ label:`Tiết ${id}`, to:`/lesson/${id}` })
  } else {
    const n = MAIN_NAV.find(n => n.to !== '/' && loc.pathname.startsWith(n.to))
    if (n) crumbs.push({ label:n.label, to:n.to })
  }
  return (
    <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, color:'#6e6e9a' }}>
      {crumbs.map((c,i) => (
        <span key={c.to} style={{ display:'flex', alignItems:'center', gap:6 }}>
          {i > 0 && <span style={{ color:'#e4e4f0' }}>›</span>}
          <NavLink to={c.to} style={({ isActive }) => ({ color:isActive?'#0f0f1a':'#6e6e9a', fontWeight:isActive?600:400, textDecoration:'none' })}>
            {c.label}
          </NavLink>
        </span>
      ))}
    </div>
  )
}

/* ══════════════════════════════════
   ROUTE WRAPPERS
══════════════════════════════════ */
function ChapterRoute() {
  const { pathname } = useLocation()
  const id = Number(pathname.split('/')[2])
  const nav = useNavigate()
  const go  = (key) => {
    if (key.startsWith('chapter-')) nav(`/chapter/${key.split('-')[1]}`)
    else if (key.startsWith('lesson-')) nav(`/lesson/${key.split('-')[1]}`)
    else nav('/')
  }
  return <ChapterPage chapterId={id} onNav={go} />
}

function LessonRoute() {
  const { pathname } = useLocation()
  const id = Number(pathname.split('/')[2])
  const nav = useNavigate()
  const go  = (key) => {
    if (key.startsWith('chapter-')) nav(`/chapter/${key.split('-')[1]}`)
    else if (key.startsWith('lesson-')) nav(`/lesson/${key.split('-')[1]}`)
    else nav('/')
  }
  return <LessonPage lessonId={id} onNav={go} />
}

function HomeRoute() {
  const nav = useNavigate()
  const go  = (key) => {
    if (key.startsWith('chapter-')) nav(`/chapter/${key.split('-')[1]}`)
    else if (key === 'faculty')  nav('/faculty')
    else if (key === 'search')   nav('/search')
    else if (key === 'overview') nav('/overview')
  }
  return <HomePage onNav={go} />
}

function OverviewRoute() {
  const nav = useNavigate()
  return <OverviewPage onNav={(key) => {
    if (key.startsWith('lesson-')) nav(`/lesson/${key.split('-')[1]}`)
    else if (key.startsWith('chapter-')) nav(`/chapter/${key.split('-')[1]}`)
  }} />
}

function SearchRoute() {
  const nav = useNavigate()
  return <SearchPage onNav={(key) => {
    if (key.startsWith('lesson-')) nav(`/lesson/${key.split('-')[1]}`)
    else if (key.startsWith('chapter-')) nav(`/chapter/${key.split('-')[1]}`)
  }} />
}

/* ══════════════════════════════════
   MAIN APP
══════════════════════════════════ */
export default function App() {
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem(STORAGE_KEY))
  const [open,   setOpen]   = useState(false)
  const close  = useCallback(() => setOpen(false), [])
  const logout = useCallback(() => { sessionStorage.removeItem(STORAGE_KEY); setAuthed(false) }, [])

  if (!authed) return <LoginScreen onAuth={() => setAuthed(true)} />

  return (
    <div style={{ display:'flex', minHeight:'100vh' }}>
      <Sidebar open={open} onClose={close} />
      <div className="layout-main">
        <Topbar onMenu={() => setOpen(true)} onLogout={logout} />
        <div className="layout-content">
          <Routes>
            <Route path="/"           element={<HomeRoute />}    />
            <Route path="/faculty"    element={<FacultyPage />}  />
            <Route path="/overview"   element={<OverviewRoute />} />
            <Route path="/search"     element={<SearchRoute />}  />
            <Route path="/chapter/:id" element={<ChapterRoute />} />
            <Route path="/lesson/:id"  element={<LessonRoute />}  />
            <Route path="*"            element={<HomeRoute />}    />
          </Routes>
        </div>
      </div>
    </div>
  )
}
