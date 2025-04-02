gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".carousel-track .carousel-slide");
let tl = gsap.timeline({
  
  scrollTrigger: {
    markers: true,
    trigger: "#carousel",
    scrub: !0,
    start: "+=1",
    end: () => "+=" + document.querySelector("#carousel").offsetWidth,
    pin: !0,
  },
});
gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: "#carousel",
    pin: true,
    pinSpacing: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => "+=" + document.querySelector("#carousel").offsetWidth,
  },
});
tl.to(".box-text .photon", {
  opacity: 0,
//   delay: 600,
})
  .to(".text-photon", {
    opacity: 0,
    // delay: 600,
  })
  .from(".box-text .ray2", {
    opacity: 0,
  })
  .from(".text-ray", {
    opacity: 0,
  });
//   .to(".box-text .ray2", {
//     opacity: 0,
//     delay: 600,
//   });
