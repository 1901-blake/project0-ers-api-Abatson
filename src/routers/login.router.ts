import express from 'express'
import * as UserDao from '../dao/Users.dao'


export const loginRouter = express.Router();

//to do
loginRouter.post('', async (req,res) => {

    //verify with user dao
    //attach to session
    const user = await UserDao.findByUsername(req.body.username);
    if(typeof user === 'undefined'){
        res.status(401);
        res.send('No such Username')
    }
    if(req.body.password !== user.password){
        res.status(401);
        res.send('Wrong Password')
    }
    else {
        req.session.user = user;
        res.json(user);
    }

});