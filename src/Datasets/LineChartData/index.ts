export const options = {
	maintainAspectRatio: false,
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		customCanvasBackgroundColor: {
			color: "lightGreen",
		},
		tooltip: {
			callbacks: {
				label: function (context: any) {
					const index = context.dataIndex;

					const time = formatHour(parseFloat(context.label.replace(',', '.')));
					const count = context.dataset.data[index];

					return `Hora: ${time}, Pessoas: ${count}`;
				},
				title: function (tooltipItems: any) {
					const item = tooltipItems[0];
					const lastIndex = item.dataset.data.length - 1;
					
					if (item.dataIndex === lastIndex) {
					  return 'Útima atualização';
					}
					
					return '';
				},
			}
		},
		datalabels: {
			display: false
		}
	},
	scales: {
		x: {
			type: 'linear' as const,
			ticks: {
				stepSize: 1,
				callback: (value: any) => formatHour(value),
			},
			grid: {
				display: false,
				drawBorder: false,
				drawOnChartArea: false,
				drawTicks: false,
			},
			title: {
				display: true,
				text: 'Hora',
				color: '#333',
				font: {
					size: 16,
					weight: 'bold' as const,
					family: 'Arial',
				},
				padding: {
					top: 10,
					bottom: 10,
				}
			}
		},
		y: {
			title: {
				display: true,
				text: "Pessoas",
				color: '#333',
				font: {
					size: 16,
					weight: 'bold' as const,
					family: 'Arial',
				},
				padding: {
					top: 10,
					bottom: 10,
				}
			},
			ticks: {
				callback: function(value: any) {
					if (Number.isInteger(value)) {
						return value;
					}
					return null;
				}
			},
			beginAtZero: true
		},
	},
};

const labels: any = [];

export const data = {
	labels,
	datasets: [
		{
			data: [],
			borderColor: "rgb(88, 0, 235)",
			backgroundColor: "rgb(88, 0, 235)",
			pointStyle: "circle",
			borderJoinStyle: "round" as const,
			pointHoverRadius: 6 as const,
			borderCapStyle: "round" as const,
			tension: 0.05, // Para curvas suaves,

			//Destaca o último ponto
			pointBackgroundColor: function(context: any) {
				const index = context.dataIndex;
				const lastIndex = context.dataset.data.length - 1;

				return index === lastIndex ? 'green' : 'blue';
			},
			pointBorderColor: function(context: any) {
				const index = context.dataIndex;
				const lastIndex = context.dataset.data.length - 1;
				
				return index === lastIndex ? 'black' : 'blue';
			},
			pointRadius: function(context: any) {
				const index = context.dataIndex;
				const lastIndex = context.dataset.data.length - 1;

				return index === lastIndex ? 6 : 3;
			},
		},
	],
};

function formatHour(hour: number): string {
    const hours = Math.floor(hour);
    const minutes = Math.floor((hour - hours) * 60);

    return `${hours}:${minutes.toString().padStart(2, '0')}`;
}