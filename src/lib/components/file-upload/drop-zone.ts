import Dropzone from 'dropzone';
import type { DropzoneElement, DropzoneProps } from './drop-zone.svelte';

const init = (el: DropzoneElement, props: DropzoneProps) => {
	Dropzone.autoDiscover = false;
	if (!el.dropzone) {
		el.dropzone = new Dropzone(el, props.options);
	}
};

export { init };
