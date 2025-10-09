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

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop(); // Ambil nama file HTML aktif
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop(); // Nama file dari href
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


