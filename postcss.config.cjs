/* eslint-disable @typescript-eslint/no-var-requires */
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postCssImport = require('postcss-import');
const advancedVariables = require('postcss-advanced-variables');
const nesting = require('@tailwindcss/nesting');

module.exports = {
	plugins: [nesting(), autoprefixer(), postCssImport(), advancedVariables(), tailwindcss()]
};
