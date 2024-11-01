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
	const { user } = useAuth()

	useEffect(() => {
		homeService.getMovementGymUser(user);
	}, [])

	return (
		<div className="h-full bg-white">
			<Header />
			<main className="bg-light-color p-4">
				<div className="flex gap-3 -bottom-6 flex-wrap">

					<div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
						<div className="rounded-xl bg-white">
							<CardChart />
						</div>
						<div className="rounded-xl bg-white">
							<CardChart2 />
						</div>
						<div className="rounded-xl bg-white sm:col-span-2 lg:col-span-1">
							<CardChart3 />
						</div>
					</div>

					{user?.role.includes('ADMIN') &&
						<div className="grid gap-3 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 w-full">
							<div className="rounded-xl bg-white" style={{ minHeight: '355px' }}>
								<LineChart />
							</div>
							<div className="rounded-xl bg-white" style={{ minHeight: '355px' }}>
								<BarChartY />
							</div>
						</div>}

					{!user?.role.includes('ADMIN') &&
						<div className="grid gap-3 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 w-full">
							<div className="rounded-xl bg-white" style={{ minHeight: '355px' }}>
								<LineChart />
							</div>
						</div>}

					{user?.role.includes('ADMIN') && <div className="grid gap-3 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 w-full">
						<div className="rounded-xl bg-white" style={{ minHeight: '355px' }}>
							<BarChartX />
						</div>

						{user?.role.includes('ADMIN') &&
							<div className="grid gap-3 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 w-full">
								<div className="rounded-xl bg-white" style={{ minHeight: '355px' }}>
									<PizzaChart />
								</div>
								<div className="rounded-xl bg-white" style={{ minHeight: '355px' }}>
									<DoughnutChart />
								</div>
							</div>}		
					</div>}

					{!user?.role.includes('ADMIN') && <div className="grid gap-3 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 w-full">
						<div className="rounded-xl bg-white" style={{ minHeight: '355px' }}>
							<BarChartX />
						</div>

						<div className="rounded-xl bg-white" style={{ minHeight: '355px' }}>
							<BarChartY />
						</div>

						{user?.role.includes('ADMIN') &&
							<div className="grid gap-3 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 w-full">
								<div className="rounded-xl bg-white" style={{ minHeight: '355px' }}>
									<PizzaChart />
								</div>
								<div className="rounded-xl bg-white" style={{ minHeight: '355px' }}>
									<DoughnutChart />
								</div>
							</div>}		
					</div>}

				</div>
			</main>
		</div>
	);
}
