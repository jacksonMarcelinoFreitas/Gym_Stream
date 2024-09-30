import { createContext, useContext, useState, useEffect, ReactNode  } from 'react';
import { IAuthContext }  from '../Interfaces/IAuthContext';
import { ICredentials } from '../Interfaces/Icredentials'
import { IJwtPayload } from '../Interfaces/IJwtPayload'
import { IUser } from '../Interfaces/IUser'
import { toast } from 'react-toastify';
import { api } from '../Services/api';
import { jwtDecode } from 'jwt-decode';

// compartilhará informações aos componentes dentro deste contexto
const AuthContext = createContext<IAuthContext | undefined>(undefined);

function AuthProvider({children}: {children: ReactNode}){
    const [data, setData] = useState<{ user: IUser | null, token: string }>({
        user: null,
        token: '',
    });

    async function signIn({ email, password }: ICredentials){

      try {
        // await new Promise(resolve => setTimeout(resolve, 10000));
        const response = await api.post('/v1/auth/login', { email, password });

        const { token } = response.data;

        const { sub, externalId, name, role, exp } = jwtDecode(token) as IJwtPayload;

        const user = {
          email: sub,
          externalId,
          name,
          role,
          exp
        };

        setData({user, token});

        localStorage.setItem("@gymStream:token", token);
        localStorage.setItem("@gymStream:user", JSON.stringify(user));

        api.defaults.headers.common['Authorization'] = token;

      } catch (error: any) {

        if (error.response) {

          if (error.response.status === 403) {
            toast.error(`${error.response.data.message}`);
          }

        }else{

          toast.error('Não foi possível fazer login!');

        }
      }
    }

    function signOut(){
      localStorage.removeItem("@gymStream:user");
      localStorage.removeItem("@gymStream:token");

      api.defaults.headers.common['Authorization'] = null;

      setData({ user: null, token: '' });
    }

    useEffect(() => {
      const token = localStorage.getItem("@gymStream:token");
      const user = localStorage.getItem("@gymStream:user");

      api.defaults.headers.common['Authorization'] = null;

      if(token && user){
          api.defaults.headers.common['Authorization'] = token;

          setData({
            user: JSON.parse(user),
            token: token,
          });
      }

    }, []);

    return(
      //Aqui todas as páginas filhas herdarão as informações de user (contexto)
      <AuthContext.Provider value={{ signIn, signOut, user: data.user}}>
          {children}
      </AuthContext.Provider>
    )
}

function useAuth(): IAuthContext{
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}

export { AuthProvider, useAuth }
