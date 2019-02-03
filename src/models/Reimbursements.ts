import { ReimbursementStatus } from "./reimbursementstatus";
import { ReimbursementType } from "./reimbursementtype";

export class Reimbursement{
    reimbursementId: number // primary key
    author: number  // foreign key -> User, not null
    amount: number  // not null
    dateSubmitted: string // not null
    dateResolved: string // not null
    description: string // not null
    resolver: number // foreign key -> User
    status: ReimbursementStatus // foreign key -> ReimbursementStatus, not null
    type: ReimbursementType // foreign key -> ReimbursementType
}