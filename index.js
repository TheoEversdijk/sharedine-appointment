// start.js setup from learnnode.com by Wes Bos
import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });
import appointmentrouter from './routes/appointments.js';

const app = express();

// support json encoded and url-encoded bodies, mainly used for post and update
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', appointmentrouter);

app.set('port', process.env.PORT || 5500);
const server = app.listen(app.get('port'), () => {
  console.log(`🍿 Express running → PORT ${server.address().port}`);
});
