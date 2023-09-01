<script context="module" lang="ts">
	import ChartJs, { type ChartData, type ChartTypeRegistry } from 'chart.js/auto';

	export interface ChartElement extends HTMLCanvasElement {
		instance?: ChartJs;
	}

	export type ChartContext = (el: ChartElement) => void;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import type { HTMLCanvasAttributes } from 'svelte/elements';

	interface ChartProps extends HTMLCanvasAttributes {
		width?: number;
		height?: number;
		className?: string;
		type: keyof ChartTypeRegistry;
		data: ChartData;
		options: ChartTypeRegistry[keyof ChartTypeRegistry]['chartOptions'];
		ref?: ChartElement;
	}

	let width: ChartProps['width'] = undefined;
	let height: ChartProps['height'] = undefined;
	let className: ChartProps['className'] = undefined;
	let type: ChartProps['type'];
	let data: ChartProps['data'];
	let options: ChartProps['options'];
	let ref: ChartProps['ref'] = undefined;

	export { width, height, className as class, type, data, options, ref };

	let chartRef: ChartElement;

	const init = (el: ChartElement, props: ChartProps) => {
		const canvas = el?.getContext('2d');
		if (canvas) {
			const chart = new ChartJs(canvas, {
				...props
			});

			// Attach ChartJs instance
			el.instance = chart;
		}
	};

	$: {
		if (data || options) {
			if (chartRef) {
				chartRef.instance.data = data;
				if (options) {
					chartRef.instance.options = options;
				}
				chartRef.instance.update();
			}
		}
	}

	onMount(() => {
		if (chartRef) {
			ref = chartRef;

			init(chartRef, {
				type,
				data,
				options
			});
		}
	});
</script>

<div style:width={`${width}px`} style:height={`${height}px`}>
	<canvas bind:this={chartRef} class={className} {...$$restProps} />
</div>
