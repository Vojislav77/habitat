import { getServerSession } from "next-auth"
import { authOptions } from "../../auth"
import { prisma } from "../../lib/prisma"
import { redirect } from "next/navigation"
import CompactSidebar from "../components/CompactSidebar"
import MobileMenu from "../components/MobileMenu"
import AddHabitSidebarCard from "../components/AddHabitSidebarCard"
import CopyrightCard from "../components/CopyrightCard"
import HabitItem from "../components/HabitItem"

export default async function HabitsPage() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) redirect("/login")

        const user = await prisma.user.findUnique({ where: { email: session.user.email } })
        if (!user) redirect("/login")

            const habits = await prisma.habit.findMany({
                where: { userId: user.id },
                orderBy: { createdAt: 'desc' }
            })

            return (
                <div className="min-h-screen bg-[#F4F7F7] font-sans text-[#505050] p-6">
                <MobileMenu user={user} currentPath="/habits" />
                <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6">
                <div className="col-span-1 md:col-start-2 md:row-start-1">
                <header className="pl-16 md:pl-0">
                <h1 className="text-3xl font-bold text-[#505050]">Manage Your Habits</h1>
                <p className="text-slate-600 mt-1">Edit, update, or remove your daily goals.</p>
                </header>
                </div>
                <div className="hidden md:flex md:col-start-1 md:row-start-2 flex-col gap-6">
                <CompactSidebar user={user} currentPath="/habits" />
                <AddHabitSidebarCard />
                <CopyrightCard isPro={user.isPro} />
                </div>
                <div className="col-span-1 md:col-start-2 md:row-start-2">
                <div className="bg-white rounded-2xl border border-[#9BD7D5] shadow-sm overflow-hidden">
                <div className="divide-y divide-[#9BD7D5]">
                {habits.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                    <p>You haven't created any habits yet.</p>
                    </div>
                ) : (
                    habits.map((habit: any) => (
                        <HabitItem key={habit.id} habit={habit} />
                    ))
                )}
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
            )
}
