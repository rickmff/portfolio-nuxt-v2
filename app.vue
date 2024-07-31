<template>
  <CustomCursor />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import {onMounted} from "vue"
const route = useRoute();

useSeoMeta({
  title: () =>
    `${route.path === "/"
      ? "Home"
      : route.path.replace("/", "").charAt(0).toUpperCase() +
      route.path.replace("/", "").slice(1)
    }`,
  ogTitle: "My Amazing Site",
  description: "This is my amazing site, let me tell you all about it.",
  ogDescription: "This is my amazing site, let me tell you all about it.",
  ogImage: "https://example.com/image.png",
  twitterCard: "summary_large_image",
});
</script>

<style>
html {
  scroll-behavior: smooth;
}

body::-webkit-scrollbar {
  display: none;
}

body {
  overscroll-behavior-y: none;

  -ms-overflow-style: none;
  /* IE and Edge */
  user-select: none;
  /* Standard syntax */
  -webkit-user-select: none;
  -webkit-text-size-adjust: none;
  -webkit-font-smoothing: antialiased;
  /* Safari */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
}
</style>
