import {IssueType} from "./IssueType";
import {IssueStatus} from "./IssueStatus";
import {Agent} from "./Agent";

export class Issue {
    static SEQ : number = 1;
    // TODO : IMP : should be private member variables
    id : string; // PK
    transactionId : string; // index
    issueType : IssueType;
    subject : string;
    description : string;
    userEmail : string; // FK (userId) -> users
    status : IssueStatus;
    assignedAgent : Agent |null; // FK (agentId) -> agents

    constructor(transactionId : string ,issueType : IssueType, subject : string, description : string, userEmail : string ) {
        this.id = "ISSUE_" +Issue.SEQ;
        Issue.SEQ ++;
        this.transactionId = transactionId;
        this.issueType = issueType;
        this.subject  = subject;
        this.description = description;
        this.userEmail = userEmail;
        this.status = IssueStatus.OPEN;
        this.assignedAgent = null;
    }

    printIssue(){
        console.log(this.id, this.transactionId, this.issueType, this.subject, this.description, this.userEmail, this.status);
    }

}