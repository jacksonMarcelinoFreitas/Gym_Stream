import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { data, options } from '../../Datasets/PizzaChartData';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PizzaChart() {
	return (
		<div className='h-full w-full flex justify-center items-center'>
			<Pie data={data} options={options} />
		</div>
	)
}

