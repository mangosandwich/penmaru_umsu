function initCountUp() {
  const counters = document.querySelectorAll(".count-up");
  if (!counters.length) return;

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.target);
        let current = 0;
        const duration = 2000;
        const increment = target / (duration / 10);

        const updateCount = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCount);
          } else {
            counter.textContent = target;
          }
        };

        updateCount();
        observer.unobserve(counter);
      }
    });
  }, options);

  counters.forEach((counter) => observer.observe(counter));
}

function initMobileMenu(
  menuBtnId,
  menuContainerId,
  linkSelector = ".menu-link"
) {
  const menuBtn = document.getElementById(menuBtnId);
  const mobileMenu = document.getElementById(menuContainerId);

  if (!menuBtn || !mobileMenu) return;
  mobileMenu.classList.add("hidden");
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("hidden");
  });

  // Tutup menu saat klik di luar area menu
  document.addEventListener("click", (e) => {
    if (
      !mobileMenu.classList.contains("hidden") &&
      !mobileMenu.contains(e.target) &&
      e.target !== menuBtn
    ) {
      mobileMenu.classList.add("hidden");
    }
  });

  // Tutup menu saat salah satu link diklik
  document.querySelectorAll(linkSelector).forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

// carousel
function initCarousel(carouselId) {
  const track = document.getElementById(carouselId);

  if (!track) return; 

  const cards = Array.from(track.children);

  // Gandakan card agar animasi looping lancar
  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
  });

  const cardWidth = 300 + 32; 
  const totalWidth = cardWidth * cards.length;

  track.classList.add("animate-scroll");

  const animationDuration = totalWidth / 40;
  track.style.animationDuration = `${animationDuration}s`;


  let styleEl = document.createElement("style");
  document.head.appendChild(styleEl);
  let styleSheet = styleEl.sheet;

  styleSheet.insertRule(`
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-${totalWidth}px); }
    }
  `, 0);
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("carousel-track")) {
    initCarousel("carousel-track");
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop(); 
    if (
      linkPage === currentPage ||
      (linkPage === "" && currentPage === "index.html")
    ) {
      link.classList.add("text-primary", "font-semibold");
      link.classList.remove("text-gray-600");
    } else {
      link.classList.add("text-gray-600");
      link.classList.remove("text-primary", "font-semibold");
    }
  });
});


