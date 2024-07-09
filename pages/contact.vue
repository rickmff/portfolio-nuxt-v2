<template>
  <div class="bg-block bg-[url('')] bg-cover bg-center h-screen overflow-hidden">
    <div class="w-screen h-screen flex justify-center items-center">
      <h1 class="hover:text-primary text-5xl transition-all duration-300"><a href="https://www.linkedin.com/in/rickmff/" target="_blank">@rickmff</a></h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ContentfulService from "@/services/contentful.services";

definePageMeta({
  layout: "default",
});
</script>