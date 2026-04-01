'use client'

import { handleLogout } from '@/app/actions/auth'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const onLogout = async () => {
    await handleLogout()

    router.push('/login')

    router.refresh()
  }

  return (
    <button
      onClick={onLogout}
      className="text-sm font-bold text-red-600 hover:bg-red-50 px-4 py-2 rounded-full transition-all"
    >
      Logout
    </button>
  )
}
