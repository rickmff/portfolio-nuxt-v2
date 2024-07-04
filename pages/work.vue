<template>
  <div class="bg-block bg-[url('')] bg-cover bg-center h-screen overflow-hidden">
    <div class="w-screen h-screen flex justify-center items-center">
      <h1 class="text-brand-orange text-5xl">Henrique Faria</h1>
      {{ hero }}
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

import { type ContentfulClientApi } from 'contentful';

declare module '#app' {
  interface NuxtApp {
    $client: ContentfulClientApi;
  }
}

const { $client } = useNuxtApp();

definePageMeta({
  layout: "default",
});
const hero = ref();

hero.value = await $client.getEntry({
  content_type: 'hero',
});
</script>