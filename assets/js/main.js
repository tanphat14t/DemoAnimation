const height = document.querySelector("#sOne").offsetHeight;


gsap.registerPlugin(ScrollTrigger);


// gsap.to("#sOne", {
//   scrollTrigger: {
//     pin: "#sOne", 
//     end: `+=${height}px`, 
//     markers: true, 
//     pinSpacing: true, 
//   },
// });
// gsap
//   .timeline({
//     scrollTrigger: {
//       trigger: ".sOne-rOne",
//       start: "center top",
//       end: "center top",
//       scrub: 1,
//     },
//   })
//   .to(".sOne-rOne", {
//     opacity: 0,
//     visibility: "hidden",
//   })
//   .to(".sOne-rTwo", {
//     opacity: 1,
//     visibility: "visible",
//   });
