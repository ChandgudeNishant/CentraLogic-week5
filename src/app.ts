import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './models';
import { register, login } from './controllers/EmployeeController';
import { authenticateJWT } from './middleware/auth';
import { startShift, endShift } from './controllers/ShiftController';
import { createTimesheet } from './controllers/TimesheetController';

const app = express();

app.use(bodyParser.json());

app.post('/register', register);
app.post('/login', login);

app.post('/startShift', authenticateJWT, startShift);
app.post('/endShift', authenticateJWT, endShift);
app.post('/timesheet', authenticateJWT, createTimesheet);

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});
