import { Bar } from 'react-chartjs-2';
import { options, data } from '../../Datasets/BarChartData';
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

export function BarChart(){
    return(
      <Bar options={options} data={data} />
    )   
}