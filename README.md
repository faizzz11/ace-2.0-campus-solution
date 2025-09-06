# Campus Connect - Student Portal

A modern, sleek student campus solution platform built with Next.js and TypeScript.

## ✨ Features

### Phase 1 - Student Side (Completed)

#### 🔐 Authentication
- Dummy login/signup system
- Secure session management
- Automatic redirect to dashboard

#### 📊 Student Dashboard
- **Profile Management**: Editable student profiles with skills, interests, and bio
- **Statistics Overview**: Participation score, events attended, clubs joined, projects completed
- **Achievements**: Display of student accomplishments and awards

#### 🏆 Leaderboard
- Real-time ranking system based on participation scores
- Visual hierarchy with special styling for top 3 students
- Detailed stats for each student (events, clubs, projects)
- Highlight current user's position

#### ⭐ Recommendations
- AI-powered personalized suggestions
- Match scoring system (70-95% compatibility)
- Club and project recommendations based on skills/interests
- Save/favorite functionality

#### 🔍 Search Opportunities
- Advanced filtering system (category, type, keywords)
- Real-time search results
- Comprehensive club and project listings
- Detailed information cards with requirements and benefits

#### 👥 Join a Team
- Open project team listings
- Application deadline tracking
- Team size and skill requirement display
- One-click application system
- Application status tracking

## 🎨 Design System

- **Dark Theme**: Sleek black background with subtle gradients
- **Accent Color**: Orange (#e78a53) for highlights and CTAs
- **Typography**: Geist Mono for a modern, technical feel
- **Components**: Consistent card-based layout with glassmorphism effects
- **Animations**: Smooth framer-motion transitions throughout

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Landing Page: `http://localhost:3000`
   - Login: `http://localhost:3000/login`
   - Dashboard: `http://localhost:3000/dashboard` (after login)

## 🗂️ Project Structure

```
├── app/
│   ├── dashboard/           # Student dashboard pages
│   │   ├── layout.tsx      # Dashboard layout with sidebar
│   │   ├── page.tsx        # Student profile/dashboard
│   │   ├── leaderboard/    # Rankings page
│   │   ├── recommendations/ # Personalized suggestions
│   │   ├── search/         # Search opportunities
│   │   └── teams/          # Join team page
│   ├── login/              # Authentication pages
│   └── signup/
├── components/
│   └── ui/                 # Reusable UI components
├── data/                   # Dummy JSON data
│   ├── students.json       # Student profiles
│   ├── clubs.json          # Club information
│   ├── projects.json       # Project listings
│   └── recommendations.json # Recommendation data
└── lib/                    # Utilities and configurations
```

## 📱 Responsive Design

- **Mobile-first approach**: Fully responsive across all devices
- **Adaptive sidebar**: Collapsible on mobile, persistent on desktop
- **Flexible grids**: Responsive card layouts that adapt to screen size
- **Touch-friendly**: Optimized for mobile interactions

## 🔄 Dummy Authentication

For Phase 1, use any email/password combination to log in. The system will:
- Store login state in localStorage
- Redirect to the student dashboard
- Use Faiz Rahman's profile as the default logged-in user

## 🎯 Next Phases (Planned)

- **Phase 2**: Organization/Club admin dashboards
- **Phase 3**: Backend integration with real authentication and database
- **Phase 4**: QR code check-ins and transcript generation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React hooks and localStorage (Phase 1)

---

Built with ❤️ for modern campus communities.
