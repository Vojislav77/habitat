'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import CompactSidebar from './CompactSidebar'
import CopyrightCard from './CopyrightCard'

export default function MobileMenu({ user, currentPath }: { user: any, currentPath: string }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
        {/* Hamburger Button - Mobile Only */}
        <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 bg-white p-2 rounded-lg shadow-md border border-[#9BD7D5]"
        >
        <Menu size={24} className="text-[#129793]" />
        </button>

        {/* Overlay */}
        {isOpen && (
            <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
            />
        )}

        {/* Slide-in Sidebar */}
        <div
        className={`md:hidden fixed top-0 left-0 h-full w-72 bg-[#F4F7F7] z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        >
        <div className="p-6">
        {/* Close Button */}
        <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 p-2"
        >
        <X size={24} className="text-slate-600" />
        </button>

        {/* Sidebar Content */}
        <div className="pt-12 flex flex-col gap-6">
        <CompactSidebar user={user} currentPath={currentPath} />
        <CopyrightCard isPro={user.isPro} />
        </div>
        </div>
        </div>
        </>
    )
}
