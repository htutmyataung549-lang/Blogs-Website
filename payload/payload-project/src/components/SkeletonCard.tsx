import React from 'react'

export const SkeletonCard = () => {
  return (
    <div className="flex flex-col h-full bg-white rounded-3xl border border-slate-100 overflow-hidden p-8 animate-pulse">
      {/* Top Meta Info */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-4 w-12 bg-slate-200 rounded"></div>
        <div className="w-1 h-1 rounded-full bg-slate-200"></div>
        <div className="h-4 w-20 bg-slate-100 rounded"></div>
      </div>

      {/* Title Placeholder */}
      <div className="h-7 bg-slate-200 rounded-lg w-full mb-3"></div>
      <div className="h-7 bg-slate-200 rounded-lg w-2/3 mb-6"></div>

      {/* Content Placeholder */}
      <div className="space-y-3 mb-8">
        <div className="h-4 bg-slate-100 rounded w-full"></div>
        <div className="h-4 bg-slate-100 rounded w-full"></div>
        <div className="h-4 bg-slate-100 rounded w-4/5"></div>
      </div>

      {/* Footer Placeholder */}
      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-slate-200"></div>
          <div className="h-4 w-16 bg-slate-200 rounded"></div>
        </div>
        <div className="h-4 w-12 bg-slate-100 rounded"></div>
      </div>
    </div>
  )
}
