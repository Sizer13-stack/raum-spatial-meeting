interface BadgeProps {
  label: string
  variant?: 'accent' | 'success' | 'blue' | 'warning' | 'muted' | 'live'
}

const variants = {
  accent: 'bg-[#8B7CFF22] text-[#8B7CFF] border border-[#8B7CFF44]',
  success: 'bg-[#5EE6A822] text-[#5EE6A8] border border-[#5EE6A844]',
  blue: 'bg-[#63B3ED22] text-[#63B3ED] border border-[#63B3ED44]',
  warning: 'bg-[#F4C95D22] text-[#F4C95D] border border-[#F4C95D44]',
  muted: 'bg-[#2A2F3A] text-[#9CA3AF]',
  live: 'bg-[#5EE6A8] text-[#0B0D12] font-semibold',
}

export default function Badge({ label, variant = 'muted' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] tracking-wide uppercase ${variants[variant]}`}>
      {variant === 'live' && <span className="w-1.5 h-1.5 rounded-full bg-[#0B0D12] mr-1.5 animate-pulse" />}
      {label}
    </span>
  )
}
