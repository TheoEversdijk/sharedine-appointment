import { getAppointmentsFromSupabase, 
    getSingleAppointmentFromSupabase, 
    writeAppointmentsToSupabase, 
    editAppointmentData,
    removeAppointmentData } from '../adapters/supabaseAdapter.js'

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

export async function setAppointments(req, res, next) {
    const appointment = {};
    const before = await getAppointmentsFromSupabase();
    if (req.query.name && req.query.date && req.query.time) {
      appointment.name = req.query.name;
      appointment.date = req.query.date;
      appointment.time = req.query.time;
      await writeAppointmentsToSupabase(appointment)
      const rows = await getAppointmentsFromSupabase();
      if (rows.length >= before.length) {
        res.json({
          title: 'appointment added',
          message: `Appointment ${appointment.name} has been added`,
        });
      } else {
        res.status(500);
        res.json({
          title: 'cannot add appointment',
          message: `Unknown causes`,
        });
      }
    } else {
      res.status(422);
      res.json({
        title: 'cannot add appointment',
        message: `You need to give the name, date and time`,
      });
    }
    
}

export async function editAppointment(req, res, next) {
    const appointment = {};
    if (req.query.name && req.query.date && req.query.time) {
      appointment.name = req.query.name;
      appointment.date = req.query.date;
      appointment.time = req.query.time;
      await editAppointmentData(req.params.id, appointment)
      res.json({
        title: 'appointment editted',
        message: `Appointment ${appointment.name} has been added`,
      });
    }
  }
  
  export async function removeAppointment(req, res, next) {
    const id = req.params.id
    const before = await getAppointmentsFromSupabase();
    await removeAppointmentData(req.params.id);
    const after = await getAppointmentsFromSupabase();
    if (before.length > after.length) {
      res.json({ message: `Removed ${id}` });
    } else {
      res.status(500).json({ message: 'Cannot remove appointment' });
    }
  }
