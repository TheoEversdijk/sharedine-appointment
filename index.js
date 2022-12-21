// start.js setup from learnnode.com by Wes Bos
import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });
import cors from "cors";
import bodyParser from 'body-parser';
import appointmentrouter from './routes/appointments.js';

const app = express();

// support json encoded and url-encoded bodies, mainly used for post and update
app.use(express.json());

app.use(cors("Access-Control-Allow-Origin: *"))

app.get('/', (req, res) => res.status(200).send("ShareDine AppointmentAPI"))

app.use('/appointments', cors(), appointmentrouter);

app.set('port', process.env.PORT || 3002);
const server = app.listen(app.get('port'), () => {
  console.log(`🍿 Express running → PORT ${server.address().port}`);
});
