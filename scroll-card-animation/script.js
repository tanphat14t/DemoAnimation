document.addEventListener("DOMContentLoaded", function () {
  rotateCards();
  scrollCards();
});

function rotateCards() {
  let cards = document.querySelectorAll(".item-card");
  let angle = 0;
  cards.forEach((card, index) => {
    card.style.transform = `rotate(${angle}deg)`;
    angle = angle - 10;
    card.style.zIndex = cards.length - index;
  });
}

function scrollCards() {
  gsap.registerPlugin(ScrollTrigger);
//   let cards = gsap.utils.toArray(".cards");
  const stagger = 0.5;
  const tl = gsap.timeline({
    defaults: { ease: "none" }, // Because scrub doesnt look nice with the default ease
    scrollTrigger: {
      trigger: ".section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true,
      markers: true,
    },
  });
  tl.to(".item-card", {
    rotate: 1,
    stagger: stagger,
  });
  tl.to(
    ".item-card",
    {
      yPercent: -100,
      opacity: 0,
      stagger: stagger,
    },
    stagger
  );
}
