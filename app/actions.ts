'use server'

import { prisma } from '../lib/prisma'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export async function toggleHabit(habitId: string) {
    const today = new Date().toISOString().split('T')[0]
    const todayDate = new Date(today)

    const existingLog = await prisma.habitLog.findUnique({
        where: { habitId_date: { habitId, date: todayDate } },
    })

    if (existingLog) {
        await prisma.habitLog.update({ where: { id: existingLog.id }, data: { completed: !existingLog.completed } })
    } else {
        await prisma.habitLog.create({ data: { habitId, date: todayDate, completed: true, value: 1 } })
    }
    revalidatePath('/')
}

export async function createHabit(formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) throw new Error("Not authenticated")

        const user = await prisma.user.findUnique({ where: { email: session.user.email } })
        if (!user) throw new Error('User not found')

            const title = formData.get('title') as string
            const targetValue = parseInt(formData.get('targetValue') as string)
            const unit = formData.get('unit') as string
            const color = formData.get('color') as string
            const icon = formData.get('icon') as string

            await prisma.habit.create({
                data: { userId: user.id, title, targetValue, unit, color, icon, frequency: 'daily', priority: 'medium' },
            })
            revalidatePath('/')
}

export async function updateHabit(habitId: string, formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) throw new Error("Not authenticated")

        const title = formData.get('title') as string
        const targetValue = parseInt(formData.get('targetValue') as string)
        const unit = formData.get('unit') as string
        const color = formData.get('color') as string
        const icon = formData.get('icon') as string

        await prisma.habit.update({
            where: { id: habitId },
            data: { title, targetValue, unit, color, icon }
        })
        revalidatePath('/')
        revalidatePath('/habits')
}

export async function deleteHabit(habitId: string) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) throw new Error("Not authenticated")

        await prisma.habit.delete({ where: { id: habitId } })
        revalidatePath('/')
        revalidatePath('/habits')
}

export async function registerUser(formData: FormData) {
    const email = formData.get('email') as string
    const name = formData.get('name') as string
    const password = formData.get('password') as string

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) return { error: 'Email already exists' }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({ data: { email, name, password: hashedPassword } })

    const defaultHabits = [
        { title: 'Drink Water', icon: 'droplets', color: 'cyan', targetValue: 8, unit: 'glasses' },
        { title: 'Exercise', icon: 'dumbbell', color: 'rose', targetValue: 30, unit: 'minutes' },
        { title: 'Read Book', icon: 'book-open', color: 'violet', targetValue: 20, unit: 'pages' },
        { title: 'Meditate', icon: 'brain', color: 'indigo', targetValue: 10, unit: 'minutes' },
        { title: 'Sleep 8hrs', icon: 'moon', color: 'blue', targetValue: 8, unit: 'hours' },
        { title: 'No Sugar', icon: 'candy-off', color: 'amber', targetValue: 1, unit: 'day' },
        { title: 'Journal', icon: 'pen-line', color: 'emerald', targetValue: 1, unit: 'entry' },
        { title: 'Walk 10k Steps', icon: 'footprints', color: 'orange', targetValue: 10000, unit: 'steps' },
        { title: 'Skincare', icon: 'sparkles', color: 'pink', targetValue: 1, unit: 'routine' },
        { title: 'No Phone Before Bed', icon: 'smartphone-nfc', color: 'slate', targetValue: 60, unit: 'minutes' },
    ]

    for (const habit of defaultHabits) {
        await prisma.habit.create({ data: { userId: newUser.id, ...habit, frequency: 'daily', priority: 'medium' } })
    }
    return { success: true }
}

// --- NEW PROFILE UPDATE FUNCTION ---
export async function updateProfile(formData: FormData) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) throw new Error("Not authenticated")

        const nickname = formData.get('nickname') as string
        const imageFile = formData.get('image') as File
        const genericAvatar = formData.get('genericAvatar') as string

        let imageUrl: string | null = null

        // 1. If they uploaded a new file, convert it to Base64
        if (imageFile && imageFile.size > 0) {
            const buffer = Buffer.from(await imageFile.arrayBuffer())
            imageUrl = `data:${imageFile.type};base64,${buffer.toString('base64')}`
        }
        // 2. If they selected a generic avatar
        else if (genericAvatar) {
            imageUrl = `avatar:${genericAvatar}`
        }

        // 3. Update the database
        const updateData: any = { nickname }
        if (imageUrl) updateData.image = imageUrl

            await prisma.user.update({
                where: { email: session.user.email },
                data: updateData
            })

            revalidatePath('/settings')
            revalidatePath('/')
}

export async function toggleDesktopReminders(enabled: boolean) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return { error: "Unauthorized" }

    await prisma.user.update({
        where: { email: session.user.email },
        data: { desktopRemindersEnabled: enabled }
    })
    revalidatePath('/settings')
}

export async function resetAllStats() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) throw new Error("Not authenticated")

        const user = await prisma.user.findUnique({ where: { email: session.user.email } })
        if (!user) throw new Error("User not found")

            await prisma.habitLog.deleteMany({
                where: {
                    habit: {
                        userId: user.id
                    }
                }
            })

            revalidatePath('/')
            revalidatePath('/stats')
            return { success: true }
}
