import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { data, options } from '../../Datasets/DoughnutCardChartData';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export function CardChart3() {
	return (
		<div className="h-full px-4 py-2 flex justify-between items-center overflow-hidden relative">
			<div>
				<p className="text-lg font-medium">Melhor período para o seu treino</p>
				<p className="text-5xl text-violet-primary font-bold">MANHÃ</p>
			</div>
			<div className='h-full w-3/6 py-2 flex justify-center items-center'>
				<Doughnut data={data} options={options} />
			</div>
		</div>
	)
}

