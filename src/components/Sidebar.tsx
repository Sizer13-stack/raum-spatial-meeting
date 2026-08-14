import React from 'react'
import { type Screen } from '../data/mockData'
import Avatar from './Avatar'

interface SidebarProps {
  current: Screen
  onNavigate: (screen: Screen) => void
  mobile?: boolean
  onClose?: () => void
}

const navItems: {
  id: Screen
  label: string
  icon: (p: { size?: number; active?: boolean }) => React.ReactElement
}[] = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'workspace', label: 'My Workspace', icon: GridIcon },
  { id: 'projects-list', label: 'Projects', icon: BoardIcon },
  { id: 'meetings-list', label: 'Meetings', icon: MeetingIcon },
  { id: 'documents', label: 'Documents', icon: DocIcon },
  { id: 'members', label: 'Members', icon: TeamIcon },
]

const workspaces = [
  { label: 'Website Redesign', color: '#9B8CFF', screen: 'workspace' as Screen },
  { label: 'Mobile App', color: '#69B7FF', screen: 'workspace' as Screen },
  { label: 'Research', color: '#62E6AD', screen: 'workspace' as Screen },
]

const otherItems: {
  id: Screen
  label: string
  icon: (p: { size?: number; active?: boolean }) => React.ReactElement
  badge?: number
}[] = [
  { id: 'notifications', label: 'Notifications', icon: BellIcon, badge: 3 },
  { id: 'settings', label: 'Settings', icon: GearIcon },
]

const navParent: Partial<Record<Screen, Screen>> = {
  board: 'projects-list',
  meeting: 'meetings-list',
  'document-detail': 'documents',
}

function isActive(itemId: Screen, current: Screen): boolean {
  return current === itemId || navParent[current] === itemId
}

export default function Sidebar({
  current,
  onNavigate,
  mobile,
  onClose,
}: SidebarProps) {
  const navigate = (screen: Screen) => {
    onNavigate(screen)
    onClose?.()
  }

  return (
    <aside
      className="glass-sidebar flex flex-col h-full overflow-hidden"
      style={{
        width: mobile ? '100%' : 240,
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center justify-between px-5 py-5"
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background:
                'linear-gradient(135deg, #9B8CFF 0%, #69B7FF 100%)',
              boxShadow:
                '0 0 22px rgba(155,140,255,0.35), inset 0 1px 0 rgba(255,255,255,0.35)',
            }}
          >
            <span className="text-white font-bold text-sm">R</span>
          </div>

          <span
            className="font-bold text-base tracking-tight"
            style={{ color: '#F7F8FF' }}
          >
            Raum
          </span>
        </div>

        {mobile && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg transition-all"
            style={{
              color: '#A6AEC2',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Main navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.id, current)

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: active
                    ? 'linear-gradient(135deg, rgba(155,140,255,0.20), rgba(105,183,255,0.08))'
                    : 'transparent',

                  border: active
                    ? '1px solid rgba(155,140,255,0.22)'
                    : '1px solid transparent',

                  color: active ? '#B8AEFF' : '#A6AEC2',

                  boxShadow: active
                    ? '0 8px 24px rgba(155,140,255,0.10), inset 0 1px 0 rgba(255,255,255,0.08)'
                    : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background =
                      'rgba(255,255,255,0.055)'
                    e.currentTarget.style.borderColor =
                      'rgba(255,255,255,0.07)'
                    e.currentTarget.style.color = '#F7F8FF'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor =
                      'transparent'
                    e.currentTarget.style.color = '#A6AEC2'
                  }
                }}
              >
                <item.icon size={16} active={active} />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Workspaces */}
        <div>
          <p
            className="px-3 mb-2 text-[10px] font-semibold tracking-widest uppercase"
            style={{ color: '#687188' }}
          >
            Workspaces
          </p>

          <div className="space-y-1">
            {workspaces.map((ws) => (
              <button
                key={ws.label}
                onClick={() => navigate(ws.screen)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200"
                style={{
                  color: '#A6AEC2',
                  border: '1px solid transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    'rgba(255,255,255,0.05)'
                  e.currentTarget.style.borderColor =
                    'rgba(255,255,255,0.06)'
                  e.currentTarget.style.color = '#F7F8FF'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.color = '#A6AEC2'
                }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    backgroundColor: ws.color,
                    boxShadow: `0 0 10px ${ws.color}`,
                  }}
                />

                {ws.label}
              </button>
            ))}
          </div>
        </div>

        {/* Other */}
        <div>
          <p
            className="px-3 mb-2 text-[10px] font-semibold tracking-widest uppercase"
            style={{ color: '#687188' }}
          >
            Other
          </p>

          <div className="space-y-1">
            {otherItems.map((item) => {
              const active = isActive(item.id, current)

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    background: active
                      ? 'rgba(155,140,255,0.14)'
                      : 'transparent',

                    border: active
                      ? '1px solid rgba(155,140,255,0.20)'
                      : '1px solid transparent',

                    color: active ? '#B8AEFF' : '#A6AEC2',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background =
                        'rgba(255,255,255,0.055)'
                      e.currentTarget.style.borderColor =
                        'rgba(255,255,255,0.07)'
                      e.currentTarget.style.color = '#F7F8FF'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor =
                        'transparent'
                      e.currentTarget.style.color = '#A6AEC2'
                    }
                  }}
                >
                  <span className="flex items-center gap-3">
                    <item.icon size={16} active={active} />
                    {item.label}
                  </span>

                  {item.badge && (
                    <span
                      className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{
                        background:
                          'linear-gradient(135deg, #9B8CFF, #69B7FF)',
                        color: '#fff',
                        boxShadow:
                          '0 0 14px rgba(155,140,255,0.35)',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* User */}
      <div
        className="px-4 py-4"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.018)',
        }}
      >
        <div className="flex items-center gap-3">
          <Avatar
            initials="ZH"
            color="#9B8CFF"
            size="sm"
            status="online"
          />

          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-medium truncate"
              style={{ color: '#F7F8FF' }}
            >
              Zobayer
            </p>

            <p
              className="text-xs truncate"
              style={{ color: '#62E6AD' }}
            >
              Online
            </p>
          </div>

          <button
            onClick={() => navigate('settings')}
            className="p-1.5 rounded-lg transition-all"
            style={{
              color: '#A6AEC2',
              background: 'rgba(255,255,255,0.035)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#F7F8FF'
              e.currentTarget.style.background =
                'rgba(255,255,255,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#A6AEC2'
              e.currentTarget.style.background =
                'rgba(255,255,255,0.035)'
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle
                cx="8"
                cy="4"
                r="1.2"
                fill="currentColor"
              />
              <circle
                cx="8"
                cy="8"
                r="1.2"
                fill="currentColor"
              />
              <circle
                cx="8"
                cy="12"
                r="1.2"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  )
}

