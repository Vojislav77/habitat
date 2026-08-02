import { getServerSession } from "next-auth"
import { authOptions } from "../../auth"
import { prisma } from "../../lib/prisma"
import { redirect } from "next/navigation"
import { Check, X, Crown } from 'lucide-react'
import CompactSidebar from "../components/CompactSidebar"
import MobileMenu from "../components/MobileMenu"

export default async function PricingPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) redirect("/login")

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) redirect("/login")

      return (
        <div className="min-h-screen bg-[#F4F7F7] font-sans text-[#505050] p-6">
        <MobileMenu user={user} currentPath="/pricing" />
        <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6">
        <div className="col-span-1 md:col-start-2 md:row-start-1">
        <header className="pl-16 md:pl-0">
        <h1 className="text-3xl font-bold text-[#505050]">Upgrade to Pro</h1>
        <p className="text-slate-600 mt-1">Unlock the full potential of your habit tracking.</p>
        </header>
        </div>

        <div className="hidden md:block md:col-start-1 md:row-start-2">
        <CompactSidebar user={user} currentPath="/pricing" />
        </div>

        <div className="col-span-1 md:col-start-2 md:row-start-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free Plan */}
        <div className="bg-white rounded-2xl border border-[#9BD7D5] shadow-sm p-8 flex flex-col">
        <h3 className="text-xl font-bold text-[#505050]">Free</h3>
        <p className="text-slate-600 mt-2 mb-6">Perfect for getting started.</p>
        <div className="text-4xl font-bold text-[#505050] mb-6">$0</div>
        <ul className="space-y-4 mb-8 flex-1">
        <li className="flex items-center gap-3 text-slate-600"><Check size={20} className="text-[#129793]" /> Track up to 5 habits</li>
        <li className="flex items-center gap-3 text-slate-600"><Check size={20} className="text-[#129793]" /> Basic statistics</li>
        <li className="flex items-center gap-3 text-slate-600"><Check size={20} className="text-[#129793]" /> Browser notifications</li>
        <li className="flex items-center gap-3 text-slate-400"><X size={20} /> Remove copyright footer</li>
        <li className="flex items-center gap-3 text-slate-400"><X size={20} /> Email & SMS reminders</li>
        </ul>
        <button disabled className="w-full py-3 rounded-xl font-medium text-slate-400 bg-slate-100 cursor-not-allowed">
        Current Plan
        </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-white rounded-2xl border-2 border-[#129793] shadow-md p-8 flex flex-col relative">
        <div className="absolute -top-3 right-6 bg-[#129793] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
        <Crown size={12} /> RECOMMENDED
        </div>
        <h3 className="text-xl font-bold text-[#505050]">Pro Lifetime</h3>
        <p className="text-slate-600 mt-2 mb-6">For serious habit builders.</p>
        <div className="text-4xl font-bold text-[#505050] mb-6">$9 <span className="text-lg font-normal text-slate-500">one-time</span></div>
        <ul className="space-y-4 mb-8 flex-1">
        <li className="flex items-center gap-3 text-slate-600"><Check size={20} className="text-[#129793]" /> Unlimited habits</li>
        <li className="flex items-center gap-3 text-slate-600"><Check size={20} className="text-[#129793]" /> Advanced statistics & export</li>
        <li className="flex items-center gap-3 text-slate-600"><Check size={20} className="text-[#129793]" /> Email & SMS reminders</li>
        <li className="flex items-center gap-3 text-slate-600"><Check size={20} className="text-[#129793]" /> Remove copyright footer</li>
        <li className="flex items-center gap-3 text-slate-600"><Check size={20} className="text-[#129793]" /> Priority support</li>
        </ul>
        <button className="w-full py-3 rounded-xl font-medium text-white bg-[#129793] hover:bg-[#0e7a76] transition-colors shadow-sm">
        Upgrade to Pro (Coming Soon)
        </button>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
      )
}
