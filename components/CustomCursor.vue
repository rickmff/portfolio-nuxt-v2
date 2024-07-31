<template>
  <div class="hidden md:block">
    <div class="cursor-dot" ref="cursorDot"></div>
    <div class="cursor-outline" ref="cursorOutline"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute } from "vue-router";

const cursorDot = ref<HTMLElement | null>(null);
const cursorOutline = ref<HTMLElement | null>(null);

let mouseMoveHandler: ((e: MouseEvent) => void) | null = null;
let elementsToHoverStyle: NodeListOf<Element> | null = null;

const initializeCursor = () => {
  const dot = cursorDot.value;
  const outline = cursorOutline.value;

  if (dot && outline) {
    mouseMoveHandler = (e: MouseEvent) => {
      const posX = e.clientX;
      const posY = e.clientY;

      dot.style.left = `${posX}px`;
      dot.style.top = `${posY}px`;

      outline.animate(
        [
          // Keyframes
          { left: `${posX}px`, top: `${posY}px` },
          // You can add more keyframes here if needed
        ],
        {
          // Animation options
          duration: 500, // Example duration
          fill: "forwards", // Example fill mode
        }
      );
    };

    window.addEventListener("mousemove", mouseMoveHandler);

    elementsToHoverStyle = document.querySelectorAll("a, button");
    elementsToHoverStyle.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });
  }
};

const cleanupCursor = () => {
  if (mouseMoveHandler) {
    window.removeEventListener("mousemove", mouseMoveHandler);
  }

  if (elementsToHoverStyle) {
    elementsToHoverStyle.forEach((element) => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    });
  }
};

const handleMouseEnter = () => {
  const dot = cursorDot.value;
  const outline = cursorOutline.value;
  if (dot) dot.style.opacity = "0";
  if (outline) {
    outline.classList.remove("cursor-outline-hoverOut");
    outline.classList.add("cursor-outline-hoverIn");
  }
};

const handleMouseLeave = () => {
  const dot = cursorDot.value;
  const outline = cursorOutline.value;
  if (dot) dot.style.opacity = "0.7";
  if (outline) {
    outline.classList.remove("cursor-outline-hoverIn");
    outline.classList.add("cursor-outline-hoverOut");
  }
};

onMounted(() => {
  initializeCursor();
});

onBeforeUnmount(() => {
  cleanupCursor();
});

const route = useRoute();
watch(route, () => {
  cleanupCursor();
  initializeCursor();
});
</script>

<style>
body {
  cursor: none !important;
}

.cursor-dot {
  width: 4px;
  height: 4px;
  background-color: white;
  opacity: 0.7;
}

.cursor-outline {
  width: 30px;
  height: 30px;
  border: 0.5px solid white;
  opacity: 0.2;
}

.cursor-dot,
.cursor-outline {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.2s, opacity 0.2s;
}

.cursor-outline-hoverOut {
  scale: 1;
  opacity: 0.2;
  transition: all 2s;
  background-color: transparent;
}
.cursor-outline-hoverIn {
  scale: 1.5;
  opacity: 0.5;
  transition: all 1s;
  background-color: #ff530a36;
}

/* Explicitly set default cursor for links and buttons */
a,
button {
  cursor: none;
}
</style>
