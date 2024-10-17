import { ILoginUser } from "../../../Interfaces/ILoginUser"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from '../../../Hooks/auth';

export const useSignIn = () => {
    const navigate = useNavigate();
    const { signIn } = useAuth()

    const handleSignIn = async (data: ILoginUser) => {
        try {
            const response = await signIn({login: data.login, password: data.password, isLoginConfirmation: false})
            if(response.status === 200){
                if(response.data.admin == true){
                    toast.success('Seja bem vindo administrador!')
                    navigate('/')
                }else{
                    navigate('/login/selectGym', { state: { login: data.login, password: data.password } })
                }
            }else{
                toast.error(`${response.data.message}`);
            }
        } catch (error: any) {
            if (error.response) {
                toast.error(`${error.response.data.message}`);
            } else {
                toast.error(`Não foi possível registrar, tente novamente.`);
            }
        }
    };

    return { handleSignIn };
}