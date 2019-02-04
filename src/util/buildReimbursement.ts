import * as ReimbursementStatusDao from "../dao/ReimbursementStatus.dao";
import * as ReimbursementTypeDao from "../dao/ReimbursementType.dao";
import { Reimbursement } from "../models/Reimbursements";

//needs to be tested
export async function buildReimbursement(reimbursementJson): Promise<Reimbursement>{
    return {
        reimbursementId: reimbursementJson.reimbursementid,
        author: reimbursementJson.author,
        amount: reimbursementJson.amount,
        dateSubmitted: reimbursementJson.datesubmitted,
        dateResolved: reimbursementJson.dateresolved,
        description: reimbursementJson.description,
        resolver: reimbursementJson.resolver,
        status: await ReimbursementStatusDao.getReimbursementStatus(reimbursementJson.statusid),
        type: await ReimbursementTypeDao.getReimbursementType(reimbursementJson.typeid)
    };

}