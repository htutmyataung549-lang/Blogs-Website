'use server'

import { getPayload, User } from 'payload'
import config from '@payload-config'
import { cookies, headers } from 'next/headers'

interface LoginResult {
  user: User
  token: string
  exp?: number
}
// 1 Signup Action
export async function handleSignUp(formdata: FormData) {
  const payload = await getPayload({ config })

  const name = formdata.get('name') as string
  const email = formdata.get('email') as string
  const password = formdata.get('password') as string

  try {
    await payload.create({
      collection: 'users',
      data: {
        name,
        email,
        password,
      },
    })
    const resultLogin = (await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
    })) as unknown as LoginResult
    if (resultLogin.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', resultLogin.token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 2, // 2 days
      })
    }
    return { success: true, data: resultLogin }
  } catch (error) {
    console.error('Signup Error:', error)
    return { success: false, error: (error as Error).message || 'Failed to sign up' }
  }
}

// 2 Login Action
export async function handleLogin(formData: FormData) {
  const payload = await getPayload({ config })
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const resultLogin = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },

      req: {
        headers: await headers(),
      },
    })

    if (resultLogin.token) {
      const cookieStore = await cookies()
      cookieStore.set('payload-token', resultLogin.token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 2,
      })
    }

    return { success: true, data: resultLogin }
  } catch (error) {
    console.error('Login Error:', error)
    return { success: false, error: 'Invalid email or password' }
  }
}

export async function handleLogout() {
  const cookieStore = await cookies()

  cookieStore.delete('payload-token')
}
