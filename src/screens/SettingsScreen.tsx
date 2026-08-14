import { useState } from 'react'
import Avatar from '../components/Avatar'

interface ToggleProps { on: boolean; onChange: (v: boolean) => void }

function Toggle({ on, onChange }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="relative w-10 h-5 rounded-full transition-colors"
      style={{ backgroundColor: on ? '#8B7CFF' : '#2A2F3A' }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform"
        style={{ transform: on ? 'translateX(20px)' : 'translateX(0)' }}
      />
    </button>
  )
}

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    gridVisible: true,
    autoSave: true,
    darkTheme: true,
    compactMode: false,
    reducedMotion: false,
    meetingReminders: true,
    projectUpdates: true,
    mentions: true,
    activityVisible: false,
    onlineStatus: true,
  })

  const set = (key: keyof typeof settings) => (v: boolean) =>
    setSettings(prev => ({ ...prev, [key]: v }))

  return (
    <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#0B0D12' }}>
      <div className="px-8 pt-8 pb-6" style={{ borderBottom: '1px solid #2A2F3A' }}>
        <h1 className="text-xl font-bold" style={{ color: '#F5F7FA' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: '#9CA3AF' }}>Manage your account and preferences</p>
      </div>

      <div className="px-8 py-7 max-w-2xl space-y-8">
        <SettingSection title="Profile">
          <div className="flex items-center gap-4 mb-6">
            <Avatar initials="ZH" color="#8B7CFF" size="xl" status="online" />
            <div>
              <button className="text-xs font-medium mb-1" style={{ color: '#8B7CFF' }}>Change avatar</button>
              <p className="text-[10px]" style={{ color: '#9CA3AF' }}>JPG, PNG, GIF up to 4MB</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name" defaultValue="Zobayer Hossain" />
            <Field label="Role" defaultValue="Product Designer" />
            <Field label="Email" defaultValue="zobayer@raum.app" type="email" />
          </div>
        </SettingSection>

        <SettingSection title="Workspace">
          <div className="space-y-3">
            <SelectField label="Default workspace" value="Website Redesign" options={['Website Redesign', 'Mobile App', 'Research']} />
            <ToggleRow label="Grid visibility" sub="Show dot grid on spatial canvas" on={settings.gridVisible} onChange={set('gridVisible')} />
            <ToggleRow label="Auto-save" sub="Automatically save changes every 30 seconds" on={settings.autoSave} onChange={set('autoSave')} />
          </div>
        </SettingSection>

        <SettingSection title="Appearance">
          <div className="space-y-3">
            <ToggleRow label="Dark theme" sub="Use dark color scheme" on={settings.darkTheme} onChange={set('darkTheme')} />
            <ToggleRow label="Compact mode" sub="Reduce spacing in the interface" on={settings.compactMode} onChange={set('compactMode')} />
            <ToggleRow label="Reduced motion" sub="Minimize animations and transitions" on={settings.reducedMotion} onChange={set('reducedMotion')} />
          </div>
        </SettingSection>

        <SettingSection title="Notifications">
          <div className="space-y-3">
            <ToggleRow label="Meeting reminders" sub="Get notified 15 minutes before meetings" on={settings.meetingReminders} onChange={set('meetingReminders')} />
            <ToggleRow label="Project updates" sub="Notify when tasks are moved or updated" on={settings.projectUpdates} onChange={set('projectUpdates')} />
            <ToggleRow label="Mentions" sub="Notify when someone mentions you" on={settings.mentions} onChange={set('mentions')} />
          </div>
        </SettingSection>

        <SettingSection title="Privacy">
          <div className="space-y-3">
            <ToggleRow label="Activity visibility" sub="Show your current activity to team members" on={settings.activityVisible} onChange={set('activityVisible')} />
            <ToggleRow label="Online status" sub="Show when you are online" on={settings.onlineStatus} onChange={set('onlineStatus')} />
          </div>
        </SettingSection>

        <div className="pt-2">
          <button className="px-6 py-2.5 rounded-lg text-sm font-semibold" style={{ backgroundColor: '#8B7CFF', color: 'white' }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

function SettingSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold mb-4 pb-2" style={{ color: '#F5F7FA', borderBottom: '1px solid #2A2F3A' }}>{title}</h2>
      {children}
    </div>
  )
}

function Field({ label, defaultValue, type = 'text' }: { label: string; defaultValue: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5" style={{ color: '#9CA3AF' }}>{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
        style={{ backgroundColor: '#1D212C', border: '1px solid #2A2F3A', color: '#F5F7FA' }}
        onFocus={e => (e.target.style.borderColor = '#8B7CFF')}
        onBlur={e => (e.target.style.borderColor = '#2A2F3A')}
      />
    </div>
  )
}

function SelectField({ label, value, options }: { label: string; value: string; options: string[] }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm" style={{ color: '#F5F7FA' }}>{label}</span>
      <select
        defaultValue={value}
        className="px-3 py-1.5 rounded-lg text-xs outline-none"
        style={{ backgroundColor: '#1D212C', border: '1px solid #2A2F3A', color: '#9CA3AF' }}
      >
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  )
}

function ToggleRow({ label, sub, on, onChange }: { label: string; sub: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm" style={{ color: '#F5F7FA' }}>{label}</p>
        <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>{sub}</p>
      </div>
      <Toggle on={on} onChange={onChange} />
    </div>
  )
}
