<template>
  <Loading />
  <div id="hero"
    class="z-10 h-[101vh] w-screen overflow-hidden relative bg-bottom bg-no-repeat transition-all duration-1000"
    :class="{ '-translate-y-2/4': showWorkGrid }">
    <div class="relative w-full h-screen flex justify-center items-center z-10">
      <Text tag="h1" text="Henrique Faria" class="transition-all duration-1000"
        :class="{ 'translate-y-[250%]': showWorkGrid }" />
      <div class="absolute flex flex-col items-center bottom-20">
        <button
          class="w-10 h-10 bg-white rounded-full hover:bg-primary duration-500 opacity-90 hover:opacity-100 hover:scale-110"
          @click="openWorkGrid" @mouseover="showLabelMyWork(true)" @mouseleave="showLabelMyWork(false)"></button>
        <span :class="['my-work-label text-xs mt-2', showLabelClass]">My work</span>
      </div>
    </div>
    <div :style="bgImageStyle" class="bg-cover bg-center bg-no-repeat zoom absolute top-0 left-0 right-0 bottom-0">
    </div>
    <div class="absolute bottom-5 right-5 opacity-50">
      <div class="bg-secondary rounded-md p-1 flex justify-center items-center w-5 h-5 text-xs m-auto origin-center">↑</div>
      <div class="flex gap-1 mt-1">
        <div v-for="i in ['←', '↓', '→']"
          class="bg-secondary rounded-md p-1 flex justify-center items-center w-5 h-5 text-xs origin-center">{{ i }}</div>
      </div>
    </div>
  </div>
  <div class="absolute bottom-8 left-8 flex gap-5 transition-all duration-1000 overflow-hidden" :class="{ 'opacity-0': !showWorkGrid }">
    <div v-for="i in 4" class="w-80 h-80 border rounded-md border-[#ffffff1a]"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import ContentfulService from "@/services/contentful.services";

definePageMeta({
  layout: "default",
});

const hero = ref("");
const showLabel = ref(false);
const showWorkGrid = ref(false);
let lastScrollY = 0;

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


function handleScroll() {
  const scrollY = window.scrollY;
  const triggerPoint = 1;

  if (scrollY > lastScrollY) {
    // Scrolling down
    if (scrollY > triggerPoint && !showWorkGrid.value) {
      openWorkGrid();
    }
  } else {
    // Scrolling up
    if (showWorkGrid.value && scrollY < triggerPoint) {
      openWorkGrid();
    }
  }

  lastScrollY = scrollY;
}

onMounted(() => {
  ContentfulService.getEntries("hero").then((response) => {
    hero.value = response[0].hero.fields.file.url;
  });

  setInterval(() => {
    showLabelMyWork(true);
    setTimeout(() => {
      showLabelMyWork(false);
    }, 1000);
  }, 3000);

  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Julius+Sans+One&display=swap");

.gradient-black-to-transparent {
  background: linear-gradient(180deg,
      rgba(0, 0, 0, 0.65) 0%,
      rgba(0, 0, 0, 0) 100%);
}

.zoom {
  animation: scale 40s linear infinite;
}

@keyframes scale {
  0% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }

  50% {
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -ms-transform: scale(1.2);
    -o-transform: scale(1.2);
    transform: scale(1.2);
  }

  100% {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
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
