import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
dotenv.config({ path: '.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)


export async function getAppointmentsFromSupabase() {
    console.log('Fetching data from supabase')
    // return all data from the supabase appointments table
    const { data, error } = await supabase.from('appointments').select('*')
    if(error) console.error('query error', error);
    else return data;
}

export async function writeAppointmentsToSupabase(appointment) {
    console.log('sending data to supabase')

    const { data, error } = await supabase.from('appointments').insert(appointment)
    if(error) console.error('query error', error);
    else return data;
}