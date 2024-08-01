<template>
  <!--   <CustomCursor />
 -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
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
onMounted( ()=> {
  document.onkeydown = checkKey;
})
const router = useRoute()
function checkKey(e: KeyboardEvent | undefined) {
  e = e || (window.event as KeyboardEvent);

  if (e.keyCode === 37) {
    // left arrow
    if (router.name === 'about') {
      navigateTo('work')
    }
    if (router.name === 'contact') {
      navigateTo('about')
    }

  } else if (e.keyCode === 39) {
    // right arrow
    if (router.name === 'about') {
      navigateTo('contact')
    }
    if (router.name === 'work') {
      navigateTo('about')
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}

body::-webkit-scrollbar {
  display: none;
}

body {
  overflow-x: hidden;
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
