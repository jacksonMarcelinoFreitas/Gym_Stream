import { faker } from "@faker-js/faker";

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
	},
	scales: {
		x: {
            grid: {
                display: false,
                drawBorder: false,
                drawOnChartArea: false,
                drawTicks: false,
            },
            title: {
                display: true,
                text: 'Hora',
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

const labels = [
	5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
];

export const data = {
	labels,
	datasets: [
		{
			data: labels.map(() => faker.datatype.number({ min: 0, max: 75 })),
			borderColor: "rgb(88, 0, 235)",
			backgroundColor: "rgb(88, 0, 235)",
			pointStyle: "circle",
			borderJoinStyle: "round" as const, // Arredonda as junções das linhas
			pointRadius: 6 as const, // Tamanho das bolinhas nos pontos
			pointHoverRadius: 16 as const, // Tamanho das bolinhas ao passar o mouse
			borderCapStyle: "round" as const, // Arredonda as pontas da linha
			tension: 0.3, // Para curvas suaves
		},
	],
};
