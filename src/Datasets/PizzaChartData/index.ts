import { IUser } from "../../Interfaces/IUser";
import { homeService } from "../../Pages/Service";

const storedUser = localStorage.getItem("@gymStream:user");
const user: IUser = storedUser ? JSON.parse(storedUser) : null;

const result = await homeService.getPeopleByPeriodByGenderLast7Days(user)
const period = result.period
const numberPeople = result.numberPeople
export const presenceByGender = result.presenceByGender
export const gender = result.gender

export const data = {
  labels: period,
  datasets: [
    {
      label: 'MANHÃ',
      data: numberPeople,
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
  circumference: 360,
  rotation: 0,
  plugins: {
    title: {
      display: true,
      text: 'Quantidade de pessoas por período dos últimos 7 dias',
      color: '',
      font: { size: 16, weight: 'normal' }
    },
    legend: {
      display: true,
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: 10,
        boxHeight: 8,
      },
    },
    datalabels: {
      // formatter: (value: number, ctx: any) => {
      //   const total = ctx.chart.data.datasets[0].data.reduce((acc: number, curr: number) => acc + curr, 0);
      //   const percentage = Math.round((value / total) * 100) + '%';
      //   return percentage;
      // },
      color: '#fff',
      font: {
        size: 14,
        weight: 'bold' as const,
      },
    },
  },
};

