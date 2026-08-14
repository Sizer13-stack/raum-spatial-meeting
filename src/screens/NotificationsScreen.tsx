import { useState } from 'react'
import { notifications, team } from '../data/mockData'
import Avatar from '../components/Avatar'

const filters = ['All', 'Mentions', 'Meetings', 'Projects']

export default function NotificationsScreen() {
  const [filter, setFilter] = useState('All')
  const [notifs, setNotifs] = useState(notifications)

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })))

  const filtered = filter === 'All' ? notifs
    : notifs.filter(n => {
        if (filter === 'Mentions') return n.type === 'mention'
        if (filter === 'Meetings') return n.type === 'meeting'
        if (filter === 'Projects') return n.type === 'project'
        return true
      })

  const unreadCount = notifs.filter(n => !n.read).length

  return (
    <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#0B0D12' }}>
      <div className="px-8 pt-8 pb-6" style={{ borderBottom: '1px solid #2A2F3A' }}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold" style={{ color: '#F5F7FA' }}>Notifications</h1>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: '#8B7CFF', color: 'white' }}>{unreadCount}</span>
            )}
          </div>
          <button onClick={markAllRead} className="text-xs" style={{ color: '#8B7CFF' }}>Mark all as read</button>
        </div>
        <div className="flex gap-1">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-lg text-xs font-medium transition-colors"
              style={{
                backgroundColor: filter === f ? '#8B7CFF22' : 'transparent',
                color: filter === f ? '#8B7CFF' : '#9CA3AF',
                border: filter === f ? '1px solid #8B7CFF44' : '1px solid transparent',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-8 py-6 space-y-2 max-w-2xl">
        {filtered.map(n => {
          const member = n.avatar ? team.find(m => m.initials === n.avatar) : null
          return (
            <button
              key={n.id}
              onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
              className="w-full flex items-start gap-3 p-4 rounded-xl text-left transition-all"
              style={{
                backgroundColor: n.read ? '#151821' : '#1D212C',
                border: n.read ? '1px solid #2A2F3A' : '1px solid #8B7CFF22',
              }}
            >
              {n.avatar && member ? (
                <Avatar initials={n.avatar} color={member.color} size="sm" />
              ) : (
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#8B7CFF22', color: '#8B7CFF' }}>
                  {n.type === 'meeting' ? '⬡' : '◈'}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-snug mb-1" style={{ color: n.read ? '#9CA3AF' : '#F5F7FA' }}>{n.text}</p>
                <p className="text-[10px]" style={{ color: '#4B5563' }}>{n.time}</p>
              </div>
              {!n.read && (
                <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: '#8B7CFF' }} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
