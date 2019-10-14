function throttling(func, wait = 20, immediate = true) {
        const timeout;
        return function() {
          const context = this,
            args = arguments;
          const later = function() {
            timeout = null;
            // if (!immediate)
            func.apply(context, args);
          };
          if (timeout) return;
          const callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
}

const images = document.querySelectorAll("img");

function scrollHandler() {
        const windowTop = window.scrollY;
        const windowBottom = windowTop + window.innerHeight;
        images.forEach(img => {
          const imgMiddle = img.offsetTop + img.height / 2;
          if (imgMiddle < windowBottom && imgMiddle > windowTop) {
            img.classList.add("active");
          } else {
            img.classList.remove("active");
          }
        });
}

window.addEventListener("scroll", throttling(scrollHandler));