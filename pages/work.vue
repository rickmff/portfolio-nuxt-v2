<template>
  <div class="relative overflow-hidden">
    <div
      id="hero"
      class="z-10 relative bg-bottom bg-no-repeat transition-all duration-1000"
      :class="{ 'translate-y-[-45vh]': showWorkGrid }"
    >
      <div class="relative h-screen flex justify-center items-center z-10">
        <Text
          tag="h1"
          text="Henrique Faria"
          class="transition-all duration-1000"
          :class="{ 'translate-y-[300%]': showWorkGrid }"
        />
        <div class="absolute flex flex-col items-center bottom-20">
          <button
            class="w-10 h-10 bg-white rounded-full hover:bg-primary duration-500 opacity-90 hover:opacity-100 hover:scale-110"
            @click="toggleWorkGrid"
            @mouseover="showLabelMyWork(true)"
            @mouseleave="showLabelMyWork(false)"
          ></button>
          <span :class="['my-work-label text-xs mt-2', { 'opacity-100': showLabel, 'opacity-0': !showLabel }]">
            {{ showWorkGrid ? "Close" : "My work" }}
          </span>
        </div>
      </div>
      <div
        :style="{ backgroundImage: `url('${hero}')` }"
        class="bg-cover bg-center bg-no-repeat absolute top-0 left-0 right-0 bottom-0"
        :class="{ zoom: !showWorkGrid }"
      ></div>
      <div class="absolute bottom-5 right-5 opacity-50 hidden md:block">
        <div class="bg-secondary rounded-md p-1 flex justify-center items-center w-5 h-5 text-xs m-auto origin-center">
          ↑
        </div>
        <div class="flex gap-1 mt-1">
          <div
            v-for="arrow in ['←', '↓', '→']"
            :key="arrow"
            class="bg-secondary rounded-md p-1 flex justify-center items-center w-5 h-5 text-xs origin-center"
          >
            {{ arrow }}
          </div>
        </div>
      </div>
    </div>
    <div 
      class="absolute top-full left-0 w-full transition-all duration-1000 projects-slide"
      :class="{ 'translate-y-[-45vh]': showWorkGrid }"
    >
      <ProjectsSlide />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import ContentfulService from "@/services/contentful.services";

definePageMeta({
  layout: "default",
});

const hero = ref("");
const showLabel = ref(false);
const showWorkGrid = ref(false);

function showLabelMyWork(isHovering: boolean) {
  showLabel.value = isHovering;
}

function toggleWorkGrid() {
  showWorkGrid.value = !showWorkGrid.value;
}

let lastScrollTime = 0;
const scrollCooldown = 1000;

function handleScroll(event: WheelEvent) {
  const currentTime = new Date().getTime();
  if (currentTime - lastScrollTime < scrollCooldown) {
    return;
  }

  // Check if the scroll event originated from within the ProjectsSlide component
  const projectsSlide = (event.target as Element).closest('.projects-slide');
  if (projectsSlide) {
    return;
  }

  if (event.deltaY > 0 && !showWorkGrid.value) {
    // Scrolling down, open the work grid
    showWorkGrid.value = true;
    lastScrollTime = currentTime;
  } else if (event.deltaY < 0 && showWorkGrid.value) {
    // Scrolling up, close the work grid
    showWorkGrid.value = false;
    lastScrollTime = currentTime;
  }
}

onMounted(async () => {
  try {
    const response = await ContentfulService.getEntries("hero");
    hero.value = response[0]?.hero?.fields?.file?.url || "";
  } catch (error) {
    console.error("Error fetching hero image:", error);
  }
  
  window.addEventListener("wheel", handleScroll, { passive: false });
  document.addEventListener("keydown", checkKey);
});

function checkKey(e: KeyboardEvent) {
  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
    e.preventDefault();
    showWorkGrid.value = e.key === "ArrowDown";
  }
}

onUnmounted(() => {
  window.removeEventListener("wheel", handleScroll);
  document.removeEventListener("keydown", checkKey);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Julius+Sans+One&display=swap");

.zoom {
  animation: scale 30s linear infinite;
}

@keyframes scale {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.my-work-label {
  transition: opacity 1.5s ease;
}
</style>