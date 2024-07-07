<template>
  <nav class="py-4 fixed w-full z-20 top-0">
    <ul class="flex space-x-6 justify-center text-lg select-none">
      <li
        v-for="item in menuList"
        :key="item.name"
        :class="{ 'text-orange-500 opacity-100 font-medium pointer-events-none': isActive(item.link) }"
        class="opacity-80 hover:opacity-100"
      >
        <nuxt-link :to="item.link">{{ item.name }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const menuList = [
  {
    name: "Work",
    link: "/work",
    current: true,
  },
  {
    name: "About",
    link: "/about",
    current: false,
  },
  {
    name: "Contact",
    link: "/contact",
    current: false,
  },
];

function isActive (link) {
  return link === route.path;
};
</script>
