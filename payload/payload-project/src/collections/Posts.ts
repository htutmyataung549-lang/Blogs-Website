import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts', //for api eg. api/posts
  admin: {
    useAsTitle: 'title',
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
      unique: true, // တစ်ခုနဲ့တစ်ခု မတူရဘူးလို့ သတ်မှတ်တာပါ
      index: true, // Query လုပ်ရတာ မြန်အောင် index လုပ်ထားပါ
      admin: {
        position: 'sidebar', // Admin panel ရဲ့ ညာဘက်ဘေးမှာ ပေါ်နေမှာပါ
      },
      // Title ကနေ slug ကို auto ပြောင်းပေးမည့် logic
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
    {
      name: 'content',
      type: 'textarea',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
