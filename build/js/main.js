/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./source/js/accordion.js":
/*!********************************!*\
  !*** ./source/js/accordion.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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


/***/ }),

/***/ "./source/js/consts.js":
/*!*****************************!*\
  !*** ./source/js/consts.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

(() => {
  window.consts = {
    TEXT_LIMIT: 225,
    DESKTOP_WIDTH: 1024,
    NUMS_BRACKETS_ONLY: /^\+[7]\([0-9]{3}\)[0-9]{0,8}\d*$/,
    PHONE_NUMS_ONLY: /\d/g,
    KEYDOWN_NUMS_ONLY: /\d/,
    PHONE_LENGTH: 11,
    ESC_KEY: `Escape`,
    BACKSPACE_KEY: `Backspace`,
    TAB_KEY: `Tab`,
    ENTER_KEY: `Enter`
  };
})();


/***/ }),

/***/ "./source/js/form.js":
/*!***************************!*\
  !*** ./source/js/form.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

(() => {
  const form = document.querySelector(`.page-main__form form`);

  if (form) {
    const submitBtn = form.querySelector(`.form__btn`);
    const inputs = form.querySelectorAll(`input`);
    const tel = form.querySelector(`#tel`);
    const username = form.querySelector(`#name`);
    const textarea = form.querySelector(`textarea`);

    let storedName = localStorage.getItem(`name`);
    let storedTel = localStorage.getItem(`tel`);
    let storedText = localStorage.getItem(`ask`);

    username.value = storedName;
    tel.value = storedTel;
    textarea.value = storedText;

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

        localStorage.setItem(`name`, name.value);
        localStorage.setItem(`tel`, tel.value);
        localStorage.setItem(`ask`, textarea.value);
      });
    }
  }
})();


/***/ }),

/***/ "./source/js/modal.js":
/*!****************************!*\
  !*** ./source/js/modal.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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


/***/ }),

/***/ "./source/js/no-js.js":
/*!****************************!*\
  !*** ./source/js/no-js.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

(() => {
  const noJsElems = document.querySelectorAll(`.no-js`);
  if (noJsElems) {
    noJsElems.forEach((elem) => {
      elem.classList.remove(`no-js`);
    });
  }
})();


/***/ }),

/***/ "./source/js/trim_text.js":
/*!********************************!*\
  !*** ./source/js/trim_text.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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


/***/ }),

/***/ 0:
/*!***************************************************************************************************************************************************!*\
  !*** multi ./source/js/no-js.js ./source/js/consts.js ./source/js/modal.js ./source/js/trim_text.js ./source/js/form.js ./source/js/accordion.js ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./source/js/no-js.js */"./source/js/no-js.js");
__webpack_require__(/*! ./source/js/consts.js */"./source/js/consts.js");
__webpack_require__(/*! ./source/js/modal.js */"./source/js/modal.js");
__webpack_require__(/*! ./source/js/trim_text.js */"./source/js/trim_text.js");
__webpack_require__(/*! ./source/js/form.js */"./source/js/form.js");
module.exports = __webpack_require__(/*! ./source/js/accordion.js */"./source/js/accordion.js");


/***/ })

/******/ });