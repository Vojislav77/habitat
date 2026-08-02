import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import HabitatLogo from '../components/HabitatLogo'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F4F7F7] font-sans text-[#505050] p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2 text-[#129793] hover:text-[#0e7a76] font-medium transition-colors">
            <ArrowLeft size={18} /> Back to App
          </Link>
          <div className="flex items-center gap-2">
            <HabitatLogo className="w-8 h-8" />
            <span className="font-bold text-slate-800">Habitat</span>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl border border-[#9BD7D5] shadow-sm p-8 md:p-12">
          <h1 className="text-3xl font-bold text-[#505050] mb-2">Terms of Service</h1>
          <p className="text-sm text-slate-500 mb-8">Last updated: August 2, 2026</p>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
            <section>
              <h2 className="text-xl font-bold text-[#505050] mt-6 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using Habitat, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#505050] mt-6 mb-3">2. Description of Service</h2>
              <p>Habitat is a habit tracking application that allows users to create, manage, and monitor daily habits. The service is provided on both a free tier and a paid Pro tier.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#505050] mt-6 mb-3">3. User Accounts</h2>
              <p>You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Providing accurate and complete registration information</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#505050] mt-6 mb-3">4. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Use the service for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to other accounts or systems</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Share your account credentials with others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#505050] mt-6 mb-3">5. Free vs. Pro Features</h2>
              <p>The free tier includes basic habit tracking features with certain limitations. The Pro tier, available for a one-time payment, unlocks additional features including unlimited habits, advanced statistics, and premium support. All sales are final.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#505050] mt-6 mb-3">6. Data & Privacy</h2>
              <p>Your use of the service is also governed by our Privacy Policy. By using Habitat, you consent to the collection and use of your data as described in that policy.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#505050] mt-6 mb-3">7. Termination</h2>
              <p>We reserve the right to suspend or terminate your account if you violate these terms. You may delete your account and all associated data at any time through the Settings page.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#505050] mt-6 mb-3">8. Disclaimer of Warranties</h2>
              <p>The service is provided "as is" without warranties of any kind. We do not guarantee that the service will be uninterrupted, secure, or error-free.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#505050] mt-6 mb-3">9. Changes to Terms</h2>
              <p>We may update these Terms of Service from time to time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#505050] mt-6 mb-3">10. Contact</h2>
              <p>If you have questions about these Terms, please contact us through the app's support channels.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}