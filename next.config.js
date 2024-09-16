const runtimeCaching = require("next-pwa/cache");
const withPWA = require('next-pwa')({
  disable: process.env.NODE_ENV === "development",
  dest: "public",
  buildExcludes: [/middleware-manifest.json$/],
  runtimeCaching,
})


module.exports = withPWA({
  // swcMinify: true,
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    domains: ['www.instagram.com', 'ik.imagekit.io', 'images.unsplash.com'],
  },
  env: {
    RAZORPAY_SECRET: process.env.NODE_ENV === "development" ? process.env.RAZORPAY_SECRET_DEV : process.env.RAZORPAY_SECRET,
    TAWK_PUBLIC_ID: process.env.TAWK_PUBLIC_ID,
    TAWK_WIDGET_ID: process.env.TAWK_WIDGET_ID,
    NEXT_PUBLIC_REST_API_ENDPOINT: process.env.NODE_ENV === "development" ? process.env.DEV_ENDPOINT : process.env.NEXT_PUBLIC_REST_API_ENDPOINT
  }
});
