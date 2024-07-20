import {IAppointment} from "../../src/types/appointment";
import Appointment from "./schema/appointment";
import User from "./schema/user";
import {IUser} from "../../src/types/user";
import Professional from "./schema/professional";
import Provider from "./schema/provider";

const getAppointmentsForUser = async (userName) => {
    const result = await Appointment.find()
    return result
}

const createAppointment = async (apt: IAppointment) => {
    const mApt = new Appointment({
        type: apt.type,
        date: new Date(apt.date),
        patient: apt.patient,
        provider: apt.provider
    });

    console.log('db saving', mApt)
    try {
        const result = await Appointment.create(mApt);
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}

const getUser = async (id) => {
    const result = await User.find({userName: id})
    console.log('db fetched', result)
    return result
}

const createUser = async (user: IUser) => {
    const newUser = new User({
        userName: user.userName,
        firstName: user.firstName,
        middle: user.middle,
        lastName: user.lastName,
        address: user.address,
        phone: user.phone,
        gender: user.gender,
        dob: user.dob
    })

    try {
        await User.create(newUser)
    } catch (err) {
        console.log(err)
    }
}
const providerList = async ()=>{
    return await Provider.find()
}
const getProvider = async (id) => {
    const result = await Provider.find({_id: id})
    return result
}

const setProps = (obj)=>{
    let result = new Professional({...obj})
    Object.keys(obj).forEach(key=>{
        if(Object.keys(obj[key]).length){setProps(obj[key])}
        result[key]=obj[key]
    })

    console.log('db object',result)
    return result
}

const createProvider = async (provider) => {
    console.log('db createProvider', provider)
    const record = new Provider({
        email: provider.email,
        roles: provider.roles,
        apiKey: provider.apiKey,
        profile: provider.profile,
        userName: provider.userName,
        createdAt: provider.createdAt,
        updatedAt: provider.updatedAt
    })
    provider._id = record._id;
    console.log('db provider', provider)
    const id = await Provider.create(record)
    return record;
}

const deleteProvider = async (id) => {
    return await Professional.deleteOne({_id: id})
}

export default {
    getAppointmentsForUser,
    createAppointment,
    getUser,
    createUser,
    getProvider,
    createProvider,
    deleteProvider,
    providerList,
}


