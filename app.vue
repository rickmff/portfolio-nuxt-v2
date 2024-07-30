<template>
  <CustomCursor />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();

useSeoMeta({
  title: () =>
    `${
      route.path === "/"
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
body::-webkit-scrollbar {
  display: none;
}
body {
  -ms-overflow-style: none; /* IE and Edge */
  user-select: none; /* Standard syntax */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
}
</style>
