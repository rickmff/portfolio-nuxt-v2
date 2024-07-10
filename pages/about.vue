<template>
  <div class="w-2/5">
    <!-- Profile -->
    <div class="h-screen flex flex-col justify-center items-start">
      <h2 class="font-hero font-bold text-8xl text-secondary">
        {{ profile?.title }}
      </h2>
      <p>{{ profile?.content.content }}</p>
    </div>
    <!-- Education -->
    <div class="h-screen flex flex-col justify-center items-start">
      <h2 class="font-hero font-bold text-8xl text-secondary">
        {{ education?.title }}
      </h2>
      <div v-for="item in education?.content" :key="item.title">
        <h3>{{ item.certificate }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </div>
    <!-- Awards -->
    <!-- Stack -->
    <!-- Experience -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ContentfulService from "@/services/contentful.services";

definePageMeta({
  layout: "default",
});
const profile = ref();
const education = ref();

function searchByTitle(array, title) {
  return array.find((item) => item.title === title) || null;
}

onMounted(() => {
  ContentfulService.getEntries("about").then((response) => {
    profile.value = searchByTitle(response, "profile");
    education.value = searchByTitle(response, "education");
  });
});
</script>
