export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],

  runtimeConfig: {
    private: {
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    },
  },
  hooks: {
    'pages:extend': (pages) => {
      pages.push({
        path: '/',
        redirect: '/work',
      });
    }
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
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