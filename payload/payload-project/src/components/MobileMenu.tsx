'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, PencilLine, LogOut, User as UserIcon } from 'lucide-react'
import LogoutButton from './LogOutButton'

export default function MobileMenu({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button onClick={() => setIsOpen(true)} className="p-2 text-slate-600">
        <Menu size={28} />
      </button>

      {/* Overlay & Menu Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-100 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative ml-auto w-72 h-full bg-white shadow-2xl p-6 flex flex-col">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>

            <div className="mt-10 flex flex-col gap-8 bg-black p-4 rounded-lg">
              {user ? (
                <>
                  <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="font-bold text-white">{user.name}</p>
                    </div>
                  </div>

                  <nav className="flex flex-col gap-5">
                    <Link
                      href="/write"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 font-bold  text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      <PencilLine size={20} /> Write Post
                    </Link>
                    <div className="pt-4 border-t border-slate-50">
                      <LogoutButton />
                    </div>
                  </nav>
                </>
              ) : (
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3 text-center font-bold text-slate-700 bg-slate-50 rounded-xl"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-3 text-center font-bold text-white bg-indigo-600 rounded-xl shadow-lg shadow-indigo-100"
                  >
                    Sign Up
                  </Link>
                </nav>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
