
<template>
  <div class="bg-black flex flex-col items-center justify-center h-screen">
    <div class="text-white text-lg font-bold mb-4">{{ countdown }}</div>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed, onMounted, watchEffect } from 'vue'

const cooldownTime = ref<number>(0)
const countdown = computed(() => {
  return `${cooldownTime.value}%`
})

definePageMeta({
  layout: false,
});
onMounted(() => {
  const intervalId = setInterval(() => {
    cooldownTime.value = cooldownTime.value !== 100 ? cooldownTime.value + 1 : 100
    if (cooldownTime.value === 100) {
      setInterval(() => {
      navigateTo('/work')
      }, 1500)
    }
  }, 30)

  // Clean up interval when component is unmounted
  watchEffect(onInvalidate => {
    onInvalidate(() => clearInterval(intervalId))
  })
})
</script>
