import { defineNuxtPlugin } from '#app'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Mousewheel } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Swiper', Swiper)
  nuxtApp.vueApp.component('SwiperSlide', SwiperSlide)
})