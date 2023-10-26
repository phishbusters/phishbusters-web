import { getColor } from './color';

interface DataSet {
	xLabels: string[];
	dataSets: {
		label: string;
		data: number[];
	}[];
}

export const parseDateTommDDyyyy = (date: Date | string) => {
	let parsedDate: Date | undefined = undefined;
	if (typeof date === 'string') {
		parsedDate = new Date(date);
	}

	if (!date || !parsedDate) {
		return '';
	}

	return `${parsedDate.getMonth() + 1}/${parsedDate.getDate()}/${parsedDate.getFullYear()}`;
};

export const toMultipleDataSet = (
	data: any[],
	xFieldName: string,
	yFieldNames: string[],
	labels: string[],
	formatYLabel?: (values: any) => string
): DataSet => {
	return {
		xLabels: data.map((d) => (formatYLabel ? formatYLabel(d[xFieldName]) : `${d[xFieldName]}`)),
		dataSets: yFieldNames.map((yFieldName, index) => {
			return {
				label: labels[index],
				data: data.map((d) => d[yFieldName])
			};
		})
	};
};

export const toDataSet = (
	data: any[],
	xFieldName: string,
	yFieldName: string,
	label: string,
	formatYLabel?: (values: any) => string
): DataSet => {
	return {
		xLabels: data.map((d) => (formatYLabel ? formatYLabel(d[xFieldName]) : `${d[xFieldName]}`)),
		dataSets: [
			{
				label: label,
				data: data.map((d) => d[yFieldName])
			}
		]
	};
};

const colors = [
	getColor('primary'),
	getColor('emerald.500'),
	getColor('slate.500'),
	getColor('sky.500')
];

const lineChartConfigs = (index: number) => ({
	borderWidth: 2,
	borderColor: getColor('primary'),
	backgroundColor: colors[index],
	pointBorderColor: 'transparent',
	tension: 0.4
});

const stackedBarChartConfig = (index: number) => ({
	barPercentage: 0.5,
	barThickness: 6,
	maxBarThickness: 8,
	minBarLength: 2,
	backgroundColor: colors[index]
});

const chartColors = () => [
	getColor('pending', 0.9),
	getColor('warning', 0.9),
	getColor('primary', 0.9)
];
export const transformDataToPieChart = (chartData: any[], labels: string[]) => {
	return {
		labels: labels,
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
};

export const transformToSingularBarChart = (
	value1: { value: any; label: string },
	value2: { value: any; label: string },
	labels: string[]
) => {
	return {
		labels,
		datasets: [
			{
				label: value1.label,
				barPercentage: 0.5,
				barThickness: 200,
				maxBarThickness: 200,
				minBarLength: 2,
				data: [value1.value],
				backgroundColor: getColor('primary')
			},
			{
				label: value2.label,
				barPercentage: 0.5,
				barThickness: 200,
				maxBarThickness: 200,
				minBarLength: 2,
				data: [value2.value],
				backgroundColor: getColor('slate.300')
			}
		]
	};
};

export const transformDataToLineChartWithDataset = (dataset: DataSet) => {
	return {
		labels: dataset.xLabels,
		datasets: dataset.dataSets.map((dSet, index) => {
			return {
				label: dSet.label,
				data: dSet.data,
				...lineChartConfigs(index)
			};
		})
	};
};

export const transformDataToStackedBarChart = (dataset: DataSet) => {
	return {
		labels: dataset.xLabels,
		datasets: dataset.dataSets.map((dSet, index) => {
			return {
				label: dSet.label,
				data: dSet.data,
				...stackedBarChartConfig(dataset.dataSets.length - index - 1)
			};
		})
	};
};
