import { allMeetings, team, type Screen } from '../data/mockData'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'

interface MeetingsListScreenProps {
  onNavigate: (screen: Screen) => void
}

export default function MeetingsListScreen({ onNavigate }: MeetingsListScreenProps) {
  const today = allMeetings.filter(m => m.date === 'Today')
  const upcoming = allMeetings.filter(m => m.date !== 'Today')

  return (
    <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#0B0D12' }}>
      <div className="px-8 pt-8 pb-6" style={{ borderBottom: '1px solid #2A2F3A' }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold" style={{ color: '#F5F7FA' }}>Meetings</h1>
            <p className="text-sm mt-0.5" style={{ color: '#9CA3AF' }}>
              {today.length} meetings today · {upcoming.length} upcoming
            </p>
          </div>
          <button
            className="px-4 py-2 rounded-lg text-xs font-semibold"
            style={{ backgroundColor: '#8B7CFF', color: 'white' }}
          >
            + Schedule Meeting
          </button>
        </div>
      </div>

      <div className="px-8 py-7 space-y-8">
        {/* Today */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#4B5563' }}>Today</h2>
          <div className="space-y-3">
            {today.map(m => (
              <MeetingCard key={m.id} meeting={m} onJoin={() => onNavigate('meeting')} />
            ))}
          </div>
        </section>

        {/* Upcoming */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#4B5563' }}>Upcoming</h2>
          <div className="space-y-3">
            {upcoming.map(m => (
              <MeetingCard key={m.id} meeting={m} onJoin={() => onNavigate('meeting')} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function MeetingCard({ meeting, onJoin }: { meeting: typeof allMeetings[0]; onJoin: () => void }) {
  const statusColor = meeting.status === 'live' ? '#5EE6A8' : meeting.status === 'upcoming' ? '#8B7CFF' : '#9CA3AF'

  return (
    <div
      className="flex items-start gap-5 p-5 rounded-xl"
      style={{
        backgroundColor: '#151821',
        border: meeting.status === 'live' ? '1px solid #5EE6A844' : '1px solid #2A2F3A',
        boxShadow: meeting.status === 'live' ? '0 0 0 1px #5EE6A811' : 'none',
      }}
    >
      {/* Time column */}
      <div className="text-center shrink-0 w-14">
        <p className="text-sm font-bold" style={{ color: '#F5F7FA' }}>{meeting.time.split(' ')[0]}</p>
        <p className="text-[10px]" style={{ color: '#9CA3AF' }}>{meeting.time.split(' ')[1]}</p>
        <p className="text-[10px] mt-1" style={{ color: '#4B5563' }}>{meeting.date}</p>
      </div>

      {/* Divider */}
      <div className="w-px self-stretch" style={{ backgroundColor: `${statusColor}44` }} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm font-semibold" style={{ color: '#F5F7FA' }}>{meeting.title}</p>
              {meeting.status === 'live' && <Badge label="Live" variant="live" />}
              {meeting.status === 'upcoming' && <Badge label="Soon" variant="accent" />}
            </div>
            <p className="text-xs" style={{ color: '#9CA3AF' }}>{meeting.project}</p>
          </div>
          <button
            onClick={onJoin}
            className="px-4 py-2 rounded-lg text-xs font-semibold shrink-0 transition-all"
            style={meeting.status === 'live'
              ? { backgroundColor: '#5EE6A8', color: '#0B0D12' }
              : { backgroundColor: '#8B7CFF', color: 'white' }
            }
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {meeting.status === 'live' ? 'Join Now' : 'Join'}
          </button>
        </div>

        <p className="text-xs leading-relaxed mb-3" style={{ color: '#9CA3AF' }}>{meeting.desc}</p>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {meeting.avatars.map(init => {
              const m = team.find(t => t.initials === init)
              return <Avatar key={init} initials={init} color={m?.color ?? '#8B7CFF'} size="xs" />
            })}
          </div>
          <span className="text-[11px]" style={{ color: '#9CA3AF' }}>{meeting.participants} participants</span>
        </div>
      </div>
    </div>
  )
}
