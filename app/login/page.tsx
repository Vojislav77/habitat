'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import { registerUser } from '../actions'

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        const formData = new FormData(e.currentTarget)

        if (!isLogin) {
            const res = await registerUser(formData)
            if (res?.error) {
                setError(res.error)
                return
            }
            setIsLogin(true)
            return
        }

        const res = await signIn('credentials', {
            email: formData.get('email'),
                                 password: formData.get('password'),
                                 redirect: false,
        })

        if (res?.error) {
            setError('Invalid email or password')
        } else {
            router.push('/')
            router.refresh()
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F4F7F7] p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#9BD7D5] p-8">
        <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-[#129793] rounded-xl flex items-center justify-center mb-4">
        <Check className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-[#505050]">Habitat</h1>
        <p className="text-slate-600 mt-1">
        {isLogin ? 'Welcome back! Please login.' : 'Create your account.'}
        </p>
        </div>

        {error && (
            <div className="bg-[#FF7260] text-red-700 p-3 rounded-lg text-sm mb-4 text-center">
            {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
            <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input name="name" type="text" required className="w-full px-4 py-2.5 border border-[#9BD7D5] rounded-lg focus:ring-2 focus:ring-[#129793] outline-none" />
            </div>
        )}

        <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
        <input name="email" type="email" required className="w-full px-4 py-2.5 border border-[#9BD7D5] rounded-lg focus:ring-2 focus:ring-[#129793] outline-none" />
        </div>

        <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
        <input name="password" type="password" required minLength={6} className="w-full px-4 py-2.5 border border-[#9BD7D5] rounded-lg focus:ring-2 focus:ring-[#129793] outline-none" />
        </div>

        <button type="submit" className="w-full bg-[#129793] hover:bg-[#9BD7D5] text-white font-medium py-2.5 rounded-lg transition-colors">
        {isLogin ? 'Sign In' : 'Create Account'}
        </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
        onClick={() => { setIsLogin(!isLogin); setError('') }}
        className="text-[#129793] font-medium hover:underline"
        >
        {isLogin ? 'Sign up' : 'Log in'}
        </button>
        </div>
        </div>
        </div>
    )
}
