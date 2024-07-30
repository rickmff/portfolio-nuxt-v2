<template>
  <div ref="mainContent">
    <section>
      <div class="flex justify-center w-full">
        <!-- Minimap container -->
        <ClientOnly>
          <div v-if="showMinimap" class="relative w-1/5 px-14">
            <Minimap :content="mainContentHTML" />
          </div>
        </ClientOnly>
        <div class="w-4/5 px-72">
          <!-- Profile -->
          <div class="flex flex-col justify-center items-start my-64">
            <h2 class="font-hero font-bold text-8xl -m-2 mb-10 text-secondary">
              {{ profile?.title }}
            </h2>
            <p class="text-5xl my-10 leading-snug	">{{ profile?.content.content[0] }} <br><br> {{profile?.content.content[1]}}</p>
          </div>
          <!-- Education -->
          <div class="flex flex-col justify-center items-start my-64">
            <h2 class="font-hero font-bold text-8xl -m-2 my-10 text-secondary ">
              {{ education?.title }}
            </h2>
            <div
              v-for="item in education?.content"
              :key="item.title"
              class="mb-4"
            >
              <h3 class="text-5xl my-10">{{ item.certificate }}</h3>
              <p class="text-3xl opacity-30">{{ item.description }}</p>
            </div>
          </div>
          <!-- More sections (Awards, Stack, Experience) can be added here -->
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick, computed } from "vue";
import ContentfulService from "@/services/contentful.services";
import Minimap from "@/components/Minimap.vue";

const profile = ref(null);
const education = ref(null);
const mainContent = ref(null);
const showMinimap = ref(false);

const mainContentHTML = computed(() => {
  if (process.server) return ''; // Return empty string on server-side
  return mainContent.value?.outerHTML || "";
});

const searchByTitle = (array, title) =>
  array.find((item) => item.title === title) || null;

onMounted(async () => {
  try {
    const response = await ContentfulService.getEntries("about");
    profile.value = searchByTitle(response, "profile");
    education.value = searchByTitle(response, "education");
    await nextTick();
    showMinimap.value = true;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
});
</script>