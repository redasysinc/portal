import mongoose from "mongoose";
import IAppointment from "../../../src/types/appointment"

import Inc from "mongoose-sequence"

const AutoIncrement = Inc(mongoose)

const AppointmentSchema = new mongoose.Schema({
    type: {type: Number, required: true},
    date: {type: String, required: true},
    patient: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    provider: {type: mongoose.Schema.Types.ObjectId, ref: "Provider"}
})

// AppointmentSchema.plugin(AutoIncrement, {inc_field: 'id'});

const Appointment = mongoose.model<IAppointment>("Appointment", AppointmentSchema)
export default Appointment
