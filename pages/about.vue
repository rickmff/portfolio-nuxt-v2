<template>
  <div class="bg-block bg-[url('')] bg-cover bg-center h-screen overflow-hidden">
    <div class="w-screen h-screen flex justify-center items-center">
      <h1 class="text-brand-orange text-5xl">Henrique Faria</h1>
      {{ hero }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ContentfulService from "@/services/contentful.services";

definePageMeta({
  layout: "default",
});
const hero = ref();

onMounted(() => {
  ContentfulService.getEntries("hero").then((response) => {
    hero.value = response.items[0].fields.title;
  });
});
</script>