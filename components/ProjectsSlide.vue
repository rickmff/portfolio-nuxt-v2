<template>
  <div class="relative w-full overflow-hidden">
    <Swiper
      v-if="projects && projects.length > 0"
      :modules="[Navigation, Mousewheel]"
      :slides-per-view="1.2"
      :space-between="20"
      :mousewheel="{ enabled: enableScroll }"
      :navigation="true"
      :breakpoints="{
        768: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 30,
        },
      }"
      class="py-8 m-10"
    >
      <SwiperSlide
        v-for="(project, index) in projectsArray"
        :key="getProjectKey(project, index)"
        class="project-slide group relative shadow-lg hover:z-10 hover:scale-105 transition-all duration-500 overflow-hidden aspect-video"
        @mouseenter="handleMouseEnterWithVideo(project, index)"
        @mouseleave="handleMouseLeaveWithVideo(index)"
      >
        <!-- Thumb image (Always present as background/fallback) -->
        <img
          :src="getThumbUrl(project)"
          :alt="getProjectTitle(project)"
          class="w-full h-full aspect-video object-cover absolute inset-0 transition-opacity duration-500"
          :class="[
             hoveredIndex === null ? 'opacity-100' : hoveredIndex === index ? 'opacity-100' : 'opacity-30'
          ]"
          draggable="false"
        />

        <!-- Video MP4 (Overlay that fades in) -->
        <!-- Preload metadata to avoid loading delay, but only play on hover -->
        <video
          v-if="getGifUrl(project)"
          ref="videoRefs"
          :src="getGifUrl(project)"
          class="w-full h-full aspect-video object-cover absolute inset-0 transition-opacity duration-700 ease-in-out"
          :class="[
            hoveredIndex === index ? 'opacity-100' : 'opacity-0'
          ]"
          loop
          muted
          playsinline
          preload="auto"
          draggable="false"
        />
        <div
          class="absolute top-0 right-0 md:opacity-0 opacity-100 group-hover:opacity-100 transition-opacity duration-300"
        >
          <NuxtLink
            :to="getProjectUrl(project)"
            target="_blank"
            class="flex items-center justify-center w-12 h-12 m-4 bg-primary/50 hover:bg-white rounded-full backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-500 group/link"
            aria-label="Open project"
          >
            <svg
              class="w-6 h-6 text-white group-hover/link:translate-x-0.5 group-hover/link:text-primary group-hover/link:-translate-y-0.5 transition-transform duration-500"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </NuxtLink>
        </div>
      </SwiperSlide>
    </Swiper>
    <div v-else class="flex justify-center items-center h-32">
      <p class="text-lg text-gray-300">{{ loadingMessage }}</p>
    </div>
    <div
      class="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none"
    ></div>
    <div
      class="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Mousewheel } from "swiper/modules";
import ContentfulService from "@/services/contentful.services";

interface Props {
  enableScroll: boolean;
}

withDefaults(defineProps<Props>(), {
  enableScroll: true,
});

const emit = defineEmits<{
  projectHover: [project: any | null];
}>();

const projects = ref<any[] | null>(null);
const loadingMessage = ref("Loading...");
const hoveredIndex = ref<number | null>(null);

// Função para verificar se um projeto tem thumb válido (apenas para validação, não filtra mais)
function hasValidThumb(project: any): boolean {
  const thumbUrl = getThumbUrl(project);
  return Boolean(thumbUrl && thumbUrl.trim() !== "");
}

// Computed removido pois agora exibimos todos os projetos
// const hasProjects... - removido dependência direta, usando projectsArray.length no template

// Computed para obter o array de projetos
const projectsArray = computed(() => {
  if (!projects.value || projects.value.length === 0) return [];

  // Logar projetos com problemas no thumb para debug
  projects.value.forEach(p => {
    if (!hasValidThumb(p)) {
      console.warn(`Project "${p.title || 'Untitled'}" has missing or invalid thumb. It will be displayed with a placeholder.`);
    }
  });

  return projects.value;
});

function getProjectKey(project: any, index: number): string {
  if (project?.title) return project.title;
  if (project?.sys?.id) return project.sys.id;
  return `project-${index}`;
}

function getThumbUrl(project: any): string {
  // Asset resolvido pelo SDK do Contentful (com include)
  if (project?.thumb?.fields?.file?.url) {
    // Adiciona https: se a URL não tiver protocolo
    const url = project.thumb.fields.file.url;
    return url.startsWith('//') ? `https:${url}` : url;
  }
  // Fallback para outras estruturas
  if (project?.thumb?.file?.url) {
    const url = project.thumb.file.url;
    return url.startsWith('//') ? `https:${url}` : url;
  }
  return "";
}

