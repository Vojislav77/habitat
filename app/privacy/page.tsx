import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import HabitatLogo from '../components/HabitatLogo'

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold text-[#505050] mb-2">Privacy Policy</h1>
          <p className="text-sm text-slate-500 mb-8">Last updated: August 2, 2026</p>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
            <section>
              <h2 className="text-xl font-bold text-[#505050] mt-6 mb-3">1. Introduction</h2>
              <p>Welcome to Habitat. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our habit tracking application.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#505050] mt-6 mb-3">2. Information We Collect</h2>
              <p>We collect the following information when you use Habitat:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Account Information:</strong> Your name, email address, and password (stored securely as a hashed value).</li>
                <li><strong>Habit Data:</strong> The habits you create, including titles, icons, colors, and completion logs.</li>
                <li><strong>Usage Data:</strong> Basic information about how you use the app, such as login times and feature usage.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#505050] mt-6 mb-3">3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Provide and maintain the habit tracking service</li>
                <li>Display your personal statistics and progress</li>
                <li>Send you important account-related notifications</li>
                <li>Process payments (if you upgrade to Pro)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#505050] mt-6 mb-3">4. Data Storage & Security</h2>
              <p>Your data is stored securely using industry-standard encryption. Passwords are never stored in plain text. We use trusted providers for database hosting and payment processing.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#505050] mt-6 mb-3">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Access your personal data at any time through the Settings page</li>
                <li>Export all your data as a CSV file</li>
                <li>Delete your account and all associated data</li>
                <li>Request information about how your data is used</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#505050] mt-6 mb-3">6. Third-Party Services</h2>
              <p>We use the following third-party services:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Stripe:</strong> For processing payments (Pro subscriptions)</li>
                <li><strong>Vercel:</strong> For hosting the application</li>
                <li><strong>Neon:</strong> For database hosting</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#505050] mt-6 mb-3">7. Contact</h2>
              <p>If you have any questions about this Privacy Policy, please contact us through the app's support channels.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}