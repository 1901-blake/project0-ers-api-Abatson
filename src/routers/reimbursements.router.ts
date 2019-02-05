import express from 'express'
import * as ReimbursementsDao from '../dao/Reimbursements.dao'
import { managerCheckMiddleware, loggedIn, userMatchingCheckMiddleware } from '../middleware/auth.middleware';

export const reimbursementRouter = express.Router();

//TODO
//add new reimbursements
reimbursementRouter.post('',[loggedIn, async (req, res) => {
    //parse data into reimbursement object
    //maybe use a util function
    //assert id is 0
    //call reimbursementdao create
    //return status code
    
    if(typeof req.session.user === 'undefined'){
        res.sendStatus(401);
    } else {
        try {
            let result = await ReimbursementsDao.submit(req);
            if(!result){
                res.sendStatus(400);
            } else{
                res.json(result);
            }
        }catch (err) {
            console.log(err);
            res.sendStatus(500)
        }
    }   
}]);

//TODO
//get reimbursement by status id
reimbursementRouter.get('/status/:statusId',[loggedIn, managerCheckMiddleware, async (req, res) => {
    //verify finanace manager or admin
    //call reimbursement dao get statusid
    //return reimbursemnet
    //return status code

    const idParam = req.params.statusId;

    try{
        const reimbursement = await ReimbursementsDao.findByStatusId(idParam);
        if(reimbursement){
            res.json(reimbursement);
        }
        else{
            res.sendStatus(400);
        }
    } catch(err) {
        //console.log(err);
        res.sendStatus(500);
    }

}]);

//TODO
//get reimbursements by user
reimbursementRouter.get('/author/userId/:userId',[loggedIn, userMatchingCheckMiddleware, async (req, res) => {
    //verify finance manager or admin
    //call reimbursement dao get userid
    //return all reimbursements
    //return status code
    const idParam = req.params.userId;
    
    try{
        const reimbursement = await ReimbursementsDao.findByUserId(idParam);
        if(reimbursement){
            res.json(reimbursement);
        }
        else{
            res.sendStatus(400);
        }
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }

}]);

//TODO
//update a reimbursement
//use to approve or deny
reimbursementRouter.patch('',[loggedIn, managerCheckMiddleware, async (req, res) => {
    //verify finance-manager admin
    //verify reimbursementid in body
    //build reimbursement object
    //use a util function probably
    //call reimbursement dao
    //return status code
    try{
        let result = await ReimbursementsDao.update(req);
        if(!result){
            res.sendStatus(400);
        } else{
            res.json(result);
        }
    }catch (err) {
        console.log(err);
        res.sendStatus(500)
    }

}]);

