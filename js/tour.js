const modal = document.getElementById('imageModal');
const modalImg = modal.querySelector('img');
const modalClose = document.getElementById('imageModalClose');

document.querySelectorAll('.tour-wrap__body__list__item img')
  .forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modal.classList.add('is-open');
    });
  });

// 閉じる
modal.addEventListener('click', (e) => {
  if(e.target === modal || e.target === modalClose){
    modal.classList.remove('is-open');
  }
});
