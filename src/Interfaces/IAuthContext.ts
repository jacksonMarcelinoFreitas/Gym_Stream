import { IUser } from './IUser';
import { ICredentials } from './Icredentials';

export interface IAuthContext{
    user: IUser | null;
    signOut: () => void;
    signIn: (credentials: ICredentials) => Promise<void>;
}