# Raum — Context-Aware Spatial Meeting Workspace

Create a polished, production-quality responsive web application called *Raum*.

## 1. Product Concept

Raum is a *context-aware spatial workspace for hybrid teams*.

The idea is that instead of managing projects through disconnected pages, tabs, meetings, documents, and task boards, users have a persistent *spatial canvas* where project-related digital objects coexist.

A user can visually arrange:

* Team meetings
* Project boards
* Documents
* Design files
* Desktop/application windows
* Research materials
* Tasks
* Team members

inside one persistent workspace.

The product should feel like a combination of:

* A modern desktop workspace
* A project management application
* A virtual meeting room
* A spatial canvas

The spatial canvas is the defining feature of the product.

This is a *UI/UX academic project*, so no real backend is required. Use realistic static/mock data and simulated interactions. The application should feel functional even though all data is local/static.

---

# 2. Design Direction

Create a sophisticated, minimal, futuristic-but-professional interface.

Do NOT make it look like a gaming interface.

Do NOT use excessive neon effects.

Do NOT make it look like a generic corporate dashboard.

The visual language should communicate:

* Spatial computing
* Digital workspace
* Collaboration
* Focus
* Context
* Organization
* Modern productivity

## Color System

Use a dark spatial theme.

Primary colors:

* Background / spatial canvas: #0B0D12
* Sidebar: #10131A
* Surface: #151821
* Elevated cards/windows: #1D212C
* Borders: subtle #2A2F3A
* Primary text: #F5F7FA
* Secondary text: #9CA3AF
* Primary accent: #8B7CFF
* Success/context accent: #5EE6A8
* Secondary accent: #63B3ED
* Warning: #F4C95D

Use violet as the main interactive accent.

Use green and blue only for contextual status information.

Keep contrast accessible and typography highly readable.

Use subtle shadows, thin borders, soft rounded corners, restrained blur, and very subtle gradients only where appropriate.

---

# 3. Typography

Use a modern clean sans-serif font such as Inter.

Typography hierarchy:

* Large page titles: bold
* Section titles: semibold
* Body: regular
* Labels: medium
* Metadata: smaller muted text

Keep typography consistent throughout the entire application.

---

# 4. Global Layout

Desktop layout:

* Left sidebar: approximately 240px
* Main workspace: remaining viewport
* Top navigation/header inside the main area
* Large central content area
* Responsive behavior for tablet and mobile

Sidebar should contain:

RAUM logo

Navigation:

* Home
* My Workspace
* Projects
* Meetings
* Documents

Then:

WORKSPACES

* Website Redesign
* Mobile App
* Research

Then:

OTHER

* Notifications
* Settings

Bottom of sidebar:

User avatar
User name
Online status
Small account menu

Use icons consistently.

---

# 5. Screen 1 — Welcome / Login

Create a polished landing/login screen.

Left side:

Large Raum logo.

Headline:

"Your work, in one shared space."

Supporting text:

"Connect meetings, projects, documents, and conversations in a persistent spatial workspace."

Show a subtle visual preview of the spatial workspace on the right.

The preview should contain floating workspace windows connected visually inside a dark canvas.

Login card:

* Continue with Google
* Continue with Microsoft
* Email input
* Password input
* Sign In button
* Create account link

Also provide:

"Explore demo workspace"

This button should allow the user to enter the application using static mock data without authentication.

The demo button is important because this is a frontend academic project.

---

# 6. Screen 2 — Home / Workspace Overview

After entering the application, show the user's home dashboard.

Header:

"Good morning, Zobayer"

Subtitle:

"Here's what's happening across your workspaces."

Show summary cards:

* Active Projects
* Meetings Today
* Pending Tasks
* Team Members Online

Main section:

"Recent Workspaces"

Display three workspace cards:

1. Website Redesign

   * 8 members
   * 12 tasks
   * Active meeting
   * Last edited recently

