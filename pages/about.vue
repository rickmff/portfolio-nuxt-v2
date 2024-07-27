<template>
  <div>
    <!-- Main content sections -->
    <section>
      <div class="flex w-full">
        <div class="w-2/5"></div>
        <div class="w-2/5">
          <!-- Profile -->
          <div class="h-screen flex flex-col justify-center items-start">
            <h2 class="font-hero font-bold text-8xl text-secondary">
              {{ profile?.title }}
            </h2>
            <p class="text-lg font-light">{{ profile?.content.content }}</p>
          </div>
          <!-- Education -->
          <div class="h-80 flex flex-col justify-center items-start">
            <h2 class="font-hero font-bold text-8xl text-secondary">
              {{ education?.title }}
            </h2>
            <div v-for="item in education?.content" :key="item.title">
              <h3>{{ item.certificate }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
          <!-- Awards -->
          <!-- Stack -->
          <!-- Experience -->
        </div>
      </div>
    </section>
    <!-- More sections... -->

    <!-- Minimap container -->
    <div ref="minimap" class="minimap__container">
      <div ref="minimapSize" class="minimap__size"></div>
      <div ref="viewer" class="minimap__viewer"></div>
      <iframe ref="minimapContent" class="minimap__content"></iframe>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, nextTick } from "vue";
import ContentfulService from "@/services/contentful.services";

const minimap = ref(null);
const minimapSize = ref(null);
const viewer = ref(null);
const minimapContent = ref(null);
let realScale;

const filterHTML = (html) => {
  // Create a temporary container to manipulate the HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // Remove the minimap container from the HTML
  const minimapElement = tempDiv.querySelector(".minimap__container");
  if (minimapElement) {
    minimapElement.remove();
  }

  return tempDiv.innerHTML;
};

const setupDimensions = () => {
  const bodyWidth = document.body.clientWidth;
  const bodyRatio = document.body.clientHeight / bodyWidth;
  const winRatio = window.innerHeight / window.innerWidth;

  if (minimap.value) {
    minimap.value.style.width = "15%";
    realScale = minimap.value.clientWidth / bodyWidth;

    if (minimapSize.value) {
      minimapSize.value.style.paddingTop = `${bodyRatio * 100}%`;
    }

    if (viewer.value) {
      viewer.value.style.paddingTop = `${winRatio * 100}%`;
    }

    if (minimapContent.value) {
      minimapContent.value.style.transform = `scale(${realScale})`;
      minimapContent.value.style.width = `${100 / realScale}%`;
      minimapContent.value.style.height = `${100 / realScale}%`;
    }
  }
};

const trackScroll = () => {
  if (viewer.value) {
    viewer.value.style.transform = `translateY(${
      window.scrollY * realScale
    }px)`;
  }
};

const loadIframe = () => {
  const html = document.documentElement.outerHTML.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );
  const filteredHTML = filterHTML(html);

  if (minimapContent.value) {
    const iframeDoc = minimapContent.value.contentDocument;
    iframeDoc.open();
    iframeDoc.write(filteredHTML);
    iframeDoc.close();
  }
};

definePageMeta({
  layout: "default",
});
const profile = ref();
const education = ref();

function searchByTitle(array, title) {
  return array.find((item) => item.title === title) || null;
}

onMounted(async () => {
  await ContentfulService.getEntries("about").then((response) => {
    profile.value = searchByTitle(response, "profile");
    education.value = searchByTitle(response, "education");
  });
  nextTick(() => {
    if (minimapContent.value) {
      minimapContent.value.addEventListener("load", loadIframe);
      // Ensure iframe content is loaded initially
      loadIframe();
    }

    setupDimensions();
    window.addEventListener("scroll", trackScroll);
    window.addEventListener("resize", setupDimensions);
  });
});

onUnmounted(() => {
  if (minimapContent.value) {
    minimapContent.value.removeEventListener("load", loadIframe);
  }
  window.removeEventListener("scroll", trackScroll);
  window.removeEventListener("resize", setupDimensions);
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
}

html,
body {
  overscroll-behavior: none;
}

section {
  width: 100%;
  min-height: 600px;
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.container {
  width: 60%;
  max-width: 800px;
}

img {
  width: 100%;
}

h1 {
  font-size: clamp(1px, 3.2vw, 28px);
}

p {
  font-size: clamp(1px, 2.2vw, 20px);
}

/* Minimap */
.minimap__container {
  position: fixed;
  top: 10px;
  left: 10px;
  min-width: 20px;
  z-index: 100;
}

.minimap__size {
  position: relative;
  z-index: 5;
  border: 2px solid white;
}

.minimap__viewer {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
  z-index: 100;
  border: 1px solid #0000009a;
}

.minimap__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  transform-origin: 0 0;
  border: 1px solid white;
}
</style>
