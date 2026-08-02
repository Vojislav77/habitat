import { getServerSession } from "next-auth"
import { authOptions } from "../../auth"
import { prisma } from "../../lib/prisma"
import { redirect } from "next/navigation"
import { LogOut } from 'lucide-react'
import CompactSidebar from "../components/CompactSidebar"
import MobileMenu from "../components/MobileMenu"
import SettingsForm from "../components/SettingsForm"
import DesktopNotificationsCard from "../components/DesktopNotificationsCard"
import CopyrightCard from "../components/CopyrightCard"

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect("/login")

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) redirect("/login")

      return (
        <div className="min-h-screen bg-[#F4F7F7] font-sans text-[#505050] p-6">
        <MobileMenu user={user} currentPath="/settings" />
        <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6">
        {/* HEADER - Right column, Row 1 */}
        <div className="col-span-1 md:col-start-2 md:row-start-1">
        <header className="pl-16 md:pl-0">
        <h1 className="text-3xl font-bold text-[#505050]">Settings</h1>
        <p className="text-slate-600 mt-1">Manage your profile and account preferences.</p>
        </header>
        </div>

        {/* SIDEBAR - Left column, Row 2 */}
        <div className="hidden md:block md:col-start-1 md:row-start-2 flex flex-col gap-6">
        <CompactSidebar user={user} currentPath="/settings" />
        <CopyrightCard isPro={user.isPro} />
        </div>

        {/* MAIN CONTENT - Right column, Row 2 */}
        <div className="col-span-1 md:col-start-2 md:row-start-2 space-y-6">
        <SettingsForm user={user} />

        {/* Desktop Notifications Card */}
        <DesktopNotificationsCard initialEnabled={user.desktopRemindersEnabled || false} />

        {/* Data Export Card */}
        <div className="bg-white rounded-2xl border border-[#9BD7D5] shadow-sm overflow-hidden">
        <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
        <h3 className="font-bold text-[#505050]">Export Your Data</h3>
        <p className="text-sm text-slate-600">Download all your habit history as a CSV file.</p>
        </div>
        <a href="/api/export" className="flex items-center gap-2 bg-[#129793] hover:bg-[#9BD7D5] text-white px-5 py-2.5 rounded-lg font-medium transition-colors w-full sm:w-auto justify-center">
        Download CSV
        </a>
        </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#9BD7D5] shadow-sm overflow-hidden">
        <div className="p-5 flex justify-between items-center">
        <div>
        <h3 className="font-bold text-[#505050]">Sign Out</h3>
        <p className="text-sm text-slate-600">Log out of your account on this device.</p>
        </div>
        <form action="/api/auth/signout" method="POST">
        <button type="submit" className="flex items-center gap-2 bg-[#FF7260] hover:bg-red-400 text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
        <LogOut size={18} /> Sign Out
        </button>
        </form>
        </div>
        </div>

        <div className="text-center text-sm text-slate-500 pb-6">
        <p>Habitat v1.0.0 • Built for building better habits.</p>
        </div>
        </div>
        </div>
        </div>
        </div>
      )
}
