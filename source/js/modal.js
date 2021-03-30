'use strict';
(() => {
  const modal = document.querySelector(`.modal`);
  const modalClose = modal.querySelector(`.modal__close`);
  const modalOpen = document.querySelector(`.page-header__btn`);
  const form = modal.querySelector(`form`);
  const submitBtn = form.querySelector(`.form__btn--submit`);
  const inputs = form.querySelectorAll(`input`);
  const tel = form.querySelector(`#tel--modal`);
  const username = form.querySelector(`#name--modal`);
  const textarea = form.querySelector(`textarea`);

  const isEscEvt = (evt, action) => {
    if (evt.key === window.consts.ESC_KEY) {
      action();
    }
  };
  const onModalEscPress = (evt) => {
    isEscEvt(evt, closeModal);
  };

  const openModal = () => {
    modal.classList.add(`modal--opened`);

    document.body.style.position = `fixed`;
    document.body.style.top = `-${window.scrollY}px`;
  };
  const closeModal = () => {
    modal.classList.remove(`modal--opened`);

    document.body.style.position = ``;
    document.body.style.top = ``;

    const scrollY = document.body.style.top;

    window.scrollTo(0, parseInt(scrollY || `0`, 10) * -1);

    window.removeEventListener(`resize`, closeModal);
    document.removeEventListener(`keydown`, closeModal);
  };


  if (modalOpen) {

    let storedName = localStorage.getItem(`name--modal`);
    let storedTel = localStorage.getItem(`tel--modal`);
    let storedText = localStorage.getItem(`ask--modal`);

    modalOpen.addEventListener(`click`, (event) => {
      event.preventDefault();

      openModal();

      username.value = storedName;
      tel.value = storedTel;
      textarea.value = storedText;

      username.focus();

      window.addEventListener(`resize`, closeModal);
      window.addEventListener(`click`, (evt) => {
        if (evt.target.classList.contains(`modal--opened`)) {
          closeModal();
        }
      });
      document.addEventListener(`keydown`, onModalEscPress);
      modalClose.addEventListener(`click`, closeModal);

      if (tel) {
        tel.addEventListener(`focus`, () => {

          if (!window.consts.NUMS_BRACKETS_ONLY.test(tel.value)) {
            tel.value = `+7(`;
          }
        });

        tel.addEventListener(`keydown`, (evt) => {
          let old = 0;
          if (!window.consts.KEYDOWN_NUMS_ONLY.test(evt.key)) {
            evt.preventDefault();
            tel.setCustomValidity(`Только цифры!`);
          } else {
            tel.setCustomValidity(``);

            let curLen = tel.value.length;

            if (curLen < old) {
              old--;
              return;
            }

            if (curLen === 2) {
              tel.value = tel.value + `(`;
            }
            if (curLen === 6) {
              tel.value = tel.value + `)`;
            }
            if (curLen > 13) {
              tel.value = tel.value.substring(0, tel.value.length - 1);
            }

            old++;
          }

          if ((evt.key === window.consts.BACKSPACE_KEY) && (tel.value !== `+7(`)) {
            tel.value = tel.value.substring(0, tel.value.length - 1);
            tel.setCustomValidity(``);
          }
          if (evt.key === window.consts.TAB_KEY) {
            textarea.focus();
            tel.setCustomValidity(``);
          }
          if (evt.key === window.consts.ENTER_KEY) {
            form.submit();
            tel.setCustomValidity(``);
          }
          tel.reportValidity();
        });
      }
    });

    if (submitBtn) {
      submitBtn.addEventListener(`click`, () => {
        for (let input of inputs) {
          if (input.reportValidity() === false) {
            input.classList.add(`input-invalid`);
          } else {
            input.classList.remove(`input-invalid`);
          }
        }

        if (tel.value.length === 0) {
          tel.setCustomValidity(`Вы не ввели номер телефона!`);
          tel.classList.add(`input-invalid`);
        } else if (tel.value.match(window.consts.PHONE_NUMS_ONLY).length < window.consts.PHONE_LENGTH) {
          tel.setCustomValidity(`Номер должен быть длиной ${window.consts.PHONE_LENGTH} цифр, еще ${window.consts.PHONE_LENGTH - tel.value.match(window.consts.PHONE_NUMS_ONLY).length}`);
          tel.classList.add(`input-invalid`);
        } else if (tel.value.match(window.consts.PHONE_NUMS_ONLY).length > window.consts.PHONE_LENGTH) {
          tel.setCustomValidity(`Номер должен быть длиной ${window.consts.PHONE_LENGTH} цифр, введено: ${tel.value.match(window.consts.PHONE_NUMS_ONLY).length}`);
          tel.classList.add(`input-invalid`);
        } else {
          tel.setCustomValidity(``);
          tel.classList.remove(`input-invalid`);
        }

        localStorage.setItem(`name--modal`, username.value);
        localStorage.setItem(`tel--modal`, tel.value);
        localStorage.setItem(`ask--modal`, textarea.value);
      });
    }
  }
})();
