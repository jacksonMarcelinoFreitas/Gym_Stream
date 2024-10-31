import { useEffect, useState } from 'react';
import { IUser } from '../../Interfaces/IUser';
import { homeService } from '../../Pages/Service';
import { ChartData, ChartOptions } from 'chart.js';

export function useBarChartYData() {
  const [data, setData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: []
  });
  const [options, setOptions] = useState<ChartOptions<'bar'>>();
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem("@gymStream:user");
        const user: IUser = storedUser ? JSON.parse(storedUser) : null;

        if (user) {
          const result = await homeService.getNumberPeopleLast7days(user)
          const labels = result.days
          const numberPeople = result.numberPeople

          // Configurar os dados do gráfico
          setData({
            labels,
            datasets: [
              {
                label: 'Qtd',
                data: numberPeople,
                borderColor: "rgb(88, 0, 235)",
                backgroundColor: "rgb(88, 0, 235)",
                borderRadius: 6, // Arredonda as pontas das barras
                // borderSkipped: false // Garante que todas as pontas sejam arredondadas
              }
            ],
          });

          // Configurar as opções do gráfico
          setOptions({
            maintainAspectRatio: false,
            responsive: true,
            datasets: {
              bar: {
                barThickness: 32, // Espessura fixa das barras
                maxBarThickness: 32, // Espessura máxima das barras
                minBarLength: 0, // Comprimento mínimo da barra
              },
            },
            plugins: {
              legend: {
                display: false,
                position: 'top' as const,
              },
              title: {
                text: 'Últimos 7 dias',
                display: true,
                align: 'center',
                color: '#000000',
                padding: { bottom: 20 },
                font: { size: 16, weight: 'normal' }
              },
              datalabels: {
                anchor: 'end' as const,
                align: 'start' as const,
                color: "white",
                font: {
                  size: 14,
                  weight: 'bold' as const,
                },
                display: function (context: any) {
                  const value = context.dataset.data[context.dataIndex];

                  return value !== 0;
                }
              },
            },
            scales: {
              x: {
                grid: {
                  display: true,
                  // drawBorder: false,
                  drawOnChartArea: false,
                  drawTicks: false,
                },
                title: {
                  display: true,
                  text: 'Dias da semana',
                  color: '#333', // Cor do texto
                  font: {
                    size: 16, // Tamanho da fonte
                    weight: 'bold' as const, // Peso da fonte
                    family: 'Arial', // Família da fonte
                  },
                  padding: {
                    top: 10, // Espaçamento acima do título
                    bottom: 10, // Espaçamento abaixo do título
                  }
                }
              },
              y: {
                title: {
                  display: true,
                  text: "Pessoas",
                  color: '#333', // Cor do texto
                  font: {
                    size: 16, // Tamanho da fonte
                    weight: 'bold' as const, // Peso da fonte
                    family: 'Arial', // Família da fonte
                  },
                  padding: {
                    top: 10, // Espaçamento acima do título
                    bottom: 10, // Espaçamento abaixo do título
                  }
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
