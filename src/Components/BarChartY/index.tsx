import { useBarChartYData } from '../../Datasets/BarChartYData';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importe o plugin
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Empty_data_3 } from '../../Assets/images/empty_data_svgs';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ChartDataLabels);

export function BarChartY() {

	const [totalData, setTotalData] = useState(0)
	const { data, options } = useBarChartYData();

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
				<Empty_data_3/>
				<p className="text-xl font-medium text-gray-500 text-center text-wrap">Ainda não há registros de dias anteriores.</p>
			</div>
		:
			<div className='h-full w-full flex justify-center items-center'>
				<Bar data={data} options={options} />
			</div>
	)
}