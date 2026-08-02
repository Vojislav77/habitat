'use client'

import { useState } from 'react'
import { X, Droplets, Dumbbell, BookOpen, Brain, Moon, CandyOff, PenLine, Footprints, Sparkles, SmartphoneNfc } from 'lucide-react'
import { updateHabit } from '../actions'

const colors = [
    { name: 'cyan', class: 'bg-[#9BD7D5]' },
{ name: 'rose', class: 'bg-[#FF7260]' },
{ name: 'violet', class: 'bg-[#129793]' },
{ name: 'indigo', class: 'bg-[#129793]' },
{ name: 'amber', class: 'bg-[#9BD7D5]' },
{ name: 'emerald', class: 'bg-[#129793]' },
]

const icons = [
    { name: 'droplets', Icon: Droplets },
{ name: 'dumbbell', Icon: Dumbbell },
{ name: 'book-open', Icon: BookOpen },
{ name: 'brain', Icon: Brain },
{ name: 'moon', Icon: Moon },
{ name: 'candy-off', Icon: CandyOff },
{ name: 'pen-line', Icon: PenLine },
{ name: 'footprints', Icon: Footprints },
{ name: 'sparkles', Icon: Sparkles },
{ name: 'smartphone-nfc', Icon: SmartphoneNfc },
]

export default function EditHabitModal({ isOpen, onClose, habit }: any) {
    const [selectedColor, setSelectedColor] = useState(habit?.color || 'indigo')
    const [selectedIcon, setSelectedIcon] = useState(habit?.icon || 'droplets')

    if (!isOpen || !habit) return null

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative border border-[#9BD7D5]">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
            <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-[#505050] mb-4">Edit Habit</h2>

            <form action={(formData) => {
                formData.append('color', selectedColor)
                    formData.append('icon', selectedIcon)
                        updateHabit(habit.id, formData).then(() => onClose())
            }} className="space-y-4">

            <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Habit Name</label>
            <input name="title" required defaultValue={habit.title} className="w-full px-3 py-2 border border-[#9BD7D5] rounded-lg focus:ring-2 focus:ring-[#129793] focus:border-[#129793] outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Daily Goal</label>
            <input name="targetValue" type="number" required defaultValue={habit.targetValue} className="w-full px-3 py-2 border border-[#9BD7D5] rounded-lg focus:ring-2 focus:ring-[#129793] focus:border-[#129793] outline-none" />
            </div>
            <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
            <input name="unit" required defaultValue={habit.unit} className="w-full px-3 py-2 border border-[#9BD7D5] rounded-lg focus:ring-2 focus:ring-[#129793] focus:border-[#129793] outline-none" />
            </div>
            </div>

            <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Color</label>
            <div className="flex gap-2">
            {colors.map((c) => (
                <button
                key={c.name}
                type="button"
                onClick={() => setSelectedColor(c.name)}
                className={`w-8 h-8 rounded-full ${c.class} ${selectedColor === c.name ? 'ring-2 ring-offset-2 ring-[#129793]' : ''}`}
                />
            ))}
            </div>
            </div>

            <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Icon</label>
            <div className="grid grid-cols-5 gap-2">
            {icons.map((i) => (
                <button
                key={i.name}
                type="button"
                onClick={() => setSelectedIcon(i.name)}
                className={`p-2 rounded-lg border flex items-center justify-center ${selectedIcon === i.name ? 'border-[#129793] bg-[#9BD7D5] text-[#129793]' : 'border-[#9BD7D5] text-slate-400 hover:bg-[#F4F7F7]'}`}
                >
                <i.Icon size={20} />
                </button>
            ))}
            </div>
            </div>

            <button type="submit" className="w-full bg-[#129793] hover:bg-[#9BD7D5] text-white font-medium py-2.5 rounded-lg transition-colors">
            Save Changes
            </button>
            </form>
            </div>
            </div>
        )
}
