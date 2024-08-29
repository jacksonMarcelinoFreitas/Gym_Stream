export const data = {
  labels: ['Manhã','Tarde','Noite'],
  datasets: [
    {
      // label: ['MANHÃ','TARDE','NOITE'],
      data: [3, 19, 16],
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
};

export const options = {
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
};

