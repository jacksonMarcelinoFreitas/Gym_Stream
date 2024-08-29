import { faker } from '@faker-js/faker';

  export const options = {
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
        display: false,
        text: 'Chart.js Line Chart',
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
                  drawBorder: false,
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
  };

  const labels = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 150 })),
        borderColor: "rgb(88, 0, 235)",
        backgroundColor: "rgb(88, 0, 235)",
        borderRadius: 6, // Arredonda as pontas das barras
        // borderSkipped: false // Garante que todas as pontas sejam arredondadas
      }
    ],
  };
