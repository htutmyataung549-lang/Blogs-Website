'use client'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface User {
  id: string | number
  name?: string
  email: string
}

interface CommentsFormProps {
  postId?: number
  user: User | null
}

export default function CommentsForm({ postId, user }: CommentsFormProps) {
  const [name, setName] = useState(user ? user.name || 'Anonymous' : '')
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (user?.name) {
      setName(user.name || 'Anonymous')
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      alert('Name is required')
      return
    }
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post: postId,
          userName: name,
          content: comment,
        }),
      })

      if (res.ok) {
        if (!user) setName('')
        setComment('')
        setIsSubmitting(false)
        // window.location.reload()
        router.refresh()
      } else {
        const errorData = await res.json()
        console.log('Full Payload Error:', JSON.stringify(errorData, null, 2))
        setIsSubmitting(false)
      }
    } catch (err) {
      console.error('Network error:', err)
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-2 p-4 bg-slate-50 rounded-2xl">
        <h3 className="text-lg font-bold mb-4">Leave a Reply</h3>
        <input
          className="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={!!user} // Disable name input if user is logged in
        />
        <textarea
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          rows={3}
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button
          disabled={isSubmitting}
          className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-slate-400"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Posting...</span>
            </>
          ) : (
            'Post Comment'
          )}
        </button>
      </form>
    </div>
  )
}
