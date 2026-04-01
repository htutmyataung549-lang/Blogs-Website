'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import Link from 'next/link'
import { handleLogin } from '../../actions/auth'

export default function SignInPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  async function onSignIn(formData: FormData) {
    setLoading(true)
    setMessage('')
    const result = await handleLogin(formData)
    setLoading(false)

    if (result.success) {
      setMessage('Signup successful! Redirecting to login...')

      router.refresh()
      setTimeout(() => {
        router.push('/')
      }, 200)
      // window.location.href = '/'
    } else {
      setMessage('Signup failed: ' + result.error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-500">Sign in to your account to continue</p>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 border-l-4 rounded-r-lg text-sm font-medium ${
              message.includes('successful')
                ? 'bg-green-50 border-green-500 text-green-700'
                : 'bg-red-50 border-red-500 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        <form action={onSignIn} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm">
          Don't have an account?{' '}
          <Link href="/signup" className="text-indigo-600 font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
