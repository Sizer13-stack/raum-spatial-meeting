import { useState } from 'react'
import { team, type Screen } from '../data/mockData'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'

interface MeetingScreenProps {
  onNavigate: (screen: Screen) => void
}

const messages = [
  { init: 'SK', name: 'Sophia Martinez', color: '#5EE6A8', msg: 'Welcome everyone! How are you all?', time: '11:12' },
  { init: 'AR', name: 'Daniel Thompson', color: '#63B3ED', msg: "Great to see everyone. Let's align sprint goals and next steps.", time: '11:12' },
  { init: 'MP', name: 'Isabella Wilson', color: '#F4C95D', msg: "Let's get started with quick updates from product and engineering.", time: '11:12' },
]

export default function MeetingScreen({ onNavigate }: MeetingScreenProps) {
  const [muted, setMuted] = useState(false)
  const [cameraOff, setCameraOff] = useState(false)
  const [activeTab, setActiveTab] = useState<'Messages' | 'Participants'>('Messages')
  const [chatMsg, setChatMsg] = useState('')

  return (
    <div className="flex-1 flex overflow-hidden" style={{ backgroundColor: '#0B0D12' }}>
      {/* Main meeting area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Meeting header */}
        <div className="flex items-center justify-between px-6 py-3.5 shrink-0" style={{ borderBottom: '1px solid #2A2F3A', backgroundColor: '#10131A' }}>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h1 className="text-sm font-semibold" style={{ color: '#F5F7FA' }}>Design Review</h1>
              <Badge label="Live" variant="live" />
            </div>
            <p className="text-xs" style={{ color: '#9CA3AF' }}>Website Redesign</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {team.map(m => (
                <Avatar key={m.id} initials={m.initials} color={m.color} size="xs" />
              ))}
              <span className="text-xs ml-1" style={{ color: '#9CA3AF' }}>4 participants</span>
            </div>
            <button
              onClick={() => onNavigate('workspace')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ backgroundColor: '#FF4B4B22', color: '#FF6B6B', border: '1px solid #FF4B4B44' }}
            >
              Leave Meeting
            </button>
          </div>
        </div>

        {/* Video grid */}
        <div className="flex-1 flex flex-col p-4 gap-3 overflow-hidden">
          {/* Main speaker */}
          <div className="flex-1 rounded-2xl overflow-hidden relative" style={{ backgroundColor: '#151821', border: '1px solid #2A2F3A' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Avatar initials="ZH" color="#8B7CFF" size="xl" />
                <p className="text-sm font-medium" style={{ color: '#F5F7FA' }}>You</p>
                <p className="text-xs" style={{ color: '#9CA3AF' }}>Product Designer</p>
              </div>
            </div>
            {/* Subtle grid overlay */}
            <div className="absolute inset-0 dot-grid opacity-20" />
            {/* Controls overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <ControlBtn active={!muted} onClick={() => setMuted(v => !v)} title="Mute">
                <MicSvg muted={muted} />
              </ControlBtn>
              <ControlBtn active={!cameraOff} onClick={() => setCameraOff(v => !v)} title="Camera">
                <CamSvg off={cameraOff} />
              </ControlBtn>
              <ControlBtn title="Share Screen">
                <ScreenSvg />
              </ControlBtn>
              <ControlBtn danger title="End Call">
                <EndSvg />
              </ControlBtn>
            </div>
            <div className="absolute top-3 left-3">
              <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#0B0D1299', color: '#F5F7FA' }}>You</span>
            </div>
          </div>

          {/* Participant strip */}
          <div className="flex gap-3 shrink-0" style={{ height: 130 }}>
            {team.slice(1).map(m => (
              <div
                key={m.id}
                className="flex-1 rounded-xl relative overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: '#151821', border: '1px solid #2A2F3A', minWidth: 100 }}
              >
                <div className="dot-grid absolute inset-0 opacity-20" />
                <div className="flex flex-col items-center gap-2 relative z-10">
                  <Avatar initials={m.initials} color={m.color} size="md" status={m.status as 'online' | 'busy'} />
                </div>
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <p className="text-[10px] font-medium" style={{ color: '#F5F7FA' }}>{m.name}</p>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0B0D1299' }}>
                    <MicSmSvg />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-72 flex flex-col shrink-0" style={{ backgroundColor: '#10131A', borderLeft: '1px solid #2A2F3A' }}>
        {/* Meeting Overview */}
        <div className="px-5 py-5" style={{ borderBottom: '1px solid #2A2F3A' }}>
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#F5F7FA' }}>Meeting Overview</h3>
          <p className="text-xs leading-relaxed mb-3" style={{ color: '#9CA3AF' }}>
            This call is a structured sync between the product and design teams to review ongoing work, track progress against sprint goals, and share updates on active tasks.
          </p>
          <p className="text-xs leading-relaxed" style={{ color: '#9CA3AF' }}>
            By aligning on priorities and confirming next steps, the session ensures smooth collaboration focused on homepage redesign objectives.
          </p>
        </div>

        {/* Meeting Context */}
        <div className="px-5 py-4" style={{ borderBottom: '1px solid #2A2F3A' }}>
          <p className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{ color: '#4B5563' }}>Meeting Context</p>
          <div className="space-y-2">
            <ContextItem label="Project" value="Website Redesign" onClick={() => onNavigate('board')} />
            <ContextItem label="Current task" value="Homepage redesign" onClick={() => onNavigate('board')} />
          </div>
          <p className="text-[10px] uppercase tracking-widest font-semibold my-3" style={{ color: '#4B5563' }}>Shared Files</p>
          <div className="space-y-2">
            {['Homepage Design', 'User Research', 'Project Board'].map(f => (
              <button
                key={f}
                onClick={() => onNavigate('document-detail')}
                className="flex items-center gap-2 w-full text-left"
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#8B7CFF' }} />
                <span className="text-xs hover:underline" style={{ color: '#8B7CFF' }}>{f}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex" style={{ borderBottom: '1px solid #2A2F3A' }}>
          {(['Messages', 'Participants'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-3 text-xs font-semibold transition-colors relative"
              style={{ color: activeTab === tab ? '#F5F7FA' : '#9CA3AF' }}
            >
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t" style={{ backgroundColor: '#8B7CFF' }} />
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* Messages */}
        {activeTab === 'Messages' && (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Avatar initials={m.init} color={m.color} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <p className="text-xs font-semibold" style={{ color: m.color }}>{m.name}</p>
                      <p className="text-[10px]" style={{ color: '#4B5563' }}>{m.time}</p>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: '#F5F7FA' }}>{m.msg}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-3" style={{ borderTop: '1px solid #2A2F3A' }}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ backgroundColor: '#1D212C', border: '1px solid #2A2F3A' }}>
                <input
                  value={chatMsg}
                  onChange={e => setChatMsg(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 text-xs bg-transparent outline-none"
                  style={{ color: '#F5F7FA' }}
                />
                <button
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: '#8B7CFF' }}
                >
                  <SendSvg />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Participants */}
        {activeTab === 'Participants' && (
          <div className="flex-1 overflow-y-auto px-4 py-3">
            <div className="space-y-3">
              {team.map(m => (
                <div key={m.id} className="flex items-center gap-3">
                  <Avatar initials={m.initials} color={m.color} size="sm" status={m.status as 'online' | 'busy'} />
                  <div className="flex-1">
                    <p className="text-xs font-medium" style={{ color: '#F5F7FA' }}>{m.name}</p>
                    <p className="text-[10px]" style={{ color: '#9CA3AF' }}>{m.role}</p>
                  </div>
                  <div className="flex gap-1">
                    <MicSmSvg />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ControlBtn({ children, active, onClick, danger, title }: { children: React.ReactNode; active?: boolean; onClick?: () => void; danger?: boolean; title?: string }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
      style={{
        backgroundColor: danger ? '#FF4B4B' : active === false ? '#FF4B4B22' : '#1D212Ccc',
        color: danger ? 'white' : active === false ? '#FF6B6B' : '#F5F7FA',
        border: danger ? 'none' : `1px solid ${active === false ? '#FF4B4B44' : '#2A2F3A'}`,
        backdropFilter: 'blur(4px)',
      }}
    >
      {children}
    </button>
  )
}

function ContextItem({ label, value, onClick }: { label: string; value: string; onClick?: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px]" style={{ color: '#9CA3AF' }}>{label}</span>
      <button
        onClick={onClick}
        className="text-xs font-medium hover:underline"
        style={{ color: '#8B7CFF' }}
      >{value}</button>
    </div>
  )
}

/* SVG icons */
function MicSvg({ muted }: { muted: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="6" y="2" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9a6 6 0 0012 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 15v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {muted && <line x1="2" y1="16" x2="16" y2="2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
    </svg>
  )
}
function CamSvg({ off }: { off: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="4" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8.5l5-3v7l-5-3V8.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      {off && <line x1="2" y1="16" x2="16" y2="2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
    </svg>
  )
}
function ScreenSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="2" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 16h6M9 14v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function EndSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 11l2.5-2.5a2 2 0 012.8 0L9 10.2l1.7-1.7a2 2 0 012.8 0L16 11a2 2 0 010 2.8L14.5 15c-6.5 0-10.5-4-10.5-4L2.5 13.5A2 2 0 012 11z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}
function MicSmSvg() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <rect x="3" y="1" width="4" height="5" rx="2" stroke="#9CA3AF" strokeWidth="1" />
      <path d="M1 5a4 4 0 008 0" stroke="#9CA3AF" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}
function SendSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M12.5 2L1 6l4 2.5L7.5 13 12.5 2z" fill="white" />
    </svg>
  )
}
