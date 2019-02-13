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


app.use((req, resp, next) => {
    (process.env.ERS_API_STAGE === 'prod')
      ? resp.header('Access-Control-Allow-Origin', process.env.DEMO_APP_URL)
      : resp.header('Access-Control-Allow-Origin', `http://localhost:3001`);
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    resp.header('Access-Control-Allow-Credentials', 'true');
    resp.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
   });

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