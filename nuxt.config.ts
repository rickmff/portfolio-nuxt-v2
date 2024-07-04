export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],

  runtimeConfig: {
    private: {
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    },
  },

  ssr: false,

  postcss: {
      plugins: {
          tailwindcss: {},
          autoprefixer: {},
      },
  },

  modules: ["@nuxtjs/tailwindcss"]
})