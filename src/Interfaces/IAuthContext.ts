import { IUser } from './IUser';
import { ICredentials } from '../Interfaces/ICredentials';

export interface IAuthContext{
    user: IUser | null;
    signOut: () => void;
    signIn: (credentials: ICredentials) => Promise<{ status: number; data: any }>;
    // signIn: (credentials: ICredentials) => Promise<void>;
}