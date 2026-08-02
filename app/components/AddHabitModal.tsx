'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import { createHabit } from '../actions'
import { useRouter } from 'next/navigation'

export default function AddHabitModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [title, setTitle] = useState('')
    const [icon, setIcon] = useState('check')
    const [color, setColor] = useState('teal')
    const [targetValue, setTargetValue] = useState('1')
    const [unit, setUnit] = useState('times')
    const router = useRouter()

    if (!isOpen) return null

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault()

            const formData = new FormData()
            formData.append('title', title)
                formData.append('icon', icon)
                    formData.append('color', color)
                        formData.append('targetValue', targetValue)
                            formData.append('unit', unit)

                                await createHabit(formData)
                                onClose()
                                router.refresh()
        }

        return (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
            <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-[#505050] mb-6">Add New Habit</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Habit Name</label>
            <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-[#9BD7D5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#129793]"
            placeholder="e.g., Drink Water"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Icon</label>
            <select
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full px-4 py-2 border border-[#9BD7D5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#129793]"
            >
            <option value="check">Check</option>
            <option value="droplets">Droplets</option>
            <option value="dumbbell">Dumbbell</option>
            <option value="book-open">Book</option>
            <option value="brain">Brain</option>
            <option value="moon">Moon</option>
            <option value="candy-off">Candy Off</option>
            <option value="pen-line">Pen</option>
            <option value="footprints">Footprints</option>
            <option value="sparkles">Sparkles</option>
            <option value="smartphone-nfc">Phone</option>
            </select>
            </div>

            <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Color</label>
            <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full px-4 py-2 border border-[#9BD7D5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#129793]"
            >
            <option value="teal">Teal</option>
            <option value="light-teal">Light Teal</option>
            <option value="coral">Coral</option>
            <option value="dark-gray">Dark Gray</option>
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
            <option value="orange">Orange</option>
            <option value="pink">Pink</option>
            <option value="indigo">Indigo</option>
            <option value="emerald">Emerald</option>
            </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Value</label>
            <input
            type="number"
            value={targetValue}
            onChange={(e) => setTargetValue(e.target.value)}
            required
            min="1"
            className="w-full px-4 py-2 border border-[#9BD7D5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#129793]"
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Unit</label>
            <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
            className="w-full px-4 py-2 border border-[#9BD7D5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#129793]"
            placeholder="e.g., times, glasses"
            />
            </div>
            </div>

            <button
            type="submit"
            className="w-full bg-[#129793] hover:bg-[#0e7a76] text-white py-3 rounded-lg font-medium transition-colors mt-6"
            >
            Create Habit
            </button>
            </form>
            </div>
            </div>
        )
}
