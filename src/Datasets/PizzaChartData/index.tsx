import { ChartData, ChartOptions } from "chart.js";
import { useEffect, useState } from "react";
import { IUser } from "../../Interfaces/IUser";
import { homeService } from "../../Pages/Service";

export function usePizzaChartData() {
  const [data, setData] = useState<ChartData<'pie'>>({
    labels: [],
    datasets: []
  });
  const [options, setOptions] = useState<ChartOptions<'pie'>>();
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
                label: 'Qtd',
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
            circumference: 360,
            rotation: 0,
            plugins: {
              title: {
                display: true,
                text: 'Últimos 7 dias',
                color: '',
                font: { size: 16, weight: 'normal' }
              },
              legend: {
                display: true,
                position: 'bottom' as const,
                labels: {
                  usePointStyle: true,
                  pointStyle: 'circle',
                  boxWidth: 10,
                  boxHeight: 8,
                },
              },
              datalabels: {
                formatter: (value: number, ctx: any) => {
                  if (value == 0) {
                    return null;
                  } else {
                    return value;
                  }
                },
                color: '#fff',
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