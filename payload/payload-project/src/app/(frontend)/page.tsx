export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getPayload, Where } from 'payload'
import config from '@payload-config'
import Link from 'next/link' // Link component ထည့်သွင်းပါ
import SearchInput from '@/components/SearchInput'
import PostCard from '@/components/PostCard'
import EmptyState from '@/components/EmptyState'
import Pagination from '@/components/Pagination'

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>
}) {
  const payload = await getPayload({ config })

  const params = await searchParams
  const search = params.search || ''

  const currentPage = params.page ? parseInt(params.page) : 1
  const limit = 6

  // console.log('Search', search)

  // If there's a search query, fetch posts that match the search term
  const whereQuery: Where = search
    ? {
        title: {
          contains: search,
        },
      }
    : {}

  // READ: Fetching all posts
  const posts = await payload.find({
    collection: 'posts',
    where: whereQuery,
    depth: 1,
    limit: limit,
    page: currentPage,
  })

  const postsWithCounts = await Promise.all(
    posts.docs.map(async (post: any) => {
      const comments = await payload.find({
        collection: 'comment', // သင့် collection slug 'comment' ဖြစ်ရပါမယ်
        where: {
          post: { equals: post.id },
        },
        limit: 0, // content တွေ မလိုဘူး၊ count ပဲ လိုချင်လို့
      })
      return {
        ...post,
        commentCount: comments.totalDocs,
      }
    }),
  )

  return (
    <main className={` min-h-screen bg-[#FDFDFD] text-slate-800`}>
      <SearchInput /> {/* SearchInput component  */}
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-white">
        <div className="absolute inset-0 bg-grid-slate-50 mask-[linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]" />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center space-x-2 px-3 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Explore the latest
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            My{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-violet-600">
              Blog Posts
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-500 leading-relaxed">
            A place for sharing technology and new experiences. Built with the power of Payload CMS
            and Next.js.
          </p>
        </div>
      </section>
      {/* Main Content (READ Operation) */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {postsWithCounts.map((post: any) => (
            // <Link
            //   href={`/posts/${post.slug}`} // Single Post link
            //   key={post.id}
            //   className="group flex flex-col h-full bg-white rounded-3xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] border border-slate-100 overflow-hidden"
            // >
            //   {/* Card Body */}
            //   <div className="flex flex-col flex-1 p-8">
            //     <div className="flex items-center space-x-3 mb-4">
            //       <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
            //         Article
            //       </span>
            //       <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            //       <span className="text-xs text-slate-400 font-medium">
            //         {new Date(post.createdAt).toLocaleDateString('en-GB')}
            //       </span>
            //     </div>

            //     <h2 className="text-2xl font-bold text-slate-900 leading-snug mb-4 group-hover:text-indigo-600 transition-colors duration-300">
            //       {post.title}
            //     </h2>

            //     {/* <p className="text-slate-500 text-[15px] leading-relaxed line-clamp-3 mb-8">
            //       {post.excerpt ||
            //         'Read the brief summary of this post and explore interesting details within the article.'}
            //     </p> */}

            //     <p className="text-slate-500 text-[15px] leading-relaxed line-clamp-3 mb-8">
            //       {post.content.substring(0, 150) + '...'}{' '}
            //     </p>

            //     {/* Footer of Card */}
            //     <div className="mt-auto flex items-center justify-between">
            //       <div className="flex items-center space-x-3">
            //         <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-200">
            //           {post.author?.name?.charAt(0) || 'A'}
            //         </div>
            //         <span className="text-sm font-semibold text-slate-700">
            //           {post.author?.name || 'Admin'}
            //         </span>
            //       </div>

            //       <div className="flex items-center space-x-1.5 text-slate-400 group-hover:text-indigo-400 transition-colors">
            //         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            //           <path
            //             strokeLinecap="round"
            //             strokeLinejoin="round"
            //             strokeWidth="2"
            //             d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            //           />
            //         </svg>
            //         <span className="text-xs font-bold">{post.commentCount || 0}</span>
            //       </div>

            //       {/* read button */}
            //       <div className="flex items-center text-xs font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
            //         READ{' '}
            //         <span className="ml-1 opacity-0 group-hover:opacity-100 group-hover:ml-2 transition-all">
            //           →
            //         </span>
            //       </div>
            //     </div>
            //   </div>
            // </Link>
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Improved Empty State */}
        {posts.docs.length === 0 && <EmptyState />}

        {/* pagination */}
        <Pagination currentPage={posts.page || 1} totalPages={posts.totalPages} />
        {/* {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )} */}
      </div>
      <footer className="py-10 text-center border-t border-slate-100">
        <p className="text-sm text-slate-400 font-medium">
          © 2026 Developed with ❤️ using Payload & Next.js
        </p>
      </footer>
    </main>
  )
}
