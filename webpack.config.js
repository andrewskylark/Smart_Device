'use strict';

const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: [
    `./source/js/no-js.js`,
    `./source/js/consts.js`,
    `./source/js/modal.js`,
    `./source/js/scroll.js`,
    `./source/js/trim_text.js`,
    `./source/js/form.js`,
    `./source/js/accordion.js`
  ],
  output: {
    filename: `main.js`,
    path: path.resolve(__dirname, `./build/js`)
    // iife: true
  },
  devtool: false
};
