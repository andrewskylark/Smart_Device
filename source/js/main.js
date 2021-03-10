'use strict';
const TEXT_LIMIT = 225;
const DESKTOP_WIDTH = 1024;
const NUMS_BRACKETS_ONLY = /^\+[7]\([0-9]{3}\)[0-9]{0,8}\d*$/;
const PHONE_NUMS_ONLY = /\d/g;
const KEYDOWN_NUMS_ONLY = /\d/;
const PHONE_LENGTH = 11;
const ESC_KEY = `Escape`;
const BACKSPACE_KEY = `Backspace`;
const TAB_KEY = `Tab`;
const ENTER_KEY = `Enter`;

(() => {
  const noJsElems = document.querySelectorAll(`.no-js`);

  if (noJsElems) {
    noJsElems.forEach((elem) => {
      elem.classList.remove(`no-js`);
    });
  }
})();

(() => {
  const accBtns = document.querySelectorAll(`.accordion-btn`);

  if (accBtns) {
    for (let btn of accBtns) {

      btn.addEventListener(`click`, () => {
        let panel = btn.nextElementSibling;

        if (panel.classList.contains(`accordion-content--active`)) {
          panel.classList.remove(`accordion-content--active`);
        } else {
          let active = document.querySelector(`.accordion-content--active`);
          if (active) {
            active.classList.remove(`accordion-content--active`);
          }
          panel.classList.add(`accordion-content--active`);
        }
      });
    }
  }
})();

(() => {
  const btn = document.querySelector(`.btn--about`);
  const p = document.querySelector(`#about p:last-of-type`);
  const initialText = p.textContent;

  const trimText = (thisText) => {
    thisText = thisText.slice(0, TEXT_LIMIT);

    let lastSpace = thisText.lastIndexOf(` `);

    if (lastSpace > 0) {
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
  };

  if (btn) {
    btn.addEventListener(`click`, adjustText);
  }
  if (p) {

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
  }
})();

(() => {
  const modal = document.querySelector(`.modal`);
  const modalClose = modal.querySelector(`.modal__close`);
  const modalOpen = document.querySelector(`.page-header__btn`);
  const form = modal.querySelector(`form`);
  const submitBtn = form.querySelector(`.form__btn--submit`);
  const inputs = form.querySelectorAll(`input`);
  const tel = form.querySelector(`#tel--modal`);
  const name = form.querySelector(`#name--modal`);
  const textarea = form.querySelector(`textarea`);

  const isEscEvt = (evt, action) => {
    if (evt.key === ESC_KEY) {
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

    modalOpen.addEventListener(`click`, () => {
      // event.preventDefault();

      openModal();

      name.value = storedName;
      tel.value = storedTel;
      textarea.value = storedText;

      name.focus();

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

          if (!NUMS_BRACKETS_ONLY.test(tel.value)) {
            tel.value = `+7(`;
          }
        });

        tel.addEventListener(`keydown`, (evt) => {
          let old = 0;
          if (!KEYDOWN_NUMS_ONLY.test(evt.key)) {
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

          if ((evt.key === BACKSPACE_KEY) && (tel.value !== `+7(`)) {
            tel.value = tel.value.substring(0, tel.value.length - 1);
            tel.setCustomValidity(``);
          }
          if (evt.key === TAB_KEY) {
            textarea.focus();
            tel.setCustomValidity(``);
          }
          if (evt.key === ENTER_KEY) {
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
        } else if (tel.value.match(PHONE_NUMS_ONLY).length < PHONE_LENGTH) {
          tel.setCustomValidity(`Номер должен быть длиной ${PHONE_LENGTH} цифр, еще ${PHONE_LENGTH - tel.value.match(PHONE_NUMS_ONLY).length}`);
          tel.classList.add(`input-invalid`);
        } else if (tel.value.match(PHONE_NUMS_ONLY).length > PHONE_LENGTH) {
          tel.setCustomValidity(`Номер должен быть длиной ${PHONE_LENGTH} цифр, введено: ${tel.value.match(PHONE_NUMS_ONLY).length}`);
          tel.classList.add(`input-invalid`);
        } else {
          tel.setCustomValidity(``);
          tel.classList.remove(`input-invalid`);
        }

        localStorage.setItem(`name--modal`, name.value);
        localStorage.setItem(`tel--modal`, tel.value);
        localStorage.setItem(`ask--modal`, textarea.value);
      });
    }
  }
})();

(() => {
  const form = document.querySelector(`.page-main__form form`);
  const submitBtn = form.querySelector(`.form__btn`);
  const inputs = form.querySelectorAll(`input`);
  const tel = form.querySelector(`#tel`);
  const name = form.querySelector(`#name`);
  const textarea = form.querySelector(`textarea`);

  if (form) {
    let storedName = localStorage.getItem(`name`);
    let storedTel = localStorage.getItem(`tel`);
    let storedText = localStorage.getItem(`ask`);

    name.value = storedName;
    tel.value = storedTel;
    textarea.value = storedText;
  }

  if (tel) {
    tel.addEventListener(`focus`, () => {

      if (!NUMS_BRACKETS_ONLY.test(tel.value)) {
        tel.value = `+7(`;
      }
    });

    tel.addEventListener(`keydown`, (evt) => {
      let old = 0;
      if (!KEYDOWN_NUMS_ONLY.test(evt.key)) {
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

      if ((evt.key === BACKSPACE_KEY) && (tel.value !== `+7(`)) {
        tel.value = tel.value.substring(0, tel.value.length - 1);
        tel.setCustomValidity(``);
      }
      if (evt.key === TAB_KEY) {
        textarea.focus();
        tel.setCustomValidity(``);
      }
      if (evt.key === ENTER_KEY) {
        form.submit();
        tel.setCustomValidity(``);
      }
      tel.reportValidity();
    });
  }

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
      } else if (tel.value.match(PHONE_NUMS_ONLY).length < PHONE_LENGTH) {
        tel.setCustomValidity(`Номер должен быть длиной ${PHONE_LENGTH} цифр, еще ${PHONE_LENGTH - tel.value.match(PHONE_NUMS_ONLY).length}`);
        tel.classList.add(`input-invalid`);
      } else if (tel.value.match(PHONE_NUMS_ONLY).length > PHONE_LENGTH) {
        tel.setCustomValidity(`Номер должен быть длиной ${PHONE_LENGTH} цифр, введено: ${tel.value.match(PHONE_NUMS_ONLY).length}`);
        tel.classList.add(`input-invalid`);
      } else {
        tel.setCustomValidity(``);
        tel.classList.remove(`input-invalid`);
      }

      localStorage.setItem(`name`, name.value);
      localStorage.setItem(`tel`, tel.value);
      localStorage.setItem(`ask`, textarea.value);
    });
  }
})();
