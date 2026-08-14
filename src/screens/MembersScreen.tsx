import { team } from '../data/mockData'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'

export default function MembersScreen() {
  const extendedTeam = [
    ...team,
    { id: 'james', name: 'James', initials: 'JL', role: 'Backend Developer', color: '#F4C95D', status: 'offline' as 'online' | 'busy' | 'offline', activity: 'Last seen 2 hours ago' },
    { id: 'nina', name: 'Nina', initials: 'NR', role: 'UI Designer', color: '#63B3ED', status: 'online' as 'online' | 'busy' | 'offline', activity: 'Updating design tokens' },
  ]

  return (
    <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#0B0D12' }}>
      <div className="px-8 pt-8 pb-6" style={{ borderBottom: '1px solid #2A2F3A' }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold mb-1" style={{ color: '#F5F7FA' }}>Website Redesign Team</h1>
            <p className="text-sm" style={{ color: '#9CA3AF' }}>6 members · 4 online</p>
          </div>
          <button className="px-4 py-2 rounded-lg text-xs font-semibold" style={{ backgroundColor: '#8B7CFF', color: 'white' }}>
            + Invite Member
          </button>
        </div>
      </div>

      <div className="px-8 py-7 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {extendedTeam.map(member => (
          <div
            key={member.id}
            className="p-5 rounded-xl"
            style={{ backgroundColor: '#151821', border: '1px solid #2A2F3A' }}
          >
            <div className="flex items-start gap-4 mb-4">
              <Avatar initials={member.initials} color={member.color} size="lg" status={member.status as 'online' | 'busy' | 'offline'} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-semibold" style={{ color: '#F5F7FA' }}>{member.name}</p>
                  <Badge
                    label={member.status === 'online' ? 'Online' : member.status === 'busy' ? 'Busy' : 'Offline'}
                    variant={member.status === 'online' ? 'success' : member.status === 'busy' ? 'warning' : 'muted'}
                  />
                </div>
                <p className="text-xs" style={{ color: '#9CA3AF' }}>{member.role}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg" style={{ backgroundColor: '#1D212C', border: '1px solid #2A2F3A' }}>
              <div className="w-1 h-full rounded-full shrink-0 mt-1" style={{ backgroundColor: member.color, minHeight: 12 }} />
              <p className="text-xs leading-relaxed" style={{ color: '#9CA3AF' }}>{member.activity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
