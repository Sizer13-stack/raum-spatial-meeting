interface AvatarProps {
  initials: string
  color?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  status?: 'online' | 'busy' | 'offline'
}

const sizes = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-11 h-11 text-base',
  xl: 'w-14 h-14 text-lg',
}

const statusColors = {
  online: '#5EE6A8',
  busy: '#F4C95D',
  offline: '#4B5563',
}

const statusSizes = {
  xs: 'w-1.5 h-1.5 bottom-0 right-0',
  sm: 'w-2 h-2 bottom-0 right-0',
  md: 'w-2.5 h-2.5 bottom-0 right-0',
  lg: 'w-3 h-3 bottom-0.5 right-0.5',
  xl: 'w-3.5 h-3.5 bottom-0.5 right-0.5',
}

export default function Avatar({ initials, color = '#8B7CFF', size = 'md', status }: AvatarProps) {
  return (
    <div className={`relative shrink-0 ${sizes[size]} rounded-full flex items-center justify-center font-semibold`}
      style={{ backgroundColor: `${color}22`, border: `1px solid ${color}55`, color }}>
      {initials}
      {status && (
        <span
          className={`absolute ${statusSizes[size]} rounded-full border-2 border-[#0B0D12]`}
          style={{ backgroundColor: statusColors[status] }}
        />
      )}
    </div>
  )
}
