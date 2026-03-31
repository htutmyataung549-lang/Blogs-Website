import Link from 'next/link'
import React from 'react'

export default function EmptyState() {
  return (
    <div className="text-center py-32 bg-slate-50/50 rounded-[40px] border-2 border-dashed border-slate-200">
      <div className="mb-6 inline-block p-5 bg-white rounded-2xl shadow-sm">
        <svg
          className="w-12 h-12 text-indigo-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-2">No Posts Yet</h3>
      <p className="text-slate-500 mb-8 max-w-sm mx-auto">
        Start writing interesting topics from the Admin Panel.
      </p>
      <Link
        href="/admin"
        className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200"
      >
        Start Writing
      </Link>
    </div>
  )
}
