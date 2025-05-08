import { defineNuxtPlugin } from "#app";
import { VueReCaptcha } from "vue-recaptcha-v3";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const siteKey = config.public.recaptchaSiteKey;

  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey,
    loaderOptions: {
      useRecaptchaNet: true,
      autoHideBadge: false,
    },
  });
});
