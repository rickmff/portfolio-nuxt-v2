<template>
  <div>
    <div class="cursor-dot" ref="cursorDot"></div>
    <div class="cursor-outline" ref="cursorOutline"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const cursorDot = ref<HTMLElement | null>(null);
const cursorOutline = ref<HTMLElement | null>(null);

onMounted(() => {
  if (import.meta.client) {
    const dot = cursorDot.value;
    const outline = cursorOutline.value;

    window.addEventListener("mousemove", function (e) {
      const posX = e.clientX;
      const posY = e.clientY;

      if (dot && outline) {
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
      }
    });

    // Optional: Handle mouseenter and mouseleave for elements that should not have custom cursor
    const elementsToIgnore = document.querySelectorAll("a, button");
    elementsToIgnore.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        if (dot) dot.style.opacity = "0";
        if (outline) outline.classList.remove("cursor-outline-hoverOut");
        if (outline) outline.classList.add("cursor-outline-hoverIn");
      });
      element.addEventListener("mouseleave", () => {
        if (dot) dot.style.opacity = "0.7";
        if (outline) outline.classList.remove("cursor-outline-hoverIn");
        if (outline) outline.classList.add("cursor-outline-hoverOut");
      });
    });
  }
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
}
.cursor-outline-hoverIn {
  scale: 1.5;
  opacity: 0.5;
  transition: all 2s;
}

/* Explicitly set default cursor for links and buttons */
a,
button {
  cursor: none;
}
</style>
