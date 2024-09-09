export default defineNuxtConfig({
  devServer: {
    port: 8000
  },
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  plugins: [
    { src: '~/plugins/swiper.client.ts', mode: 'client' },
    '~/plugins/directives.ts'
  ],

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

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@nuxtjs/tailwindcss"]
})