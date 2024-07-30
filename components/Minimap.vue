<template>
  <div class="fixed scale-150">
  <div
    ref="minimap"
    class="minimap absolute top-32 min-w-[200px] z-[100]"
    style="width: 15%"
  >
    <div ref="minimapSize" class="relative z-[5]"></div>
    <div
      ref="viewer"
      class="absolute top-0 left-[-2.5%] w-[95%] z-[100] border border-[#f3f4f617]"
      :style="{
        'padding-top': `${winRatio * 100}%`,
        'transform-origin': '0 0',
      }"
    ></div>
    <div
      ref="minimapContent"
      class="absolute top-0 left-0 w-full h-full z-[-1]"
      :style="{
        'transform-origin': '0 0',
        transform: `scale(${realScale})`,
        width: `${100 / realScale}%`,
        height: `${100 / realScale}%`,
      }"
      v-html="filteredContent"
    ></div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from "vue";

interface Props {
  content: string;
}

const props = defineProps<Props>();

const minimap = ref<HTMLDivElement | null>(null);
const minimapSize = ref<HTMLDivElement | null>(null);
const viewer = ref<HTMLDivElement | null>(null);
const minimapContent = ref<HTMLDivElement | null>(null);
const winRatio = ref(0);
let realScale = 0;

const filterHTML = (html: string): string => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const minimapElement = tempDiv.querySelector(".minimap");
  if (minimapElement) minimapElement.remove();
  return tempDiv.innerHTML;
};

const filteredContent = computed(() => filterHTML(props.content));

const setupDimensions = (): void => {
  const bodyWidth = document.body.clientWidth;
  const bodyRatio = document.body.clientHeight / bodyWidth;
  winRatio.value = window.innerHeight / window.innerWidth;

  if (minimap.value) {
    minimap.value.style.width = "15%";
    realScale = minimap.value.clientWidth / bodyWidth;

    if (minimapSize.value)
      minimapSize.value.style.paddingTop = `${bodyRatio * 100}%`;
    if (viewer.value) viewer.value.style.paddingTop = `${winRatio.value * 100}%`;
    if (minimapContent.value) {
      minimapContent.value.style.transform = `scale(${realScale})`;
      minimapContent.value.style.width = `${100 / realScale}%`;
      minimapContent.value.style.height = `${100 / realScale}%`;
    }
  }
};

const trackScroll = (): void => {
  if (viewer.value)
    viewer.value.style.transform = `translateY(${
      window.scrollY * realScale
    }px)`;
};

onMounted(() => {
  setupDimensions();
  window.addEventListener("scroll", trackScroll);
  window.addEventListener("resize", setupDimensions);
});

onUnmounted(() => {
  window.removeEventListener("scroll", trackScroll);
  window.removeEventListener("resize", setupDimensions);
});

watch(filteredContent, setupDimensions);
</script>