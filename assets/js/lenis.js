// Initialize Lenis

const lenis = new Lenis({
  duration: 5,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  lerp: 0.1,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