2. Mobile App

   * 5 members
   * 7 tasks
   * 2 documents

3. Research Project

   * 4 members
   * 15 tasks
   * 3 meetings

Each workspace card should have:

* Project icon
* Project name
* Description
* Members
* Progress indicator
* Last activity
* "Open workspace" button

Right-side section:

"Upcoming Meetings"

Example:

Design Review
10:30 AM
Website Redesign
4 participants

Research Sync
2:00 PM
Research Project
3 participants

Bottom/right section:

"Recent Activity"

Examples:

* Sarah moved Homepage Design to Review
* Alex uploaded a research document
* You joined Website Redesign
* Maya scheduled a design review

Make this screen feel like an overview, not the main feature.

---

# 7. Screen 3 — Main Spatial Workspace

This is the MOST IMPORTANT screen in the entire project.

The spatial canvas should occupy most of the screen.

Header:

Website Redesign

Status:

"6 members online"

Top-right controls:

* Search
* Share
* Notifications
* User avatar

Main area:

A large dark spatial canvas.

Add a subtle grid/dot pattern to communicate spatial positioning.

Inside the canvas, place several floating workspace objects.

## Object 1 — Team Meeting

A floating window titled:

"Design Review"

Display:

* 4 participants
* Meeting status: Live
* Small participant avatars
* Join button

Use a subtle violet active border.

## Object 2 — Project Board

Floating card:

"Website Redesign Board"

Columns:

To Do
In Progress
Review
Done

Show several miniature task cards.

## Object 3 — Figma Design

Floating window:

"Homepage Design"

Show a visual thumbnail/mock design preview.

Label:

"Updated 12 min ago"

## Object 4 — Research Document

Floating document window:

"User Research — Round 2"

Display:

* 18 pages
* Last edited today
* Owner: Sarah

## Object 5 — Team Chat

Floating panel:

"Team Discussion"

Show 3–4 realistic messages.

## Spatial Behavior

Objects should visually appear to exist independently on the canvas.

Provide:

* Drag/move interaction
* Click to select
* Selected object gets a subtle violet outline
* Zoom controls
* Reset view button
* Grid toggle
* Add Window button

Bottom-right:

Zoom controls:

[-] 100% [+]

Bottom-left:

"5 objects"

"Last synced just now"

When an object is selected, display a contextual action bar:

Open
Move
Minimize
More

Do not make actual backend functionality necessary. Simulate interactions using frontend state.

---

# 8. Spatial Canvas — Add Window Interaction

When the user clicks:

"+ Add Window"

open a small contextual menu.

Options:

* Meeting
* Project Board
* Document
* Design File
* Chat
* Task

Each option should have an icon and short description.

Selecting an option should add/display a corresponding mock window on the canvas.

Example:

Add Meeting

creates:

"New Team Meeting"

with:

Schedule
Participants
Join

This interaction is important because it demonstrates the spatial concept.

---

# 9. Spatial Canvas — Contextual Information Panel

When a user clicks a workspace object, open a right-side contextual panel.

Example for the Design Review meeting:

Header:

Design Review

Status:

LIVE

Participants:

Sarah
Alex
Maya
Zobayer

Context:

Website Redesign

Actions:

Join Meeting
View Project
Open Chat

Below:

Recent activity

"Sarah started the meeting 8 min ago."

"Alex shared Homepage Design."

"2 comments added."

The panel should demonstrate the concept of *context-aware information*.

---

# 10. Screen 4 — Project Board

Create a full project management board.

Header:

Website Redesign

Under header:

Overview
Board
Files
Members

Board view:

Columns:

TO DO

* Create wireframes
* Research competitor websites
* Prepare user interview questions

IN PROGRESS

* Homepage redesign
* Navigation structure

REVIEW

* Mobile layout
* Typography system

DONE

* Project requirements
* User personas

Each task card should show:

* Task title
* Priority
* Assignee avatar
* Due date
* Small comment count

