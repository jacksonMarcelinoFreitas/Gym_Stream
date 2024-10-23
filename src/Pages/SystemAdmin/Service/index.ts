import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../../Services/api";

export interface IListAllUserGym{
    page: number,
    size: number,
    sort: string,
    startTime?: string,
    finishTime?: string,
}

interface IListAllGyms extends IListAllUserGym{
}

export interface ICreateMovement{
    userGymExternalId: string,
    minutesToLeave: number,
    customerGym: string
}

export const useMovementGymUser = () => {
    const navigate = useNavigate();

    const handleListAllUsersFromGym = async (data: IListAllUserGym) => {
        try {
            const customerGym = 'GYM_TEST'
            const response = await api.get(`/v1/user-gym/${customerGym}`, {
                params: {
                    'page': data.page,
                    'size': data.size,
                    'sort': data.sort,
                    'startTime': data.startTime,
                    'finishTime': data.finishTime
                }
            });
            return { data: response.data, status: response.status };
        } catch (error: any) {
            if (error.response) {
                toast.error(`${error.response.data.message}`);
            } else {
                toast.error(`Não foi possível obter os dados de usuários.`);
            }
            return { data: error.status };
        }
    };

    const handleListAllGyms = async (data: IListAllGyms) => {
        try {
            const response = await api.get('/v1/gym', {
                params: {
                    'page': data.page,
                    'size': data.size,
                    'sort': data.sort,
                }
            });
            return { data: response.data, status: response.status };
        } catch (error: any) {
            if (error.response) {
                toast.error(`${error.response.data.message}`);
            } else {
                toast.error(`Não foi possível obter os dados de usuários.`);
            }
            return { data: error.status };
        }
    };

    const createMovementGymUser = async (data: ICreateMovement) => {
        try {
            const response = await api.post('/v1/movement-gym-user', {
                userGymExternalId: data.userGymExternalId,
                minutes: data.minutesToLeave,
                customerGym: data.customerGym,
            })
            return { data: response.data, status: response.status };
        } catch (error: any) {
            if (error.response) {
                toast.error(`${error.response.data.message}`);
            } else {
                toast.error(`Não foi possível obter os dados de usuários.`);
            }
            return { data: error.status };
        }
        
    }

    return { handleListAllUsersFromGym, handleListAllGyms, createMovementGymUser };
}