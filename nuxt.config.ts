// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false, // CSR mode
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      recaptchaSiteKey: "6LfTVC8rAAAAAISI8s59lF0JcXMq_XfgsHsepO5U",
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      title: "Play55 Chat",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Chat em tempo real com autenticação do Google",
        },
      ],
    },
  },
});
