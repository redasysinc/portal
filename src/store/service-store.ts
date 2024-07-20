// @ts-nocheck
import {create, Mutate, StoreApi, UseBoundStore} from 'zustand';
import {IUser, User} from "../types/user.ts";
import {Appointment, AppointmentType} from "../types/appointment.ts";
import {TimeSlot} from "../types/time-slot.ts";
import api from '../api/api';
import {IProvider} from "../../server/data/schema/provider.ts";

export interface IServiceStore {
    healthCheck?: Function,
    message?: string,
    setMessage: Function,
    serviceType?: AppointmentType,
    setServiceType?: Function,
    provider?: any,
    providers: IProvider[],
    getProviders: Function,
    setProvider?: Function,
    isBooking: Boolean,
    setIsBooking: Function,
    user?: User,
    setUser?: Function,
    appointments?: Appointment[],
    currentAppointment?: Appointment,
    addAppointment: Function,
    getAppointments: Function,
    getOpenTimeslots: Function,
    timeSlots: TimeSlot[],
}

const useServiceStore: UseBoundStore<Mutate<StoreApi<{
    serviceType: null;
    setIsBooking: (value: Boolean) => void;
    getOpenTimeslots: (dt: Date, serviceType) => void;
    appointments: any[];
    getAppointments: (userName: String) => Promise<void>;
    isBooking: boolean;
    currentAppointment: null;
    setProvider: (prof: any) => Promise<void>;
    addAppointment: (apt: { date: string; provider: any; patient: {}; time: any; type: any }) => Promise<void>;
    setServiceType: (s) => any;
    getProviders: () => Promise<void>;
    resetAppointment: () => any;
    getUser: (userName) => Promise<void>;
    timeSlots: {};
    message: string;
    setMessage: (msg: string) => void;
    provider: null;
    healthCheck: () => Promise<void>;
    createUser: (usr: IUser) => Promise<void>;
    setUser: (usr) => void;
    user: {};
    providers: any[]
}>, []>> = create((set) => ({
    serviceType: null,
    setServiceType: s => set((state) => (state.serviceType !== s ? {
        provider: null,
        isBooking: false,
        appointments: [],
        currentAppointment: null,
        serviceType: s
    } : {serviceType: s})),
    provider: null,
    providers: [],
    getProviders: async () => {
        const list = await api.getMedicalProfessionals();
        console.log('store', list)
        set((state)=>({...state, providers: list}))
    },
    setProvider: async (prof: any) => {
        if (!prof._id) {
            const {_id} = await api.createProvider(prof);
            console.log(_id);
            prof._id = _id;
        }
        set((state) => ({provider: prof, isBooking: false, currentAppointment: null}))
    },
    isBooking: false,
    setIsBooking: (value: Boolean) => {
        set((state) => ({isBooking: value}))
    },
    user: {},
    setUser: (usr) => {
        set((state) => ({...state, user: usr}))
    },
    getUser: async (userName) => {
        const user = await api.getUser(userName)
        set((state) => ({...state, user}))
    },
    createUser: async (usr: IUser) => {
        await api.createUser(usr);
    },
    currentAppointment: null,
    appointments: [],
    getAppointments: async (userName: String) => {
        const res = await api.getAppointments(userName)
        set((state) => ({...state, appointments: res}))
    },
    addAppointment: async (apt: { date: string; provider: any; patient: {}; time: any; type: any }) => {
        console.log('addApt', apt)
        await api.saveAppointment(apt)
        set((state) => ({...state, currentAppointment: apt}))
        set((state) => ({...state, appointments: [...state.appointments, apt]}))
    },
    resetAppointment: () => set((state) => ({currentAppointment: null})),
    timeSlots: {},
    getOpenTimeslots: (dt: Date, serviceType) => {
        const d = dt.toString();
        const result = []
        const chanceOfSuccess = serviceType === 'support group' ? 11 : 4;
        dt.setHours(9, 0, 0, 0)
        for (let i = 0; i < 32; i++) {
            const minutes = dt.getMinutes();
            const rnd = ~~(Math.random() * 10)
            let slot = {
                date: dt,
                time: dt.toString().split(' ')[4].split(':').filter((_, i) => (i < 2)).join(':'),
                available: rnd < chanceOfSuccess
            }
            dt.setMinutes(minutes + 15);
            result.push(slot)
        }

        if (serviceType === 'support group') {
            console.log(serviceType, 'if success')
            set((state) => ({...state,
                timeSlots: result.filter((x, i) => {
                    return [10, 20, 30].includes(i)
                })
            }))
        } else {
            set((state) => ({...state, timeSlots: result}))
        }
    },
    message: '',
    setMessage: (msg: string) => {
        set(state => ({...state, message: msg}))
    },
    healthCheck: async () => {
        const msg = await api.healthCheck();
        set((state) => ({...state, message: msg}))
    }
}))


export default useServiceStore;
