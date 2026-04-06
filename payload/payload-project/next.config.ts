// import { withPayload } from '@payloadcms/next/withPayload'
// import type { NextConfig } from 'next'
// import path from 'path'
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const dirname = path.dirname(__filename)

// const nextConfig: NextConfig = {
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//         port: '3000',
//         pathname: '/**',
//       },
//     ],
//   },
//   // -------------------------
//   webpack: (webpackConfig) => {
//     webpackConfig.resolve.extensionAlias = {
//       '.cjs': ['.cts', '.cjs'],
//       '.js': ['.ts', '.tsx', '.js', '.jsx'],
//       '.mjs': ['.mts', '.mjs'],
//     }

//     return webpackConfig
//   },
//   turbopack: {
//     root: path.resolve(dirname),
//   },
// }satisfies any

import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // eslint key ကို ဒီနေရာကနေ ဖယ်ထုတ်လိုက်ပါ (Next.js 15+ မှာ error တက်တတ်လို့ပါ)
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.vercel.app', // Vercel domain အတွက်
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
  // Webpack config ကို လိုအပ်မှသာ ထားပါ၊ ပုံမှန်အားဖြင့် Payload 3.0 မှာ အလိုအလျောက် သိပါတယ်
}

export default withPayload(nextConfig)
