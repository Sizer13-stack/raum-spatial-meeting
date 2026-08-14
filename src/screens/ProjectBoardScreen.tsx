import { useState } from 'react'
import { tasks, team, documents, allMeetings, activity, type Screen } from '../data/mockData'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'

interface ProjectBoardScreenProps {
  onNavigate: (screen: Screen) => void
}

type Task = { id: string; title: string; priority: string; assignee: string; due: string; comments: number }

const priorityVariant: Record<string, 'accent' | 'warning' | 'muted'> = {
  high: 'accent', medium: 'warning', low: 'muted',
}

const tabs = ['Overview', 'Board', 'Files', 'Members']

export default function ProjectBoardScreen({ onNavigate }: ProjectBoardScreenProps) {
  const [activeTab, setActiveTab] = useState('Board')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [filter, setFilter] = useState('All')

  const columns = [
    { id: 'todo', label: 'TO DO', tasks: tasks.todo, color: '#9CA3AF' },
    { id: 'inProgress', label: 'IN PROGRESS', tasks: tasks.inProgress, color: '#63B3ED' },
    { id: 'review', label: 'REVIEW', tasks: tasks.review, color: '#F4C95D' },
    { id: 'done', label: 'DONE', tasks: tasks.done, color: '#5EE6A8' },
  ]

  const allTasks = [...tasks.todo, ...tasks.inProgress, ...tasks.review, ...tasks.done]
  const projectDocs = documents.filter(d => d.project === 'Website Redesign')
  const projectMeeting = allMeetings.find(m => m.project === 'Website Redesign' && m.status === 'live')

  return (
    <div className="flex-1 flex overflow-hidden" style={{ backgroundColor: '#0B0D12' }}>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-7 pt-6 pb-0 shrink-0" style={{ borderBottom: '1px solid #2A2F3A' }}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 mb-3">
            <button onClick={() => onNavigate('projects-list')} className="text-xs hover:underline" style={{ color: '#9CA3AF' }}>Projects</button>
            <span style={{ color: '#4B5563' }}>/</span>
            <span className="text-xs font-medium" style={{ color: '#F5F7FA' }}>Website Redesign</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold" style={{ color: '#F5F7FA' }}>Website Redesign</h1>
                <Badge label="Active" variant="success" />
                {projectMeeting && <Badge label="Meeting Live" variant="live" />}
              </div>
              <p className="text-xs" style={{ color: '#9CA3AF' }}>8 members · Due Aug 30 · Last updated 12 min ago</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('workspace')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ border: '1px solid #2A2F3A', color: '#9CA3AF' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#8B7CFF55')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2F3A')}
              >
                Open in Workspace
              </button>
              {projectMeeting && (
                <button
                  onClick={() => onNavigate('meeting')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ backgroundColor: '#5EE6A8', color: '#0B0D12' }}
                >
                  Join Live Meeting
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-0">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); if (tab !== 'Board') setSelectedTask(null) }}
                className="px-5 py-2.5 text-sm font-medium transition-colors relative"
                style={{ color: activeTab === tab ? '#F5F7FA' : '#9CA3AF' }}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t" style={{ backgroundColor: '#8B7CFF' }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        {activeTab === 'Overview' && (
          <OverviewTab allTasks={allTasks} columns={columns} onNavigate={onNavigate} activity={activity} />
        )}

        {activeTab === 'Board' && (
          <div className="flex flex-1 overflow-hidden">
            {/* Board columns */}
            <div className="flex-1 overflow-x-auto px-7 py-6">
              <div className="flex items-start gap-4 mb-4 flex-wrap">
                <select
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg text-xs outline-none"
                  style={{ backgroundColor: '#1D212C', border: '1px solid #2A2F3A', color: '#9CA3AF' }}
                >
                  <option>All</option>
                  <option>High Priority</option>
                  <option>My Tasks</option>
                </select>
                <button
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold ml-auto"
                  style={{ backgroundColor: '#8B7CFF', color: 'white' }}
                >
                  + Add Task
                </button>
              </div>
              <div className="flex gap-4 min-w-max">
                {columns.map(col => (
                  <div key={col.id} className="flex flex-col" style={{ width: 256 }}>
                    <div className="flex items-center justify-between mb-3 px-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }} />
                        <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: col.color }}>{col.label}</span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: '#1D212C', color: '#9CA3AF' }}>{col.tasks.length}</span>
                      </div>
                      <button style={{ color: '#4B5563' }} className="text-lg leading-none hover:text-[#9CA3AF]">+</button>
                    </div>
                    <div className="space-y-2.5 overflow-y-auto">
                      {col.tasks.map(task => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          selected={selectedTask?.id === task.id}
                          onClick={() => setSelectedTask(task)}
                        />
                      ))}
                      <button
                        className="w-full py-2 rounded-lg text-xs transition-colors flex items-center gap-1.5 justify-center"
                        style={{ color: '#4B5563', border: '1px dashed #2A2F3A' }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = '#3A4050')}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2F3A')}
                      >
                        + Add task
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {selectedTask && (
              <TaskDetailPanel task={selectedTask} onClose={() => setSelectedTask(null)} onNavigate={onNavigate} />
            )}
          </div>
        )}

        {activeTab === 'Files' && (
          <FilesTab docs={projectDocs} onNavigate={onNavigate} />
        )}

        {activeTab === 'Members' && (
          <MembersTab onNavigate={onNavigate} />
        )}
      </div>
    </div>
  )
}

