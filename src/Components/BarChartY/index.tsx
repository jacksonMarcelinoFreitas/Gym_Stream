import { useBarChartYData } from '../../Datasets/BarChartYData';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importe o plugin
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

export function BarChartY() {
	const { data, options } = useBarChartYData();

	if (!data || !options) {
	  return <div>Loading...</div>; // Mensagem de carregamento enquanto os dados estão sendo buscados
	}
	return (
		<div className='h-full w-full flex justify-center items-center'>
			<Bar data={data} options={options} />
		</div>
	)
}