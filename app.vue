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
  robots: "index, follow",
});

useSeoMeta({
  title: () =>
    `${
      route.path === "/"
        ? "Work"
        : route.path.replace("/", "").charAt(0).toUpperCase() +
          route.path.replace("/", "").slice(1)
    } | Rickmff Portfolio`,
  ogTitle: "Rickmff Portfolio",
  description: "This is Rickmff Portfolio.",
  ogDescription: "This is Rickmff Portfolio.",
  ogImage: "/Hero.png",
  twitterCard: "summary_large_image",
  twitterTitle: () =>
    `Rickmff Portfolio - ${
      route.path === "/"
        ? "Work"
        : route.path.replace("/", "").charAt(0).toUpperCase() +
          route.path.replace("/", "").slice(1)
    }`,
  twitterDescription: "This is Rickmff Portfolio.",
  twitterImage: "/Hero.png",
  robots: "index, follow",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: () => `https://rickmff.com${route.path}`,
    },
  ],
});

nextTick(() => {
  document.addEventListener("keydown", checkKey);
});

const router = useRoute();
const routes = ["work", "about", "contact"];

function checkKey(e: KeyboardEvent) {
  const key = e.key;
  const currentIndex = routes.indexOf(route.name as string);

  if (key === "ArrowLeft" || key === "ArrowRight") {
    e.preventDefault(); // Prevent default scroll behavior
    const direction = key === "ArrowLeft" ? -1 : 1;
    const nextIndex =
      (currentIndex + direction + routes.length) % routes.length;
    navigateTo(`/${routes[nextIndex]}`);
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
