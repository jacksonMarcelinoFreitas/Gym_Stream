// import ChartDataLabels from 'chartjs-plugin-datalabels';

export const data = {
	labels: ["Mulher", "Homem"],
	datasets: [
		{
			label: "MANHÃ",
			data: [12, 19],
			backgroundColor: ["#00EBB4", "#5800EB"],
			borderColor: ["rgba(0, 0, 0, 0)"],
			borderWidth: 1,
		},
	],
};

export const options = {
	maintainAspectRatio: false,
	circumference: 360,
	rotation: 0,
	plugins: {
		title: {
			display: true,
			text: "Presença por gênero",
			color: "",
			font: {
				size: 16,
				weight: "bold" as const,
			},
		},
		legend: {
			display: true,
			position: "bottom" as const,
			labels: {
				usePointStyle: true, // Usa bolinhas ao invés de retângulos
				pointStyle: "circle", // Define que o estilo do ponto é circular
				boxWidth: 10,
				boxHeight: 8,
			},
		},
		datalabels: {
			formatter: (value: number, ctx: any) => {
				const total = ctx.chart.data.datasets[0].data.reduce(
					(acc: number, curr: number) => acc + curr,
					0
				);
				const percentage = Math.round((value / total) * 100) + "%";
				return percentage;
			},
			color: "#fff",
			font: {
				size: 14,
				weight: "bold" as const,
			},
		},
	},
};
