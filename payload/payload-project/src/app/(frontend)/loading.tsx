import { SkeletonCard } from '@/components/SkeletonCard'

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Search လုပ်နေစဉ် အရိပ် ၆ ခု ပြထားမယ် */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  )
}
