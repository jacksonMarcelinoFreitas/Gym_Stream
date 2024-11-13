import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDoughnutChartDataBestTime } from '../../Datasets/DoughnutCardChartData';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export function CardChart3() {
	const { data, options } = useDoughnutChartDataBestTime();

	if (!data || !options) {
		return <div>Loading...</div>; // Mensagem de carregamento enquanto os dados estão sendo buscados
	}

	return (
		<div className="h-full px-4 py-2 flex justify-between items-center overflow-hidden relative">
			<div className='py-2' style={{alignSelf: 'start'}}>
				<p className="text-lg font-medium">Melhor período para o seu treino</p>
				<p className="text-4xl text-violet-primary font-bold">MANHÃ</p>
			</div>
			<div className='h-full w-3/6 py-2 flex justify-center items-center'>
				<Doughnut data={data} options={options} />
			</div>
		</div>
	)
}

