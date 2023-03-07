import { Role } from '../enums';

export interface UserPayload {
    id: string;
    name: string;
    lastName: string;
    username: string;
    email: string;
    birthday: Date;
    roles: Role[];
}
