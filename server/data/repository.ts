import util from "util";
import fs from "fs";
import * as path from "path";
import {Appointment} from "../../src/types/appointment";

const getAppointments = async (userName: string) => {
    if (!userName) return []
    try {
        const fileName = path.join(__dirname, `./${userName}.json`)
        const data = await readFile(fileName, 'utf8')
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
    await writeFile(fileName, JSON.stringify(appointments));
    console.log('wrote file', appointments)
    return appointments

}
const readFile = util.promisify(fs.readFile);

const writeFile = util.promisify(fs.writeFile);

const db = {
    getAppointments,
    saveAppointment
}

export default db;
