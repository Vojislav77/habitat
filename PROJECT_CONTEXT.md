# Habitat - Habit Tracker App

## Tech Stack
- Next.js 16.2.10 with Turbopack
- TypeScript
- Tailwind CSS
- Prisma ORM
- Neon PostgreSQL (cloud database)
- NextAuth for authentication

## Current Features
- User authentication (login/signup)
- Dashboard with habit tracking
- 10 default habits with custom icons and colors
- Streak tracking (current and best streak)
- Date picker (US/EU format)
- Custom profile pictures and nicknames
- Settings page with profile management
- Mobile responsive design (sidebar hidden on mobile, hamburger menu)
- Data export to CSV
- Achievements/badges system (dynamic calculation, no database clutter)
- Desktop notifications (browser-based)
- Add habit button on both Dashboard and Habits pages

## Design System
- Color palette: #129793 (teal), #9BD7D5 (light teal), #FF7260 (coral), #505050 (dark gray), #F4F7F7 (off-white background)
- Icon style: Transparent background with colored border and subtle shadow
- Layout: Grid-based with sidebar on left, main content on right
- No emojis in UI

## Database Schema
- User: email, name, nickname, image, desktopRemindersEnabled
- Habit: title, icon, color, targetValue, unit, userId
- Log: habitId, date, completed

## File Structure
- app/page.tsx (Dashboard)
- app/habits/page.tsx (Manage habits)
- app/stats/page.tsx (Statistics)
- app/settings/page.tsx (User settings)
- app/components/ (All reusable components)
- lib/prisma.ts (Database connection)
- lib/streaks.ts (Streak calculation logic)
- prisma/schema.prisma (Database schema)

## Current Status
- All features working
- Design recently updated to transparent icons with colored borders
- Running locally on localhost:3000
- Not yet deployed

## Future Plans (Not Yet Implemented)
- Email reminders (Resend + Vercel Cron)
- SMS notifications (Twilio)
- Deployment to Vercel
- Advanced achievements with permanent history
