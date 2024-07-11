// @ts-nocheck
import {create} from 'zustand';
import {User} from "../types/user.ts";
import {Appointment} from "../types/appointment.ts";
import {TimeSlot} from "../types/time-slot.ts";
import api from '../api/api';

export interface ITherapyStore {
    healthCheck: Function,
    message: string,
    setMessage: Function,
    serviceType?: string,
    setServiceType: Function,
    provider?: any,
    setProvider: Function,
    isBooking: Boolean,
    setIsBooking: Function,
    user?: User,
    setUser: Function,
    appointments?: Appointment[],
    currentAppointment?: Appointment,
    addAppointment: Function,
    getOpenTimeslots: Function,
    timeSlots: TimeSlot[],
}

const useServiceStore = create((set) => ({
    serviceType: null,
    setServiceType: s => set((state) => (state.serviceType !== s ? {
        provider: null,
        isBooking: false,
        appointments: [],
        currentAppointment: null,
        serviceType: s
    } : {serviceType: s})),
    provider: null,
    setProvider: (prof: any) => {
        set((state) => ({provider: prof, isBooking: false, currentAppointment: null}))
    },
    isBooking: false,
    setIsBooking: (value: Boolean) => {
        set((state) => ({isBooking: value}))
    },
    user: {},
    setUser: (usr) => {
        set((state) => ({user: usr}))
    },
    currentAppointment: null,
    appointments: [],
    addAppointment: (apt: { date: string; provider: any; patient: {}; time: any; type: any }) => {
        console.log('addApt', apt)
        set((state) => ({currentAppointment: apt}))
        set((state) => ({appointments: [...state.appointments, apt]}))
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
            set((state) => ({
                timeSlots: result.filter((x, i) => {
                    return [10, 20, 30].includes(i)
                })
            }))
        } else {
            set((state) => ({timeSlots: result}))
        }
    },
    message: '',
    setMessage: (msg: string) => {
        set(state => ({message: msg}))
    },
    healthCheck: async () => {
        const msg = await api.healthCheck();
        set((state) => ({message: msg}))
    }
}))


export default useServiceStore;
