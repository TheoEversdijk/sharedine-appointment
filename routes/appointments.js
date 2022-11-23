import express from 'express';
import { getAppointments, setAppointments, getSingleAppointment } from '../controllers/appointmentController.js';
const router = express.Router();

// routes
router.get('/', (req, res, next) => {
  res.json('Connection with the appointment database has been made');
});

router.get('/appointments/:id', getSingleAppointment);
router.get('/appointments', getAppointments);
// router.post('/appointments', setAppointments);

export default router;
