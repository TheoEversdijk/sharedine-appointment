import { getAppointmentsFromSupabase, 
    getPersonalAppointmentsFromSupabase, 
    getJoinedAppointmentsFromSupabase,
    writeAppointmentsToSupabase, 
    editAppointmentData,
    removeAppointmentData,
    editAppointmentMembers,
    getAppointmentIdFromSupabase,
    getSingleAppointmentFromSupabase } from '../adapters/supabaseAdapter.js'

// Function that gets a single appointment from the database
export async function getPersonalAppointments(req, res) {
    console.log('Attempting to get all personal appointments')
    const array = [];
    const appointmentsData = await getPersonalAppointmentsFromSupabase(req.params.id);
    appointmentsData.forEach(appointment => {
      array.push(appointment);
    })
    const joinedData = await getJoinedAppointmentsFromSupabase(req.params.id);
    joinedData.forEach(appointment => {
      array.push(appointment);
    })
    res.json(array)
}

// Function that gets a single appointment from the database
export async function getSingleAppointment(req, res, next) {
  console.log(req.params)
  console.log('Attempting to get a single appointment')
  const response = await getSingleAppointmentFromSupabase(req.params.id);
  res.json(response)
}

// Function that returns all the entries from the appointments table
export async function getAppointments(req, res) {
    console.log('Get appointment')
    const getAppointmentsData = await getAppointmentsFromSupabase();
    res.json(getAppointmentsData)
}
export async function setAppointments(req, res) {
    const appointment = {};
    if (req.body.name && req.body.date && req.body.time && req.body.location && req.body.price && req.body.info) {
      appointment.owner_id = req.body.owner_id;
      appointment.name = req.body.name;
      appointment.date = req.body.date;
      appointment.time = req.body.time;
      appointment.location = req.body.location;
      appointment.price = req.body.price;
      appointment.info = req.body.info;
      const write = await writeAppointmentsToSupabase(appointment);
      const id = await getAppointmentIdFromSupabase(appointment);
      console.log(id);
      if (id) {
        res.json({
          title: 'appointment added',
          message: `Appointment ${appointment.name} has been added`,
          id: id[0].id
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
    if (req.body.name && req.body.date && req.body.time && req.body.location && req.body.price && req.body.info) {
      appointment.name = req.body.name;
      appointment.date = req.body.date;
      appointment.time = req.body.time;
      appointment.location = req.body.location;
      appointment.price = req.body.price;
      appointment.info = req.body.info;
      await editAppointmentData(req.params.id, appointment)
      res.json({
        title: 'appointment edited',
        message: `Appointment ${appointment.name} has been edit`,
      });
    }
  }

  export async function registerForAppointment(req, res, next) {
    const appointment = await getSingleAppointmentFromSupabase(req.params.id);
    console.log(appointment);
    if (appointment.members.length < appointment.limit) {
      if (req.body.member) {
        let members = appointment.members
        members.push(req.body.member)
        await editAppointmentMembers(req.params.id, members)
        res.json({
          title: 'Registered for Appointment',
          message: `Appointment ${req.body.member} has been added`,
        });
      }
    } else {
      res.status(304).json({ message: 'Cannot join Appointment' })
    }
  }

  
  
  export async function removeAppointment(req, res, next) {
    const id = req.params.id
    const remove = await removeAppointmentData(req.params.id);
    if (remove) {
      res.json({ message: `Removed ${id}` });
    } else {
      res.status(500).json({ message: 'Cannot remove appointment' });
    }
  }


