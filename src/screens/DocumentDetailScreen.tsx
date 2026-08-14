import { type Screen } from '../data/mockData'

interface DocumentDetailScreenProps {
  onNavigate: (screen: Screen) => void
}

export default function DocumentDetailScreen({ onNavigate }: DocumentDetailScreenProps) {
  return (
    <div className="flex-1 flex overflow-hidden" style={{ backgroundColor: '#0B0D12' }}>
      {/* Main document view */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 sticky top-0 z-10" style={{ backgroundColor: '#0B0D12', borderBottom: '1px solid #2A2F3A' }}>
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => onNavigate('documents')}
              className="flex items-center gap-2 text-xs mb-4"
              style={{ color: '#9CA3AF' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Back to Documents
            </button>
          </div>
          <h1 className="text-xl font-bold mb-2" style={{ color: '#F5F7FA' }}>User Research — Round 2</h1>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#8B7CFF22', color: '#8B7CFF', border: '1px solid #8B7CFF33' }}>Website Redesign</span>
            <span className="text-xs" style={{ color: '#9CA3AF' }}>18 pages</span>
            <span className="text-xs" style={{ color: '#5EE6A8' }}>Updated today</span>
            <span className="text-xs" style={{ color: '#9CA3AF' }}>Owner: Sarah</span>
          </div>
        </div>

        {/* Document content */}
        <div className="px-8 py-8 max-w-3xl">
          <DocSection title="Executive Summary" level={1}>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#9CA3AF' }}>
              This document summarizes findings from our second round of user research conducted between July 28 and August 9. We interviewed 12 participants across three user segments and conducted 4 usability tests with the current prototype.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>
              Key findings indicate significant navigation confusion in the current information architecture, with 8 of 12 participants unable to locate the project management features without assistance.
            </p>
          </DocSection>

          <DocSection title="Methodology" level={1}>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { label: 'Participants', value: '12', sub: 'Semi-structured interviews' },
                { label: 'Usability Tests', value: '4', sub: 'Prototype testing' },
                { label: 'Sessions', value: '16', sub: 'Total research hours' },
              ].map(s => (
                <div key={s.label} className="p-4 rounded-xl text-center" style={{ backgroundColor: '#1D212C', border: '1px solid #2A2F3A' }}>
                  <p className="text-2xl font-bold mb-1" style={{ color: '#8B7CFF' }}>{s.value}</p>
                  <p className="text-xs font-medium" style={{ color: '#F5F7FA' }}>{s.label}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: '#9CA3AF' }}>{s.sub}</p>
                </div>
              ))}
            </div>
          </DocSection>

          <DocSection title="Key Findings" level={1}>
            {[
              { n: 1, title: 'Navigation Confusion', detail: '67% of participants struggled to find project management features. Users expected a unified spatial view rather than separate tabs.' },
              { n: 2, title: 'Meeting Context', detail: 'Participants expressed strong desire to see project context during meetings. "I constantly switch between tools" was a recurring theme.' },
              { n: 3, title: 'Document Discovery', detail: 'Finding related documents required 4+ clicks on average. Users expect contextual document recommendations.' },
              { n: 4, title: 'Spatial Mental Model', detail: 'Users naturally described their work in spatial terms — "moving" tasks, "placing" documents. This validates the spatial canvas concept.' },
            ].map(f => (
              <div key={f.n} className="flex gap-4 mb-5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold" style={{ backgroundColor: '#8B7CFF22', color: '#8B7CFF', border: '1px solid #8B7CFF44' }}>{f.n}</div>
                <div>
                  <p className="text-sm font-semibold mb-1" style={{ color: '#F5F7FA' }}>{f.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>{f.detail}</p>
                </div>
              </div>
            ))}
          </DocSection>

          <DocSection title="Recommendations" level={1}>
            <div className="space-y-3">
              {[
                'Implement persistent spatial canvas as primary workspace view',
                'Surface contextual project information during meetings',
                'Add relationship graph between documents, tasks, and meetings',
                'Reduce navigation depth — critical actions within 2 clicks',
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: '#5EE6A8' }} />
                  <p className="text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>{r}</p>
                </div>
              ))}
            </div>
          </DocSection>
        </div>
      </div>

      {/* Right context sidebar */}
      <div className="w-64 shrink-0 overflow-y-auto" style={{ backgroundColor: '#10131A', borderLeft: '1px solid #2A2F3A' }}>
        <div className="px-5 py-5">
          <h3 className="text-sm font-semibold mb-5" style={{ color: '#F5F7FA' }}>Document Context</h3>

          <ContextSection label="Related project">
            <button onClick={() => onNavigate('board')} className="text-xs hover:underline" style={{ color: '#8B7CFF' }}>Website Redesign</button>
          </ContextSection>

          <ContextSection label="Related meeting">
            <button onClick={() => onNavigate('meeting')} className="text-xs hover:underline" style={{ color: '#8B7CFF' }}>Design Review</button>
          </ContextSection>

          <ContextSection label="Related tasks">
            <div className="space-y-1.5">
              {['Homepage redesign', 'Navigation structure'].map(t => (
                <button key={t} onClick={() => onNavigate('board')} className="flex items-center gap-1.5 text-left">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#63B3ED' }} />
                  <span className="text-xs hover:underline" style={{ color: '#63B3ED' }}>{t}</span>
                </button>
              ))}
            </div>
          </ContextSection>

          <div className="mt-6 space-y-2">
            <button className="w-full py-2.5 rounded-lg text-xs font-semibold" style={{ backgroundColor: '#8B7CFF', color: 'white' }}>Open</button>
            <button className="w-full py-2.5 rounded-lg text-xs font-medium" style={{ border: '1px solid #2A2F3A', color: '#9CA3AF' }}>Share</button>
            <button
              onClick={() => onNavigate('workspace')}
              className="w-full py-2.5 rounded-lg text-xs font-medium"
              style={{ border: '1px solid #2A2F3A', color: '#9CA3AF' }}
            >
              Add to Workspace
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DocSection({ title, level, children }: { title: string; level: number; children: React.ReactNode }) {
  const Tag = level === 1 ? 'h2' : 'h3'
  return (
    <div className="mb-8">
      <Tag className="text-base font-semibold mb-4 pb-2" style={{ color: '#F5F7FA', borderBottom: '1px solid #2A2F3A' }}>{title}</Tag>
      {children}
    </div>
  )
}

function ContextSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: '#4B5563' }}>{label}</p>
      {children}
    </div>
  )
}
