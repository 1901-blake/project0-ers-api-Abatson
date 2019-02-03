import express from 'express'
import * as UserDao from "../dao/Users.dao"

export const usersRouter = express.Router();

//TODO
//Get all users
usersRouter.get('', async (req, res) => {
    //verify role finance manager or admin
    //call userdao getall()
    //return list
    //return status code

    try{
        const users = await UserDao.findAll();
        res.json(users);
    } catch(err){
        res.sendStatus(500);
    }

});

//TODO
//Get user by id
usersRouter.get('/:id', async (req, res) => {
    //verify role is finance manager or admin
    //verify id is current user id if role isnt sufficient
    //call userdao get by id
    //return user object
    //return status code

    const idParam = +req.params.id;
    try{
        const user = await UserDao.findById(idParam);
        if(user){
            res.json(user);
        }
        else{
            res.sendStatus(400);
        }
    } catch(err) {
        res.sendStatus(500);
    }

});

//TODO
//update a user
usersRouter.patch('', async (req, res) => {
    //verify role admin
    //userid must be in body
    //parse data into a user object
    //probably use a util function
    //call userdao update method
    //return status code
    try{
        let result = await UserDao.update(req);
        console.log(result);
        if(result === -1){
            res.sendStatus(400);
        } else{
            res.json(result);
        }
    }catch (err) {
        console.log(err);
        res.sendStatus(500)
    }

});



