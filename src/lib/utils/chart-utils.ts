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
	getColor('slate.500'),
	getColor('secondary'),
	getColor('slate.200')
];

const lineChartConfigs = {
	borderWidth: 2,
	borderColor: getColor('primary'),
	backgroundColor: 'transparent',
	pointBorderColor: 'transparent',
	tension: 0.4
};

const stackedBarChartConfig = (index: number) => ({
	barPercentage: 0.5,
	barThickness: 6,
	maxBarThickness: 8,
	minBarLength: 2,
	backgroundColor: colors[index]
});

export const transformDataToLineChart = (dataset: DataSet) => {
	return {
		labels: dataset.xLabels,
		datasets: dataset.dataSets.map((dSet) => {
			return {
				label: dSet.label,
				data: dSet.data,
				...lineChartConfigs
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
				...stackedBarChartConfig(index)
			};
		})
	};
};
