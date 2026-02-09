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
// ===== hero typewriter (slidein表示後に開始) =====
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

  const top = box.querySelector(".header-wrap__hero-titletop");      // Ikutsuki
  const left = box.querySelector(".header-wrap__hero-titleleft");    // TO / THE
  const right = box.querySelector(".header-wrap__hero-titleright");  // World
  if (!top || !left || !right) return;

  const speed = 150;
  const gap = 100;

  // 初期化
  top.textContent = "";
  right.textContent = "";

  // left を to / The に分割（HTMLは動かさず、中身だけJSで作る）
  left.innerHTML = `<span class="js-type-to"></span><br><span class="js-type-the"></span>`;
  const toEl = left.querySelector(".js-type-to");
  const theEl = left.querySelector(".js-type-the");

  // Ikutsuki → to → The → World
  const t1 = typeText(top, "Ikutsuki", speed);
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

// slideinで表示された瞬間に開始（IntersectionObserver）
document.addEventListener("DOMContentLoaded", () => {
  const target = document.querySelector(".header-wrap__hero-titlebox.m_copy");
  if (!target) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          startHeroTyping();
          io.disconnect(); // 1回だけ
        }
      });
    },
    { threshold: 0.6 }
  );

  io.observe(target);
});
