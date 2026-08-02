import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth"
import { prisma } from "../../../lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            habits: {
                include: { logs: true },
                orderBy: { createdAt: 'desc' }
            }
        }
    })

    if (!user) {
        return new NextResponse("Not found", { status: 404 })
    }

    // Generate CSV content
    let csv = "Habit Title,Unit,Target Value,Completed,Date\n"

    user.habits.forEach(habit => {
        const safeTitle = `"${habit.title.replace(/"/g, '""')}"`
        habit.logs.forEach(log => {
            csv += `${safeTitle},${habit.unit},${habit.targetValue},${log.completed ? 1 : 0},${log.date}\n`
        })
    })

    // Return the file as a download
    return new NextResponse(csv, {
        headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": "attachment; filename=habitat_data_export.csv",
        },
    })
}
