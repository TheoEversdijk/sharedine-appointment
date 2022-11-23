import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config({ path: '.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export async function getSingleAppointmentFromSupabase(id) {
    console.log('Fetching data from supabase')
    const { data, error } = await supabase.from('appointments').select('*').eq('id', id);
    if(error) console.error('query error', error);
    else return data;
}

export async function getAppointmentsFromSupabase() {
    console.log('Fetching data from supabase')
    // return all data from the supabase appointments table
    const { data, error } = await supabase.from('appointments').select('*')
    if(error) console.error('query error', error);
    else return data;
}

export async function writeAppointmentsToSupabase(appointment) {
    console.log('Appointment:', appointment.name);
  const { data, error } = await supabase.from('appointments').insert([
    {
      name: appointment.name,
      date: appointment.date,
      time: appointment.time,
    },
  ]);
  if (error) console.log('query error', error);
  else return data;
}

export async function editAppointmentData(id, appointment) {
  console.log('Appointment:', appointment.name);
  const { data, error } = await supabase.from('appointments').update([
    {
      name: appointment.name,
      date: appointment.date,
      time: appointment.time,
    },
  ]).eq('id', id);
  if (error) console.log('query error', error);
  else return data;
}

export async function removeAppointmentData(id) {
    console.log('removing id:', id);
    const { data, error } = await supabase.from('appointments').delete().eq('id', id);
    if (error) console.log('query error', error);
    else return data;
  }