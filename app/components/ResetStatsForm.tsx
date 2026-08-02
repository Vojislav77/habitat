'use client'
import { resetAllStats } from '../actions'

export default function ResetStatsForm() {
    return (
        <form
        action={async () => {
            if (confirm('Are you sure you want to reset all statistics? This action cannot be undone.')) {
                await resetAllStats()
            }
        }}
        >
        <button
        type="submit"
        className="px-4 py-2 bg-[#FF7260] text-white text-sm font-semibold rounded-xl hover:bg-[#e55a4a] transition-colors"
        >
        Reset All Data
        </button>
        </form>
    )
}
