import { IRegisterUser } from "../../../Interfaces/IRegisterUser"
import { useNavigate } from "react-router-dom";
import { api } from "../../../Services/api";
import { toast } from "react-toastify";

export const useSignUp = () => {
    const navigate = useNavigate();

    const handleSignUp = async (data: IRegisterUser) => {
        try {
            const response = await api.post(`/v1/user`, {
                name: data.name,
                email: data.email,
                password: data.password,
                readTerms: data.readTerms,
                isUserAdmin: data.isUserAdmin || false,
            });
            if (response.status === 201) {
                toast.success(`${response.data.message}`);
                navigate("/register/confirm-email", { state: { email: data.email } })
            } else {
                toast.error("Ocorreu um erro ao registrar o usuário.");
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 403) {
                    toast.error(`${error.response.data.message}`);
                } else if ((error.response.status === 400)) {
                    toast.error(`${error.response.data.message}`);
                }
            } else {
                toast.error(`Não foi possível registrar, tente novamente.`);
            }
        }
    };

    const handleConfirmEmail = async (data: IRegisterUser) => {
        try {
            const response = await api.post(`/v1/user/confirm-register`, {
                email: data.email,
                token: data.tokenEmail,
            });
            if (response.status === 200) {
                toast.success("Registro realizado com sucesso!");
            } else {
                toast.error("O token informado está incorreto, por favor informe o correto.");
            }
            return { data: response.data, status: response.status };
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 403) {
                    toast.error(`${error.response.data[0].message}`);
                } else if ((error.response.status === 400)) {
                    toast.error(`${error.response.data[0].message}`);
                }
            } else {
                toast.error(`${error.response.data[0].message}`);
            }
            return { data: null, status: error.response ? error.response.status : 500 };
        }
    };

    return { handleSignUp, handleConfirmEmail };
}