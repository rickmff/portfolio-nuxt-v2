<template>
  <div class="relative w-full overflow-hidden">
    <Swiper
      v-if="projects && projects.length > 0 && projects[0].thumb"
      :modules="[Navigation, Mousewheel]"
      :slides-per-view="1.2"
      :space-between="20"
      :mousewheel="{ enabled: enableScroll }"
      :navigation="true"
      :breakpoints="{
        768: {
          slidesPerView: 2.5,
          spaceBetween: 30,
        },
      }"
      class="py-8 m-10"
    >
      <SwiperSlide
        v-for="thumb in projects[0].thumb"
        :key="thumb.fields.title"
        class="group relative shadow-lg hover:z-10 hover:scale-105 transition-all duration-500"
      >
        <img
          :src="thumb.fields.file.url"
          :alt="thumb.fields.title"
          class="w-full aspect-video object-cover opacity-100 md:opacity-30 group-hover:opacity-100 transition-all duration-500"
          draggable="false"
        />
        <div
          class="absolute top-0 right-0 md:opacity-0 opacity-100 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-bl from-black/50 to-transparent"
        >
          <NuxtLink
            :to="thumb.fields.description"
            target="_blank"
            class="flex items-center gap-2 p-4 text-white hover:text-primary transition-colors duration-300"
          >
            <img :src="Link" class="w-5 h-5" alt="External link" />
          </NuxtLink>
        </div>
      </SwiperSlide>
    </Swiper>
    <div v-else class="flex justify-center items-center h-32">
      <p class="text-lg text-gray-500">Loading...</p>
    </div>
    <div
      class="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none"
    ></div>
    <div
      class="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Mousewheel } from "swiper/modules";
import ContentfulService from "@/services/contentful.services";
import Link from "@/assets/img/link.gif";

interface Props {
  enableScroll: boolean;
}

withDefaults(defineProps<Props>(), {
  enableScroll: true,
});

const projects = ref<any[] | null>(null);

onMounted(async () => {
  try {
    projects.value = await ContentfulService.getEntries("projects");
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
});
</script>

<style>
.swiper-button-next,
.swiper-button-prev {
  color: theme("colors.primary");
}
</style>
