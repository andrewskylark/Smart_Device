'use strict';
const TEXT_LIMIT = 225;
const DESKTOP_WIDTH = 1024;

(() => {
  //  аккордеон в подвале
  const accBtns = document.querySelectorAll(`.accordion`);

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

(() => {
  //  кнопка показа текста О компании
  const btn = document.querySelector(`.btn--about`);
  const p = document.querySelector(`#about p:last-of-type`);
  const initialText = p.textContent;

  const trimText = (thisText) => {
    thisText = thisText.slice(0, TEXT_LIMIT); // отрезать по лимиту

    let lastSpace = thisText.lastIndexOf(` `);

    if (lastSpace > 0) { // обрезать до пробела последнего слова
      thisText = thisText.slice(0, lastSpace) + `..`;
    }
    p.textContent = thisText;
  };

  const adjustText = () => {
    if (document.body.clientWidth < DESKTOP_WIDTH) {

      let currentText = p.textContent;

      if (currentText.length !== initialText.length) {
        p.textContent = initialText;
      } else if (currentText.length >= TEXT_LIMIT) {
        trimText(currentText);
      }
    }
    // let panel = btn.previousElementSibling;

    // if (panel.style.height) {
    //   panel.style.height = null;
    // } else {
    //   panel.style.height = `${panel.scrollHeight}px`;
    // }
  };

  btn.addEventListener(`click`, adjustText);

  //  на планшете и мобиле меню текст по умолчанию обрезан
  if (document.body.clientWidth < DESKTOP_WIDTH) {
    adjustText();
  }

  window.addEventListener(`resize`, () => {
    if (document.body.clientWidth < DESKTOP_WIDTH) {
      trimText(initialText);
    } else {
      p.textContent = initialText;
    }
  });
})();
