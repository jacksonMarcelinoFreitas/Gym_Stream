import { useEffect, useState } from "react";
import { IUser } from "../../Interfaces/IUser";
import { homeService } from "../../Pages/Service";
import { ChartData, ChartOptions } from "chart.js";

export function useBarChartXData() {
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
          const result = await homeService.getNumberPeopleByPeriodPreviousDay(user);
          const labels = result.period;
          const numberPeople = result.numberPeople;

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
                barThickness: 36, // Espessura fixa das barras
                maxBarThickness: 36, // Espessura máxima das barras
                minBarLength: 0, // Comprimento mínimo da barra
              }
            ],
          });

          // Configurar as opções do gráfico
          setOptions({
            maintainAspectRatio: false,
            responsive: true,
            indexAxis: 'y' as const,
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
                display: true,
                text: 'Dia anterior',
                align: 'center',
                color: '#000000',
                padding: { bottom: 20, top: 10 },
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
              },
            },
            scales: {
              x: {
                grid: {
                    display: true,
                    // drawBorder: true,
                    drawOnChartArea: true,
                    drawTicks: true,
                },
                title: {
                    display: true,
                    text: 'Quantidade de pessoas',
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
                grid: {
                  display: false,
                  // drawBorder: false,
                  drawOnChartArea: false,
                  drawTicks: false,
                },
                title: {
                  display: true,
                  text: "Período",
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
                ticks: {
                  // Ajusta o espaçamento entre os rótulos e as barras
                  padding: 20, // Aumenta o espaçamento dos rótulos
                  font: {
                      size: 14, // Tamanho da fonte dos rótulos do eixo Y
                      weight: 'bold' as const,
                  },
              },
        
              },
            },
            layout: {
              padding: {
                right: 20
              }
            }
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