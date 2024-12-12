gsap.registerPlugin(ScrollTrigger);

const topSection = gsap.timeline({
  scrollTrigger: {
    trigger: "#sOne",
    pin: true,
    end: "+=5000s",
    pinSpacing: true,
    scrub: 0.6,
    ease: "none",
    // markers: true,
  },
});
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".sOne-rOne",
      start: "center top",
      end: "center top",
      scrub: 1,
      markers: true,
    },
  })
  .to(".sOne-rOne", {
    opacity: 0,
    visibility: "hidden",
  })
  .to(".sOne-rTwo", {
    opacity: 1,
    visibility: "visible",
  });
