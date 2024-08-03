<template>
  <nav class="py-4 fixed z-20 w-full top-0 left-0">
    <ul class="flex space-x-6 justify-center text-lg select-none">
      <li v-for="item in menuList" :key="item.name"
        :class="{ 'text-orange-500 opacity-100 font-medium pointer-events-none': isActive(item.name) }"
        class="opacity-90 capitalize transition duration-500 ease-in-out">
        <nuxt-link :to="{ name: item.name }" prefetch draggable="false">{{ item.name }}</nuxt-link>
      </li>
    </ul>
    <button></button>
  </nav>
</template>

<script setup lang="ts">
import type { RouteRecordNameGeneric } from 'vue-router';

const route = useRoute();
const menuList = [
  {
    name: "work",
    current: true,
  },
  {
    name: "about",
    current: false,
  },
  {
    name: "contact",
    current: false,
  },
];

function isActive(routerName: RouteRecordNameGeneric) {
  return routerName === route.name;
};
</script>
