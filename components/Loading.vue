<template>
  <div
    v-if="isLoading"
    class="bg-background absolute top-0 left-0 z-20 flex flex-col items-center justify-center h-screen w-screen overflow-hidden"
  >
    <div class="font-hero text-primary text-5xl mb-4 opacity-50">
      {{ countdown }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";

const loading = ref(true);
const isLoading = useState('isLoading', () => loading)

const cooldownTime = ref<number>(0);
const countdown = computed(() => {
  return `${cooldownTime.value}`;
});

definePageMeta({
  layout: false,
});
onMounted(() => {
  const intervalId = setInterval(() => {
    cooldownTime.value =
      cooldownTime.value !== 100 ? cooldownTime.value + 1 : 100;
    if (cooldownTime.value === 100) {
      loading.value = false;
      clearInterval(intervalId);
    }
  }, 15);
});
</script>
