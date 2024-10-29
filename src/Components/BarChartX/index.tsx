// import { data, options } from '../../Datasets/BarChartXData';
// import { Bar } from 'react-chartjs-2';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

// export function BarChartX() {
// 	return (
// 		<div className='h-full w-full flex justify-center items-center'>
// 			<Bar data={data} options={options} />
// 		</div>
// 	)
// }

import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { useBarChartData } from '../../Datasets/BarChartXData'; // Ajuste o caminho conforme necessário

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

export function BarChartX() {
  const { data, options } = useBarChartData();

  if (!data || !options) {
    return <div>Loading...</div>; // Mensagem de carregamento enquanto os dados estão sendo buscados
  }

  return (
    <div className='h-full w-full flex justify-center items-center'>
      <Bar data={data} options={options} />
    </div>
  );
}
