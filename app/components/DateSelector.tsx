'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { ChevronDown, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

export default function DateSelector({ initialDate }: { initialDate: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const [selectedDate, setSelectedDate] = useState(initialDate)
    const [isEuFormat, setIsEuFormat] = useState(true)
    const [isOpen, setIsOpen] = useState(false)

    const [viewMonth, setViewMonth] = useState(() => {
        const d = new Date(initialDate + 'T00:00:00')
        return { year: d.getFullYear(), month: d.getMonth() }
    })

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        const d = new Date(selectedDate + 'T00:00:00')
        setViewMonth({ year: d.getFullYear(), month: d.getMonth() })
    }, [selectedDate])

    const handleDateSelect = (dateStr: string) => {
        setSelectedDate(dateStr)
        setIsOpen(false)
        const params = new URLSearchParams(searchParams.toString())
        params.set('date', dateStr)
        router.push(`${pathname}?${params.toString()}`)
    }

    const toggleFormat = () => setIsEuFormat(!isEuFormat)

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr + 'T00:00:00')
        if (isEuFormat) {
            return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }
    }

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const dayNames = isEuFormat
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const buildCalendarDays = () => {
        const firstDay = new Date(viewMonth.year, viewMonth.month, 1)
        const lastDay = new Date(viewMonth.year, viewMonth.month + 1, 0)
        const daysInMonth = lastDay.getDate()

        const startOffset = isEuFormat
        ? (firstDay.getDay() + 6) % 7
        : firstDay.getDay()

        const days: { dateStr: string; day: number; inMonth: boolean }[] = []

        const prevMonthLastDay = new Date(viewMonth.year, viewMonth.month, 0).getDate()
        for (let i = startOffset - 1; i >= 0; i--) {
            const d = prevMonthLastDay - i
            const m = viewMonth.month === 0 ? 11 : viewMonth.month - 1
            const y = viewMonth.month === 0 ? viewMonth.year - 1 : viewMonth.year
            days.push({ dateStr: `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`, day: d, inMonth: false })
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${viewMonth.year}-${String(viewMonth.month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
            days.push({ dateStr, day: d, inMonth: true })
        }

        const remaining = 42 - days.length
        for (let d = 1; d <= remaining; d++) {
            const m = viewMonth.month === 11 ? 0 : viewMonth.month + 1
            const y = viewMonth.month === 11 ? viewMonth.year + 1 : viewMonth.year
            days.push({ dateStr: `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`, day: d, inMonth: false })
        }

        return days
    }

    const calendarDays = buildCalendarDays()
    const todayStr = new Date().toISOString().split('T')[0]

    const goToPrevMonth = () => {
        setViewMonth(prev => {
            const m = prev.month === 0 ? 11 : prev.month - 1
            const y = prev.month === 0 ? prev.year - 1 : prev.year
            return { year: y, month: m }
        })
    }

    const goToNextMonth = () => {
        setViewMonth(prev => {
            const m = prev.month === 11 ? 0 : prev.month + 1
            const y = prev.month === 11 ? prev.year + 1 : prev.year
            return { year: y, month: m }
        })
    }

    return (
        <div className="flex items-center gap-2" ref={containerRef}>
        <div className="relative">
        <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-[#9BD7D5] shadow-sm hover:bg-[#F4F7F7] transition-colors cursor-pointer"
        >
        <Calendar size={16} className="text-[#129793]" />
        <span className="text-sm font-medium text-slate-700">{formatDate(selectedDate)}</span>
        <ChevronDown size={16} className={`text-[#129793] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
            <div className="absolute left-0 top-full mt-2 z-50 bg-white rounded-xl border border-[#9BD7D5] shadow-lg p-4 w-[300px]">
            <div className="flex items-center justify-between mb-3">
            <button
            onClick={goToPrevMonth}
            className="p-1.5 rounded-lg hover:bg-[#F4F7F7] text-[#129793] transition-colors"
            aria-label="Previous month"
            >
            <ChevronLeft size={18} />
            </button>
            <span className="text-sm font-semibold text-[#505050]">
            {monthNames[viewMonth.month]} {viewMonth.year}
            </span>
            <button
            onClick={goToNextMonth}
            className="p-1.5 rounded-lg hover:bg-[#F4F7F7] text-[#129793] transition-colors"
            aria-label="Next month"
            >
            <ChevronRight size={18} />
            </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-1">
            {dayNames.map(day => (
                <div key={day} className="text-center text-xs font-semibold text-[#9BD7D5] py-1">
                {day}
                </div>
            ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((d, idx) => {
                const isSelected = d.dateStr === selectedDate
                const isToday = d.dateStr === todayStr
                return (
                    <button
                    key={idx}
                    onClick={() => handleDateSelect(d.dateStr)}
                    className={`
                        h-9 w-9 rounded-lg text-sm font-medium transition-colors
                        ${!d.inMonth ? 'text-slate-300' : 'text-[#505050]'}
                        ${isSelected ? 'bg-[#129793] text-white hover:bg-[#0f7f7c]' : ''}
                        ${!isSelected && d.inMonth && isToday ? 'border border-[#129793] text-[#129793]' : ''}
                        ${!isSelected && d.inMonth && !isToday ? 'hover:bg-[#F4F7F7]' : ''}
                        ${!d.inMonth ? 'hover:bg-[#F4F7F7]' : ''}
                        `}
                        >
                        {d.day}
                        </button>
                )
            })}
            </div>

            <button
            onClick={() => handleDateSelect(todayStr)}
            className="mt-3 w-full text-xs font-semibold text-[#129793] hover:bg-[#F4F7F7] py-1.5 rounded-lg transition-colors"
            >
            Jump to Today
            </button>
            </div>
        )}
        </div>

        <button
        onClick={toggleFormat}
        className="px-3 py-2 text-xs font-bold text-[#129793] bg-white border border-[#9BD7D5] rounded-xl hover:bg-[#F4F7F7] transition-colors"
        title="Toggle Date Format"
        >
        {isEuFormat ? 'EU' : 'US'}
        </button>
        </div>
    )
}
