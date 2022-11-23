import express from 'express';
import { getAppointments, setAppointments, getSingleAppointment, editAppointment, removeAppointment } from '../controllers/appointmentController.js';
const router = express.Router();

/**
 * all appointments routes
 */
 router.options('/', (req, res, next) => {
  //set header before response
  res.header({
    allow: 'GET, POST, OPTIONS',
    'Content-type': 'application/json',
    Data: Date.now(),
    'Content-length': 0,
  });
  //response
  res.sendStatus(200);
});



router.get('/', (req, res, next) => {
  res.json('Connection with the appointment database has been made');
});

router.get('/appointments/:id', getSingleAppointment);

router.get('/appointments', getAppointments);

router.post('/appointments', setAppointments);

router.put('/appointments/:id', editAppointment);

router.delete('/appointments/:id', removeAppointment);

export default router;
