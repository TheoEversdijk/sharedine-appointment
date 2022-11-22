import { getAppointmentsFromSupabase } from '../adapters/supabaseAdapter.js'

export async function getAppointments(req, res, next) {
    console.log('Get appointment')
    const getAppointmentsData = await getAppointmentsFromSupabase();
    res.json(getAppointmentsData)
}

export async function setAppointments(res, req, next) {
    const appointment = {};
    
}