import { ChartData, ChartOptions } from "chart.js";
import { useEffect, useState } from "react";
import { homeService } from "../../Pages/Service";
import { IUser } from "../../Interfaces/IUser";

export function useDoughnutChartData() {
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
			const result = await homeService.getPeopleByGenderLast7Days(user);
			const gender = result.gender
			const presenceByGender = result.presenceByGender
			
			setData({
				labels: gender,
				datasets: [
					{
						label: "Qtd",
						data: presenceByGender,
						backgroundColor: ["#00EBB4", "#5800EB"],
						borderColor: ["rgba(0, 0, 0, 0)"],
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
						text: "Últimos 7 dias",
						color: "",
						font: { size: 16, weight: 'normal' }
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
			
							if (parseInt(percentage) == 0) {
								return null;
							} else {
								return percentage;
							}
						},
						color: "#fff",
						font: {
							size: 14,
							weight: "bold" as const,
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