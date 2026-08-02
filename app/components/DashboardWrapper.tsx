'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { toggleHabit } from '../actions'
import AddHabitModal from './AddHabitModal'
import DateSelector from './DateSelector'
import CompactSidebar from './CompactSidebar'
import MobileMenu from './MobileMenu'
import AchievementsCard from './AchievementsCard'
import CopyrightCard from './CopyrightCard'
import { calculateStreaks } from '../../lib/streaks'
import {
    Plus, Droplets, Dumbbell, BookOpen, Brain, Moon,
    CandyOff, PenLine, Footprints, Sparkles, SmartphoneNfc,
    Check, Flame, Star
} from 'lucide-react'

const iconMap: Record<string, any> = {
    droplets: Droplets, dumbbell: Dumbbell, 'book-open': BookOpen,
    brain: Brain, moon: Moon, 'candy-off': CandyOff,
    'pen-line': PenLine, footprints: Footprints, sparkles: Sparkles,
    'smartphone-nfc': SmartphoneNfc, check: Check
}

const colorMap: Record<string, { border: string, icon: string }> = {
    teal: { border: 'border-[#129793]', icon: 'text-[#129793]' },
    'light-teal': { border: 'border-[#9BD7D5]', icon: 'text-[#9BD7D5]' },
    coral: { border: 'border-[#FF7260]', icon: 'text-[#FF7260]' },
    'dark-gray': { border: 'border-[#505050]', icon: 'text-[#505050]' },
    blue: { border: 'border-[#4A90E2]', icon: 'text-[#4A90E2]' },
    purple: { border: 'border-[#9B59B6]', icon: 'text-[#9B59B6]' },
    orange: { border: 'border-[#F39C12]', icon: 'text-[#F39C12]' },
    pink: { border: 'border-[#E91E63]', icon: 'text-[#E91E63]' },
    indigo: { border: 'border-[#3F51B5]', icon: 'text-[#3F51B5]' },
    emerald: { border: 'border-[#10B981]', icon: 'text-[#10B981]' },
}

export default function DashboardWrapper({ user, habits, allLogs, selectedDate }: any) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const pathname = usePathname()
    const totalHabits = habits.length
    const completedToday = habits.filter((h: any) => h.logs.some((log: any) => log.completed)).length
    const { currentStreak, bestStreak } = calculateStreaks(allLogs);
    const totalCompletions = allLogs.filter((l: any) => l.completed).length;

    return (
        <div className="min-h-screen bg-[#F4F7F7] font-sans text-[#505050] p-6">
        <MobileMenu user={user} currentPath={pathname} />
        <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6">
        <div className="col-span-1 md:col-start-2 md:row-start-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-16 md:pl-0">
        <div>
        <h2 className="text-3xl font-bold text-[#505050]">Hi {user?.nickname || user?.name || 'User'}!</h2>
        <p className="text-slate-600 mt-1">Track your habits and build a better you.</p>
        </div>
        <DateSelector initialDate={selectedDate} />
        </div>
        </div>

        <div className="col-span-1 md:col-start-1 md:row-start-2 hidden md:flex md:flex-col md:gap-6">
        <CompactSidebar user={user} currentPath={pathname} />
        <AchievementsCard
        totalCompletions={totalCompletions}
        currentStreak={currentStreak}
        totalHabits={totalHabits}
        />
        <CopyrightCard isPro={user.isPro} />
        </div>

        <div className="col-span-1 md:col-start-2 md:row-start-2 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Habits Today" value={totalHabits} sub="Total habits" icon={<Check className="w-6 h-6 text-[#129793]" />} borderColor="border-[#129793]" />
        <StatCard title="Completed" value={completedToday} sub="On this day" icon={<Check className="w-6 h-6 text-[#10B981]" />} borderColor="border-[#10B981]" />
        <StatCard title="Current Streak" value={currentStreak} sub="Days" icon={<Flame className="w-6 h-6 text-[#F39C12]" />} borderColor="border-[#F39C12]" />
        <StatCard title="Best Streak" value={bestStreak} sub="Days" icon={<Star className="w-6 h-6 text-[#3F51B5]" />} borderColor="border-[#3F51B5]" />
        </div>

        <div className="bg-white rounded-2xl border border-[#9BD7D5] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#9BD7D5] flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#505050]">Habits for this day</h3>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[#129793] hover:bg-[#9BD7D5] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
        <Plus size={18} /> Add Habit
        </button>
        </div>
        <div className="divide-y divide-[#9BD7D5]">
        {habits.length === 0 ? (
            <div className="p-12 text-center text-slate-500"><p>No habits tracked for this specific day.</p></div>
        ) : (
            habits.map((habit: any) => {
                const IconComponent = iconMap[habit.icon] || Check;
                const colorConfig = colorMap[habit.color] || colorMap.teal;
                const isCompletedToday = habit.logs.some((log: any) => log.completed)
                return (
                    <div key={habit.id} className="p-4 flex items-center gap-4 hover:bg-[#F4F7F7] transition-colors">
                    <div className={`w-12 h-12 rounded-2xl border-2 ${colorConfig.border} bg-white shadow-sm flex items-center justify-center shrink-0`}>
                    <IconComponent className={`w-5 h-5 ${colorConfig.icon}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#505050]">{habit.title}</h4>
                    <p className="text-sm text-slate-600 truncate">Daily goal: {habit.targetValue} {habit.unit}</p>
                    </div>
                    <form action={toggleHabit.bind(null, habit.id)}>
                    <button type="submit" className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${isCompletedToday ? 'bg-[#129793] border-[#129793] text-white scale-105' : 'border-[#9BD7D5] text-transparent hover:border-[#129793]'}`}>
                    <Check size={18} strokeWidth={3} />
                    </button>
                    </form>
                    </div>
                )
            })
        )}
        </div>
        </div>
        </div>
        </div>
        </div>
        <AddHabitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}

function StatCard({ title, value, sub, icon, borderColor }: any) {
    return (
        <div className="bg-white p-4 rounded-2xl border border-[#9BD7D5] shadow-sm flex items-start gap-3">
        <div className={`w-12 h-12 rounded-xl border-2 ${borderColor} bg-white shadow-sm flex items-center justify-center shrink-0`}>{icon}</div>
        <div>
        <p className="text-xs font-medium text-slate-600 mb-0.5">{title}</p>
        <p className="text-2xl font-bold text-[#505050] leading-none mb-0.5">{value}</p>
        <p className="text-xs text-slate-500">{sub}</p>
        </div>
        </div>
    )
}
