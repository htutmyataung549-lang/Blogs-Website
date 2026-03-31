// import React from 'react'

// // 'export' ဆိုတဲ့ စာသား ပါဖို့ အရေးကြီးပါတယ်
// export const RichText: React.FC<{ content: any }> = ({ content }) => {
//   if (!content) return null

//   return (
//     <div className="prose prose-lg max-w-none">
//       {content.root?.children?.map((node: any, index: number) => {
//         if (node.type === 'paragraph') {
//           return <p key={index} className="mb-4">{node.children[0]?.text}</p>
//         }
//         if (node.type === 'heading') {
//           const Tag = node.tag as any
//           return <Tag key={index} className="font-bold mt-6 mb-2">{node.children[0]?.text}</Tag>
//         }
//         return null
//       })}
//     </div>
//   )
// }