Add:

"+ Add task"

button.

Allow simple frontend interactions such as:

* Selecting a task
* Opening task details
* Moving between columns visually
* Filtering tasks

No backend required.

---

# 11. Screen 5 — Task Detail Panel

When a task is clicked, open a right-side detail panel.

Example:

Homepage redesign

Status:

In Progress

Priority:

High

Assigned to:

Sarah Khan

Due:

August 18

Description:

"Redesign the homepage structure based on the latest usability findings."

Show:

Checklist

* Header exploration
* Hero section
* Navigation
* Responsive layout

Comments:

Sarah:
"I uploaded the latest version."

Alex:
"The navigation hierarchy looks good."

Buttons:

Mark Complete
Edit Task
Close

Use mock static data.

---

# 12. Screen 6 — Meeting Room

Create a dedicated virtual meeting interface.

Header:

Design Review

"Website Redesign"

Main area:

Large video meeting grid.

Use 4 participant cards:

* Zobayer
* Sarah
* Alex
* Maya

Use abstract avatar placeholders or initials rather than real photographs.

Right-side panel:

Meeting Context

Project:
Website Redesign

Current task:
Homepage redesign

Shared files:

Homepage Design
User Research
Project Board

Meeting controls at bottom:

Mute
Camera
Share Screen
Open Chat
Participants
More
Leave Meeting

The key differentiator:

The meeting should be connected to the project context.

Show a small panel:

"Meeting Context"

Current task:
Homepage redesign

Related document:
User Research — Round 2

This demonstrates that Raum is context-aware.

---

# 13. Screen 7 — Documents / Files

Create a document workspace.

Header:

Documents

Search field:

"Search documents..."

Filters:

All
Recent
Shared with me
My files

Display document cards:

User Research — Round 2
Homepage Design
Project Requirements
Meeting Notes
Competitor Analysis

Each card should show:

* Document icon
* Name
* Type
* Owner
* Last modified
* Related project

Clicking a document should open its detail view.

---

# 14. Screen 8 — Document Detail

Create a document viewer/detail screen.

Header:

User Research — Round 2

Metadata:

Website Redesign
18 pages
Updated today

Main content:

Show a realistic document preview with headings, paragraphs, charts/placeholders, and research findings.

Right sidebar:

Document Context

Related project:
Website Redesign

Related meeting:
Design Review

Related tasks:
Homepage redesign
Navigation structure

Actions:

Open
Share
Add to Workspace
More

The purpose is to demonstrate contextual relationships between objects.

---

# 15. Screen 9 — Members / Collaboration

Create a team members page.

Header:

Website Redesign Team

Display member cards:

Zobayer
Product Designer

Sarah
UX Researcher

Alex
Frontend Developer

Maya
Product Manager

Each card:

* Avatar/initial
* Name
* Role
* Online status
* Current activity

Example:

Sarah

"Reviewing Homepage Design"

Alex

"Working on responsive layout"

Maya

"In Design Review"

This should reinforce the hybrid collaboration concept.

---

# 16. Screen 10 — Notifications

Create a notification panel/page.

Categories:

All
Mentions
Meetings
Projects

Example notifications:

Sarah mentioned you in Design Review

Alex moved Homepage Design to Review

Design Review starts in 15 minutes

Maya shared a new document

Show timestamps and read/unread states.

---

# 17. Screen 11 — Settings

Create a clean settings page.

Sections:

Profile

* Name
* Email
* Role
* Profile image/avatar

Workspace

* Default workspace
* Canvas behavior
* Grid visibility
* Auto-save preference

Appearance

* Dark theme
* Compact mode
* Reduced motion

Notifications

* Meeting reminders
* Project updates
* Mentions

Privacy

* Activity visibility
* Online status

Use toggles, dropdowns, and buttons.

---

# 18. Navigation Behavior

Make the application feel like a real product.

