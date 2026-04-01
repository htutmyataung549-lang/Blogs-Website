// src/app/write/page.tsx
import CreatePostForm from '@/components/CreatePostForm'

export default function WritePage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">Create New Post</h1>
          <p className="text-slate-500 mt-2">Share your thoughts with the world.</p>
        </div>

        <CreatePostForm />
      </div>
    </main>
  )
}
