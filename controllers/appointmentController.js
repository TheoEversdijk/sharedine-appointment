import { getAppointmentsFromSupabase, getSingleAppointmentFromSupabase } from '../adapters/supabaseAdapter.js'

// Function that gets a single appointment from the database
export async function getSingleAppointment(req, res, next) {
    console.log('Attempting to get a single appointment')
    const singleAppointmentData = await getSingleAppointmentFromSupabase(req.params.id);
    res.json(singleAppointmentData)
}

// Function that returns all the entries from the appointments table
export async function getAppointments(req, res, next) {
    console.log('Get appointment')
    const getAppointmentsData = await getAppointmentsFromSupabase();
    res.json(getAppointmentsData)
}

export async function setAppointments(res, req, next) {
    const appointment = {};
    
}