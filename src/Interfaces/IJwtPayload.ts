export interface IJwtPayload {
    sub: string
    exp: number;
    name: string
    role: string[];
    externalId: string
}