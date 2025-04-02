window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const offsetTop = document.querySelector('.image-container').offsetTop
    let validate = false;
    if (scrolled >= offsetTop) {
        validate = true;
    }
    if (validate) {
        document.querySelector('.original-image').style.opacity = 0;
        document.querySelector(".left").style.transform = `translateX(-${scrolled * 0.2}px)`;
        document.querySelector(".right").style.transform = `translateX(${scrolled * 0.2}px)`;
    } else {
        document.querySelector('.original-image').style.opacity = 1;
    }
});