import express from 'express'

export const reimbursementRouter = express.Router();

//TODO
//add new reimbursements
reimbursementRouter.post('', (req, res) => {
    //parse data into reimbursement object
    //maybe use a util function
    //assert id is 0
    //call reimbursementdao create
    //return status code

});

//TODO
//get reimbursement by status id
reimbursementRouter.get('/status/:statusId', (req, res) => {
    //verify finanace manager or admin
    //call reimbursement dao get statusid
    //return reimbursemnet
    //return status code

});

//TODO
//get reimbursements by user
reimbursementRouter.get('/author/userId/:userId', (req, res) => {
    //verify finance manager or admin
    //call reimbursement dao get userid
    //return all reimbursements
    //return status code

});

//TODO
//update a reimbursement
//use to approve or deny
reimbursementRouter.patch('', (req, res) => {
    //verify finance-manager admin
    //verify reimbursementid in body
    //build reimbursement object
    //use a util function probably
    //call reimbursement dao
    //return status code

});

