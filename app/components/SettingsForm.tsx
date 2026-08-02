'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { updateProfile } from '../actions'
import { User, Upload, Check } from 'lucide-react'

const genericAvatars = [
    { id: 'grad1', class: 'bg-gradient-to-tr from-[#FF7260] to-[#9BD7D5]' },
{ id: 'grad2', class: 'bg-gradient-to-tr from-[#9BD7D5] to-[#129793]' },
{ id: 'grad3', class: 'bg-gradient-to-tr from-[#9BD7D5] to-[#129793]' },
{ id: 'grad4', class: 'bg-gradient-to-tr from-[#129793] to-[#9BD7D5]' },
]

export default function SettingsForm({ user }: any) {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [nickname, setNickname] = useState(user.nickname || '')
    const [imagePreview, setImagePreview] = useState<string | null>(user.image || null)
    const [selectedGeneric, setSelectedGeneric] = useState<string | null>(
        user.image?.startsWith('avatar:') ? user.image.split(':')[1] : null
    )
    const [isSaving, setIsSaving] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedGeneric(null)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleGenericSelect = (id: string) => {
        setSelectedGeneric(id)
        setImagePreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleSubmit = async (formData: FormData) => {
        setIsSaving(true)
        formData.append('nickname', nickname)
            if (selectedGeneric) {
                formData.append('genericAvatar', selectedGeneric)
            }

            await updateProfile(formData)
            setIsSaving(false)
            router.refresh()
    }

    const renderCurrentAvatar = () => {
        if (selectedGeneric) {
            const grad = genericAvatars.find(g => g.id === selectedGeneric)
            return (
                <div className={`w-24 h-24 rounded-full ${grad?.class} flex items-center justify-center text-white text-3xl font-bold shadow-lg`}>
                {user.name?.[0] || 'U'}
                </div>
            )
        }
        if (imagePreview) {
            return <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-full object-cover shadow-lg" />
        }
        return (
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#129793] to-[#9BD7D5] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {user.name?.[0] || 'U'}
            </div>
        )
    }

    return (
        <form action={handleSubmit} className="bg-white rounded-xl md:rounded-2xl border border-[#9BD7D5] shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-[#9BD7D5]">
        <h2 className="text-lg font-bold text-[#505050] flex items-center gap-2">
        <User size={20} className="text-[#129793]" />
        Profile Information
        </h2>
        </div>

        <div className="p-4 md:p-6 space-y-6">
        <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">Profile Picture</label>
        {/* Mobile: Stack vertically. Desktop: Side by side */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

        <div className="relative">
        {renderCurrentAvatar()}
        </div>

        <div className="flex-1 space-y-4 w-full">
        <div>
        <input
        type="file"
        ref={fileInputRef}
        name="image"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        />
        <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 bg-[#F4F7F7] hover:bg-[#9BD7D5] text-slate-700 rounded-lg text-sm font-medium transition-colors"
        >
        <Upload size={16} /> Upload Photo
        </button>
        </div>

        <div>
        <p className="text-xs text-slate-600 mb-2">Or choose a generic avatar:</p>
        <div className="flex gap-3">
        {genericAvatars.map((grad) => (
            <button
            key={grad.id}
            type="button"
            onClick={() => handleGenericSelect(grad.id)}
            className={`w-10 h-10 rounded-full ${grad.class} flex items-center justify-center text-white font-bold transition-all ${
                selectedGeneric === grad.id ? 'ring-2 ring-offset-2 ring-[#129793] scale-110' : 'hover:scale-105'
            }`}
            >
            {user.name?.[0] || 'U'}
            </button>
        ))}
        </div>
        </div>
        </div>
        </div>
        </div>

        <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Custom Nickname</label>
        <input
        name="nickname"
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="e.g. Alex, The Habit Master"
        className="w-full px-4 py-2.5 border border-[#9BD7D5] rounded-lg focus:ring-2 focus:ring-[#129793] focus:border-[#129793] outline-none"
        />
        </div>

        <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
        <input
        type="email"
        value={user.email || ''}
        disabled
        className="w-full px-4 py-2.5 bg-[#F4F7F7] border border-[#9BD7D5] rounded-lg text-slate-600"
        />
        </div>
        </div>

        {/* Mobile: Center the button. Desktop: Align right */}
        <div className="p-4 md:p-6 bg-[#F4F7F7] border-t border-[#9BD7D5] flex justify-center sm:justify-end">
        <button
        type="submit"
        disabled={isSaving}
        className="flex items-center justify-center gap-2 bg-[#129793] hover:bg-[#9BD7D5] text-white px-5 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 w-full sm:w-auto"
        >
        {isSaving ? 'Saving...' : (
            <>
            <Check size={18} />
            Save Changes
            </>
        )}
        </button>
        </div>
        </form>
    )
}
