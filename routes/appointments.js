import express from 'express';
import { getAppointments, setAppointments } from '../controllers/appointmentController.js';
const appointmentrouter = express.Router();

// routes
router.get('/', (req, res, next) => {
  res.json('hi');
});

router.get('/appointments', getAppointments);
// router.post('/appointments', setAppointments);

export default appointmentrouter;
