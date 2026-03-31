import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true, // လူတိုင်း ပုံကို မြင်ရအောင် ပွင့်ပေးလိုက်တာပါ
  },
  //
  upload: {
    staticDir: 'media', // ပုံတွေကို project ထဲက 'media' ဆိုတဲ့ folder ထဲမှာ သိမ်းမယ်
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'], // ပုံသဏ္ဌာန်မျိုးစုံ လက်ခံမယ်
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true, // ပုံရဲ့ ဖော်ပြချက် (SEO အတွက် အရေးကြီးပါတယ်)
    },
  ],
}