/* ─── Overview Tab ─── */
function OverviewTab({ allTasks, columns, onNavigate, activity }: { allTasks: Task[]; columns: { id: string; label: string; tasks: Task[]; color: string }[]; onNavigate: (s: Screen) => void; activity: { id: string; text: string; time: string; avatar: string }[] }) {
  const done = columns.find(c => c.id === 'done')?.tasks.length ?? 0
  const progress = Math.round((done / allTasks.length) * 100)

  return (
    <div className="flex-1 overflow-y-auto px-7 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left — project summary */}
        <div className="xl:col-span-2 space-y-5">
          {/* Progress */}
          <div className="p-5 rounded-xl" style={{ backgroundColor: '#151821', border: '1px solid #2A2F3A' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: '#F5F7FA' }}>Overall Progress</h3>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: '#2A2F3A' }}>
                <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: '#8B7CFF' }} />
              </div>
              <span className="text-sm font-bold" style={{ color: '#8B7CFF' }}>{progress}%</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {columns.map(col => (
                <div key={col.id} className="text-center">
                  <p className="text-xl font-bold" style={{ color: col.color }}>{col.tasks.length}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: '#9CA3AF' }}>{col.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent tasks */}
          <div className="p-5 rounded-xl" style={{ backgroundColor: '#151821', border: '1px solid #2A2F3A' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold" style={{ color: '#F5F7FA' }}>Recent Tasks</h3>
              <button onClick={() => {}} className="text-xs" style={{ color: '#8B7CFF' }}>View board</button>
            </div>
            <div className="space-y-2">
              {allTasks.slice(0, 5).map(t => {
                const m = team.find(tm => tm.id === t.assignee)
                return (
                  <div key={t.id} className="flex items-center gap-3 py-2" style={{ borderBottom: '1px solid #2A2F3A22' }}>
                    <Avatar initials={m?.initials ?? '?'} color={m?.color ?? '#8B7CFF'} size="xs" />
                    <span className="flex-1 text-xs" style={{ color: '#F5F7FA' }}>{t.title}</span>
                    <Badge label={t.priority} variant={priorityVariant[t.priority]} />
                    <span className="text-[10px]" style={{ color: '#4B5563' }}>Due {t.due}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-4">
          <div className="p-5 rounded-xl" style={{ backgroundColor: '#151821', border: '1px solid #2A2F3A' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: '#F5F7FA' }}>Quick Actions</h3>
            <div className="space-y-2">
              <QuickAction label="Open Workspace" onClick={() => onNavigate('workspace')} icon="◈" color="#8B7CFF" />
              <QuickAction label="Join Meeting" onClick={() => onNavigate('meeting')} icon="⬡" color="#5EE6A8" badge="Live" />
              <QuickAction label="View Documents" onClick={() => onNavigate('documents')} icon="▭" color="#63B3ED" />
              <QuickAction label="Team Members" onClick={() => onNavigate('members')} icon="◯" color="#F4C95D" />
            </div>
          </div>

          <div className="p-5 rounded-xl" style={{ backgroundColor: '#151821', border: '1px solid #2A2F3A' }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: '#F5F7FA' }}>Recent Activity</h3>
            <div className="space-y-3">
              {activity.map(a => {
                const m = team.find(t => t.initials === a.avatar)
                return (
                  <div key={a.id} className="flex items-start gap-2.5">
                    <Avatar initials={a.avatar} color={m?.color ?? '#8B7CFF'} size="xs" />
                    <div>
                      <p className="text-xs" style={{ color: '#9CA3AF' }}>{a.text}</p>
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
  )
}

/* ─── Files Tab ─── */
function FilesTab({ docs, onNavigate }: { docs: typeof documents; onNavigate: (s: Screen) => void }) {
  const typeColors: Record<string, string> = { Research: '#5EE6A8', Design: '#8B7CFF', Document: '#63B3ED', Notes: '#F4C95D' }
  return (
    <div className="flex-1 overflow-y-auto px-7 py-6">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-semibold" style={{ color: '#F5F7FA' }}>Project Files</p>
        <button className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ backgroundColor: '#8B7CFF', color: 'white' }}>+ Upload</button>
      </div>
      <div className="space-y-2">
        {docs.map(doc => (
          <button
            key={doc.id}
            onClick={() => onNavigate('document-detail')}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all"
            style={{ backgroundColor: '#151821', border: '1px solid #2A2F3A' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#8B7CFF44')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2F3A')}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-sm" style={{ backgroundColor: `${typeColors[doc.type]}22`, color: typeColors[doc.type] }}>
              ▭
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: '#F5F7FA' }}>{doc.title}</p>
              <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>{doc.owner} · {doc.pages} pages</p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs" style={{ color: '#9CA3AF' }}>Modified {doc.modified}</p>
              <span className="text-[10px] px-2 py-0.5 rounded mt-1 inline-block" style={{ backgroundColor: `${typeColors[doc.type]}22`, color: typeColors[doc.type] }}>{doc.type}</span>
            </div>
            <span className="text-xs ml-2" style={{ color: '#8B7CFF' }}>→</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── Members Tab ─── */
function MembersTab({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="flex-1 overflow-y-auto px-7 py-6">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-semibold" style={{ color: '#F5F7FA' }}>Team Members</p>
        <button className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ backgroundColor: '#8B7CFF', color: 'white' }}>+ Invite</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {team.map(member => (
          <div key={member.id} className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: '#151821', border: '1px solid #2A2F3A' }}>
            <Avatar initials={member.initials} color={member.color} size="md" status={member.status as 'online' | 'busy'} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold" style={{ color: '#F5F7FA' }}>{member.name}</p>
              <p className="text-xs" style={{ color: '#9CA3AF' }}>{member.role}</p>
              <p className="text-[10px] mt-0.5 truncate" style={{ color: '#4B5563' }}>{member.activity}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => onNavigate('members')}
        className="mt-4 text-xs"
        style={{ color: '#8B7CFF' }}
      >
        View full members page →
      </button>
    </div>
  )
}

/* ─── Task Card ─── */
function TaskCard({ task, selected, onClick }: { task: Task; selected: boolean; onClick: () => void }) {
  const member = team.find(m => m.id === task.assignee)
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-xl transition-all"
      style={{
        backgroundColor: selected ? '#1D212C' : '#151821',
        border: selected ? '1px solid #8B7CFF55' : '1px solid #2A2F3A',
        boxShadow: selected ? '0 0 0 2px rgba(139,124,255,0.08)' : 'none',
      }}
    >
      <div className="flex items-start justify-between mb-2.5 gap-2">
        <p className="text-sm font-medium leading-snug" style={{ color: '#F5F7FA' }}>{task.title}</p>
        <Badge label={task.priority} variant={priorityVariant[task.priority]} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {member && <Avatar initials={member.initials} color={member.color} size="xs" />}
          <span className="text-[10px]" style={{ color: '#9CA3AF' }}>Due {task.due}</span>
        </div>
        <div className="flex items-center gap-1" style={{ color: '#4B5563' }}>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1h9v7H6.5L4 10V8H1V1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
          <span className="text-[10px]">{task.comments}</span>
        </div>
      </div>
    </button>
  )
}

/* ─── Task Detail Panel ─── */
function TaskDetailPanel({ task, onClose, onNavigate }: { task: Task; onClose: () => void; onNavigate: (s: Screen) => void }) {
  const member = team.find(m => m.id === task.assignee)
  const [checked, setChecked] = useState([true, false, false, false])
  const checklist = ['Header exploration', 'Hero section', 'Navigation', 'Responsive layout']

  return (
    <div className="w-80 shrink-0 overflow-y-auto" style={{ backgroundColor: '#10131A', borderLeft: '1px solid #2A2F3A' }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #2A2F3A' }}>
        <h2 className="text-sm font-semibold" style={{ color: '#F5F7FA' }}>Task Details</h2>
        <button onClick={onClose} style={{ color: '#9CA3AF' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
        </button>
      </div>
      <div className="px-5 py-5 space-y-5">
        <div>
          <h3 className="text-base font-semibold mb-2" style={{ color: '#F5F7FA' }}>{task.title}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge label="In Progress" variant="blue" />
            <Badge label={task.priority} variant={priorityVariant[task.priority]} />
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: '#9CA3AF' }}>Assigned to</span>
            <div className="flex items-center gap-2">
              {member && <Avatar initials={member.initials} color={member.color} size="xs" />}
              <span className="text-xs font-medium" style={{ color: '#F5F7FA' }}>{member?.name}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: '#9CA3AF' }}>Due date</span>
            <span className="text-xs font-medium" style={{ color: '#F5F7FA' }}>{task.due}</span>
          </div>
        </div>
        <div>
          <p className="text-xs mb-2" style={{ color: '#9CA3AF' }}>Description</p>
          <p className="text-xs leading-relaxed" style={{ color: '#F5F7FA' }}>
            Redesign the homepage structure based on the latest usability findings from User Research Round 2.
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium" style={{ color: '#9CA3AF' }}>Checklist</p>
            <span className="text-[10px]" style={{ color: '#8B7CFF' }}>{checked.filter(Boolean).length}/{checklist.length}</span>
          </div>
          <div className="h-1 rounded-full mb-3" style={{ backgroundColor: '#2A2F3A' }}>
            <div className="h-full rounded-full" style={{ width: `${(checked.filter(Boolean).length / checklist.length) * 100}%`, backgroundColor: '#8B7CFF' }} />
          </div>
          <div className="space-y-2">
            {checklist.map((item, i) => (
              <label key={i} className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" checked={checked[i]} onChange={() => setChecked(prev => prev.map((v, j) => j === i ? !v : v))} className="w-3.5 h-3.5 rounded accent-[#8B7CFF]" />
                <span className="text-xs" style={{ color: checked[i] ? '#4B5563' : '#F5F7FA', textDecoration: checked[i] ? 'line-through' : 'none' }}>{item}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium mb-3" style={{ color: '#9CA3AF' }}>Comments</p>
          <div className="space-y-3">
            {[{ init: 'SK', name: 'Sarah', color: '#5EE6A8', msg: "I uploaded the latest version." }, { init: 'AR', name: 'Alex', color: '#63B3ED', msg: "The navigation hierarchy looks good." }].map((c, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <Avatar initials={c.init} color={c.color} size="sm" />
                <div className="flex-1 p-3 rounded-lg" style={{ backgroundColor: '#1D212C', border: '1px solid #2A2F3A' }}>
                  <p className="text-[10px] font-semibold mb-1" style={{ color: c.color }}>{c.name}</p>
                  <p className="text-xs" style={{ color: '#F5F7FA' }}>{c.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2 pt-2">
          <button className="w-full py-2.5 rounded-lg text-xs font-semibold" style={{ backgroundColor: '#5EE6A8', color: '#0B0D12' }}>Mark Complete</button>
          <button className="w-full py-2.5 rounded-lg text-xs font-medium" style={{ border: '1px solid #2A2F3A', color: '#9CA3AF' }}>Edit Task</button>
          <button onClick={onClose} className="w-full py-2.5 rounded-lg text-xs font-medium" style={{ border: '1px solid #2A2F3A', color: '#9CA3AF' }}>Close</button>
        </div>
      </div>
    </div>
  )
}

function QuickAction({ label, onClick, icon, color, badge }: { label: string; onClick: () => void; icon: string; color: string; badge?: string }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
      style={{ border: '1px solid #2A2F3A' }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1D212C')}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      <span style={{ color }}>{icon}</span>
      <span className="flex-1 text-xs font-medium" style={{ color: '#F5F7FA' }}>{label}</span>
      {badge && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: '#5EE6A8', color: '#0B0D12' }}>{badge}</span>}
    </button>
  )
}
