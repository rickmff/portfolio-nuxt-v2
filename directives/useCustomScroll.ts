// directives/scrollOnHold.js

export default {
  mounted(el) {
    let isMouseDown = false;
    let startY = 0;
    let scrollTop = 0;

    // Prevent text selection while dragging
    el.style.userSelect = 'none';

    // Correctly calculate the position of the element relative to the viewport
    const getOffsetY = (e) => e.pageY - el.getBoundingClientRect().top + el.scrollTop;

    el.addEventListener('mousedown', (e) => {
      // Only the left mouse button should trigger the drag scroll
      if (e.button !== 0) return;

      isMouseDown = true;
      startY = getOffsetY(e);
      scrollTop = el.scrollTop;
      el.classList.add('scrolling-active');
    });

    el.addEventListener('mouseleave', () => {
      if (isMouseDown) {
        isMouseDown = false;
        el.classList.remove('scrolling-active');
      }
    });

    el.addEventListener('mouseup', () => {
      if (isMouseDown) {
        isMouseDown = false;
        el.classList.remove('scrolling-active');
      }
    });

    el.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const y = getOffsetY(e);
      const walk = (y - startY);
      el.scrollTop = scrollTop - walk;
    });
  }
};
