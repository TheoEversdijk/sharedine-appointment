import express from 'express';
import { getAppointments, setAppointments } from '../controllers/appointmentController.js';
const router = express.Router();

// routes
router.get('/', (req, res, next) => {
  res.json('The one piece....');
});

router.get('/appointments', getAppointments);
// router.post('/appointments', setAppointments);

export default router;
