import { data, options } from '../../Datasets/BarChartXData';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

export function BarChartX() {
	return (
		<div className='h-full w-full flex justify-center items-center'>
			<Bar data={data} options={options} />
		</div>
	)
}