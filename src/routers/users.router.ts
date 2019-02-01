import express from 'express'

export const usersRouter = express.Router();

//TODO
//Get all users
usersRouter.get('', (req, res) => {
    //verify role finance manager or admin
    //call userdao getall()
    //return list
    //return status code

});

//TODO
//Get user by id
usersRouter.get('/:id', (req, res) => {
    //verify role is finance manager or admin
    //verify id is current user id if role isnt sufficient
    //call userdao get by id
    //return user object
    //return status code

});

//TODO
//update a user
usersRouter.patch('', (req, res) => {
    //verify role admin
    //userid must be in body
    //parse data into a user object
    //probably use a util function
    //call userdao update method
    //return status code

});