Sidebar navigation should work.

Home → Home screen

My Workspace → Spatial Workspace

Projects → Project list

Meetings → Meetings

Documents → Documents

Settings → Settings

Clicking:

"Open Workspace"

should take the user to the main spatial canvas.

Clicking:

"Join Meeting"

should take the user to the meeting interface.

Clicking:

"Project Board"

should open the project board.

Clicking:

"Open Document"

should open the document detail view.

Use frontend state and mock data only.

---

# 19. Responsive Design

The application must be responsive.

Desktop:

* Full sidebar
* Large spatial canvas
* Multiple floating windows

Tablet:

* Collapsible sidebar
* Reduced canvas objects
* Responsive cards

Mobile:

* Bottom navigation or compact sidebar
* Spatial objects become stacked cards
* Context panels become full-screen drawers
* Meeting interface adapts to portrait orientation

Do not simply shrink the desktop UI.

Adapt the layout intelligently.

---

# 20. Interaction Design

Use subtle animations:

* Hover states
* Selected object states
* Panel slide-in
* Modal appearance
* Button feedback
* Smooth navigation
* Canvas zoom
* Object movement

Avoid excessive animation.

The interface should feel calm and professional.

Use consistent:

* 8px spacing system
* Border radius
* Shadows
* Icon sizes
* Button styles
* Input styles
* Status badges

---

# 21. Accessibility

Prioritize:

* Strong color contrast
* Readable typography
* Clear button labels
* Visible focus states
* Tooltips for icon-only controls
* Avoid color as the only indicator
* Logical navigation hierarchy

---

# 22. Mock Data

Use realistic static data.

Primary project:

Website Redesign

Team:

Zobayer — Product Designer
Sarah — UX Researcher
Alex — Frontend Developer
Maya — Product Manager

Tasks:

Homepage redesign
Navigation structure
User research
Mobile responsive design
Competitor analysis
Design system

Documents:

User Research — Round 2
Homepage Design
Project Requirements
Meeting Notes

Meetings:

Design Review
Research Sync
Weekly Planning

Use this data consistently throughout all screens.

---

# 23. Important UX Principle

The application should communicate one central idea:

*"Everything related to my work exists together in one spatial context."*

The user should understand that:

Meeting + Project Board + Documents + Tasks + Team

are not isolated pages.

They are connected objects within the same workspace.

Make these relationships visually obvious.

---

# 24. Visual Quality Requirements

The final result should look like a polished modern product suitable for a university UI/UX portfolio.

Avoid:

* Generic Bootstrap appearance
* Excessive rounded cards
* Excessive gradients
* Random colors
* Huge empty spaces
* Unnecessary decorative elements
* Gaming aesthetics
* Overly complicated navigation

Prioritize:

* Strong hierarchy
* Spatial depth
* Consistency
* Professional typography
* Clear interaction
* Strong usability
* Contextual relationships
* Minimal visual clutter

The *Spatial Workspace screen should receive the most visual attention and refinement* because it is the core innovation of the product.

---

# 25. Final Product Flow

The main user journey should be:

Welcome

→ Demo Workspace

→ Home

→ Website Redesign

→ Spatial Workspace

→ Select Design Review

→ Context Panel

→ Join Meeting

→ Meeting Context

→ Open Project Board

→ Select Homepage Redesign

→ Task Detail

→ Return to Spatial Workspace

→ Open User Research

→ Document Detail

This should feel like one continuous workspace rather than a collection of unrelated pages.

---

# 26. Final Instruction

Build the complete frontend experience from this specification.

Use reusable components and consistent design tokens.

Use static/mock data only.

Do not require a backend.

Prioritize the *spatial workspace experience*, usability, visual hierarchy, accessibility, responsive design, and realistic interactions.

The final interface should feel like a real product named *Raum*, not a school-project dashboard.

Make the UI polished enough to be presented as a professional UI/UX case study.