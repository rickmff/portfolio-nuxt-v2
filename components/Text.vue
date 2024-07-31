<template>
  <component :is="props.tag" ref="textRef"
    :class="{ 'font-hero text-7xl': tag === 'h1', 'font-hero font-bold text-6xl xl:text-8xl': tag === 'h2', 'text-3xl xl:text-4xl': tag === 'p' }">
    <span v-for="(char, index) in charArray" :key="index" class="char">
      {{ char === ' ' ? '\u00A0' : char }}
    </span>
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { useNuxtApp } from '#app'

const props = defineProps<{
  text?: string,
  tag: string
}>()

const textRef = ref<HTMLElement | null>(null)
const charArray = ref<string[]>([])

const { $gsap: gsap } = useNuxtApp()

const splitTextIntoChars = () => {
  // Split text into individual characters, including spaces
  charArray.value = props.text !== undefined ? props.text.split('') : []
}

const animateChars = () => {
  if (textRef.value) {
    nextTick(() => {
      const chars = textRef.value?.querySelectorAll('.char')
      chars?.forEach((char, index) => {
        gsap.fromTo(char,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: index * 0.05 }
        )
      })
    })
  }
}

onMounted(() => {
  splitTextIntoChars()
  animateChars()
})

watch(() => props.text, () => {
  splitTextIntoChars()
  animateChars()
})
</script>

<style scoped>
.char {
  display: inline-block;
}
</style>
