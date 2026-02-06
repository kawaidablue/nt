document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll(".accordion-header");

  if (!headers.length) {
    console.warn("accordion-header が見つからないよ（HTMLのclass名確認）");
    return;
  }

  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.closest(".accordion-item");
      const body = item?.querySelector(".accordion-body");

      if (!item || !body) return;

      item.classList.toggle("active");

      if (item.classList.contains("active")) {
        body.style.maxHeight = body.scrollHeight + "px";
      } else {
        body.style.maxHeight = null;
      }
    });
  });
});
