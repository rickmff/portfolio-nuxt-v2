<template>
  <Loading />
  <div
    id="hero"
    class="h-screen w-screen overflow-hidden relative bg-bottom bg-no-repeat"
  >
    <div class="relative w-full h-screen flex justify-center items-center z-10">
      <h1 class="font-hero text-7xl">Henrique Faria</h1>
      <div class="absolute flex flex-col items-center bottom-20">
        <button
          class="w-10 h-10 bg-white rounded-full hover:bg-primary duration-500 opacity-90 hover:opacity-100 hover:scale-110"
          @click="openWorkGrid"
          @mouseover="showLabelMyWork(true)"
          @mouseleave="showLabelMyWork(false)"
        ></button>
        <span :class="['my-work-label text-xs mt-2', showLabelClass]"
          >My work</span
        >
      </div>
    </div>
    <div
      class="absolute bottom-0 bg-black w-full h-40 gradient-black-to-transparent"
    ></div>
    <div
      :style="bgImageStyle"
      class="bg-cover bg-center bg-no-repeat zoom absolute top-0 left-0 right-0 bottom-0"
    ></div>
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

function showLabelMyWork(isHovering: boolean) {
  showLabel.value = isHovering;
}

function openWorkGrid() {
  console.log("openWorkGrid");
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
  setInterval(() => {
    showLabelMyWork(true);
    setTimeout(() => {
      showLabelMyWork(false);
    }, 1000);
  }, 3000);
});
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
