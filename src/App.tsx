import { useState } from 'react'
import { type Screen } from './data/mockData'
import Sidebar from './components/Sidebar'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import WorkspaceScreen from './screens/WorkspaceScreen'
import ProjectsListScreen from './screens/ProjectsListScreen'
import ProjectBoardScreen from './screens/ProjectBoardScreen'
import MeetingsListScreen from './screens/MeetingsListScreen'
import MeetingScreen from './screens/MeetingScreen'
import DocumentsScreen from './screens/DocumentsScreen'
import DocumentDetailScreen from './screens/DocumentDetailScreen'
import MembersScreen from './screens/MembersScreen'
import NotificationsScreen from './screens/NotificationsScreen'
import SettingsScreen from './screens/SettingsScreen'

export default function App() {
  const [screen, setScreen] = useState<Screen>('login')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isAuthenticated = screen !== 'login'

  if (!isAuthenticated) {
    return <LoginScreen onNavigate={setScreen} />
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#0B0D12' }}>
      {/* Desktop sidebar */}
      <div className="hidden md:flex shrink-0">
        <Sidebar current={screen} onNavigate={setScreen} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-64 h-full">
            <Sidebar current={screen} onNavigate={setScreen} mobile onClose={() => setSidebarOpen(false)} />
          </div>
          <div
            className="flex-1"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 shrink-0" style={{ backgroundColor: '#10131A', borderBottom: '1px solid #2A2F3A' }}>
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg" style={{ color: '#9CA3AF' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #8B7CFF, #63B3ED)' }}>
              <span className="text-white font-bold text-xs">R</span>
            </div>
            <span className="font-bold text-sm" style={{ color: '#F5F7FA' }}>Raum</span>
          </div>
          <div className="w-8" />
        </div>

        {/* Screens */}
        <div className="flex-1 flex overflow-hidden">
          {screen === 'home' && <HomeScreen onNavigate={setScreen} />}
          {screen === 'workspace' && <WorkspaceScreen onNavigate={setScreen} />}
          {screen === 'projects-list' && <ProjectsListScreen onNavigate={setScreen} />}
          {screen === 'board' && <ProjectBoardScreen onNavigate={setScreen} />}
          {screen === 'meetings-list' && <MeetingsListScreen onNavigate={setScreen} />}
          {screen === 'meeting' && <MeetingScreen onNavigate={setScreen} />}
          {screen === 'documents' && <DocumentsScreen onNavigate={setScreen} />}
          {screen === 'document-detail' && <DocumentDetailScreen onNavigate={setScreen} />}
          {screen === 'members' && <MembersScreen />}
          {screen === 'notifications' && <NotificationsScreen />}
          {screen === 'settings' && <SettingsScreen />}
        </div>
      </div>
    </div>
  )
}