/* ─── Icons ─── */

function HomeIcon({
  size = 16,
  active,
}: {
  size?: number
  active?: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M2 6.5L8 2l6 4.5V14H10v-3H6v3H2V6.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={0.15}
      />
    </svg>
  )
}

function GridIcon({
  size = 16,
  active,
}: {
  size?: number
  active?: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      {[0, 1, 2, 3].map((i) => {
        const x = i % 2 === 0 ? 2 : 9
        const y = i < 2 ? 2 : 9

        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="5"
            height="5"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.4"
            fill={active ? 'currentColor' : 'none'}
            fillOpacity={0.15}
          />
        )
      })}
    </svg>
  )
}

function BoardIcon({
  size = 16,
  active,
}: {
  size?: number
  active?: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <rect
        x="2"
        y="2"
        width="3"
        height="12"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.4"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={0.15}
      />
      <rect
        x="6.5"
        y="2"
        width="3"
        height="8"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.4"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={0.15}
      />
      <rect
        x="11"
        y="2"
        width="3"
        height="10"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.4"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={0.15}
      />
    </svg>
  )
}

function MeetingIcon({
  size = 16,
  active,
}: {
  size?: number
  active?: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <rect
        x="1"
        y="3"
        width="10"
        height="8"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={0.15}
      />
      <path
        d="M11 6l4-2v6l-4-2V6z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={0.15}
      />
    </svg>
  )
}

function DocIcon({
  size = 16,
  active,
}: {
  size?: number
  active?: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M4 2h6l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.4"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={0.15}
      />
      <path
        d="M10 2v4h4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M5 9h6M5 12h4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function TeamIcon({
  size = 16,
  active,
}: {
  size?: number
  active?: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <circle
        cx="6"
        cy="5"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.4"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={0.1}
      />
      <path
        d="M1 13c0-2.761 2.239-4 5-4s5 1.239 5 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle
        cx="12"
        cy="5"
        r="2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M14 13c0-1.5-.8-2.5-2-3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function BellIcon({
  size = 16,
  active,
}: {
  size?: number
  active?: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8 2a5 5 0 00-5 5v3l-1 2h12l-1-2V7a5 5 0 00-5-5z"
        stroke="currentColor"
        strokeWidth="1.4"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={0.15}
      />
      <path
        d="M6.5 13a1.5 1.5 0 003 0"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  )
}

function GearIcon({
  size = 16,
  active,
}: {
  size?: number
  active?: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <circle
        cx="8"
        cy="8"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.4"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={0.15}
      />
      <path
        d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.42 1.42M11.53 11.53l1.42 1.42M3.05 12.95l1.42-1.42M11.53 4.47l1.42-1.42"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}