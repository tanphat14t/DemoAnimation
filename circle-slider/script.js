gsap.registerPlugin(Observer);
gsap.registerPlugin(ScrollTrigger);

// var sectionWrapper = document.querySelector(".section-wrapper");
var section = document.querySelector(".date-timeline-section");
var circle = document.querySelector(".circle");
const dateListItems = document.querySelectorAll(".date-list");
const dotsListItems = document.querySelectorAll(".dots");
let allowScroll = true; // sometimes we want to ignore scroll-related stuff, like when an Observer-based section is transitioning.
let scrollTimeout = gsap.delayedCall(1, () => (allowScroll = true)).pause(); // controls how long we should wait after an Observer-based animation is initiated before we allow another scroll-related action
let animating;

function positionsDotsDates() {
  // const dotsTranslateYValue = window.innerWidth < 1400 ? "-270px" : "-299px";
  // const datesTranslateYValue = window.innerWidth < 1400 ? "-311px" : "-340px";
  const dotsTranslateYValue =
    window.innerWidth <= 767
      ? "-149px"
      : window.innerWidth < 1400
      ? "-270px"
      : "-299px";
  const datesTranslateYValue =
    window.innerWidth <= 767
      ? "-180px"
      : window.innerWidth < 1400
      ? "-311px"
      : "-340px";

  dateListItems.forEach((item) => {
    const dateListItemsSpan = item.querySelector(".inner-text");

    const angle = parseInt(item.getAttribute("data-angle"));
    item.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(${datesTranslateYValue})`;
    dateListItemsSpan.style.transform = `rotate(${-angle}deg)`;
  });

  dotsListItems.forEach((dotsItem) => {
    const angle = parseInt(dotsItem.getAttribute("data-angle"));
    dotsItem.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(${dotsTranslateYValue})`;
  });
}

// Initial call to set the transform based on initial width
positionsDotsDates();

window.addEventListener("resize", positionsDotsDates);
window.addEventListener("orientationchange", positionsDotsDates);
window.addEventListener("load", positionsDotsDates);

//Animation of Circle
const degrees = 360 / dotsListItems.length;
let currentRotation = 0;

let intentObserver = ScrollTrigger.observe({
  // target: window,
  type: "wheel,touch,pointer",
  allowClicks: true,
  wheelSpeed: -1,
  onUp: () => !animating && rotateCircle(currentRotation + degrees, 1),
  onDown: () => !animating && rotateCircle(currentRotation - degrees, -1),
  tolerance: 10,
  preventDefault: true,
  onEnable(self) {
    allowScroll = false;
    scrollTimeout.restart(true);
    // when enabling, we should save the scroll position and freeze it. This fixes momentum-scroll on Macs, for example.
    let savedScroll = self.scrollY();
    self._restoreScroll = () => self.scrollY(savedScroll); // if the native scroll repositions, force it back to where it should be
    document.addEventListener("scroll", self._restoreScroll, {
      passive: false
    });
  },
  onDisable: (self) =>
    document.removeEventListener("scroll", self._restoreScroll)
});
intentObserver.disable();

const tl = gsap.timeline({
  defaults: {
    ease: "none",
    onUpdate: updateActiveDate
  }
});

function rotateCircle(rotate, direction) {
  console.log("rotate value:", rotate);
  if (rotate < 0 || rotate >= 360 || animating) {
    intentObserver.disable(); // resume native scroll
    return;
  }

  allowScroll = false;
  scrollTimeout.restart(true);

  animating = true;
  const rotationStep = 360 / dotsListItems.length;
  const step = direction === -1 ? -rotationStep : rotationStep; // Determine whether to add or subtract rotationStep based on direction
  console.log(currentRotation);

  tl.to(circle, {
    rotation: currentRotation + step,
    onComplete: () => {
      animating = false;
    }
  });

  tl.to(
    ".date-list .date, .date-list .text",
    {
      rotation: -currentRotation - step,
      onComplete: () => {
        animating = false;
        console.log("Animation completed");
      }
    },
    "<"
  );
  currentRotation += step;
}

// pin swipe section and initiate observer
ScrollTrigger.create({
  trigger: section,
  pin: true,
  start: "top top",
  end: "+=160",
  // markers: true,
  onEnter: (self) => {
    if (intentObserver.isEnabled) {
      return;
    } // in case the native scroll jumped past the end and then we force it back to where it should be.
    self.scroll(self.start + 1); // jump to just one pixel past the start of this section so we can hold there.
    intentObserver.enable(); // STOP native scrolling
  },
  onEnterBack: (self) => {
    if (intentObserver.isEnabled) {
      return;
    } // in case the native scroll jumped backward past the start and then we force it back to where it should be.
    self.scroll(self.end - 1); // jump to one pixel before the end of this section so we can hold there.
    intentObserver.enable(); // STOP native scrolling
  }
});

// Function to update the active on dates and dots
function updateActiveDate() {
  animating = true;
  // Get the center position of the circle
  const circleRect = circle.getBoundingClientRect();
  const circleCenterX = circleRect.left + circleRect.width / 2;
  const circleCenterY = circleRect.top + circleRect.height / 2;

  // Define the tolerance for angle difference
  const tolerance = Math.PI / 6; // 30 degrees in radians

  // Iterate through each date-list item
  dateListItems.forEach((date, index) => {
    const dateRect = date.getBoundingClientRect();
    const dateCenterX = dateRect.left + date.offsetWidth / 2;
    const dateCenterY = dateRect.top + date.offsetHeight / 2;

    // Calculate the angle between the center of the circle and the center of the date element
    const angle = Math.atan2(
      dateCenterY - circleCenterY,
      dateCenterX - circleCenterX
    );

    // Calculate the absolute difference between the angle and the desired angle
    const angleDifference = Math.abs(angle);

    // Check if the angle is within the tolerance of the desired angle
    if (angleDifference <= tolerance) {
      // Add the class to the date element
      date.classList.add("active");
      // Activate respective text
      const textList = document.querySelectorAll(".text-list .out-text");
      textList.forEach((text, textIndex) => {
        if (index === textIndex) {
          text.classList.add("active");
        } else {
          text.classList.remove("active");
        }
      });

      dotsListItems.forEach((dot, dotIndex) => {
        if (index === dotIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    } else {
      // Remove the class from the date element
      date.classList.remove("active");
    }
  });
}