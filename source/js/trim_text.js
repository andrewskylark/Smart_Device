'use strict';
(() => {
  const btn = document.querySelector(`.btn--about`);
  const p = document.querySelector(`#about p:last-of-type`);

  if (p) {

    const initialText = p.textContent;

    const trimText = (thisText) => {
      thisText = thisText.slice(0, window.consts.TEXT_LIMIT);

      let lastSpace = thisText.lastIndexOf(` `);

      if (lastSpace > 0) {
        thisText = thisText.slice(0, lastSpace) + `..`;
      }
      p.textContent = thisText;
    };

    const adjustText = () => {
      if (document.body.clientWidth < window.consts.DESKTOP_WIDTH) {

        let currentText = p.textContent;

        if (currentText.length !== initialText.length) {
          p.textContent = initialText;
        } else if (currentText.length >= window.consts.TEXT_LIMIT) {
          trimText(currentText);
        }
      }
    };

    if (btn) {
      btn.addEventListener(`click`, adjustText);
    }

    if (document.body.clientWidth < window.consts.DESKTOP_WIDTH) {
      adjustText();
    }

    window.addEventListener(`resize`, () => {
      if (document.body.clientWidth < window.consts.DESKTOP_WIDTH) {
        trimText(initialText);
      } else {
        p.textContent = initialText;
      }
    });
  }
})();
