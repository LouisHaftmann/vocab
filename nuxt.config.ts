// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~~/assets/css/main.css'],
  app: {
    head: {
      title: '🚕',
      meta: [
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      ]
    },
  },
})
