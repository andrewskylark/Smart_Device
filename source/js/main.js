'use strict';
(() => {
  const accBtns = document.querySelectorAll(`.accordion`);
  // const panels = document.querySelectorAll(`.accordion__content`);

  for (let btn of accBtns) {
    btn.addEventListener(`click`, () => {

      btn.classList.toggle(`accordion--active`);

      let panel = btn.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = `${panel.scrollHeight}px`;
      }
    });
  }
})();


