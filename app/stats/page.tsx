import { getServerSession } from "next-auth"
import { authOptions } from "../../auth"
import { prisma } from "../../lib/prisma"
import { redirect } from "next/navigation"
import { TrendingUp, Calendar, CheckCircle2 } from 'lucide-react'
import CompactSidebar from "../components/CompactSidebar"
import MobileMenu from "../components/MobileMenu"
import StatsCharts from "../components/StatsCharts"
import AchievementsCard from "../components/AchievementsCard"
import DateSelector from "../components/DateSelector"
import ResetStatsForm from "../components/ResetStatsForm"
import CopyrightCard from "../components/CopyrightCard"
import { calculateStreaks } from "../../lib/streaks"

export default async function StatsPage({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) redirect("/login")

        const user = await prisma.user.findUnique({ where: { email: session.user.email } })
        if (!user) redirect("/login")

            const params = await searchParams
            const selectedDateStr = params?.date || new Date().toISOString().split('T')[0]

            const habits = await prisma.habit.findMany({
                where: { userId: user.id },
                include: { logs: true }
            })

            const allLogs = habits.flatMap(h => h.logs)
            const selectedDateLogs = allLogs.filter(l => {
                const logDate = new Date(l.date).toISOString().split('T')[0]
                return logDate === selectedDateStr
            })

            const totalLogs = selectedDateLogs.length
            const completedLogs = selectedDateLogs.filter(l => l.completed).length
            const completionRate = totalLogs > 0 ? Math.round((completedLogs / totalLogs) * 100) : 0
            const { currentStreak } = calculateStreaks(allLogs)

            const selectedDate = new Date(selectedDateStr + 'T00:00:00')
            const last7Days = Array.from({ length: 7 }, (_, i) => {
                const d = new Date(selectedDate)
                d.setDate(d.getDate() - (6 - i))
                return d.toISOString().split('T')[0]
            })

            const weeklyData = last7Days.map(date => {
                const dayLogs = allLogs.filter(l => {
                    const logDate = new Date(l.date).toISOString().split('T')[0]
                    return logDate === date
                })
                const completed = dayLogs.filter(l => l.completed).length
                return {
                    name: new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' }),
                                             completed: completed,
                                             total: habits.length
                }
            })

            const pieData = [
                { name: 'Completed', value: completedLogs, color: '#129793' },
                { name: 'Missed', value: Math.max(0, totalLogs - completedLogs), color: '#9BD7D5' },
            ]

            return (
                <div className="min-h-screen bg-[#F4F7F7] font-sans text-[#505050] p-6">
                <MobileMenu user={user} currentPath="/stats" />
                <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6">
                <div className="col-span-1 md:col-start-2 md:row-start-1">
                <header className="pl-16 md:pl-0">
                <h1 className="text-3xl font-bold text-[#505050]">Your Statistics</h1>
                <p className="text-slate-600 mt-1">Track your progress and celebrate your consistency.</p>
                </header>
                </div>

                {/* Sidebar - Hidden on mobile, visible on desktop */}
                <div className="hidden md:block md:col-start-1 md:row-start-2 flex flex-col gap-6">
                <CompactSidebar user={user} currentPath="/stats" />
                <CopyrightCard isPro={user.isPro} />
                </div>

                <div className="col-span-1 md:col-start-2 md:row-start-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#9BD7D5] shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl border-2 border-[#129793] bg-white shadow-sm flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} className="text-[#129793]" />
                </div>
                <div>
                <p className="text-xs font-medium text-slate-600">Total Completions</p>
                <p className="text-2xl font-bold text-[#505050]">{completedLogs}</p>
                </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#9BD7D5] shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl border-2 border-[#10B981] bg-white shadow-sm flex items-center justify-center shrink-0">
                <TrendingUp size={24} className="text-[#10B981]" />
                </div>
                <div>
                <p className="text-xs font-medium text-slate-600">Completion Rate</p>
                <p className="text-2xl font-bold text-[#505050]">{completionRate}%</p>
                </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#9BD7D5] shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl border-2 border-[#F39C12] bg-white shadow-sm flex items-center justify-center shrink-0">
                <Calendar size={24} className="text-[#F39C12]" />
                </div>
                <div>
                <p className="text-xs font-medium text-slate-600">Active Habits</p>
                <p className="text-2xl font-bold text-[#505050]">{habits.length}</p>
                </div>
                </div>
                </div>

                <StatsCharts weeklyData={weeklyData} pieData={pieData} completedLogs={completedLogs} totalLogs={totalLogs} />
                <AchievementsCard
                totalCompletions={completedLogs}
                currentStreak={currentStreak}
                totalHabits={habits.length}
                horizontal={true}
                />

                <div className="bg-white rounded-2xl border border-[#9BD7D5] shadow-sm p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex-1">
                <h3 className="font-bold text-[#505050] mb-1">View Statistics by Date</h3>
                <p className="text-xs text-slate-600 mb-3">Select a date to view your habit completion data for that specific day.</p>
                <DateSelector initialDate={selectedDateStr} />
                </div>
                <div className="flex-1 sm:border-l sm:border-[#9BD7D5] sm:pl-6">
                <h3 className="font-bold text-[#505050] mb-1">Reset All Statistics</h3>
                <p className="text-xs text-slate-600 mb-3">Warning: This will permanently delete all your habit completion logs and reset all statistics to zero. This action cannot be undone.</p>
                <ResetStatsForm />
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
            )
}
