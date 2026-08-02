'use client'

import { Trash2 } from 'lucide-react'
import { deleteHabit } from '../actions'

export default function DeleteHabitButton({ habitId, title }: { habitId: string, title: string }) {
    return (
        <form action={deleteHabit.bind(null, habitId)}>
        <button
        type="submit"
        className="p-2 text-slate-400 hover:text-red-600 hover:bg-[#FF7260] rounded-lg transition-colors"
        title="Delete Habit"
        onClick={(e) => {
            if (!confirm(`Are you sure you want to delete "${title}"?`)) {
                e.preventDefault();
            }
        }}
        >
        <Trash2 size={18} />
        </button>
        </form>
    )
}
