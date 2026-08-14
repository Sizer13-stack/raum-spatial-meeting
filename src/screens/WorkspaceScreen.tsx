import { useState, useRef, useCallback, useEffect } from 'react'
import { type Screen, team } from '../data/mockData'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'

interface WorkspaceScreenProps {
  onNavigate: (screen: Screen) => void
}

interface WindowObj {
  id: string
  type: 'meeting' | 'board' | 'design' | 'document' | 'chat'
  title: string
  x: number
  y: number
  w: number
  h: number
}

const initialWindows: WindowObj[] = [
  { id: 'w1', type: 'meeting', title: 'Design Review', x: 40, y: 50, w: 240, h: 160 },
  { id: 'w2', type: 'board', title: 'Website Redesign Board', x: 330, y: 40, w: 300, h: 210 },
  { id: 'w3', type: 'design', title: 'Homepage Design', x: 680, y: 60, w: 220, h: 170 },
  { id: 'w4', type: 'document', title: 'User Research — Round 2', x: 60, y: 270, w: 220, h: 150 },
  { id: 'w5', type: 'chat', title: 'Team Discussion', x: 360, y: 305, w: 250, h: 200 },
]

const windowTypeColors: Record<string, string> = {
  meeting: '#8B7CFF',
  board: '#63B3ED',
  design: '#F4C95D',
  document: '#5EE6A8',
  chat: '#9CA3AF',
}

