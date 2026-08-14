import { useState } from 'react'
import { documents, type Screen } from '../data/mockData'
import Badge from '../components/Badge'

interface DocumentsScreenProps {
  onNavigate: (screen: Screen) => void
}

const filters = ['All', 'Recent', 'Shared with me', 'My files']

const typeColors: Record<string, string> = {
  Research: '#5EE6A8',
  Design: '#8B7CFF',
  Document: '#63B3ED',
  Notes: '#F4C95D',
}

const typeIcons: Record<string, string> = {
  Research: '◈',
  Design: '◇',
  Document: '▭',
  Notes: '◻',
}

export default function DocumentsScreen({ onNavigate }: DocumentsScreenProps) {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = documents.filter(d =>
    d.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex-1 overflow-y-auto" style={{ backgroundColor: '#0B0D12' }}>
      {/* Header */}
      <div className="px-8 pt-8 pb-6" style={{ borderBottom: '1px solid #2A2F3A' }}>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-bold" style={{ color: '#F5F7FA' }}>Documents</h1>
          <button className="px-4 py-2 rounded-lg text-xs font-semibold" style={{ backgroundColor: '#8B7CFF', color: 'white' }}>
            + New Document
          </button>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1 max-w-xs" style={{ backgroundColor: '#1D212C', border: '1px solid #2A2F3A' }}>
            <SearchSvg />
            <input
              placeholder="Search documents..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 text-sm bg-transparent outline-none"
              style={{ color: '#F5F7FA' }}
            />
          </div>
          {/* Filters */}
          <div className="flex gap-1">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-2 rounded-lg text-xs font-medium transition-colors"
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
      </div>

      <div className="px-8 py-7">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(doc => (
            <button
              key={doc.id}
              onClick={() => onNavigate('document-detail')}
              className="p-5 rounded-xl text-left group transition-all"
              style={{ backgroundColor: '#151821', border: '1px solid #2A2F3A' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#8B7CFF44')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2F3A')}
            >
              {/* Icon + type */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                  style={{ backgroundColor: `${typeColors[doc.type]}22`, color: typeColors[doc.type] }}
                >
                  {typeIcons[doc.type]}
                </div>
                <Badge label={doc.type} variant={doc.type === 'Research' ? 'success' : doc.type === 'Design' ? 'accent' : doc.type === 'Document' ? 'blue' : 'warning'} />
              </div>
              <p className="text-sm font-semibold mb-2 group-hover:text-[#8B7CFF] transition-colors" style={{ color: '#F5F7FA' }}>{doc.title}</p>
              <div className="space-y-1">
                <p className="text-xs" style={{ color: '#9CA3AF' }}>Owner: {doc.owner} · {doc.pages} pages</p>
                <p className="text-xs" style={{ color: '#4B5563' }}>Modified {doc.modified}</p>
              </div>
              <div className="mt-3 pt-3 flex items-center justify-between" style={{ borderTop: '1px solid #2A2F3A' }}>
                <span className="text-[10px] px-2 py-0.5 rounded" style={{ backgroundColor: '#1D212C', color: '#9CA3AF', border: '1px solid #2A2F3A' }}>{doc.project}</span>
                <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#8B7CFF' }}>Open →</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function SearchSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="6" cy="6" r="4" stroke="#9CA3AF" strokeWidth="1.3" />
      <path d="M10 10l2.5 2.5" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}
