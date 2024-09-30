import { IRegisterUser } from "../../../Interfaces/IRegisterUser"
import { useNavigate } from "react-router-dom";
import { api } from "../../../Services/api";
import { toast } from "react-toastify";

export const useSignUp = () => {
    const navigate = useNavigate();

    const handleSignUp = async (data: IRegisterUser) => {
        try {
            const response = await api.post(`/v1/auth/register`, {
                name: data.name,
                password: data.password,
            });
                if (response.status === 201) {
                navigate("/register/confirmEmail");
            } else {
                toast.error("Ocorreu um erro ao registrar o usuário.");
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 403) {
                    toast.error(`${error.response.data.message}`);
                }
            } else {
                toast.error("Não foi possível fazer o cadastro!");
            }
        }
    };

    const handleConfirmEmail = async (data: IRegisterUser) => {
        try {
            const response = await api.post(`/v1/auth/register/confirmEmail`, {
                email: data.email,
                token: data.tokenEmail,
            });
            if (response.status === 201) {
                toast.success("Registro realizado com sucesso!");
                navigate("/");
            } else {
                toast.error("O token informado está incorreto, por favor informe o correto.");
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 403) {
                    toast.error(`${error.response.data.message}`);
                }
            } else {
                toast.error("Não foi possível confirmar o email!");
            }
        }
    };

    return { handleSignUp, handleConfirmEmail };
}