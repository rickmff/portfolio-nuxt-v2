<template>
  <div ref="containerRef" class="h-screen overflow-hidden" @wheel="onWheel">
    <div
      ref="contentRef"
      :style="{
        transform: `translateY(-${scrollPosition}px)`,
        transition: 'transform 0.1s ease-out',
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

const containerRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const scrollPosition = ref(0);
const maxScroll = ref(0);

let velocity = 0;
let lastScrollTop = 0;
const friction = 0.9;
const acceleration = 0.02;

const updateMaxScroll = () => {
  if (containerRef.value && contentRef.value) {
    maxScroll.value = contentRef.value.clientHeight - containerRef.value.clientHeight;
  }
};

let isScrolling = false;

const smoothScroll = () => {
  if (isScrolling) return;

  isScrolling = true;
  requestAnimationFrame(() => {
    const currentScrollTop = containerRef.value?.scrollTop ?? 0;
    const scrollDelta = currentScrollTop - lastScrollTop;
    lastScrollTop = currentScrollTop;

    velocity += scrollDelta * acceleration;
    velocity *= friction;

    let newScrollPosition = scrollPosition.value + velocity;

    if (newScrollPosition > maxScroll.value * 0.8) {
      const remainingPercentage = (maxScroll.value - newScrollPosition) / (maxScroll.value * 0.2);
      velocity *= remainingPercentage;
    }

    newScrollPosition = Math.max(0, Math.min(newScrollPosition, maxScroll.value));
    scrollPosition.value = newScrollPosition;

    isScrolling = false;
    if (Math.abs(velocity) > 0.1) {
      requestAnimationFrame(smoothScroll);
    }
  });
};

let wheelTimeout: ReturnType<typeof setTimeout> | null = null;

const onWheel = (e: WheelEvent) => {
  e.preventDefault();
  if (wheelTimeout) {
    clearTimeout(wheelTimeout);
  }

  wheelTimeout = setTimeout(() => {
    if (containerRef.value) {
      containerRef.value.scrollTop += e.deltaY;
    }
  }, 16);
};

onMounted(() => {
  updateMaxScroll();
  window.addEventListener('resize', updateMaxScroll);
  smoothScroll();
});

onUnmounted(() => {
  window.removeEventListener('resize', updateMaxScroll);
});

watch(() => contentRef.value?.clientHeight, updateMaxScroll);

// Expose methods to parent components
defineExpose({ updateMaxScroll });
</script>
