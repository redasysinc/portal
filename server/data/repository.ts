import util from "util";
import * as path from "path";
import {Appointment} from "../../src/types/appointment";
const fs = require('fs').promises
const getAppointments = async (userName: string) => {
    if (!userName) return []
    try {
        const fileName = path.join(__dirname, `./${userName}.json`)
        const data = await fs.readFile(fileName)
        console.log('data exists')
        if (!data) return []
        return JSON.parse(data)
    } catch (err) { //file doesn't exist
        console.log('no file')
        return []
    }
}
const saveAppointment = async (apt: Appointment) => {
    console.log('saving....', apt)
    const fileName = path.join(__dirname, `./${apt.patient.userName}.json`)
    console.log(fileName, apt)
    const appointments = await getAppointments(apt.patient.userName)
    appointments.unshift(apt)
    await fs.writeFile(fileName, JSON.stringify(appointments));
    console.log('wrote file', appointments)
    return appointments

}

const db = {
    getAppointments,
    saveAppointment
}

export default db;
