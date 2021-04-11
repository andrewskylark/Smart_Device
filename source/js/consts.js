'use strict';
(() => {
  window.consts = {
    TEXT_LIMIT: 225,
    DESKTOP_WIDTH: 1024,
    NUMS_BRACKETS_ONLY: /^\+[7]\([0-9]{3}\)[0-9]{0,8}\d*$/,
    PHONE_NUMS_ONLY: /\d/g,
    KEYDOWN_NUMS_ONLY: /\d/,
    PHONE_LENGTH: 11,
    TEL_PREFIX: `+7(`,
    ESC_KEY: `Escape`,
    BACKSPACE_KEY: `Backspace`,
    TAB_KEY: `Tab`,
    ENTER_KEY: `Enter`
  };
})();