function getGifUrl(project: any): string {
  // Asset resolvido pelo SDK do Contentful (com include)
  if (project?.gif?.fields?.file?.url) {
    // Adiciona https: se a URL não tiver protocolo
    const url = project.gif.fields.file.url;
    return url.startsWith('//') ? `https:${url}` : url;
  }
  // Fallback para outras estruturas
  if (project?.gif?.file?.url) {
    const url = project.gif.file.url;
    return url.startsWith('//') ? `https:${url}` : url;
  }
  return "";
}

// Função removida - não é mais necessária pois usamos v-if/v-else no template

function getProjectTitle(project: any): string {
  if (project?.title) return project.title;
  return "Project";
}

function getProjectDescription(project: any): string {
  if (project?.description) return project.description;
  return "";
}

function getProjectUrl(project: any): string {
  if (project?.url) return project.url;
  return "#";
}

const videoRefs = ref<HTMLVideoElement[]>([]);

function handleMouseEnter(project: any, index: number) {
  hoveredIndex.value = index;
  emit("projectHover", project);

  // Play video logic
  nextTick(() => {
    // Como estamos usando v-for, videoRefs pode não estar na ordem ou ser um array de elementos
    // Precisamos encontrar o vídeo correto no DOM ou via refs array se tivermos sorte com a ordem
    // Uma abordagem mais segura com Swiper/v-for dinâmico é buscar no evento target ou querySelector

    // Tentativa simples via ref array (Vue 3 ref array behavior)
    if (videoRefs.value) {
       // O array de refs não garante ordem igual ao index, então é melhor controlar play via watch ou direto no elemento
       // Mas como o elemento video está SEMPRE lá (v-if removido para preloading, usamos apenas opacity),
       // podemos tentar dar play.
    }
  });

  // Melhor abordagem: Play no vídeo específico
  // Vamos usar um watcher ou method específico.
  // Simplificando: o autoplay só funciona se o elemento for recriado ou se chamarmos .play()
  // Como removemos o v-if (agora o vídeo existe sempre, só muda opacidade), precisamos dar play manual.
}

// Vamos implementar um controle mais robusto de play/pause
const playVideo = async (index: number) => {
    // Pequeno delay para garantir transição suave
    setTimeout(async () => {
        if (hoveredIndex.value !== index) return;

        // Encontrar o vídeo no DOM é mais garantido com Swiper cloning slides
        const slides = document.querySelectorAll('.project-slide');
        if (slides[index]) {
            const video = slides[index].querySelector('video');
            if (video) {
                try {
                    video.currentTime = 0;
                    await video.play();
                } catch (e) {
                    // Autoplay prevented ou erro
                }
            }
        }
    }, 50);
};

const pauseVideo = (index: number) => {
    const slides = document.querySelectorAll('.project-slide');
    if (slides[index]) {
        const video = slides[index].querySelector('video');
        if (video) {
            video.pause();
        }
    }
};

function handleMouseEnterWithVideo(project: any, index: number) {
  hoveredIndex.value = index;
  emit("projectHover", project);
  playVideo(index);
}

function handleMouseLeaveWithVideo(index: number) {
  pauseVideo(index);
  hoveredIndex.value = null;
  emit("projectHover", null);
}

onMounted(async () => {
  try {
    const data = await ContentfulService.getEntries("work");
    console.log("Work data received:", data);

    if (data && data.length > 0) {
      console.log("First project structure:", data[0]);
      console.log("First project thumb:", data[0]?.thumb);
      console.log("First project gif:", data[0]?.gif);
    }

    projects.value = data;

    // Aguarda o próximo tick para que os computeds sejam atualizados
    await nextTick();

    if (!data || data.length === 0) {
      loadingMessage.value = "No work projects found";
    } else {
      // Verifica a estrutura dos dados após o nextTick
      const firstProject = data[0];
      const thumbUrl = getThumbUrl(firstProject);
      const hasValidStructure = firstProject?.title && thumbUrl;

      if (!hasValidStructure) {
        loadingMessage.value = "Work data structure issue";
        console.warn("Work data structure:", JSON.stringify(data, null, 2));
        console.warn("First project:", firstProject);
        console.warn("Thumb URL:", thumbUrl);
      }
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
    loadingMessage.value = "Error loading work projects";
  }
});
</script>

<style>
.swiper-button-next,
.swiper-button-prev {
  color: theme("colors.primary");
}
</style>
