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
                // navigate("/register/confirmEmail");
                navigate("/register/confirmEmail", { state: { email: data.email } })
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
                navigate("/");
            } else {
                toast.error("O token informado está incorreto, por favor informe o correto.");
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 403) {
                    toast.error(`${error.response.data.message}`);
                    navigate("/");
                } else if ((error.response.status === 400)) {
                    toast.error(`${error.response.data.message}`);
                }
            } else {
                toast.error(`${error.response.data.message}`);
            }
        }
    };

    return { handleSignUp, handleConfirmEmail };
}