// components/PostCard.tsx
import Link from 'next/link'

interface Post {
  slug: string
  title: string
  content: string
  createdAt: string | Date
  author?: {
    name?: string
  }
  commentCount?: number
}

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex flex-col h-full bg-white rounded-3xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] border border-slate-100 overflow-hidden"
    >
      <div className="flex flex-col flex-1 p-8">
        {/* Meta Info */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
            Article
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span className="text-xs text-slate-400 font-medium">
            {new Date(post.createdAt).toLocaleDateString('en-GB')}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900 leading-snug mb-4 group-hover:text-indigo-600 transition-colors duration-300">
          {post.title}
        </h2>

        {/* Content Excerpt */}
        <p className="text-slate-500 text-[15px] leading-relaxed line-clamp-3 mb-8">
          {post.content.substring(0, 150) + '...'}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-200">
              {post.author?.name?.charAt(0) || 'A'}
            </div>
            <span className="text-sm font-semibold text-slate-700">
              {post.author?.name || 'Admin'}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 text-slate-400 group-hover:text-indigo-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <span className="text-xs font-bold">{post.commentCount || 0}</span>
          </div>

          <div className="flex items-center text-xs font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
            READ
            <span className="ml-1 opacity-0 group-hover:opacity-100 group-hover:ml-2 transition-all">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
