import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import NextImage from 'next/image'
// import { RichText } from '@/components/RichText'
import Link from 'next/link'
import CommentsForm from '@/components/CommentsForm'
import { headers } from 'next/dist/server/request/headers'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const headerLists = await headers()
  const { user } = await payload.auth({
    headers: headerLists,
  })

  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
  })
  const post = result.docs[0]
  // console.log(post);

  if (!post) return notFound()

  // ---  Reading Time Logic ---
  const wordsPerMinute = 200
  const noOfWords = (typeof post.content === 'string' ? post.content : '').split(/\s/g).length || 0
  const minutes = Math.ceil(noOfWords / wordsPerMinute)
  const readTime = `${minutes} min read`

  const commentResult = await payload.find({
    collection: 'comment',
    where: { post: { equals: post.id } },
    sort: '-createdAt',
  })

  return (
    <article className="max-w-4xl mx-auto py-6 px-6">
      <h1 className="text-5xl font-black text-slate-900 mb-8">{post.title}</h1>

      {/* Read Time & Meta Info */}
      <div className="flex items-center gap-4 text-sm text-indigo-600 mb-8">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {readTime}
        </span>
        <span>•</span>
   
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <Link
        href={'/'}
        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-8 group"
      >
        <svg
          className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Posts
      </Link>

      {/* Featured Image */}
      {post.featuredImage && typeof post.featuredImage === 'object' && (
        <div className="relative h-100 w-full mb-10 overflow-hidden rounded-3xl shadow-xl">
          <NextImage
            // featuredImage က အမြဲတမ်း URL မဟုတ်နိုင်တဲ့အတွက် '?' သုံးရပါမယ်
            src={post.featuredImage?.url || '/fallback-image.jpg'} // URL မရှိရင် fallback ပုံတစ်ခု ပြခိုင်းတာပါ
            alt={post.featuredImage?.alt || post.title} // alt မှာလည်း '?' သုံးပါ
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />{' '}
        </div>
      )}
      {/*for richText  */}
      {/* <RichText content={post.content} /> */}
      <div className="prose prose-lg text-slate-700 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>

      <div className="flex justify-between items-center mt-4 border-t pt-2">
        {/* Changed <p> to <div> to better handle the flex layout */}
        <div className="flex justify-between w-full text-sm font-semibold text-slate-700 mt-4">
          <span>
            Author: {typeof post.author === 'object' ? post.author?.name : 'Administrator'}
          </span>
          <span>
            Email: {typeof post.author === 'object' ? post.author?.email : 'admin@example.com'}
          </span>
        </div>
      </div>

      {/* comment section */}
      <div className="mt-4 border-t pt-4">
        <h2 className="text-sm font-bold text-slate-900 ">
          Comments ({commentResult.totalDocs})
        </h2>
        {commentResult.docs.length === 0 && (
          <p className="text-slate-500 mb-8">No comments yet. Be the first to comment!</p>
        )}

        {/* Comment Form Component */}
        <CommentsForm postId={post.id} user={user} />

        {/* Comments List */}
        <div className="space-y-8">
          {commentResult.docs.map((comment: any) => {
            return (
              <div key={comment.id} className="bg-slate-100 p-4 rounded-2xl">
                <p className="text-sm text-slate-500 font-bold">
                  By {comment.userName || 'Anonymous'} on{' '}
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                <p className="text-slate-700 mt-4">{comment.content}</p>
              </div>
            )
          })}
        </div>
      </div>
    </article>
  )
}
