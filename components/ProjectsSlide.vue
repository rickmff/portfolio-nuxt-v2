<template>
  <div ref="containerRef">
    <div 
      id="image-track" 
      ref="trackRef"
      :style="{ transform: `translateX(${trackPosition}px)` }" 
      @mousedown="handleOnDown"
      @touchstart="handleOnDown"
    >
      <img 
        v-for="(image, index) in images" 
        :key="index" 
        :src="image.src" 
        class="image" 
        draggable="false" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

// Image data
const images = ref([
  { src: 'https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
  { src: 'https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80' },
  { src: 'https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
  { src: 'https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
  { src: 'https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
  { src: 'https://images.unsplash.com/photo-1496753480864-3e588e0269b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80' },
  { src: 'https://images.unsplash.com/photo-1613346945084-35cccc812dd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1759&q=80' },
  { src: 'https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' }
]);

// Refs for DOM elements
const containerRef = ref(null);
const trackRef = ref(null);

// State variables
const mouseDownAt = ref(0);
const prevPosition = ref(0);
const trackPosition = ref(0);

// Computed property for maximum scroll
const maxScroll = computed(() => {
  if (containerRef.value && trackRef.value) {
    return containerRef.value.clientWidth - trackRef.value.scrollWidth;
  }
  return 0;
});

// Event handlers
const handleOnDown = (e) => {
  mouseDownAt.value = e.clientX || e.touches[0].clientX;
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

  const mouseDelta = parseFloat(mouseDownAt.value) - (e.clientX || e.touches[0].clientX);
  const newPosition = prevPosition.value - mouseDelta;

  // Constrain the position within bounds
  trackPosition.value = Math.max(Math.min(newPosition, 0), maxScroll.value);
};

// Lifecycle hooks
onMounted(() => {
  // Initial position calculation
  if (containerRef.value && trackRef.value) {
    const initialScroll = (containerRef.value.clientWidth - trackRef.value.scrollWidth) / 2;
    trackPosition.value = Math.max(initialScroll, maxScroll.value);
    prevPosition.value = trackPosition.value;
  }
});
</script>


<style scoped>
#image-track {
  display: flex;
  gap: 4vmin;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  user-select: none;
}

#image-track > .image {
  width: 40vmin;
  height: 56vmin;
  object-fit: cover;
  object-position: center;
  will-change: transform;  /* Optimize for animations */
}
</style>
