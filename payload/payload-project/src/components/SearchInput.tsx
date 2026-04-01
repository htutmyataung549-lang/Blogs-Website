'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

export default function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [text, setText] = useState(searchParams.get('search') || '')
  const [isPending, setIsPending] = useTransition()

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (text) {
        router.push(`/?search=${encodeURIComponent(text)}`)
      } else {
        router.push(`/`)
      }
      router.refresh()
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [text, router])

  return (
    <div className="relative max-w-2xl mx-auto px-6 mb-4 mt-6">
      <div className="relative group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Search articles..."
          className="w-full px-4 py-2 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
        />
        <div className="absolute right-5 top-2 text-slate-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      {isPending && (
        <p className="text-center text-xs text-indigo-500 mt-2 animate-pulse">
          Searching for results...
        </p>
      )}
    </div>
  )
}
