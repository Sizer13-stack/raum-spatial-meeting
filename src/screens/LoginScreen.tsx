import { type Screen } from '../data/mockData'

interface LoginScreenProps {
  onNavigate: (screen: Screen) => void
}

export default function LoginScreen({ onNavigate }: LoginScreenProps) {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0B0D12' }}>
      {/* Left — hero */}
      <div className="hidden lg:flex flex-col justify-between flex-1 px-16 py-14" style={{ backgroundColor: '#10131A', borderRight: '1px solid #2A2F3A' }}>
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8B7CFF, #63B3ED)' }}>
            <span className="text-white font-bold text-base">R</span>
          </div>
          <span className="text-xl font-bold tracking-tight" style={{ color: '#F5F7FA' }}>Raum</span>
        </div>

        {/* Headline */}
        <div>
          <h1 className="text-5xl font-bold leading-tight mb-5" style={{ color: '#F5F7FA' }}>
            Your work,<br />in one shared<br />space.
          </h1>
          <p className="text-lg leading-relaxed max-w-md" style={{ color: '#9CA3AF' }}>
            Connect meetings, projects, documents, and conversations in a persistent spatial workspace.
          </p>
        </div>

        {/* Spatial preview */}
        <div className="relative w-full h-72 rounded-2xl overflow-hidden" style={{ border: '1px solid #2A2F3A', backgroundColor: '#0B0D12' }}>
          {/* dot grid */}
          <div className="absolute inset-0 dot-grid opacity-60" />
          {/* Floating windows */}
          <FloatingPreview />
          <div className="absolute bottom-4 left-4 text-xs" style={{ color: '#4B5563' }}>
            Spatial Workspace — Website Redesign
          </div>
        </div>
      </div>

      {/* Right — login */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-14 lg:max-w-md w-full">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-10 lg:hidden">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8B7CFF, #63B3ED)' }}>
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="text-lg font-bold tracking-tight" style={{ color: '#F5F7FA' }}>Raum</span>
        </div>

        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-1.5" style={{ color: '#F5F7FA' }}>Welcome back</h2>
          <p className="text-sm mb-8" style={{ color: '#9CA3AF' }}>Sign in to your workspace</p>

          {/* OAuth */}
          <div className="space-y-3 mb-6">
            <OAuthBtn icon={<GoogleIcon />} label="Continue with Google" />
            <OAuthBtn icon={<MSIcon />} label="Continue with Microsoft" />
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ backgroundColor: '#2A2F3A' }} />
            <span className="text-xs" style={{ color: '#4B5563' }}>or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#2A2F3A' }} />
          </div>

          {/* Form */}
          <div className="space-y-3 mb-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors"
              style={{ backgroundColor: '#1D212C', border: '1px solid #2A2F3A', color: '#F5F7FA' }}
              onFocus={e => (e.target.style.borderColor = '#8B7CFF')}
              onBlur={e => (e.target.style.borderColor = '#2A2F3A')}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors"
              style={{ backgroundColor: '#1D212C', border: '1px solid #2A2F3A', color: '#F5F7FA' }}
              onFocus={e => (e.target.style.borderColor = '#8B7CFF')}
              onBlur={e => (e.target.style.borderColor = '#2A2F3A')}
            />
          </div>

          <div className="flex justify-end mb-5">
            <button className="text-xs" style={{ color: '#8B7CFF' }}>Forgot password?</button>
          </div>

          <button
            className="w-full py-3 rounded-lg text-sm font-semibold mb-4 transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#8B7CFF', color: 'white' }}
          >
            Sign In
          </button>

          {/* Demo */}
          <button
            onClick={() => onNavigate('home')}
            className="w-full py-3 rounded-lg text-sm font-semibold mb-5 transition-all"
            style={{ backgroundColor: 'transparent', border: '1px solid #2A2F3A', color: '#F5F7FA' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#8B7CFF55')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2F3A')}
          >
            ✦ Explore demo workspace
          </button>

          <p className="text-center text-xs" style={{ color: '#9CA3AF' }}>
            Don't have an account?{' '}
            <button className="font-medium" style={{ color: '#8B7CFF' }}>Create account</button>
          </p>
        </div>
      </div>
    </div>
  )
}

function OAuthBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all"
      style={{ backgroundColor: '#1D212C', border: '1px solid #2A2F3A', color: '#F5F7FA' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#3A4050')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2F3A')}
    >
      {icon}
      {label}
    </button>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}

function MSIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="1" width="7.5" height="7.5" fill="#F25022"/>
      <rect x="9.5" y="1" width="7.5" height="7.5" fill="#7FBA00"/>
      <rect x="1" y="9.5" width="7.5" height="7.5" fill="#00A4EF"/>
      <rect x="9.5" y="9.5" width="7.5" height="7.5" fill="#FFB900"/>
    </svg>
  )
}

function FloatingPreview() {
  return (
    <>
      {/* Meeting window */}
      <div className="absolute" style={{ top: 20, left: 20, width: 160, borderRadius: 10, backgroundColor: '#1D212C', border: '1px solid #8B7CFF55', boxShadow: '0 0 20px rgba(139,124,255,0.15)' }}>
        <div className="px-3 py-2.5" style={{ borderBottom: '1px solid #2A2F3A' }}>
          <p className="text-[10px] font-semibold" style={{ color: '#F5F7FA' }}>Design Review</p>
          <span className="text-[9px] font-semibold" style={{ color: '#5EE6A8' }}>● LIVE</span>
        </div>
        <div className="px-3 py-2.5 flex gap-1">
          {['ZH','SK','AR'].map(i => (
            <div key={i} className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold" style={{ backgroundColor: '#8B7CFF22', color: '#8B7CFF', border: '1px solid #8B7CFF44' }}>{i}</div>
          ))}
        </div>
      </div>

      {/* Document */}
      <div className="absolute" style={{ top: 30, right: 24, width: 140, borderRadius: 10, backgroundColor: '#1D212C', border: '1px solid #2A2F3A' }}>
        <div className="px-3 py-2.5">
          <p className="text-[10px] font-semibold mb-0.5" style={{ color: '#F5F7FA' }}>User Research</p>
          <p className="text-[9px]" style={{ color: '#9CA3AF' }}>18 pages · Today</p>
        </div>
      </div>

      {/* Board */}
      <div className="absolute" style={{ bottom: 32, left: 30, width: 200, borderRadius: 10, backgroundColor: '#1D212C', border: '1px solid #2A2F3A' }}>
        <div className="px-3 py-2" style={{ borderBottom: '1px solid #2A2F3A' }}>
          <p className="text-[10px] font-semibold" style={{ color: '#F5F7FA' }}>Website Redesign Board</p>
        </div>
        <div className="px-3 py-2 flex gap-2">
          {['To Do','In Progress','Review'].map(c => (
            <div key={c} className="flex-1 rounded text-[8px] px-1.5 py-1" style={{ backgroundColor: '#151821', color: '#9CA3AF' }}>{c}</div>
          ))}
        </div>
      </div>

      {/* Connection line */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <line x1="100" y1="60" x2="165" y2="55" stroke="#8B7CFF" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.4" />
        <line x1="130" y1="60" x2="130" y2="130" stroke="#2A2F3A" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
    </>
  )
}
