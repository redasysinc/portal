export type User = {
    id?: Number,
    userName: string
    firstName?: string,
    middle?: string,
    lastName?: string,
    address?: string,
    phone?:string,
    gender?: string,
    dob?: Date,
    appointments?: Object[]
}

export const defaultUser = {
    id: 1,
    userName: 'JSmith',
    firstName: 'Joe',
        middle: '',
        lastName: 'Smith',
        address: '140 Evergreen Ave Folsom Pa 19026',
        phone:'610.461.2451',
        gender: 'M',
        dob: new Date('12/15/1978'),
        appointments: []
}
