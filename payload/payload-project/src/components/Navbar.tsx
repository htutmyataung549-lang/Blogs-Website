import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'
import Link from 'next/link'
import LogoutButton from './LogOutButton'
import SearchInput from './SearchInput'
import MobileMenu from './MobileMenu'

export default async function Navbar() {
  const payload = await getPayload({ config })
  const headerList = await headers()
  const { user } = await payload.auth({
    headers: headerList,
  })

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-2 px-6 md:px-10">
        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
            <span className="text-white font-black text-xl italic">B</span>
          </div>
          <span className="text-2xl font-black bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-violet-600 tracking-tight">
            Blog
          </span>
        </Link>

        {/* Search Section */}
        <div className="hidden md:block w-1/3">
          <SearchInput />
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4 md:gap-6">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-slate-100">
                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold shadow-inner">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs text-slate-400 font-medium">Welcome back,</span>
                  <span className="text-sm font-bold text-slate-800 leading-tight">
                    {user.name}
                  </span>
                </div>
              </div>

              <Link
                href="/write"
                className="hidden sm:block text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Write Post
              </Link>

              <LogoutButton />
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-bold text-slate-600 hover:text-indigo-600 px-4 py-2 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-600 shadow-lg shadow-slate-200 hover:shadow-indigo-200 transition-all active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
        <MobileMenu user={user} />
      </div>
    </nav>
  )
}
