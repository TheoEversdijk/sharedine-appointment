import express from 'express';
import bodyParser from 'body-parser';
import { getAppointments, setAppointments, getPersonalAppointments, editAppointment, removeAppointment, registerForAppointment, getSingleAppointment } from '../controllers/appointmentController.js';
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

const jsonParser = bodyParser.json()

router.get('/', jsonParser, getAppointments);

router.post('/', jsonParser, setAppointments);

router.get('/:id', jsonParser, getPersonalAppointments);

router.get('/single/:id', jsonParser, getSingleAppointment);

router.put('/:id', jsonParser, editAppointment);

router.put('/:id/register', jsonParser, registerForAppointment)

router.delete('/:id', jsonParser, removeAppointment);

export default router;
