import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // Find your personal user account (the one that isn't the hidden admin)
    const user = await prisma.user.findFirst({
        where: { email: { not: 'admin@habitat.app' } }
    })

    if (!user) {
        console.log('No personal user found. Did you sign up?')
        return;
    }

    console.log(`Adding 10 default habits to ${user.email}...`)

    const habitsToCreate = [
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

    for (const habit of habitsToCreate) {
        await prisma.habit.create({
            data: {
                userId: user.id,
                ...habit,
                frequency: 'daily',
                priority: 'medium'
            },
        })
    }

    console.log('✅ Success! 10 habits added to your account.')
}

main()
.catch(console.error)
.finally(() => prisma.$disconnect())
