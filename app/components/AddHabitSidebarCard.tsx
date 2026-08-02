'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import AddHabitModal from './AddHabitModal'

export default function AddHabitSidebarCard() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
        <div className="bg-white rounded-2xl border border-[#9BD7D5] shadow-sm p-5">
        <h3 className="font-bold text-[#505050] mb-4">Quick Actions</h3>
        <button
        onClick={() => setIsModalOpen(true)}
        className="w-full flex items-center justify-center gap-2 bg-[#129793] hover:bg-[#9BD7D5] text-white px-4 py-3 rounded-xl text-sm font-medium transition-colors shadow-sm"
        >
        <Plus size={18} /> Add New Habit
        </button>
        </div>

        <AddHabitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}
