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
            @click="openWorkGrid"
            @mouseover="showLabelMyWork(true)"
            @mouseleave="showLabelMyWork(false)"
          ></button>
          <span :class="['my-work-label text-xs mt-2', showLabelClass]">{{
            showWorkGrid ? "Close" : "My work"
          }}</span>
        </div>
      </div>
      <div
        :style="bgImageStyle"
        class="bg-cover bg-center bg-no-repeat absolute top-0 left-0 right-0 bottom-0"
        :class="{ zoom: !showWorkGrid }"
      ></div>
      <div class="absolute bottom-5 right-5 opacity-50 hidden md:block">
        <div
          class="bg-secondary rounded-md p-1 flex justify-center items-center w-5 h-5 text-xs m-auto origin-center"
        >
          ↑
        </div>
        <div class="flex gap-1 mt-1">
          <div
            v-for="arrow in ['←', '↓', '→']"
            class="bg-secondary rounded-md p-1 flex justify-center items-center w-5 h-5 text-xs origin-center"
          >
            {{ arrow }}
          </div>
        </div>
      </div>
    </div>
    <div 
      class="absolute top-full left-0 w-full transition-all duration-1000"
      :class="{ 'translate-y-[-45vh]': showWorkGrid }"
    >
      <ProjectsSlide />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
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

function openWorkGrid() {
  showWorkGrid.value = !showWorkGrid.value;
}

const showLabelClass = computed(() => {
  return showLabel.value ? "opacity-100" : "opacity-0";
});

const bgImageStyle = computed(() => {
  return hero.value ? `background-image: url('${hero.value}')` : "";
});

onMounted(() => {
  ContentfulService.getEntries("hero").then((response) => {
    hero.value = response[0].hero.fields.file.url;
  });
});

nextTick(() => {
  document.addEventListener("keydown", checkKey);
});

function checkKey(e: KeyboardEvent) {
  const key = e.key;
  e.preventDefault();
  if (key === "ArrowUp") {
    return showWorkGrid.value = false;
  } else if (key === "ArrowDown") {
    return showWorkGrid.value = true;
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Julius+Sans+One&display=swap");

.gradient-black-to-transparent {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.65) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}

.zoom {
  animation: scale 30s linear infinite;
}

@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.my-work-label {
  opacity: 0;
  transition: opacity 1.5s ease;
}

.my-work-label.opacity-100 {
  opacity: 1;
}
</style>