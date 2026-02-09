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

  // Ikitsuki → to → The → World
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

  // ここで「画面幅」で判定（好きな境界に変えてOK）
  const getOptionsByWidth = () => {
    const w = window.innerWidth;

    // 例：画面幅が700px以下なら早めに発火
    if (w <= 700) {
      return { threshold: 0.15, rootMargin: "0px 0px -10% 0px" };
    }
    // それ以外（PC想定）
    return { threshold: 0.7, rootMargin: "0px" };
  };

  let observer;

  const setupObserver = () => {
    // 既存observerがあれば破棄
    if (observer) observer.disconnect();

    const opt = getOptionsByWidth();

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-show");
            observer.unobserve(entry.target); // 1回でOK
          }
        });
      },
      opt
    );

    targets.forEach((el) => {
      // すでに表示済みは監視しない
      if (!el.classList.contains("is-show")) observer.observe(el);
    });
  };

  setupObserver();

  // 回転・リサイズで画面幅が変わった時に再設定（必要なら）
  window.addEventListener("resize", () => {
    setupObserver();
  });
});

