import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import NextImage from 'next/image'
// import { RichText } from '@/components/RichText'
import Link from 'next/link'
import CommentsForm from '@/components/CommentsForm'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

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
  // console.log(post)
  // find က array ပြန်ပေးလို့ ပထမဆုံးတစ်ခုကို ယူပါတယ်

  if (!post) return notFound()

  const commentResult = await payload.find({
    collection: 'comment',
    where: { post: { equals: post.id } },
    sort: '-createdAt',
  })

  return (
    <article className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-5xl font-black text-slate-900 mb-8">{post.title}</h1>
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
        <div className="relative h-96 w-full mb-10 overflow-hidden rounded-3xl shadow-xl">
          <NextImage
            // featuredImage က အမြဲတမ်း URL မဟုတ်နိုင်တဲ့အတွက် '?' သုံးရပါမယ်
            src={post.featuredImage?.url || '/fallback-image.jpg'} // URL မရှိရင် fallback ပုံတစ်ခု ပြခိုင်းတာပါ
            alt={post.featuredImage?.alt || post.title}
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
      <div className="flex justify-between items-center mt-8 border-t pt-4">
        {/* Changed <p> to <div> to better handle the flex layout */}
        <div className="flex justify-between w-full text-sm font-semibold text-slate-700 mt-6">
          <span>
            {/* post.author က object ဖြစ်နေရင် အဲဒီထဲက name ကိုပဲ ယူပြပါမယ် */}
            Author:{' '}
            {post.author && typeof post.author === 'object'
              ? (post.author as any).name
              : 'Administrator'}
          </span>
          <span>
            {/* email ကိုလည်း ထိုနည်းအတိုင်းပဲ object ထဲကနေ ဆွဲထုတ်ပါမယ် */}
            Email:{' '}
            {post.author && typeof post.author === 'object'
              ? (post.author as any).email
              : 'admin@example.com'}
          </span>
        </div>
      </div>

      {/* comment section */}
      <div className="mt-10 border-t pt-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Comments ({commentResult.totalDocs})
        </h2>
        {/* {commentResult.docs.length === 0 && (
          <p className="text-slate-500 mb-8">No comments yet. Be the first to comment!</p>
        )} */}
        {/*No Comment */}
        {commentResult.totalDocs === 0 ? (
          <div className="bg-slate-50 p-10 rounded-2xl text-center mb-8">
            <p className="text-slate-500 font-medium">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          /* Comment Lists */
          <div className="space-y-8 mb-10">
            {commentResult.docs.map((c: any) => (
              <div className="bg-slate-50 p-6 rounded-2xl" key={c.id}>
                <div className="flex justify-between items-center mb-3">
                  <p className="font-bold text-indigo-600"> {c.userName} </p>
                  <span className="text-xs text-slate-400">
                    {new Date(c.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      minute: '2-digit',
                      second: '2-digit',
                      // hour12: true, // AM/PM နဲ့ ပြချင်ရင် true ထားပါ၊ ၂၄ နာရီစနစ်ဆိုရင် false ထားပါ
                    })}
                  </span>
                </div>
                <p className="text-slate-700 whitespace-pre-wrap">{c.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Comment Form */}
        <CommentsForm postId={post.id} />
      </div>
    </article>
  )
}
