import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData } from 'chart.js';
import { IMovementGymUser } from '../../Interfaces/IMovementGymUser';
import { ILineChartLabelsValues } from './IlineChartLabelsValues';
import { data, options } from '../../Datasets/LineChartData';
import { homeService } from '../../Pages/Service';
import { IGymOpeningHoursLocal } from '../../Interfaces/IGym';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Empty_data_2 } from '../../Assets/images/empty_data_svgs';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export function LineChart() {
	const [totalData, setTotalData] = useState(0)
    const [chartData, setChartData] = useState<ChartData<'line'>>(data);

    useEffect(() => {
        const subscription = homeService.movementGymUserList$.subscribe(movementGymUserList => {
            homeService.gym$.subscribe(gym => {
                if (movementGymUserList.length != 0 && gym) {
                    const gymOpeningHours = homeService.getTimeRangeLocal(gym.startOpeningHoursUTC, gym.endOpeningHoursUTC)
                    const updatedData = generateTimeData(movementGymUserList, gymOpeningHours);
                    setChartData(prevData => ({
                        ...prevData,
                        labels: updatedData.labels,
                        datasets: [
                            {
                                ...prevData.datasets[0],
                                data: updatedData.values,
                            },
                        ],
                    }));
                }
            })
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
		if (chartData && chartData.datasets[0].data.length != 0) {
            console.log(chartData.datasets[0].data)
			let total = 0
			chartData.datasets[0].data.forEach((num: any) => {
				total += num;
			});
			setTotalData(total)
		}
	}, [chartData]);

    return (
        (totalData == 0) ? 
            <div className="h-80 w-full p-8 flex flex-col items-center justify-center gap-4">
				<Empty_data_2/>
				<p className="text-xl font-medium text-gray-500 text-center text-wrap">Ainda não há fluxo de pessoas para hoje.</p>
			</div>
        :
            <div className='h-full w-full' >
                <Line options={options} data={chartData}/>
            </div>
    );
}

function generateTimeData(movementGymUserList: IMovementGymUser[], gym: IGymOpeningHoursLocal): ILineChartLabelsValues {
    const events = movementGymUserList.flatMap((event) => {
        const realTime: boolean = (event.departureDateTime == null || event.isDepartureDate) ? true : false;

        return [
            {
                time: toSeconds(new Date(event.entryDateTime)),
                change: 1,
                realTime: realTime,
                external_id: event.movementGymUserExternalId
            },
            {
                time: event.departureDateTime ? toSeconds(new Date(event.departureDateTime)) : null,
                change: -1,
                realTime: realTime,
                external_id: event.movementGymUserExternalId
            }
        ];
    });

    events.sort((a, b) => (a.time as number) - (b.time as number));

    let currentCountPeople: number = 0;

    let labels: Array<number> = [timeToDecimal(gym.startOpeningHours)]; // Inicia com o horário de abertura da academia
    let values: Array<number> = [0]; // Inicia com o valor 0 no Y

    events.forEach((event) => {
        if (event.time !== null) {
            currentCountPeople += event.change;
            labels.push(toHoursDecimal(event.time));
            values.push(currentCountPeople);
        }
    });

    return { labels, values };
}

function toSeconds(date: Date): number {
    const hours = date.getHours() * 3600;
    const minutes = date.getMinutes() * 60;
    const seconds = date.getSeconds();

    return hours + minutes + seconds;
}

function toHoursDecimal(seconds: number): number {
    const hours = seconds / 3600;
    return parseFloat(hours.toFixed(10));
}

function timeToDecimal(time: string) {
    const [hours, minutes] = time.split(':').map(Number);
    const minutesInDecimal = minutes / 60;
    const hoursInDecimal = hours + minutesInDecimal;

    return hoursInDecimal;
}