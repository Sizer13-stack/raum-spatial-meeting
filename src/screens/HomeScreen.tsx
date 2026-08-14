import { type Screen, team, allMeetings, activity, allProjects } from '../data/mockData'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void
}

const statCards = [
  { label: 'Active Projects', value: '4', delta: '+1 this week', color: '#8B7CFF', icon: '◈' },
  { label: 'Meetings Today', value: '3', delta: '1 live now', color: '#5EE6A8', icon: '⬡' },
  { label: 'Pending Tasks', value: '8', delta: '3 due today', color: '#F4C95D', icon: '◇' },
  { label: 'Team Online', value: '4', delta: 'All members', color: '#63B3ED', icon: '◯' },
]

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#0B0D12' }}>
      {/* Header */}
      <div className="px-8 pt-8 pb-6" style={{ borderBottom: '1px solid #2A2F3A' }}>
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#F5F7FA' }}>Good morning, Zobayer</h1>
        <p className="text-sm" style={{ color: '#9CA3AF' }}>Here's what's happening across your workspaces.</p>
      </div>

      <div className="px-8 py-7 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(card => (
            <div key={card.label} className="p-5 rounded-xl" style={{ backgroundColor: '#151821', border: '1px solid #2A2F3A' }}>
              <div className="flex items-start justify-between mb-4">
                <p className="text-xs font-medium" style={{ color: '#9CA3AF' }}>{card.label}</p>
                <span className="text-lg" style={{ color: card.color }}>{card.icon}</span>
              </div>
              <p className="text-3xl font-bold mb-1" style={{ color: '#F5F7FA' }}>{card.value}</p>
              <p className="text-xs" style={{ color: card.color }}>{card.delta}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Recent Workspaces */}
          <div className="xl:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold" style={{ color: '#F5F7FA' }}>Recent Workspaces</h2>
              <button onClick={() => onNavigate('projects-list')} className="text-xs hover:underline" style={{ color: '#8B7CFF' }}>View all</button>
            </div>
            <div className="space-y-3">
              {allProjects.slice(0, 3).map(ws => (
                <WorkspaceCard key={ws.id} ws={ws} onOpen={() => onNavigate('workspace')} onOpenBoard={() => onNavigate('board')} />
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Upcoming Meetings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold" style={{ color: '#F5F7FA' }}>Upcoming Meetings</h2>
                <button onClick={() => onNavigate('meetings-list')} className="text-xs hover:underline" style={{ color: '#8B7CFF' }}>View all</button>
              </div>
              <div className="space-y-2">
                {allMeetings.slice(0, 3).map(m => (
                  <button
                    key={m.id}
                    onClick={() => onNavigate(m.status === 'live' ? 'meeting' : 'meetings-list')}
                    className="w-full text-left p-4 rounded-xl transition-all"
                    style={{ backgroundColor: '#151821', border: '1px solid #2A2F3A' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#8B7CFF44')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2F3A')}
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <p className="text-sm font-medium" style={{ color: '#F5F7FA' }}>{m.title}</p>
                      {m.status === 'live' ? <Badge label="Live" variant="live" /> : null}
                    </div>
                    <p className="text-xs mb-1" style={{ color: '#8B7CFF' }}>{m.time}</p>
                    <p className="text-xs" style={{ color: '#9CA3AF' }}>{m.project} · {m.participants} participants</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div>
              <h2 className="text-sm font-semibold mb-4" style={{ color: '#F5F7FA' }}>Recent Activity</h2>
              <div className="space-y-3">
                {activity.map(a => {
                  const member = team.find(t => t.initials === a.avatar)
                  return (
                    <div key={a.id} className="flex items-start gap-3">
                      <Avatar initials={a.avatar} color={member?.color ?? '#8B7CFF'} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs leading-relaxed" style={{ color: '#9CA3AF' }}>{a.text}</p>
                        <p className="text-[10px] mt-0.5" style={{ color: '#4B5563' }}>{a.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WorkspaceCard({ ws, onOpen, onOpenBoard }: { ws: typeof allProjects[0]; onOpen: () => void; onOpenBoard: () => void }) {
  return (
    <div className="p-5 rounded-xl" style={{ backgroundColor: '#151821', border: '1px solid #2A2F3A' }}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold" style={{ backgroundColor: `${ws.color}22`, color: ws.color, border: `1px solid ${ws.color}33` }}>
            {ws.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold" style={{ color: '#F5F7FA' }}>{ws.name}</p>
              {ws.status === 'active' && ws.id === 'p1' && <Badge label="Meeting" variant="live" />}
            </div>
            <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>{ws.desc}</p>
          </div>
        </div>
        <div className="flex gap-1.5 shrink-0">
          <button
            onClick={onOpenBoard}
            className="text-xs font-medium px-2.5 py-1.5 rounded-lg transition-all"
            style={{ backgroundColor: '#1D212C', color: '#9CA3AF', border: '1px solid #2A2F3A' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F5F7FA')}
            onMouseLeave={e => (e.currentTarget.style.color = '#9CA3AF')}
          >
            Board
          </button>
          <button
            onClick={onOpen}
            className="text-xs font-medium px-2.5 py-1.5 rounded-lg transition-all"
            style={{ backgroundColor: '#1D212C', color: '#8B7CFF', border: '1px solid #2A2F3A' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#8B7CFF22')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1D212C')}
          >
            Open workspace
          </button>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px]" style={{ color: '#9CA3AF' }}>Progress</span>
          <span className="text-[10px] font-medium" style={{ color: ws.color }}>{ws.progress}%</span>
        </div>
        <div className="h-1 rounded-full" style={{ backgroundColor: '#2A2F3A' }}>
          <div className="h-full rounded-full" style={{ width: `${ws.progress}%`, backgroundColor: ws.color }} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-[11px]" style={{ color: '#9CA3AF' }}>
          <span>{ws.members} members</span>
          <span>{ws.tasks} tasks</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-2">
            {ws.icons.slice(0, 3).map(i => {
              const m = team.find(t => t.initials === i)
              return <Avatar key={i} initials={i} color={m?.color ?? '#8B7CFF'} size="xs" />
            })}
          </div>
          <span className="text-[10px]" style={{ color: '#4B5563' }}>Updated {ws.lastActivity}</span>
        </div>
      </div>
    </div>
  )
}
