import { CollectionConfig } from 'payload'

export const Comments: CollectionConfig = {
  slug: 'comment',
  access: {
    read: () => true, // read all comments
    create: () => true, // allow anyone to create a comment
    // update: () => false, // no one can update comments
    // delete: () => false, // no one can delete comments
  },
  fields: [
    {
      name: 'post',
      type: 'relationship', // ဘယ် Post မှာ ကွန်မန့်ပေးတာလဲဆိုတာ ချိတ်ဆက်တာပါ
      relationTo: 'posts',
      required: true,
    },
    {
      name: 'userName', // ဘယ်သူက ကွန်မန့်ပေးတာလဲဆိုတာ ချိတ်ဆက်တာပါ
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
  ],
}
