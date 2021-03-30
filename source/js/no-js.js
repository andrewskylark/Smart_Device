'use strict';
(() => {
  const noJsElems = document.querySelectorAll(`.no-js`);
  if (noJsElems) {
    noJsElems.forEach((elem) => {
      elem.classList.remove(`no-js`);
    });
  }
})();
