'use strict';
(() => {
  const goTopBtn = document.querySelector(`.page__scroll_up`);

  if (goTopBtn) {
    const trackScroll = () => {
      let scrolled = window.pageYOffset;
      let coords = document.documentElement.clientHeight;

      if (scrolled > coords) {
        goTopBtn.classList.add(`page__scroll_up--show`);
      }
      if (scrolled < coords) {
        goTopBtn.classList.remove(`page__scroll_up--show`);
      }
    };
    const scrollUp = () => {
      if (window.pageYOffset > 0) {
        window.scrollTo({
          top: 0,
          behavior: `smooth`
        });
      }
    };

    window.addEventListener(`scroll`, trackScroll);
    goTopBtn.addEventListener(`click`, scrollUp);
  }
})();
