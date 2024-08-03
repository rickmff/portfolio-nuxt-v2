import { defineNuxtPlugin } from '#app';
import gsap from 'gsap';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(gsap);
  return {
    provide: {
      gsap
    }
  }
});