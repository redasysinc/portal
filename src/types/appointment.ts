import {User} from "./user.ts";

export type Appointment = {
    id?: Number,
    type: AppointmentType,
    date: string,
    patient?: User,
    provider: any
}

export enum AppointmentType {
    therapy,
    support,
    mental,
    family,
    primary
}

export const stringValue = (e: AppointmentType) => {
    switch (e) {
        case AppointmentType.therapy:
            return "therapy"
        case AppointmentType.support:
            return "support group"
        case AppointmentType.mental:
            return 'psychiatric care'
        case AppointmentType.family:
            return 'reproductive health care'
        case AppointmentType.primary:
            return 'primary care'
    }
}
