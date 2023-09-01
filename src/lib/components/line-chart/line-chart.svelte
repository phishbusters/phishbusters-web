<script lang="ts">
	import type { ChartData, ChartOptions } from 'chart.js/auto';
	import Chart from '../chart/chart.svelte';
	import { getColor } from '$lib/utils/color';

	let width: number | undefined = undefined;
	let height: number | undefined = undefined;
	let className: string | undefined = undefined;

	export { width, height, className as class };

	let data: ChartData;
	let options: ChartOptions<'line'>;

	$: data = {
		labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
		datasets: [
			{
				label: 'Impersonificaciones detectadas por mes',
				data: [0, 200, 250, 200, 500, 450, 850, 1050, 950, 1100, 900, 1200],
				borderWidth: 2,
				borderColor: getColor('primary'),
				backgroundColor: 'transparent',
				pointBorderColor: 'transparent',
				tension: 0.4
			},
			{
				label: 'Perfiles falsos detectados por mes',
				data: [0, 300, 400, 560, 320, 600, 720, 850, 690, 805, 1200, 1010],
				borderWidth: 2,
				borderDash: [2, 2],
				borderColor: getColor('slate.400', 0.6),
				backgroundColor: 'transparent',
				pointBorderColor: 'transparent',
				tension: 0.4
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
		},
		scales: {
			x: {
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
				ticks: {
					font: {
						size: 12
					},
					color: getColor('slate.500', 0.8),
					callback: function (value) {
						return value;
					}
				},
				grid: {
					color: getColor('slate.500', 0.3),
					borderDash: [2, 2],
					drawBorder: false
				}
			}
		}
	};
</script>

<Chart type="line" {width} {height} {data} {options} class={className} />
