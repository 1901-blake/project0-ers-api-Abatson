import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import { logUrlMethod } from './middleware/log.middleware';
import { usersRouter } from './routers/users.router';
import { reimbursementRouter } from './routers/reimbursements.router';
import { loginRouter } from './routers/login.router';

const app = express();

const sess = {
    secret: 'potato',
    cookie: {secure: false},
    resave: false,
    saveUnitialized: false
};
//make sure this works
app.use(logUrlMethod);

//this works
app.use(session(sess));

//this works
app.use(bodyParser.json());


//router level
app.use('/users', usersRouter);

app.use('/reimbursements', reimbursementRouter);

app.use('/login', loginRouter);

//do something in default path
//app.use('')

app.listen(3000);