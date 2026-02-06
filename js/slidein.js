document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".slidein");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-show");
      }
    });
  }, {
    threshold: 0.7
  });

  targets.forEach(el => observer.observe(el));
});