'use client'

import { useState } from 'react'
import { Edit3, Droplets, Dumbbell, BookOpen, Brain, Moon, CandyOff, PenLine, Footprints, Sparkles, SmartphoneNfc } from 'lucide-react'
import EditHabitModal from './EditHabitModal'
import DeleteHabitButton from './DeleteHabitButton'

const iconMap: Record<string, any> = {
    droplets: Droplets, dumbbell: Dumbbell, 'book-open': BookOpen,
    brain: Brain, moon: Moon, 'candy-off': CandyOff,
    'pen-line': PenLine, footprints: Footprints, sparkles: Sparkles,
    'smartphone-nfc': SmartphoneNfc
}

const colorMap: Record<string, string> = {
    cyan: 'bg-[#9BD7D5] text-[#129793]',
    rose: 'bg-[#FF7260] text-pink-700',
    violet: 'bg-[#9BD7D5] text-[#129793]',
    indigo: 'bg-[#129793] text-white',
    blue: 'bg-[#9BD7D5] text-[#129793]',
    amber: 'bg-[#F4F7F7] text-orange-700',
    emerald: 'bg-[#129793] text-green-700',
    orange: 'bg-[#9BD7D5] text-orange-700',
    pink: 'bg-[#FF7260] text-pink-700',
    slate: 'bg-[#9BD7D5] text-slate-700',
}

export default function HabitItem({ habit }: { habit: any }) {
    const [isEditOpen, setIsEditOpen] = useState(false)

    const IconComponent = iconMap[habit.icon] || Edit3;
    const colorClass = colorMap[habit.color] || 'bg-[#9BD7D5] text-slate-700';
    const [bgClass, textClass] = colorClass.split(' ');

    return (
        <>
        <div className="p-6 flex items-center justify-between hover:bg-[#F4F7F7] transition-colors">
        <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl ${bgClass} flex items-center justify-center shrink-0`}>
        <IconComponent className={`w-5 h-5 ${textClass}`} />
        </div>
        <div>
        <h4 className="font-semibold text-[#505050] text-lg">{habit.title}</h4>
        <p className="text-sm text-slate-600">Goal: {habit.targetValue} {habit.unit} / day</p>
        </div>
        </div>

        <div className="flex items-center gap-2">
        <button
        onClick={() => setIsEditOpen(true)}
        className="p-2 text-slate-400 hover:text-[#129793] hover:bg-[#9BD7D5] rounded-lg transition-colors"
        title="Edit Habit"
        >
        <Edit3 size={18} />
        </button>

        <DeleteHabitButton habitId={habit.id} title={habit.title} />
        </div>
        </div>

        <EditHabitModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        habit={habit}
        />
        </>
    )
}