export default function WorkspaceScreen({ onNavigate }: WorkspaceScreenProps) {
  const [windows, setWindows] = useState<WindowObj[]>(initialWindows)
  const [selected, setSelected] = useState<string | null>(null)
  const [dragging, setDragging] = useState<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null)
  const [zoom, setZoom] = useState(100)
  const [showGrid, setShowGrid] = useState(true)
  const [showAddMenu, setShowAddMenu] = useState(false)
  const [panelObj, setPanelObj] = useState<WindowObj | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const selectedObj = selected ? windows.find(w => w.id === selected) ?? null : null

  const onPointerDown = useCallback((e: React.PointerEvent, id: string) => {
    e.stopPropagation()
    setSelected(id)
    const win = windows.find(w => w.id === id)!
    setDragging({ id, startX: e.clientX, startY: e.clientY, origX: win.x, origY: win.y })
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [windows])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return
    const scale = zoom / 100
    const dx = (e.clientX - dragging.startX) / scale
    const dy = (e.clientY - dragging.startY) / scale
    setWindows(prev => prev.map(w =>
      w.id === dragging.id ? { ...w, x: dragging.origX + dx, y: dragging.origY + dy } : w
    ))
  }, [dragging, zoom])

  const onPointerUp = useCallback(() => setDragging(null), [])

  const addWindow = (type: WindowObj['type']) => {
    const labels: Record<string, string> = {
      meeting: 'New Team Meeting', board: 'New Project Board', design: 'New Design File',
      document: 'New Document', chat: 'New Chat',
    }
    const newWin: WindowObj = {
      id: `w${Date.now()}`, type, title: labels[type],
      x: 100 + Math.random() * 200, y: 100 + Math.random() * 150, w: 240, h: 160,
    }
    setWindows(prev => [...prev, newWin])
    setSelected(newWin.id)
    setShowAddMenu(false)
  }

  // Close add menu on outside click
  useEffect(() => {
    if (!showAddMenu) return
    const h = () => setShowAddMenu(false)
    document.addEventListener('click', h)
    return () => document.removeEventListener('click', h)
  }, [showAddMenu])

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: '#0B0D12' }}>
      {/* Topbar */}
      <div className="flex items-center justify-between px-6 py-3.5 shrink-0" style={{ borderBottom: '1px solid #2A2F3A', backgroundColor: '#10131A' }}>
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold" style={{ color: '#F5F7FA' }}>Website Redesign</h1>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#5EE6A822', color: '#5EE6A8', border: '1px solid #5EE6A833' }}>6 members online</span>
        </div>
        <div className="flex items-center gap-2">
          <ToolBtn label="Grid" active={showGrid} onClick={() => setShowGrid(v => !v)}>
            <GridSvg />
          </ToolBtn>
          <ToolBtn label="Reset view" onClick={() => setZoom(100)}>
            <ResetSvg />
          </ToolBtn>
          <div className="w-px h-5 mx-1" style={{ backgroundColor: '#2A2F3A' }} />
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{ backgroundColor: '#8B7CFF', color: 'white' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            onClick={e => { e.stopPropagation(); setShowAddMenu(v => !v) }}
          >
            <span>+</span> Add Window
          </button>
          {showAddMenu && <AddMenu onAdd={addWindow} />}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Canvas */}
        <div
          ref={canvasRef}
          className="flex-1 relative overflow-hidden cursor-default"
          style={{ backgroundColor: '#0B0D12' }}
          onClick={() => setSelected(null)}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          {showGrid && <div className="absolute inset-0 dot-grid" style={{ opacity: 0.5 }} />}

          {/* Canvas transform layer */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top left',
            }}
          >
            {windows.map(win => (
              <CanvasWindow
                key={win.id}
                win={win}
                selected={selected === win.id}
                onPointerDown={onPointerDown}
                onClick={() => { setSelected(win.id); setPanelObj(win) }}
                onNavigate={onNavigate}
              />
            ))}
          </div>

          {/* Bottom status */}
          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#151821', color: '#9CA3AF', border: '1px solid #2A2F3A' }}>
              {windows.length} objects
            </span>
            <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#151821', color: '#5EE6A8', border: '1px solid #2A2F3A' }}>
              ● Last synced just now
            </span>
          </div>

          {/* Zoom controls */}
          <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-lg overflow-hidden" style={{ border: '1px solid #2A2F3A', backgroundColor: '#151821' }}>
            <button className="px-3 py-1.5 text-sm font-medium transition-colors hover:bg-[#1D212C]" style={{ color: '#9CA3AF' }} onClick={() => setZoom(z => Math.max(50, z - 10))}>−</button>
            <span className="px-2 text-xs font-mono" style={{ color: '#F5F7FA' }}>{zoom}%</span>
            <button className="px-3 py-1.5 text-sm font-medium transition-colors hover:bg-[#1D212C]" style={{ color: '#9CA3AF' }} onClick={() => setZoom(z => Math.min(200, z + 10))}>+</button>
          </div>

          {/* Context action bar */}
          {selectedObj && (
            <div
              className="absolute bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-1.5 rounded-xl"
              style={{ backgroundColor: '#1D212C', border: '1px solid #2A2F3A', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
            >
              {['Open','Move','Minimize','More'].map(action => (
                <button
                  key={action}
                  onClick={() => { if (action === 'Open') { if (selectedObj.type === 'meeting') onNavigate('meeting'); else if (selectedObj.type === 'board') onNavigate('board'); else if (selectedObj.type === 'document') onNavigate('document-detail') } }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  style={{ color: action === 'Open' ? '#8B7CFF' : '#9CA3AF' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2A2F3A')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {action}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Context panel */}
        {panelObj && (
          <ContextPanel obj={panelObj} onClose={() => setPanelObj(null)} onNavigate={onNavigate} />
        )}
      </div>
    </div>
  )
}

function CanvasWindow({ win, selected, onPointerDown, onClick, onNavigate }: {
  win: WindowObj
  selected: boolean
  onPointerDown: (e: React.PointerEvent, id: string) => void
  onClick: () => void
  onNavigate: (s: Screen) => void
}) {
  const color = windowTypeColors[win.type]
  return (
    <div
      className="absolute select-none"
      style={{
        left: win.x, top: win.y, width: win.w,
        borderRadius: 12,
        backgroundColor: '#1D212C',
        border: selected ? `1.5px solid ${color}` : '1px solid #2A2F3A',
        boxShadow: selected ? `0 0 0 3px ${color}22, 0 8px 32px rgba(0,0,0,0.4)` : '0 4px 16px rgba(0,0,0,0.3)',
        cursor: 'grab',
        transition: 'box-shadow 0.15s, border-color 0.15s',
        overflow: 'hidden',
      }}
      onPointerDown={e => onPointerDown(e, win.id)}
      onClick={onClick}
    >
      {/* Window header */}
      <div className="flex items-center justify-between px-3 py-2.5" style={{ borderBottom: '1px solid #2A2F3A' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-[11px] font-semibold truncate" style={{ color: '#F5F7FA' }}>{win.title}</span>
        </div>
        {win.type === 'meeting' && <Badge label="Live" variant="live" />}
      </div>
      {/* Window content */}
      <WindowContent win={win} onNavigate={onNavigate} />
    </div>
  )
}

function WindowContent({ win, onNavigate }: { win: WindowObj; onNavigate: (s: Screen) => void }) {
  switch (win.type) {
    case 'meeting':
      return (
        <div className="px-3 py-3">
          <div className="flex items-center gap-1.5 mb-3">
            {team.map(m => (
              <Avatar key={m.id} initials={m.initials} color={m.color} size="xs" status="online" />
            ))}
          </div>
          <button
            onClick={() => onNavigate('meeting')}
            className="w-full py-1.5 rounded-lg text-[11px] font-semibold transition-all"
            style={{ backgroundColor: '#8B7CFF', color: 'white' }}
          >
            Join Meeting
          </button>
        </div>
      )
    case 'board':
      return (
        <div className="px-3 py-3">
          <div className="grid grid-cols-4 gap-1 mb-2">
            {['To Do','In Progress','Review','Done'].map(col => (
              <div key={col} className="text-[8px] px-1 py-1 rounded text-center font-medium" style={{ backgroundColor: '#151821', color: '#9CA3AF' }}>{col}</div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-1">
            {[3, 2, 2, 2].map((n, i) => (
              <div key={i} className="space-y-1">
                {Array.from({ length: n }).map((_, j) => (
                  <div key={j} className="h-2 rounded" style={{ backgroundColor: '#2A2F3A' }} />
                ))}
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('board')}
            className="mt-2.5 w-full py-1.5 rounded-lg text-[11px] font-medium transition-colors"
            style={{ color: '#63B3ED', border: '1px solid #63B3ED33' }}
          >
            Open Board
          </button>
        </div>
      )
    case 'design':
      return (
        <div className="p-3">
          <div className="rounded-lg overflow-hidden mb-2.5 flex items-center justify-center" style={{ height: 80, backgroundColor: '#151821', border: '1px solid #2A2F3A' }}>
            <DesignPreview />
          </div>
          <p className="text-[10px]" style={{ color: '#9CA3AF' }}>Updated 12 min ago · by Zobayer</p>
        </div>
      )
    case 'document':
      return (
        <div className="px-3 py-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px]" style={{ color: '#9CA3AF' }}>18 pages</span>
            <span className="text-[10px]" style={{ color: '#5EE6A8' }}>Edited today</span>
          </div>
          <div className="space-y-1.5">
            {['Introduction', 'Methodology', 'Findings'].map(h => (
              <div key={h} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#5EE6A8' }} />
                <div className="h-1.5 rounded-full flex-1" style={{ backgroundColor: '#2A2F3A' }} />
                <span className="text-[8px]" style={{ color: '#9CA3AF' }}>{h}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('document-detail')}
            className="w-full py-1.5 rounded-lg text-[11px] font-medium transition-colors"
            style={{ color: '#5EE6A8', border: '1px solid #5EE6A833' }}
          >
            Open Document
          </button>
        </div>
      )
    case 'chat':
      return (
        <div className="px-3 py-2 space-y-2">
          {[
            { init: 'SK', msg: 'I uploaded the latest version!', color: '#5EE6A8' },
            { init: 'AR', msg: 'Navigation looks good.', color: '#63B3ED' },
            { init: 'MP', msg: 'Meeting in 5 minutes.', color: '#F4C95D' },
          ].map((m, i) => (
            <div key={i} className="flex items-start gap-2">
              <Avatar initials={m.init} color={m.color} size="xs" />
              <p className="text-[10px] leading-relaxed" style={{ color: '#9CA3AF' }}>{m.msg}</p>
            </div>
          ))}
        </div>
      )
    default:
      return null
  }
}

function ContextPanel({ obj, onClose, onNavigate }: { obj: WindowObj; onClose: () => void; onNavigate: (s: Screen) => void }) {
  const color = windowTypeColors[obj.type]
  return (
    <div
      className="w-72 shrink-0 overflow-y-auto flex flex-col"
      style={{ backgroundColor: '#10131A', borderLeft: '1px solid #2A2F3A' }}
    >
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #2A2F3A' }}>
        <div>
          <p className="text-sm font-semibold" style={{ color: '#F5F7FA' }}>{obj.title}</p>
          {obj.type === 'meeting' && <Badge label="Live" variant="live" />}
        </div>
        <button onClick={onClose} style={{ color: '#9CA3AF' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#F5F7FA')}
          onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}>
          <CloseSvg />
        </button>
      </div>

      <div className="px-5 py-5 space-y-5">
        {obj.type === 'meeting' && (
          <>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: '#4B5563' }}>Participants</p>
              <div className="space-y-2">
                {team.map(m => (
                  <div key={m.id} className="flex items-center gap-2">
                    <Avatar initials={m.initials} color={m.color} size="sm" status={m.status as 'online' | 'busy'} />
                    <div>
                      <p className="text-xs font-medium" style={{ color: '#F5F7FA' }}>{m.name}</p>
                      <p className="text-[10px]" style={{ color: '#9CA3AF' }}>{m.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: '#4B5563' }}>Context</p>
              <p className="text-xs" style={{ color: '#9CA3AF' }}>Website Redesign</p>
            </div>
          </>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: '#4B5563' }}>Actions</p>
          {obj.type === 'meeting' && (
            <ActionBtn label="Join Meeting" primary onClick={() => onNavigate('meeting')} />
          )}
          {obj.type === 'board' && (
            <ActionBtn label="Open Board" primary onClick={() => onNavigate('board')} />
          )}
          {obj.type === 'document' && (
            <ActionBtn label="Open Document" primary onClick={() => onNavigate('document-detail')} />
          )}
          <ActionBtn label="View Project" onClick={() => onNavigate('board')} />
          <ActionBtn label="Open Chat" />
        </div>

        {/* Activity */}
        <div>
          <p className="text-[10px] uppercase tracking-widest font-semibold mb-3" style={{ color: '#4B5563' }}>Recent Activity</p>
          <div className="space-y-3">
            {[
              { text: 'Sarah started the meeting 8 min ago.', time: '8 min' },
              { text: 'Alex shared Homepage Design.', time: '10 min' },
              { text: '2 comments added.', time: '12 min' },
            ].map((a, i) => (
              <div key={i} className="text-xs leading-relaxed" style={{ color: '#9CA3AF' }}>
                <p>{a.text}</p>
                <p className="text-[10px] mt-0.5" style={{ color: '#4B5563' }}>{a.time} ago</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ActionBtn({ label, primary, onClick }: { label: string; primary?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 rounded-lg text-xs font-medium transition-all"
      style={primary
        ? { backgroundColor: '#8B7CFF', color: 'white' }
        : { backgroundColor: 'transparent', border: '1px solid #2A2F3A', color: '#9CA3AF' }
      }
      onMouseEnter={e => { if (!primary) e.currentTarget.style.borderColor = '#8B7CFF55' }}
      onMouseLeave={e => { if (!primary) e.currentTarget.style.borderColor = '#2A2F3A' }}
    >
      {label}
    </button>
  )
}

function AddMenu({ onAdd }: { onAdd: (type: WindowObj['type']) => void }) {
  const items: { type: WindowObj['type']; label: string; desc: string }[] = [
    { type: 'meeting', label: 'Meeting', desc: 'Start or schedule a meeting' },
    { type: 'board', label: 'Project Board', desc: 'Kanban board for tasks' },
    { type: 'document', label: 'Document', desc: 'Notes or research doc' },
    { type: 'design', label: 'Design File', desc: 'Figma or design file' },
    { type: 'chat', label: 'Chat', desc: 'Team discussion channel' },
  ]
  return (
    <div
      className="absolute top-10 right-0 w-56 rounded-xl overflow-hidden z-50"
      style={{ backgroundColor: '#1D212C', border: '1px solid #2A2F3A', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}
      onClick={e => e.stopPropagation()}
    >
      <p className="px-4 py-3 text-[10px] uppercase tracking-widest font-semibold" style={{ color: '#4B5563', borderBottom: '1px solid #2A2F3A' }}>Add Window</p>
      {items.map(item => (
        <button
          key={item.type}
          onClick={() => onAdd(item.type)}
          className="w-full flex items-start gap-3 px-4 py-3 text-left transition-colors"
          style={{ borderBottom: '1px solid #2A2F3A22' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2A2F3A')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ backgroundColor: windowTypeColors[item.type] }} />
          <div>
            <p className="text-xs font-medium" style={{ color: '#F5F7FA' }}>{item.label}</p>
            <p className="text-[10px]" style={{ color: '#9CA3AF' }}>{item.desc}</p>
          </div>
        </button>
      ))}
    </div>
  )
}

/* SVG Helpers */
function GridSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="1" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9" y="1" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="1" y="9" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
      <rect x="9" y="9" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}
function ResetSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7a5 5 0 105-5H4M4 2L2 4l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function CloseSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
function DesignPreview() {
  return (
    <svg width="120" height="70" viewBox="0 0 120 70" fill="none">
      <rect x="4" y="4" width="112" height="12" rx="2" fill="#2A2F3A" />
      <rect x="4" y="22" width="52" height="36" rx="2" fill="#2A2F3A" />
      <rect x="62" y="22" width="54" height="16" rx="2" fill="#8B7CFF33" />
      <rect x="62" y="44" width="54" height="14" rx="2" fill="#2A2F3A" />
      <rect x="8" y="8" width="28" height="4" rx="1" fill="#3A4050" />
      <rect x="80" y="4" width="32" height="4" rx="2" fill="#8B7CFF" />
    </svg>
  )
}

function ToolBtn({ label, active, onClick, children }: { label: string; active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      title={label}
      onClick={onClick}
      className="p-2 rounded-lg transition-colors"
      style={{ backgroundColor: active ? '#8B7CFF22' : 'transparent', color: active ? '#8B7CFF' : '#9CA3AF', border: active ? '1px solid #8B7CFF44' : '1px solid transparent' }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.backgroundColor = '#1D212C' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.backgroundColor = 'transparent' }}
    >
      {children}
    </button>
  )
}
