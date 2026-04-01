// src/collections/Categories.ts
import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: () => true, // Everyone can read categories
  },
  admin: {
    useAsTitle: 'title', // Admin panel မှာ category နာမည်ကို title အနေနဲ့ ပြမယ်
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data?.title) {
              return data.title
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '')
            }
            return data?.slug
          },
        ],
      },
    },
  ],
}
