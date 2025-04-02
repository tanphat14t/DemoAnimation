console.log("running....");

let panels = gsap.utils.toArray(".content");

panels.forEach((item, i) => {
  var scrollAnim = gsap.timeline({
    scrollTrigger: {
      trigger: item,
      scrub: 0.6, // process by scrolling
      start: "top 50%",
      end: "bottom 50%",
      markers: true, // for DEBUG
      toggleActions: "restart none none none",
    },
  });

  const imgItem = item.querySelector(".box-image");

  scrollAnim.fromTo(
    imgItem,
    {
      transform:
        "perspective(1000px) rotate(-46.2deg) rotateX(35.9333deg)",
    },
    {
      transform:
        "perspective(1000px) rotate(34.8deg) rotateX(-27.0667deg)",
      ease: "steps(30)",
    }
  );
});
