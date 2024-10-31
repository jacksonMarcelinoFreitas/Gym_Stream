export interface IUser{
    name: string;
    email: string;
    role: string[];
    externalId: string;
    customer: string;
    exp: number;
    gym: string;
    gymExternalId: string;
    userGymExternalId: string;
    listGyms: Array<any>
}