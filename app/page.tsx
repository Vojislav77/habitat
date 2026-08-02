import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import { prisma } from "../lib/prisma"
import { redirect } from "next/navigation"
import DashboardWrapper from "./components/DashboardWrapper"

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect("/login")

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) redirect("/login")

      const params = await searchParams
      const selectedDateStr = params?.date || new Date().toISOString().split('T')[0]

      const allHabits = await prisma.habit.findMany({
        where: { userId: user.id },
        include: { logs: true }
      })

      const habitsForSelectedDate = allHabits.map(h => ({
        ...h,
        logs: h.logs.filter(l => {
          const logDate = new Date(l.date).toISOString().split('T')[0]
          return logDate === selectedDateStr
        })
      }))

      return (
        <DashboardWrapper
        user={user}
        habits={habitsForSelectedDate}
        allLogs={allHabits.flatMap(h => h.logs)}
        selectedDate={selectedDateStr}
        />
      )
}
