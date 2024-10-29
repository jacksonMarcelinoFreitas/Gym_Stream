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
      label: 'Qtd',
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
      text: 'Últimos 7 dias',
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
      formatter: (value: number, ctx: any) => {
        if (value == 0) {
          return null;
        } else {
          return value;
        }
      },
      color: '#fff',
      font: {
        size: 14,
        weight: 'bold' as const,
      },
    },
  },
};

