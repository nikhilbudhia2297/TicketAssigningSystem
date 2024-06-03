import {IssueType} from "./IssueType";
import {Issue} from "./Issue";

export class Agent {
    static SEQ : number = 1;
    id: string; // PK
    email : string; // index
    name : string;
    issueTypes : IssueType[]; // json [issueId] -> FK IssueTypes
    currentIssue : Issue | null; // nullable, FK (issueId) -> Issues
    pendingIssue : Issue[];

    assignedIssues : Issue[]; // AgentsVsIssues table  (id, agentId, issueId, assignedStatus)

    constructor(email : string, name : string, issueTypes : IssueType[]) {
        this.id = "AGENT_" + Agent.SEQ;
        Agent.SEQ ++;
        this.email = email;
        this.name = name;
        this.issueTypes = issueTypes;
        this.currentIssue = null;
        this.pendingIssue = [];
        this.assignedIssues = [];
    }

    addIssue(issue : Issue){
        this.assignedIssues.push(issue)
        if(!this.currentIssue){
            this.currentIssue = issue;
            console.log(`Issue ${issue.id} assigned to agent ${this.id}`)
            return;
        }

        this.pendingIssue.push(issue);
        console.log(`Issue ${issue.id} added to waitlist of Agent ${this.id}`);
    }

    resolveIssue(){
        this.currentIssue = null;
        if(this.pendingIssue.length){
            const nextIssue = this.pendingIssue[0];
            this.pendingIssue.shift();
            this.currentIssue = nextIssue;
            console.log(`Agent assigned pending issue ${nextIssue.id}`);
        }
    }

    printAllIssues(){
        const issues = this.assignedIssues;
        console.log(`Agent ${this.id} issues -> `);
        for(let i=0;i<issues.length;i++){
            console.log(issues[i].printIssue());
        }
    }
}