// components/Pagination.tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

export default function Pagination({ totalPages, currentPage }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `?${params.toString()}`
  }

  // ပြသပေးမည့် Page နံပါတ်များကို တွက်ချက်ခြင်း (ဥပမာ - လက်ရှိ Page ရဲ့ ဘေးတစ်ဖက်စီ)
  const getPageNumbers = () => {
    const pages = []
    const showMax = 5 // တစ်ခါပြရင် အများဆုံး ခလုတ် ၅ ခုပြမယ်

    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, startPage + showMax - 1)

    if (endPage - startPage < showMax - 1) {
      startPage = Math.max(1, endPage - showMax + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex flex-col items-center space-y-4 py-16">
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          disabled={currentPage <= 1}
          onClick={() => router.push(createPageURL(currentPage - 1))}
          className="p-2 bg-white border border-slate-200 rounded-xl disabled:opacity-30 hover:bg-slate-50 transition-all"
        >
          <svg
            className="w-5 h-5 text-slate-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => router.push(createPageURL(page))}
              className={`min-w- h-8 px-2 rounded-xl font-bold text-sm transition-all ${
                currentPage === page
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-400 hover:text-indigo-600'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          disabled={currentPage >= totalPages}
          onClick={() => router.push(createPageURL(currentPage + 1))}
          className="p-2 bg-white border border-slate-200 rounded-xl disabled:opacity-30 hover:bg-slate-50 transition-all"
        >
          <svg
            className="w-5 h-5 text-slate-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Info Text */}
      <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  )
}
