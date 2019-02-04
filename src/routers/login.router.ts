import express from 'express'
import * as UserDao from '../dao/Users.dao'
import { usersRouter } from './users.router';

export const loginRouter = express.Router();

//to do
loginRouter.post('', async (req,res) => {

    //verify with user dao
    //attach to session
    const user = await UserDao.findByUsername(req.body.username);
    if(req.body.password !== user.password){
        res.sendStatus(401);
    }
    else {
        req.session.user = user;
        res.json(user);
    }

});