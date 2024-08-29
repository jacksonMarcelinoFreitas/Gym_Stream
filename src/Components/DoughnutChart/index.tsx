import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { data, options } from '../../Datasets/DoughnutChartData';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart() {
	return (
		<div className='h-full w-full flex justify-center items-center'>
			<Doughnut data={data} options={options} />
		</div>
	)
}

