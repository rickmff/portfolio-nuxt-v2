<template>
  <div ref="containerRef">
    <!-- Check if projects exist and have at least one item -->
    <div v-if="projects && projects.length > 0 && projects[0].thumb">
      <div id="image-track" ref="trackRef" :style="{ transform: `translateX(${trackPosition}px)` }"
        @mousedown="handleOnDown" @touchstart="handleOnDown">
        <!-- Check if thumb exists and iterate over it -->
        <div v-for="(thumb, index) in projects[0].thumb" :key="thumb.fields.title" class="group w-[32rem] hover:z-10">
          <img :src="thumb.fields.file.url" draggable="false"
            class="max-w-auto my-3 opacity-30 aspect-video group-hover:scale-125 hover:opacity-100 transition-all duration-500"
            @dblclick="console.log(thumb.fields.description)" :alt="thumb.fields.title" />
          <div class="flex justify-between items-baseline group-hover:pt-8 group-hover:scale-125 transition-all duration-500">
            <a :href="thumb.fields.description" target="_blank">
              <Text tag="p">@{{ thumb.fields.title }}</Text>
            </a>
            <Text tag="span" class="opacity-30">2022</Text>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- Loading or empty state -->
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ContentfulService from "@/services/contentful.services";

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
  document.addEventListener('mousemove', handleOnMove);
  document.addEventListener('touchmove', handleOnMove);
  document.addEventListener('mouseup', handleOnUp);
  document.addEventListener('touchend', handleOnUp);
};

const handleOnUp = () => {
  mouseDownAt.value = 0;
  prevPosition.value = trackPosition.value;
  document.removeEventListener('mousemove', handleOnMove);
  document.removeEventListener('touchmove', handleOnMove);
  document.removeEventListener('mouseup', handleOnUp);
  document.removeEventListener('touchend', handleOnUp);
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

onMounted(() => {
  if (containerRef.value && trackRef.value) {
    const initialScroll = (containerRef.value.clientWidth - trackRef.value.scrollWidth) / 2;
    trackPosition.value = Math.max(initialScroll, maxScroll.value);
    prevPosition.value = trackPosition.value;
  }
});

const projects = ref(null);

onMounted(async () => {
  try {
    projects.value = await ContentfulService.getEntries("projects");
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
});
</script>

<style scoped>
#image-track {
  display: flex;
  gap: 2vmin;
  position: absolute;
  left: 40%;
  top: 60%;
  transform: translateY(-50%);
  user-select: none;
}
</style>
