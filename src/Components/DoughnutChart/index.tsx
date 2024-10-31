import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useDoughnutChartData } from '../../Datasets/DoughnutChartData';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart() {
	const { data, options } = useDoughnutChartData();

	if (!data || !options) {
		return <div>Loading...</div>; // Mensagem de carregamento enquanto os dados estão sendo buscados
	}

	return (
		<div className='h-full w-full flex justify-center items-center'>
			<Doughnut data={data} options={options} />
		</div>
	)
}

