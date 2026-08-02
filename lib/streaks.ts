export function calculateStreaks(allLogs: any[]) {
    const completedDates = new Set(allLogs.filter((l: any) => l.completed).map((l: any) => new Date(l.date).toISOString().split('T')[0]))
    const sortedDates = Array.from(completedDates).sort()
    let currentStreak = 0
    let bestStreak = 0
    let tempStreak = 0
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

    if (completedDates.has(today) || completedDates.has(yesterday)) {
        let checkDate = new Date(completedDates.has(today) ? today : yesterday)
        while(completedDates.has(checkDate.toISOString().split('T')[0])) {
            currentStreak++
            checkDate.setDate(checkDate.getDate() - 1)
        }
    }
    for (let i = 0; i < sortedDates.length; i++) {
        if (i === 0) { tempStreak = 1 }
        else {
            const prev = new Date(sortedDates[i-1])
            const curr = new Date(sortedDates[i])
            const diff = (curr.getTime() - prev.getTime()) / 86400000
            if (diff === 1) { tempStreak++ } else { tempStreak = 1 }
        }
        bestStreak = Math.max(bestStreak, tempStreak)
    }
    return { currentStreak, bestStreak };
}
