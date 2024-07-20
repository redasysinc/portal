import User from "../../server/data/schema/user.ts";

export interface IUser {
    userName: String
    firstName?: String,
    middle?: String,
    lastName?: String,
    address?: String,
    phone?: String,
    gender?: String,
    dob?: Date,
}

export const defaultUser: IUser = {
    userName: 'GCappelli',
    firstName: 'Gearldine',
    middle: '',
    lastName: 'Cappelli',
    address: '225 Forrest Moon Ct Dover De 19701',
    phone: '302.555.6969',
    gender: 'F',
    dob: '4/7/1998'
}






