<template>
  <div class="fixed scale-150 top-[45%] left-36 z-[1000]">
    <div
      ref="minimap"
      class="minimap min-w-[200px]"
      :style="{
        width: '15%', 
        transform: `translateY(${-scrollPosition}px)`}"
    >
      <div ref="minimapSize" class="relative z-[5]"></div>
      <div
        ref="viewer"
        class="absolute top-0 w-[95%] scale-90 z-[100] border border-[#f3f4f617]"
        :style="{
          'padding-top': `${winRatio * 100}%`,
          'transform-origin': '0 0',
          transform: `translateY(${scrollPosition}px)`,
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
const scrollPosition = ref(0);
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
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercentage = window.scrollY / maxScroll;
  const minimapHeight = minimap.value?.clientHeight || 0;
  const viewerHeight = viewer.value?.clientHeight || 0;
  const maxMinimapScroll = minimapHeight - viewerHeight;
  
  scrollPosition.value = scrollPercentage * maxMinimapScroll;
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