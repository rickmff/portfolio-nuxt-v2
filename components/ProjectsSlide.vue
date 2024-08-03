<template>
  <div class="relative w-full overflow-hidden" ref="containerRef">
    <div v-if="projects && projects.length > 0 && projects[0].thumb" class="py-8">
      <div
        ref="trackRef"
        :style="{ transform: `translateX(${trackPosition}px)`, willChange: 'transform' }"
        @mousedown="handleOnDown"
        @touchstart="handleOnDown"
        class="flex gap-5 transition-transform duration-300 ease-out"
      >
        <div
          v-for="thumb in projects[0].thumb"
          :key="thumb.fields.title"
          class="group flex-shrink-0 w-[calc(100vw-2rem)] sm:w-[calc(50vw-2rem)] md:w-[32rem] hover:z-10 hover:scale-110 transition-all duration-500"
        >
          <div class="relative overflow-hidden shadow-lg">
            <img
              :src="thumb.fields.file.url"
              :alt="thumb.fields.title"
              class="w-full aspect-video object-cover opacity-100 md:opacity-30 group-hover:opacity-100 transition-all duration-500"
              draggable="false"
            />
            <div
              class="absolute md:opacity-0 opacity-100 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent"
            >
              <NuxtLink :to="thumb.fields.description" target="_blank" class="flex items-center gap-2 p-4 text-white hover:text-primary transition-colors duration-300">
                <img :src="Link" class="w-5 h-5" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center items-center h-32">
      <p class="text-lg text-gray-500">Loading...</p>
    </div>
    <div class="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
    <div class="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import throttle from "lodash/throttle";
import ContentfulService from "@/services/contentful.services";
import Link from "@/assets/img/link.gif";

// Define a prop to toggle the scroll feature
const props = defineProps({
  enableScroll: {
    type: Boolean,
    default: true,
  },
});

const containerRef = ref(null);
const trackRef = ref(null);
const mouseDownAt = ref(0);
const prevPosition = ref(0);
const trackPosition = ref(0);

const maxScroll = computed(() => {
  if (containerRef.value && trackRef.value) {
    return containerRef.value.clientWidth - trackRef.value.scrollWidth;
  }
  return 0;
});

const handleOnDown = (e) => {
  if (e instanceof MouseEvent) {
    mouseDownAt.value = e.clientX;
  } else if (e instanceof TouchEvent) {
    mouseDownAt.value = e.touches[0].clientX;
  }
  document.addEventListener("mousemove", handleOnMoveThrottled);
  document.addEventListener("touchmove", handleOnMoveThrottled);
  document.addEventListener("mouseup", handleOnUp);
  document.addEventListener("touchend", handleOnUp);
};

const handleOnUp = () => {
  mouseDownAt.value = 0;
  prevPosition.value = trackPosition.value;
  document.removeEventListener("mousemove", handleOnMoveThrottled);
  document.removeEventListener("touchmove", handleOnMoveThrottled);
  document.removeEventListener("mouseup", handleOnUp);
  document.removeEventListener("touchend", handleOnUp);
};

const handleOnMove = (e) => {
  if (mouseDownAt.value === 0) return;
  let clientX = 0;
  if (e instanceof MouseEvent) {
    clientX = e.clientX;
  } else if (e instanceof TouchEvent) {
    clientX = e.touches[0].clientX;
  }
  const mouseDelta = mouseDownAt.value - clientX;
  const newPosition = prevPosition.value - mouseDelta;
  trackPosition.value = Math.max(Math.min(newPosition, 0), maxScroll.value);
};

// Throttle the handleOnMove function
const handleOnMoveThrottled = throttle(handleOnMove, 16); // Approx 60fps

const handleScroll = throttle((e) => {
  if (!props.enableScroll) return;
  const scrollAmount = e.deltaY;
  const newPosition = trackPosition.value - scrollAmount;
  trackPosition.value = Math.max(Math.min(newPosition, 0), maxScroll.value);
}, 16);

onMounted(() => {
  requestAnimationFrame(() => {
    if (containerRef.value && trackRef.value) {
      const initialScroll =
        (containerRef.value.clientWidth - trackRef.value.scrollWidth) / 2;
      trackPosition.value = Math.max(initialScroll, maxScroll.value);
      prevPosition.value = trackPosition.value;
    }
  });

  if (props.enableScroll && containerRef.value) {
    containerRef.value.addEventListener("wheel", handleScroll);
  }
});

/* watch(() => props.enableScroll, (newValue) => {
  if (newValue && containerRef.value) {
    containerRef.value.addEventListener("wheel", handleScroll);
  } else if (containerRef.value) {
    containerRef.value.removeEventListener("wheel", handleScroll);
  }
}); */

const projects = ref(null);

onMounted(async () => {
  try {
    projects.value = await ContentfulService.getEntries("projects");
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
});
</script>
