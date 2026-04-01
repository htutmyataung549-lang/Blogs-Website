'use client'

import createPost from '@/app/actions/createPost'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CreatePostForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const [categories, setCategories] = useState<{ id: string; title: string }[]>([]) // Category state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories')
        const data = await res.json()
        console.log('Categories from API:', data.docs)
        setCategories(data.docs || [])
      } catch (error) {
        console.error('Fetch error:', error)
      }
    }
    fetchCategories()
  }, [])

  async function clientAction(formData: FormData) {
    setLoading(true)
    const result = await createPost(formData)
    setLoading(false)

    if (result.success) {
      setMessage('Post submitted successfully!')
      setTimeout(() => {
        router.push('/')
        router.refresh()
      }, 500)
      // Form ကို clear လုပ်ချင်ရင် လုပ်နိုင်ပါတယ်
    } else {
      setMessage('Error: ' + result.error)
    }
  }

  return (
    <form
      action={clientAction}
      className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-slate-100"
    >
      <h2 className="text-2xl font-bold mb-6 text-slate-800">Create New Post</h2>

      {message && (
        <div
          className={`p-4 mb-6 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}
        >
          {message}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Post Title</label>
          <input
            name="title"
            required
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Enter title..."
          />
        </div>

        {/* --- Category Selection Section  --- */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">Category</label>
          <select
            name="category"
            required
            className="w-full p-3 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>
        {/* --------------------------------------------------- */}

        <div>
          <label className="block text-sm font-semibold mb-2">Featured Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Content</label>
          <textarea
            name="content"
            required
            rows={6}
            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Write your story..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Submit Post'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="w-full py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors mt-2"
        >
          Back
        </button>
      </div>
    </form>
  )
}
