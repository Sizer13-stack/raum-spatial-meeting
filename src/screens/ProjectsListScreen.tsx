import { useState } from 'react'
import { allProjects, team, type Screen } from '../data/mockData'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'

interface ProjectsListScreenProps {
  onNavigate: (screen: Screen) => void
}

const statusVariant: Record<string, 'success' | 'blue' | 'muted'> = {
  active: 'success', planning: 'blue', archived: 'muted',
}

export default function ProjectsListScreen({ onNavigate }: ProjectsListScreenProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid')

  return (
    <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#0B0D12' }}>
      {/* Header */}
      <div className="px-8 pt-8 pb-6" style={{ borderBottom: '1px solid #2A2F3A' }}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-xl font-bold" style={{ color: '#F5F7FA' }}>Projects</h1>
            <p className="text-sm mt-0.5" style={{ color: '#9CA3AF' }}>{allProjects.length} projects across all workspaces</p>
          </div>
          <div className="flex items-center gap-2">
            {/* View toggle */}
            <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #2A2F3A' }}>
              <button
                onClick={() => setView('grid')}
                className="px-3 py-1.5 text-xs font-medium transition-colors"
                style={{ backgroundColor: view === 'grid' ? '#1D212C' : 'transparent', color: view === 'grid' ? '#F5F7FA' : '#9CA3AF' }}
              >
                Grid
              </button>
              <button
                onClick={() => setView('list')}
                className="px-3 py-1.5 text-xs font-medium transition-colors"
                style={{ backgroundColor: view === 'list' ? '#1D212C' : 'transparent', color: view === 'list' ? '#F5F7FA' : '#9CA3AF' }}
              >
                List
              </button>
            </div>
            <button
              className="px-4 py-2 rounded-lg text-xs font-semibold"
              style={{ backgroundColor: '#8B7CFF', color: 'white' }}
            >
              + New Project
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 py-7">
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
            {allProjects.map(project => (
              <ProjectCard key={project.id} project={project} onOpen={() => onNavigate('board')} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {allProjects.map(project => (
              <ProjectRow key={project.id} project={project} onOpen={() => onNavigate('board')} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectCard({ project, onOpen }: { project: typeof allProjects[0]; onOpen: () => void }) {
  return (
    <div className="p-6 rounded-xl" style={{ backgroundColor: '#151821', border: '1px solid #2A2F3A' }}>
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold shrink-0"
            style={{ backgroundColor: `${project.color}22`, color: project.color, border: `1px solid ${project.color}33` }}
          >
            {project.name[0]}
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: '#F5F7FA' }}>{project.name}</p>
            <Badge label={project.status} variant={statusVariant[project.status]} />
          </div>
        </div>
      </div>

      <p className="text-xs leading-relaxed mb-4" style={{ color: '#9CA3AF' }}>{project.desc}</p>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between mb-1.5">
          <span className="text-[10px]" style={{ color: '#9CA3AF' }}>Progress</span>
          <span className="text-[10px] font-semibold" style={{ color: project.color }}>{project.progress}%</span>
        </div>
        <div className="h-1.5 rounded-full" style={{ backgroundColor: '#2A2F3A' }}>
          <div className="h-full rounded-full" style={{ width: `${project.progress}%`, backgroundColor: project.color }} />
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          <div>
            <p className="text-base font-bold" style={{ color: '#F5F7FA' }}>{project.tasks}</p>
            <p className="text-[10px]" style={{ color: '#9CA3AF' }}>Tasks</p>
          </div>
          <div>
            <p className="text-base font-bold" style={{ color: '#F5F7FA' }}>{project.members}</p>
            <p className="text-[10px]" style={{ color: '#9CA3AF' }}>Members</p>
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: '#F5F7FA' }}>{project.dueDate}</p>
            <p className="text-[10px]" style={{ color: '#9CA3AF' }}>Due date</p>
          </div>
        </div>
        <div className="flex -space-x-2">
          {project.icons.slice(0, 3).map(i => {
            const m = team.find(t => t.initials === i)
            return <Avatar key={i} initials={i} color={m?.color ?? '#8B7CFF'} size="xs" />
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #2A2F3A' }}>
        <span className="text-[10px]" style={{ color: '#4B5563' }}>Updated {project.lastActivity}</span>
        <button
          onClick={onOpen}
          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{ backgroundColor: '#1D212C', color: '#8B7CFF', border: '1px solid #2A2F3A' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#8B7CFF22')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1D212C')}
        >
          Open Board →
        </button>
      </div>
    </div>
  )
}

function ProjectRow({ project, onOpen }: { project: typeof allProjects[0]; onOpen: () => void }) {
  return (
    <div
      className="flex items-center gap-4 px-5 py-4 rounded-xl"
      style={{ backgroundColor: '#151821', border: '1px solid #2A2F3A' }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shrink-0"
        style={{ backgroundColor: `${project.color}22`, color: project.color }}
      >
        {project.name[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold" style={{ color: '#F5F7FA' }}>{project.name}</p>
          <Badge label={project.status} variant={statusVariant[project.status]} />
        </div>
        <p className="text-xs truncate mt-0.5" style={{ color: '#9CA3AF' }}>{project.desc}</p>
      </div>
      <div className="hidden lg:flex items-center gap-6 shrink-0">
        <Stat label="Tasks" value={String(project.tasks)} />
        <Stat label="Members" value={String(project.members)} />
        <Stat label="Due" value={project.dueDate} />
        <div className="w-28">
          <div className="flex justify-between mb-1">
            <span className="text-[10px]" style={{ color: '#9CA3AF' }}>{project.progress}%</span>
          </div>
          <div className="h-1 rounded-full" style={{ backgroundColor: '#2A2F3A' }}>
            <div className="h-full rounded-full" style={{ width: `${project.progress}%`, backgroundColor: project.color }} />
          </div>
        </div>
      </div>
      <button
        onClick={onOpen}
        className="px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-all"
        style={{ backgroundColor: '#1D212C', color: '#8B7CFF', border: '1px solid #2A2F3A' }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#8B7CFF22')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1D212C')}
      >
        Open
      </button>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-sm font-semibold" style={{ color: '#F5F7FA' }}>{value}</p>
      <p className="text-[10px]" style={{ color: '#9CA3AF' }}>{label}</p>
    </div>
  )
}
