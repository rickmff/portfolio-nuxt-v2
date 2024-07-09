<template>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();

useSeoMeta({
  title: () => `${route.path === '/' ? 'Home' : route.path.replace('/', '').charAt(0).toUpperCase() + route.path.replace('/', '').slice(1)}`,
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>

