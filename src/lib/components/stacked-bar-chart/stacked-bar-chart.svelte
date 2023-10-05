<script lang="ts">
	import type { ChartData, ChartOptions } from 'chart.js/auto';
	import Chart from '../chart/chart.svelte';
	import { getColor } from '$lib/utils/color';
	import { randomNumbers } from '$lib/utils/utils';

	let width: number | undefined = undefined;
	let height: number | undefined = undefined;
	let className: string | undefined = undefined;
	let data: ChartData;

	export { data, width, height, className };

	let options: ChartOptions<'bar'>;

	if (!data) {
		data = {
			labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			datasets: [
				{
					label: 'Html Template',
					barPercentage: 0.5,
					barThickness: 6,
					maxBarThickness: 8,
					minBarLength: 2,
					backgroundColor: getColor('primary'),
					data: randomNumbers(-100, 100, 12)
				},
				{
					label: 'VueJs Template',
					barPercentage: 0.5,
					barThickness: 6,
					maxBarThickness: 8,
					minBarLength: 2,
					backgroundColor: getColor('slate.300'),
					data: randomNumbers(-100, 100, 12)
				}
			]
		};
	}

	$: options = {
		maintainAspectRatio: false,
		plugins: {
			legend: {
				labels: {
					color: getColor('slate.500', 0.8)
				}
			}
		},
		scales: {
			x: {
				stacked: true,
				ticks: {
					font: {
						size: 12
					},
					color: getColor('slate.500', 0.8)
				},
				grid: {
					display: false,
					drawBorder: false
				}
			},
			y: {
				stacked: true,
				ticks: {
					font: {
						size: 12
					},
					color: getColor('slate.500', 0.8),
					callback: function (value) {
						return '$' + value;
					}
				},
				grid: {
					color: getColor('slate.300'),
					borderDash: [2, 2],
					drawBorder: false
				}
			}
		}
	};
</script>

<Chart type="bar" {width} {height} {data} {options} class={className} />
