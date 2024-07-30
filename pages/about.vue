<template>
  <div ref="mainContent">
    <section>
      <div class="flex justify-center w-full">
        <!-- Minimap container -->
        <ClientOnly>
          <div v-if="showMinimap" class="relative w-1/5 px-14">
            <Minimap :content="mainContentHTML" />
          </div>
        </ClientOnly>
        <div class="w-4/5 px-72">
          <!-- Profile -->
          <div class="flex flex-col justify-center items-start my-64">
            <h2 class="font-hero font-bold text-8xl -m-2 mb-10 text-secondary">
              {{ profile?.title }}
            </h2>
            <p class="text-5xl my-10 leading-snug	">{{ profile?.content.content[0] }} <br><br>
              {{ profile?.content.content[1] }}</p>
          </div>
          <!-- certificates -->
          <div class="flex flex-col justify-center items-start my-64">
            <h2 class="font-hero font-bold text-8xl -m-1 my-10 text-secondary ">
              {{ certificates?.title }}
            </h2>
            <div v-for="item in certificates?.content" :key="item.title" class="mb-4">
              <h3 class="text-5xl my-10">{{ item.certificate }}</h3>
              <p class="text-2xl opacity-30">{{ item.description }}</p>
            </div>
          </div>

          <!-- Awards -->
          <div class="flex flex-col justify-center items-start my-64">
            <h2 class="font-hero font-bold text-8xl my-10 text-secondary ">
              {{ awards?.title }}
            </h2>
            <div v-for="item in awards?.content" :key="item.title" class="mb-4">
              <h3 class="text-5xl my-10"><span :class="item.place === 'Gold' ? 'text-amber-200' : 'text-orange-200'">{{
                  item.place }}</span> {{ item.award
                }} <span class="text-lg opacity-30">{{ item.date }}</span></h3>
              <p class="text-2xl opacity-30">{{ item.description }}</p>
            </div>
          </div>

          <!-- Stack -->
          <div class="flex flex-col justify-center items-start my-64">
            <h2 class="font-hero font-bold text-8xl my-10 text-secondary ">
              {{ stack?.title }}
            </h2>
            <div v-for="item, key in stack?.content" :key="item.title" class="mb-4">
              <h3 class="text-5xl my-10">{{ key }}</h3>
              <ul class="flex gap-5">
                <li v-for="subItem in item" :key="item" class="text-2xl opacity-30 whitespace-nowrap">{{ subItem }}</li>
              </ul>
            </div>
          </div>

          <!-- Experience -->
          <div class="flex flex-col justify-center items-start my-64">
            <h2 class="font-hero font-bold text-8xl my-10 text-secondary ">
              {{ experiences?.title }}
            </h2>
            <div v-for="item in experiences?.content" :key="item.title" class="mb-4">
              <h3 class="text-5xl my-10">{{item.company}} <span class="text-lg opacity-30">{{item.startDate}}</span></h3>
              <h4 class="text-2xl my-5 opacity-70">{{item.position}}</h4>
              <p class="text-2xl opacity-30">{{ item.description }}</p>
            </div>
          </div>
          <!-- More sections (Stack, Experience) can be added here -->
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick, computed } from "vue";
import ContentfulService from "@/services/contentful.services";
import Minimap from "@/components/Minimap.vue";

interface ContentItem {
  title: string;
}

interface ProfileItem extends ContentItem {
  content: {
    content: string[];
  };
}

interface Certificate {
  title: string;
  certificate: string;
  description: string;
}

interface Award {
  title: string;
  place: string;
  award: string;
  date: string;
  description: string;
}

interface CertificatesItem extends ContentItem {
  content: Certificate[];
}

interface AwardsItem extends ContentItem {
  content: Award[];
}

const profile = ref<ProfileItem | null>(null);
const certificates = ref<CertificatesItem | null>(null);
const experiences = ref<any>(null);
const stack = ref<any>(null);
const awards = ref<AwardsItem | null>(null);
const mainContent = ref<HTMLElement | null>(null);
const showMinimap = ref(false);

const mainContentHTML = computed((): string => {
  if (import.meta.server) return ''; // Return empty string on server-side
  return mainContent.value?.outerHTML || "";
});

const searchByTitle = <T extends ContentItem>(array: T[], title: string): T | null =>
  array.find((item) => item.title === title) || null;

onMounted(async () => {
  try {
    const response = await ContentfulService.getEntries("about");
    if (Array.isArray(response)) {
      profile.value = searchByTitle<ProfileItem>(response, "profile");
      certificates.value = searchByTitle<CertificatesItem>(response, "certificates");
      awards.value = searchByTitle<AwardsItem>(response, "awards");
      experiences.value = searchByTitle(response, "experiences");
      stack.value = searchByTitle(response, "stack");
    } else {
      console.error("Unexpected response format from ContentfulService");
    }
    await nextTick();
    showMinimap.value = true;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
});
</script>