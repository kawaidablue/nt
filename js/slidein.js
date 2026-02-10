// ===== hero typewriter =====
function typeText(el, text, speed = 90) {
  el.textContent = "";
  let i = 0;
  const tick = () => {
    el.textContent += text.charAt(i);
    i++;
    if (i < text.length) setTimeout(tick, speed);
  };
  tick();
  return text.length * speed;
}

function startHeroTyping() {
  const box = document.querySelector(".header-wrap__hero-titlebox.m_copy");
  if (!box || box.dataset.typed === "1") return;
  box.dataset.typed = "1";

  const top = box.querySelector(".header-wrap__hero-titletop");
  const left = box.querySelector(".header-wrap__hero-titleleft");
  const right = box.querySelector(".header-wrap__hero-titleright");
  if (!top || !left || !right) return;

  const speed = 150;
  const gap = 100;

  top.textContent = "";
  right.textContent = "";

  left.innerHTML = `<span class="js-type-to"></span><br><span class="js-type-the"></span>`;
  const toEl = left.querySelector(".js-type-to");
  const theEl = left.querySelector(".js-type-the");

  const t1 = typeText(top, "Ikitsuki", speed);
  setTimeout(() => {
    const t2 = typeText(toEl, "to", speed);
    setTimeout(() => {
      const t3 = typeText(theEl, "The", speed);
      setTimeout(() => {
        typeText(right, "World", speed);
      }, t3 + gap);
    }, t2 + gap);
  }, t1 + gap);
}

document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".slidein");
  if (!targets.length) return;

  const getOptionsByWidth = () => {
    const w = window.innerWidth;
    if (w <= 700) return { threshold: 0.15, rootMargin: "0px 0px -10% 0px" };
    return { threshold: 0.4, rootMargin: "0px" };
  };

  let observer;

  const setupObserver = () => {
    if (observer) observer.disconnect();

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-show");
        observer.unobserve(entry.target);

        // ✅ ここが追加：hero-titlebox が表示されたらタイプ開始
        if (entry.target.matches(".header-wrap__hero-titlebox.m_copy")) {
          startHeroTyping();
        }
      });
    }, getOptionsByWidth());

    targets.forEach((el) => {
      if (!el.classList.contains("is-show")) observer.observe(el);
    });
  };

  setupObserver();
  window.addEventListener("resize", setupObserver);
});
