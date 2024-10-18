import { Header } from "../../Components/Header";
import { CardChart } from "../../Components/CardChart";
import { CardChart2 } from "../../Components/CardChart2";
import { CardChart3 } from "../../Components/CardChart3";
import { LineChart } from "../../Components/LineChart";
import { BarChartY } from "../../Components/BarChartY";
import { BarChartX } from "../../Components/BarChartX";
import { PizzaChart } from "../../Components/PizzaChart";
import { DoughnutChart } from "../../Components/DoughnutChart";
import { useEffect } from "react";
import { homeService } from "../Service"; 
import { useAuth } from "../../Hooks/auth";

export function Home() {

	useEffect(() => {
		homeService.getMovementGymUser();
	},[])
	 
	return (
		<div className="h-screen bg-white">
			<Header />
			<main className="h-[calc(100vh-3.5rem)] bg-light-color p-4">
				<div className="w-full h-full grid grid-cols-2 grid-rows-[1fr_2fr_2fr] gap-4">
					<div className="grid grid-cols-2 gap-4 row-span-1">
						<div className="w-full h-full rounded-xl overflow-hidden bg-white">
							<CardChart />
						</div>
						<div className="w-full h-full rounded-xl overflow-hidden bg-white">
							<CardChart2 />
						</div>
					</div>
					<div className="w-full h-full rounded-xl overflow-hidden bg-white">
						<CardChart3 />
					</div>
					<div className="w-full h-full rounded-xl flex justify-center items-center p-4 bg-white">
					{/* <div style={{minWidth: '137vh', minHeight: '85vh'}} className="w-full h-full rounded-xl flex justify-center items-center p-4 bg-white"> */}
						<LineChart />
					</div>
					<div className="w-full h-full rounded-xl flex justify-center items-center p-4 bg-white">
						<BarChartY />
					</div>
					<div className="w-full h-full rounded-xl flex justify-center items-center p-4 bg-white">
						<BarChartX />
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="w-full h-full rounded-xl flex justify-center items-center p-4 bg-white">
							<PizzaChart />
						</div>
						<div className="w-full h-full rounded-xl flex justify-center items-center p-4 bg-white">
							<DoughnutChart />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
