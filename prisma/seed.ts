import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seed...')

    // 1. Create a default user (This will be you for now)
    const user = await prisma.user.upsert({
        where: { email: 'admin@habitat.app' },
        update: {},
        create: {
            email: 'admin@habitat.app',
            name: 'Admin',
        },
    })
    console.log(`✅ Created user: ${user.email}`)

    // 2. The 10 Pre-defined Habits
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

    // 3. Add them to the database
    for (const habit of habitsToCreate) {
        await prisma.habit.create({
            data: {
                userId: user.id,
                title: habit.title,
                icon: habit.icon,
                color: habit.color,
                targetValue: habit.targetValue,
                unit: habit.unit,
                frequency: 'daily',
                priority: 'medium',
            },
        })
        console.log(`✅ Added habit: ${habit.title}`)
    }

    console.log(' Database seed complete!')
}

main()
.catch((e) => {
    console.error(e)
    process.exit(1)
})
.finally(async () => {
    await prisma.$disconnect()
})
