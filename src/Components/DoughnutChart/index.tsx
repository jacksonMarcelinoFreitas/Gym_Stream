import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDoughnutChartData } from '../../Datasets/DoughnutChartData';
import { Empty_data_1 } from '../../Assets/images/empty_data_svgs';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart() {
	const [totalData, setTotalData] = useState(0)
	const { data, options } = useDoughnutChartData();

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
		<div className="h-60 flex flex-col items-center justify-center gap-4">
			<Empty_data_1/>
			<p className="text-xl font-medium text-gray-500 text-center">Ainda não há dados</p>
		</div>
		:
		<div className='h-full w-full flex justify-center items-center'>
			<Doughnut data={data} options={options} />
		</div>
	)
}

