import { useEffect, useState } from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { IUser } from '../../Interfaces/IUser';
import { homeService } from '../../Pages/Service';

export function useDoughnutChartDataBestTime() {
  const [data, setData] = useState<ChartData<'doughnut'>>({
    labels: [],
    datasets: []
  });
  const [options, setOptions] = useState<ChartOptions<'doughnut'>>();
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem("@gymStream:user");
        const user: IUser = storedUser ? JSON.parse(storedUser) : null;

        if (user) {
          const result = await homeService.getPeopleByPeriodLast7Days(user);
          const period = result.period
          const numberPeople = result.numberPeople

          // Configurar os dados do gráfico
          setData({
            labels: period,
            datasets: [
              {
                data: numberPeople,
                backgroundColor: [
                  '#00EBB4',
                  '#5800EB',
                  '#a483dd',
                ],
                borderColor: [
                  'rgba(0, 0, 0, 0)',
                ],
                borderWidth: 1,
              },
            ],
          });

          // Configurar as opções do gráfico
          setOptions({
            maintainAspectRatio: false,
            circumference: 180,
            rotation: 270,
            plugins: {
              legend: {
                display: true,
                position: 'bottom' as const,
                labels: {
                  usePointStyle: true,
                  pointStyle: 'circle',
                  boxWidth: 10,
                  boxHeight: 8,
                  color: '',
                  font: {
                    size: 12,
                    weight: 'normal' as const,
                  },
                },
              },
              tooltip: {
                callbacks: {
                  label: function (context: any) {
                    return '';
                  }
                }
              },
              datalabels: {
                formatter: (value: number, context: any) => {
                  const dataset = context.dataset.data;
                  const total = dataset.reduce((acc: number, currentValue: number) => acc + currentValue, 0);
                  const percentage = Math.round((value / total) * 100);
                  return `${percentage}%`;
                },
                color: 'white',
                font: {
                  size: 14,
                  weight: 'bold' as const,
                },
              },
            },
          });
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false); // Define loading como false após a requisição
      }
    };

    fetchData();
  }, []);

  return { data, options, loading }; // Retorna os dados, opções e estado de carregamento
}