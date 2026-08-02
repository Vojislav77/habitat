'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function StatsCharts({ weeklyData, pieData, completedLogs, totalLogs }: any) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#9BD7D5] shadow-sm">
        <h3 className="text-lg font-bold text-[#505050] mb-6">Last 7 Days Activity</h3>
        <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={weeklyData}>
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
        <Tooltip
        cursor={{ fill: '#F4F7F7' }}
        contentStyle={{ borderRadius: '8px', border: '1px solid #9BD7D5', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Bar dataKey="completed" fill="#129793" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
        </ResponsiveContainer>
        </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#9BD7D5] shadow-sm">
        <h3 className="text-lg font-bold text-[#505050] mb-6">Overall Completion</h3>
        <div className="h-64 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
        <PieChart>
        <Pie
        data={pieData}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        paddingAngle={5}
        dataKey="value"
        >
        {pieData.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
        </Pie>
        <Tooltip />
        </PieChart>
        </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#129793]"></div>
        <span className="text-sm text-slate-700">Completed ({completedLogs})</span>
        </div>
        <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#9BD7D5]"></div>
        <span className="text-sm text-slate-700">Missed ({Math.max(0, totalLogs - completedLogs)})</span>
        </div>
        </div>
        </div>
        </div>
    )
}
