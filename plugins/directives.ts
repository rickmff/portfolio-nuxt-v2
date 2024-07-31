import { defineNuxtPlugin } from '#app';
import scrollOnHold from '@/directives/useCustomScroll';
import { gsap } from 'gsap'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('scroll-on-hold', scrollOnHold);
  nuxtApp.vueApp.use(gsap)
  return {
    provide: {
      gsap
    }
  }
});