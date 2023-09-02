import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postCssImport from 'postcss-import';
import advancedVariables from 'postcss-advanced-variables';
import nesting from '@tailwindcss/nesting';

export default {
	plugins: [postCssImport(), advancedVariables(), nesting(), tailwindcss(), autoprefixer()]
};
