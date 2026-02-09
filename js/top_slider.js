$(function(){
  $('.slider').slick({
    autoplay: true, //自動でスクロール
    autoplaySpeed: 0, //自動再生のスライド切り替えまでの時間を設定
    speed: 7000, //スライドが流れる速度を設定
    cssEase: "linear", //スライドの流れ方を等速に設定
    slidesToShow: 3, //表示するスライドの数
    swipe: false, // 操作による切り替えはさせない
    arrows: false, //矢印非表示
    pauseOnFocus: false, //スライダーをフォーカスした時にスライドを停止させるか
    pauseOnHover: false, //スライダーにマウスホバーした時にスライドを停止させるか
    responsive: [
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 3, //画面幅750px以下でスライド3枚表示
        }
      }
    ]
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".hamburger");
  const panel = document.querySelector("#spnav");

  if (!btn || !panel) return;

  let scrollY = 0; // 現在のスクロール位置保存

  const open = () => {
    scrollY = window.pageYOffset;

    document.body.classList.add("is-navopen");
    document.body.style.top = `-${scrollY}px`;   // iOS対策

    btn.setAttribute("aria-expanded", "true");
    panel.setAttribute("aria-hidden", "false");
  };

  const close = () => {
    document.body.classList.remove("is-navopen");
    document.body.style.top = "";

    window.scrollTo(0, scrollY); // 元の位置に戻す

    btn.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");
  };

  btn.addEventListener("click", () => {
    document.body.classList.contains("is-navopen") ? close() : open();
  });

  // 背景クリックで閉じる
  panel.addEventListener("click", (e) => {
    if (e.target === panel) close();
  });

  // ESCキーで閉じる
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
});
