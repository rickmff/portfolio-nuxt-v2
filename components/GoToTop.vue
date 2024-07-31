<template>
  <div v-show="isVisible"
    class="fixed bottom-5 right-5 w-10 h-10 flex justify-center items-center bg-white rounded-full hover:bg-primary duration-500 opacity-90 hover:opacity-100 hover:scale-110"
    @click="scrollToTop">
    ▲
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);

const checkScroll = () => {
  if (window.scrollY > 200) {
    isVisible.value = true;
  } else {
    isVisible.value = false;
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>
