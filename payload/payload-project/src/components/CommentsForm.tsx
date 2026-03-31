'use client'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'

export default function CommentsForm({ postId }: { postId?: number }) {
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // src/components/CommentsForm.tsx ထဲက handleSubmit အပိုင်း
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post: postId, // 'postId' မဟုတ်ဘဲ 'post' လို့ ပို့ပါ
          userName: name, // 'userName' ဖြစ်ရပါမယ်
          content: comment, // 'content' ဖြစ်ရပါမယ်
        }),
      })

      if (res.ok) {
        setName('')
        setComment('')
        window.location.reload()
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
      <form onSubmit={handleSubmit} className="mt-10 p-6 bg-slate-50 rounded-2xl">
        <h3 className="text-lg font-bold mb-4">Leave a Reply</h3>
        <input
          className="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
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
