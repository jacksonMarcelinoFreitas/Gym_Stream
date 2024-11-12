import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { usePizzaChartData } from '../../Datasets/PizzaChartData';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { Empty_data_2 } from '../../Assets/images/empty_data_svgs';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PizzaChart() {
	const [totalData, setTotalData] = useState(0)
	const { data, options } = usePizzaChartData();

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
			<Empty_data_2/>
			<p className="text-xl font-medium text-gray-500 text-center">Ainda não há dados</p>
		</div>
		:
		<div className='h-full w-full flex justify-center items-center'>
			<Pie data={data} options={options} />
		</div>
	)
}