'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

export default async function createPost(
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  const payload = await getPayload({ config })

  const title = (formData.get('title') as string) || ''
  const content = (formData.get('content') as string) || ''
  const categoryRaw = formData.get('category') as string | null
  const imageFile = formData.get('featuredImage') as File | null

  const { user } = await payload.auth({
    headers: await headers(),
  })

  if (!user) {
    return { success: false, error: 'You must be logged in to create a post.' }
  }

  try {
    let featuredImageId = null

    // Image Upload
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const media = await payload.create({
        collection: 'media',
        data: {
          alt: title || 'post-image',
        },
        file: {
          data: buffer,
          name: imageFile.name,
          mimetype: imageFile.type || 'image/jpeg',
          size: imageFile.size,
        },
      })
      featuredImageId = media.id
    }
    const finalCategory =
      categoryRaw && categoryRaw.trim() !== '' && categoryRaw !== 'Select a category'
        ? Number(categoryRaw)
        : null

    await payload.create({
      collection: 'posts',
      data: {
        title,
        content,

        category: finalCategory,
        author: Number(user.id),
        slug:
          title
            .toLowerCase()
            .trim()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '') +
          '-' +
          Date.now(),
        featuredImage: featuredImageId ? Number(featuredImageId) : null,
      },
    })

    revalidatePath('/')
    return { success: true }
  } catch (error: any) {
    console.error('--- CREATE POST ERROR ---')
    if (error.data) {
      console.dir(error.data, { depth: null })
    } else {
      console.error(error)
    }
    return { success: false, error: 'Failed to create post.' }
  }
}
