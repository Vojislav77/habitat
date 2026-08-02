'use client'
import { Check, Flame, Calendar, Target, Zap } from 'lucide-react'

export default function AchievementsCard({ totalCompletions, currentStreak, totalHabits, horizontal = false }: any) {
    const achievements = [
        { id: 1, title: 'First Step', desc: '1 Completion', icon: Check, req: totalCompletions >= 1, color: 'border-[#129793] text-[#129793]' },
        { id: 2, title: 'On Fire', desc: '7 Day Streak', icon: Flame, req: currentStreak >= 7, color: 'border-[#FF7260] text-[#FF7260]' },
        { id: 3, title: 'Dedicated', desc: '30 Day Streak', icon: Calendar, req: currentStreak >= 30, color: 'border-[#3F51B5] text-[#3F51B5]' },
        { id: 4, title: 'Centurion', desc: '100 Completions', icon: Target, req: totalCompletions >= 100, color: 'border-[#10B981] text-[#10B981]' },
        { id: 5, title: 'Collector', desc: '5 Habits', icon: Zap, req: totalHabits >= 5, color: 'border-[#F39C12] text-[#F39C12]' },
    ]

    return (
        <div className="bg-white rounded-2xl border border-[#9BD7D5] shadow-sm p-5">
        <h3 className="font-bold text-[#505050] mb-4">Achievements</h3>
        <div className={horizontal ? "flex flex-row justify-between gap-1 sm:gap-4 sm:flex-wrap" : "space-y-3"}>
        {achievements.map((ach) => {
            const Icon = ach.icon
            const [borderClass, iconClass] = ach.color.split(' ')

            if (horizontal) {
                return (
                    <div key={ach.id} className="flex flex-col items-center text-center flex-1 min-w-0">
                    <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl border-2 bg-white shadow-sm flex items-center justify-center shrink-0 ${ach.req ? borderClass : 'border-slate-300'} ${ach.req ? iconClass : 'text-slate-400'}`}>
                    <Icon size={16} className="sm:hidden" />
                    <Icon size={24} className="hidden sm:block" />
                    </div>
                    <p className={`text-[10px] sm:text-xs font-semibold mt-1 sm:mt-2 leading-tight truncate w-full ${ach.req ? 'text-[#505050]' : 'text-slate-400'}`}>
                    {ach.title}
                    </p>
                    <p className="text-[10px] sm:text-xs text-slate-500 hidden sm:block">
                    {ach.desc}
                    </p>
                    </div>
                )
            }

            return (
                <div key={ach.id} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl border-2 bg-white shadow-sm flex items-center justify-center shrink-0 ${ach.req ? borderClass : 'border-slate-300'} ${ach.req ? iconClass : 'text-slate-400'}`}>
                <Icon size={20} />
                </div>
                <div>
                <p className={`text-sm font-semibold ${ach.req ? 'text-[#505050]' : 'text-slate-400'}`}>{ach.title}</p>
                <p className="text-xs text-slate-500">{ach.desc}</p>
                </div>
                </div>
            )
        })}
        </div>
        </div>
    )
}
