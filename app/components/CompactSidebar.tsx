import Link from 'next/link'
import { LayoutDashboard, CheckSquare, BarChart3, Settings, Crown } from 'lucide-react'
import ProfileAvatar from './ProfileAvatar'
import HabitatLogo from './HabitatLogo'

export default function CompactSidebar({ user, currentPath }: { user: any, currentPath: string }) {
    return (
        <aside className="w-64 shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border border-[#9BD7D5] p-6 flex flex-col gap-6">
        <div className="flex items-center gap-3">
        <HabitatLogo className="w-10 h-10" />
        <h1 className="text-xl font-bold tracking-tight text-slate-800">Habitat</h1>
        </div>

        <nav className="flex flex-col gap-1">
        {[
            { label: 'Dashboard', href: '/', icon: <LayoutDashboard size={20} /> },
            { label: 'Habits', href: '/habits', icon: <CheckSquare size={20} /> },
            { label: 'Stats', href: '/stats', icon: <BarChart3 size={20} /> },
            { label: 'Settings', href: '/settings', icon: <Settings size={20} /> },
        ].map((item) => (
            <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentPath === item.href
                ? 'bg-[#9BD7D5] text-[#129793]'
                : 'text-slate-600 hover:bg-[#F4F7F7] hover:text-[#505050]'
            }`}
            >
            {item.icon} {item.label}
            </Link>
        ))}

        {/* Upgrade to Pro Link */}
        <Link
        href="/pricing"
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all mt-2 border-2 ${
            currentPath === '/pricing'
            ? 'bg-[#129793] text-white border-[#129793]'
            : 'text-[#129793] hover:bg-[#129793] hover:text-white border-[#129793] border-dashed'
        }`}
        >
        <Crown size={20} /> Upgrade to Pro
        </Link>
        </nav>

        <div className="pt-4 border-t border-[#9BD7D5]">
        <div className="flex items-center gap-3">
        <ProfileAvatar image={user?.image} name={user?.name} size="w-10 h-10" />
        <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#505050] truncate">{user?.nickname || user?.name || 'User'}</p>
        <p className="text-xs text-slate-600 truncate">Keep going!</p>
        </div>
        </div>
        </div>
        </div>
        </aside>
    )
}
