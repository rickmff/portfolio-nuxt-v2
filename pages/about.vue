<template>
  <div class="w-screen h-screen flex justify-center items-center">
    {{ aboutContent }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ContentfulService from "@/services/contentful.services";

definePageMeta({
  layout: "default",
});
const aboutContent = ref();

onMounted(() => {
  ContentfulService.getEntries("about").then((response) => {
    aboutContent.value = response.items[0].fields;
    console.log(aboutContent.value);
  });
});
</script>
