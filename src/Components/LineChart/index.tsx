import { Line } from 'react-chartjs-2';
import { options, data } from '../../Datasets/LineChartData';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export function LineChart(){
    return(
      <Line options={options} data={data} />
    )   
}