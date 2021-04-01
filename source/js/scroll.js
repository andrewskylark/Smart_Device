'use strict';
(() => {
  const links = document.querySelectorAll(`a[data-goto]`);

  if (links) {
    const onLinkClick = (evt) => {
      evt.preventDefault();
      const link = evt.target;

      if (link.dataset.goto && document.querySelector(link.dataset.goto)) {
        const gotoBlock = document.querySelector(link.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

        window.scrollTo({
          top: gotoBlockValue,
          behavior: `smooth`
        });
      }
    };

    links.forEach((link) => {
      link.addEventListener(`click`, onLinkClick);
    });
  }
})();
