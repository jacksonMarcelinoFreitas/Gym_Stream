import { toast } from "react-toastify";
import { api } from "../../../Services/api";
import { IRegisterUser } from "../../../Interfaces/IRegisterUser"

class SignInService {
    public async handleSignIn(data: IRegisterUser): Promise<void> {
        try {
            const response = await api.post(`/v1/auth/login`, {
                email: data.email,
                password: data.password
            });
            if (response.status === 201) {
                toast.success("Registro realizado com sucesso!");
            } else {
                toast.error("Ocorreu um erro ao registrar o usuário.");
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 403) {
                toast.error(`${error.response.data.message}`);
                }
            } else {
                toast.error('Não foi possível fazer o cadastro!');
            }
        }
    }
};

export const signInService = new SignInService();