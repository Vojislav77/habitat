import Link from 'next/link'

export default function CopyrightCard({ isPro }: { isPro: boolean }) {
  if (isPro) return null;

  return (
    <div className="bg-white rounded-2xl border border-[#9BD7D5] shadow-sm p-5 mt-6">
    <p className="text-center text-xs text-slate-400">
    © {new Date().getFullYear()} Habitat. All rights reserved.
    </p>
    <div className="flex items-center justify-center gap-3 mt-2 text-xs">
    <Link href="/privacy" className="text-slate-400 hover:text-[#129793] transition-colors">
    Privacy Policy
    </Link>
    <span className="text-slate-300">•</span>
    <Link href="/terms" className="text-slate-400 hover:text-[#129793] transition-colors">
    Terms of Service
    </Link>
    </div>
    </div>
  );
}
