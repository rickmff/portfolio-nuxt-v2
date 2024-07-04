<template>
  <nav class="sm:px-4 py-2.5 fixed w-full z-20 top-0 flex">
    <div class="flex mx-auto">
      <!-- Hamburguer Toogle Mobile -->
      <div class="flex md:order-2">
        <button data-collapse-toggle="navbar-sticky" type="button"
          class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky" aria-expanded="false">
          <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>

      <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul class="flex flex-row">
          <li v-for="(menuItem, index) in menuList" :key="index">
            <NuxtLink to="menuItem.link"
              class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
              :class="{ 'bg-blue-700': isActive(menuItem.link), 'text-white': isActive(menuItem.link), 'text-blue-700': !isActive(menuItem.link) }"
              aria-current="page">{{ menuItem.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
const menuList = [
  {
    name: 'Home',
    link: '/',
    current: true,
  },
  {
    name: 'About',
    link: '/about',
    current: false,
  },
  {
    name: 'Contact',
    link: '/contact',
    current: false,
  }
];

const isActive = (link) => {
  /* return link === $route.path; */
};

</script>