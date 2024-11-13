import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDoughnutChartDataBestTime } from '../../Datasets/DoughnutCardChartData';
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { Empty_data_4 } from '../../Assets/images/empty_data_svgs';

ChartJS.register(ArcElement, Tooltip, Legend);


export function CardChart3() {
	const [totalData, setTotalData] = useState(0)
	const { data, options } = useDoughnutChartDataBestTime();

	useEffect(() => {
		if (data && data.datasets.length != 0) {
			let total = 0
			data.datasets[0].data.forEach((num: any) => {
				total += num;
			});
			setTotalData(total)
		}
	}, [data]);

	return (
		(totalData == 0) ? 
		<div className="h-[150px] px-4 py-4 flex justify-center items-center overflow-hidden relative">
			<div className="h-full w-fit flex items-center justify-center gap-2">
				<p className="text-xl font-medium text-gray-500 text-center">Ainda não há dados.</p>
				<Empty_data_4/>
			</div>
		</div>
		:
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

