export type Screen =
  | 'login'
  | 'home'
  | 'workspace'
  | 'projects-list'
  | 'board'
  | 'meetings-list'
  | 'meeting'
  | 'documents'
  | 'document-detail'
  | 'members'
  | 'notifications'
  | 'settings'

export const team = [
  { id: 'zobayer', name: 'Zobayer', initials: 'ZH', role: 'Product Designer', color: '#8B7CFF', status: 'online', activity: 'In Design Review' },
  { id: 'sarah', name: 'Sarah', initials: 'SK', role: 'UX Researcher', color: '#5EE6A8', status: 'online', activity: 'Reviewing Homepage Design' },
  { id: 'alex', name: 'Alex', initials: 'AR', role: 'Frontend Developer', color: '#63B3ED', status: 'online', activity: 'Working on responsive layout' },
  { id: 'maya', name: 'Maya', initials: 'MP', role: 'Product Manager', color: '#F4C95D', status: 'busy', activity: 'In Design Review' },
]

export const tasks = {
  todo: [
    { id: 't1', title: 'Create wireframes', priority: 'medium', assignee: 'sarah', due: 'Aug 20', comments: 3 },
    { id: 't2', title: 'Research competitor websites', priority: 'low', assignee: 'maya', due: 'Aug 22', comments: 1 },
    { id: 't3', title: 'Prepare user interview questions', priority: 'high', assignee: 'sarah', due: 'Aug 19', comments: 5 },
  ],
  inProgress: [
    { id: 't4', title: 'Homepage redesign', priority: 'high', assignee: 'zobayer', due: 'Aug 18', comments: 8 },
    { id: 't5', title: 'Navigation structure', priority: 'medium', assignee: 'alex', due: 'Aug 21', comments: 4 },
  ],
  review: [
    { id: 't6', title: 'Mobile layout', priority: 'high', assignee: 'alex', due: 'Aug 17', comments: 6 },
    { id: 't7', title: 'Typography system', priority: 'medium', assignee: 'zobayer', due: 'Aug 16', comments: 2 },
  ],
  done: [
    { id: 't8', title: 'Project requirements', priority: 'high', assignee: 'maya', due: 'Aug 10', comments: 12 },
    { id: 't9', title: 'User personas', priority: 'medium', assignee: 'sarah', due: 'Aug 12', comments: 7 },
  ],
}

export const allProjects = [
  {
    id: 'p1', name: 'Website Redesign', color: '#8B7CFF',
    desc: 'Full redesign of the marketing site based on user research findings.',
    members: 8, tasks: 12, progress: 65, lastActivity: '12 min ago', status: 'active',
    icons: ['ZH', 'SK', 'AR', 'MP'], dueDate: 'Aug 30',
  },
  {
    id: 'p2', name: 'Mobile App', color: '#63B3ED',
    desc: 'Native mobile app for iOS and Android platforms with offline support.',
    members: 5, tasks: 7, progress: 38, lastActivity: '2 hours ago', status: 'active',
    icons: ['ZH', 'AR', 'MP'], dueDate: 'Sep 15',
  },
  {
    id: 'p3', name: 'Research Project', color: '#5EE6A8',
    desc: 'Qualitative and quantitative user research initiative for Q3.',
    members: 4, tasks: 15, progress: 82, lastActivity: 'Yesterday', status: 'active',
    icons: ['SK', 'ZH'], dueDate: 'Aug 25',
  },
  {
    id: 'p4', name: 'Design System', color: '#F4C95D',
    desc: 'Unified component library and design tokens for all products.',
    members: 3, tasks: 22, progress: 20, lastActivity: '3 days ago', status: 'planning',
    icons: ['ZH', 'AR'], dueDate: 'Oct 1',
  },
]

export const documents = [
  { id: 'd1', title: 'User Research — Round 2', type: 'Research', owner: 'sarah', modified: 'Today', project: 'Website Redesign', pages: 18 },
  { id: 'd2', title: 'Homepage Design', type: 'Design', owner: 'zobayer', modified: '2 hours ago', project: 'Website Redesign', pages: 6 },
  { id: 'd3', title: 'Project Requirements', type: 'Document', owner: 'maya', modified: 'Yesterday', project: 'Website Redesign', pages: 12 },
  { id: 'd4', title: 'Meeting Notes', type: 'Notes', owner: 'maya', modified: '3 days ago', project: 'Website Redesign', pages: 4 },
  { id: 'd5', title: 'Competitor Analysis', type: 'Research', owner: 'sarah', modified: 'Aug 10', project: 'Mobile App', pages: 22 },
]

export const allMeetings = [
  {
    id: 'm1', title: 'Design Review', time: '10:30 AM', date: 'Today',
    project: 'Website Redesign', participants: 4, status: 'live',
    desc: 'Review latest homepage designs and provide feedback on the navigation structure.',
    avatars: ['ZH', 'SK', 'AR', 'MP'],
  },
  {
    id: 'm2', title: 'Research Sync', time: '2:00 PM', date: 'Today',
    project: 'Research Project', participants: 3, status: 'upcoming',
    desc: 'Sync on user research round 2 findings and align on next steps.',
    avatars: ['SK', 'ZH', 'MP'],
  },
  {
    id: 'm3', title: 'Weekly Planning', time: '4:00 PM', date: 'Today',
    project: 'Mobile App', participants: 5, status: 'upcoming',
    desc: 'Weekly sprint planning session for the mobile app development team.',
    avatars: ['ZH', 'AR', 'MP'],
  },
  {
    id: 'm4', title: 'Stakeholder Review', time: '11:00 AM', date: 'Tomorrow',
    project: 'Website Redesign', participants: 6, status: 'scheduled',
    desc: 'Present the website redesign progress to key stakeholders.',
    avatars: ['ZH', 'MP'],
  },
  {
    id: 'm5', title: 'Design System Kickoff', time: '3:00 PM', date: 'Aug 16',
    project: 'Design System', participants: 3, status: 'scheduled',
    desc: 'Kick off the new design system initiative and assign ownership.',
    avatars: ['ZH', 'AR'],
  },
]

export const meetings = allMeetings.slice(0, 3)

export const notifications = [
  { id: 'n1', type: 'mention', text: 'Sarah mentioned you in Design Review', time: '5 min ago', read: false, avatar: 'SK' },
  { id: 'n2', type: 'project', text: 'Alex moved Homepage Design to Review', time: '18 min ago', read: false, avatar: 'AR' },
  { id: 'n3', type: 'meeting', text: 'Design Review starts in 15 minutes', time: '15 min ago', read: false, avatar: null },
  { id: 'n4', type: 'project', text: 'Maya shared a new document', time: '1 hour ago', read: true, avatar: 'MP' },
  { id: 'n5', type: 'mention', text: 'Alex replied to your comment on Navigation structure', time: '2 hours ago', read: true, avatar: 'AR' },
  { id: 'n6', type: 'project', text: 'Sarah uploaded User Research Round 2', time: '3 hours ago', read: true, avatar: 'SK' },
]

export const activity = [
  { id: 'a1', text: 'Sarah moved Homepage Design to Review', time: '12 min ago', avatar: 'SK' },
  { id: 'a2', text: 'Alex uploaded a research document', time: '34 min ago', avatar: 'AR' },
  { id: 'a3', text: 'You joined Website Redesign', time: '1 hour ago', avatar: 'ZH' },
  { id: 'a4', text: 'Maya scheduled a design review', time: '2 hours ago', avatar: 'MP' },
]
