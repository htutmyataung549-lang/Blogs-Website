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
  searchParams: Promise<{ search?: string; page?: string; category?: string }>
}) {
  const payload = await getPayload({ config })

  const params = await searchParams
  const search = params.search || ''
  const categorySlug = params.category || ''
  const currentPage = params.page ? parseInt(params.page) : 1
  const limit = 6

  // console.log('Search', search)

  // --- Category & Search Filtering Logic ---
  // AND logic သုံးပြီး Search ရော Category ပါ တွဲစစ်နိုင်အောင် ရေးထားပါတယ်
  const whereQuery: Where = {
    and: [
      ...(search ? [{ title: { contains: search } }] : []),
      ...(categorySlug ? [{ 'category.slug': { equals: categorySlug } }] : []),
    ],
  }

  // Fetching Categories list
  const categories = await payload.find({
    collection: 'categories',
  })

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

  // return (
  //   <main className={` min-h-screen bg-[#FDFDFD] text-slate-800`}>
  //     <SearchInput /> {/* SearchInput component  */}
  //     {/* Hero Section */}
  //     <section className="relative overflow-hidden border-b border-slate-100 bg-white">
  //       <div className="absolute inset-0 bg-grid-slate-50 mask-[linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]" />
  //       <div className="relative max-w-5xl mx-auto px-6 text-center">
  //         <div className="inline-flex items-center space-x-2 px-3 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
  //           <span className="relative flex h-2 w-2">
  //             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
  //             <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
  //           </span>
  //           <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
  //             Explore the latest
  //           </span>
  //         </div>
  //         <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
  //           My{' '}
  //           <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-violet-600">
  //             Blog Posts
  //           </span>
  //         </h1>
  //         <p className="max-w-2xl mx-auto text-lg text-slate-500 leading-relaxed">
  //           A place for sharing technology and new experiences. Built with the power of Payload CMS
  //           and Next.js.
  //         </p>
  //       </div>
  //     </section>
  //     {/* Main Content (READ Operation) */}
  //     <div className="max-w-6xl mx-auto px-6 py-6">
  //       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
  //         {postsWithCounts.map((post: any) => (
  //           <PostCard key={post.id} post={post} />
  //         ))}
  //       </div>

  //       {/* Improved Empty State */}
  //       {posts.docs.length === 0 && <EmptyState />}

  //       {/* pagination */}
  //       <Pagination currentPage={posts.page || 1} totalPages={posts.totalPages} />
  //     </div>
  //     <footer className="py-10 text-center border-t border-slate-100">
  //       <p className="text-sm text-slate-400 font-medium">
  //         © 2026 Developed with ❤️ using Payload & Next.js
  //       </p>
  //     </footer>
  //   </main>
  // )
  return (
    <main className={` min-h-screen bg-[#FDFDFD] text-slate-800`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-white pt-6 pb-4">
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
          <p className="max-w-2xl mx-auto text-lg text-slate-500 leading-relaxed mb-10">
            A place for sharing technology and new experiences. Built with the power of Payload CMS
            and Next.js.
          </p>
          {/* Write a Post Button */}
          {/* Write a Post Button (Featured Look) */}
          {/* <Link
            href="/write"
            className="group relative inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all active:scale-95"
          >
            <div className="bg-indigo-500 rounded-full p-1 group-hover:rotate-12 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
            <span>Write a Post</span>
          </Link> */}

          {/* Vertical Separator Line (Optional) */}
          <div className="hidden sm:block h-8 w-px bg-slate-200 mx-2" />
          {/* --- Category Chips UI --- */}
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            <Link
              href="/"
              className={`px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                !categorySlug
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-400 hover:text-indigo-600'
              }`}
            >
              All Articles
            </Link>
            {categories.docs.map((catagory: any) => (
              <Link
                key={catagory.id}
                href={`/?category=${catagory.slug}${search ? `&search=${search}` : ''}`}
                className={`px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                  categorySlug === catagory.slug
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-400 hover:text-indigo-600'
                }`}
              >
                {catagory.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Search & Category Info */}
        {(search || categorySlug) && (
          <div className="mb-8 text-center text-sm text-slate-400">
            Found {posts.totalDocs} results{' '}
            {categorySlug && (
              <>
                in <span className="text-indigo-600 font-bold">#{categorySlug}</span>
              </>
            )}
            {/* {search && (
              <>
                {' '}
                for &quot;<span className="text-slate-700 font-semibold">{search}</span>&quot;
              </>
            )} */}
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {postsWithCounts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Improved Empty State */}
        {posts.docs.length === 0 && <EmptyState />}

        {/* pagination */}
        <div className="mt-12">
          <Pagination currentPage={posts.page || 1} totalPages={posts.totalPages} />
        </div>
      </div>
      <footer className="py-2 text-center border-t border-slate-100">
        <p className="text-sm text-slate-400 font-medium">
          © 2026 Developed with ❤️ using Payload & Next.js
        </p>
      </footer>
    </main>
  )
}
