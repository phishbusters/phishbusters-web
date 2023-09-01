<script lang="ts">
	import type { ChartData, ChartOptions } from 'chart.js/auto';
	import Chart from '../chart/chart.svelte';
	import { getColor } from '$lib/utils/color';

	let width: number | undefined = undefined;
	let height: number | undefined = undefined;
	let className: string | undefined = undefined;

	export { width, height, className as class };

	const chartData = [15, 10, 65];
	const chartColors = () => [
		getColor('pending', 0.9),
		getColor('warning', 0.9),
		getColor('primary', 0.9)
	];

	let data: ChartData;
	let options: ChartOptions<'pie'>;

	$: data = {
		labels: ['Linkedin', 'Instagram', 'Twitter'],
		datasets: [
			{
				data: chartData,
				backgroundColor: chartColors(),
				hoverBackgroundColor: chartColors(),
				borderWidth: 5,
				borderColor: getColor('darkmode.700')
			}
		]
	};

	$: options = {
		maintainAspectRatio: false,
		plugins: {
			legend: {
				labels: {
					color: getColor('slate.500', 0.8)
				}
			}
		}
	};
</script>

<Chart type="pie" {width} {height} {data} {options} class={className} />
