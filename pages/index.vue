<script setup lang="ts">
// Redirect root path to /work
definePageMeta({
  layout: false,
});

// Perform redirect on server and client
navigateTo('/work', { redirectCode: 301, replace: true });
</script>

<template>
  <div></div>
</template>

