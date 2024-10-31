import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { usePizzaChartData } from '../../Datasets/PizzaChartData';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PizzaChart() {
	const { data, options } = usePizzaChartData();

	if (!data || !options) {
		return <div>Loading...</div>; // Mensagem de carregamento enquanto os dados estão sendo buscados
	  }

	return (
		<div className='h-full w-full flex justify-center items-center'>
			<Pie data={data} options={options} />
		</div>
	)
}