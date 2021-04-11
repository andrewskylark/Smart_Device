'use strict';
(() => {
  const form = document.querySelector(`.page-main__form form`);

  if (form) {
    const page = document.querySelector(`.page`);
    const submitBtn = form.querySelector(`.form__btn`);
    const inputs = form.querySelectorAll(`input`);
    const tel = form.querySelector(`#tel`);
    const username = form.querySelector(`#name`);
    const textarea = form.querySelector(`textarea`);
    let storedName = localStorage.getItem(`name`);
    let storedTel = localStorage.getItem(`tel`);
    let storedText = localStorage.getItem(`ask`);

    if (storedName) {
      username.value = storedName;
    }
    if (storedTel) {
      tel.value = storedTel;
    }
    if (storedText) {
      textarea.value = storedText;
    }

    if (tel) {
      tel.addEventListener(`focus`, () => {

        if (!window.consts.NUMS_BRACKETS_ONLY.test(tel.value)) {
          tel.value = window.consts.TEL_PREFIX;
        }
      });

      tel.addEventListener(`keydown`, (evt) => {
        let old = 0;

        if (!window.consts.KEYDOWN_NUMS_ONLY.test(evt.key)) {
          evt.preventDefault();
          if (page.classList.contains(`page--ru`)) {
            tel.setCustomValidity(`Только цифры!`);
          } else {
            tel.setCustomValidity(`numbers only!`);
          }

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

    if (submitBtn) {

      submitBtn.addEventListener(`click`, () => {

        for (let input of inputs) {
          if (input.reportValidity() === false) {
            input.classList.add(`input-invalid`);
          } else {
            input.classList.remove(`input-invalid`);
          }
        }

        if (page.classList.contains(`page--ru`)) {
          if (tel.value.length === window.consts.TEL_PREFIX) {
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
        } else {
          if (tel.value.length === window.consts.TEL_PREFIX) {
            tel.setCustomValidity(`Enter your phone number!`);
            tel.classList.add(`input-invalid`);
          } else if (tel.value.match(window.consts.PHONE_NUMS_ONLY).length < window.consts.PHONE_LENGTH) {
            tel.setCustomValidity(`Phone number should be ${window.consts.PHONE_LENGTH} digits, ${window.consts.PHONE_LENGTH - tel.value.match(window.consts.PHONE_NUMS_ONLY).length} more`);
            tel.classList.add(`input-invalid`);
          } else if (tel.value.match(window.consts.PHONE_NUMS_ONLY).length > window.consts.PHONE_LENGTH) {
            tel.setCustomValidity(`Phone number should be ${window.consts.PHONE_LENGTH} digits, now ${tel.value.match(window.consts.PHONE_NUMS_ONLY).length}`);
            tel.classList.add(`input-invalid`);
          } else {
            tel.setCustomValidity(``);
            tel.classList.remove(`input-invalid`);
          }
        }

        localStorage.setItem(`name`, username.value);
        localStorage.setItem(`tel`, tel.value);
        localStorage.setItem(`ask`, textarea.value);
      });
    }
  }
})();
