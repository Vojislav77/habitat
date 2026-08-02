# Habitat - Build Better Habits

A modern, full-stack habit tracking application built with Next.js, PostgreSQL, and NextAuth.

## 🌟 Features

- **Dashboard**: Track daily habits with a clean, intuitive interface
- **Habit Management**: Create, edit, and delete habits with custom icons and colors
- **Statistics**: Visualize progress with charts and completion rates
- **Streak Tracking**: Monitor your current and best streaks
- **Date Selection**: View and manage habits for any specific date
- **Achievements**: Unlock milestones as you build consistency
- **Mobile Responsive**: Works seamlessly on all devices
- **Authentication**: Secure login with NextAuth
- **Data Export**: Download your habit history as CSV

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: NextAuth.js
- **UI Components**: Lucide React icons

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/habitat.git
   cd habitat
   
2. Install dependencies
   npm install
   
3. Set up environment variables
   Copy .env.example to .env
   Fill in your database URL and other credentials

4. Set up the database
   npx prisma migrate dev
   npx prisma generate
   
5. Run the development server
   npm run dev
   
📄 License

This project is open source and available under the MIT License.
