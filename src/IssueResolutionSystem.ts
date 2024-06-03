import {AgentHandler} from "./handlers/AgentHandler";
import {IssueHandler} from "./handlers/IssueHandler";
import {Agent} from "./entities/Agent";
import {IssueType} from "./entities/IssueType";
import {Issue} from "./entities/Issue";
import {IssueAssigningStrategy} from "./services/IssueAssigningStrategy";
import {FreeAgentAssigningStrategy} from "./services/FreeAgentAssigningStrategy";
import {IssueFilters} from "./entities/IssueFilters";
import {IssueStatus} from "./entities/IssueStatus";

export class IssueResolutionSystem {
    private issueHandler : IssueHandler;
    private agentHandler : AgentHandler;
    private issueAssigningStrategy : IssueAssigningStrategy;

    constructor() {
        this.issueHandler = new IssueHandler();
        this.agentHandler = new AgentHandler();
        this.issueAssigningStrategy = new FreeAgentAssigningStrategy(this.agentHandler);
    }

    createIssue(transactionId : string, issueType : IssueType, subject : string, description : string, email : string){
        const issue = new Issue(transactionId, issueType, subject, description, email);
        this.issueHandler.addIssue(issue);
        console.log(`Issue : ${issue.id} created against transaction ${transactionId}`);
    }

    addAgent(name : string, email : string, issueTypes : IssueType[]){
        const agent = new Agent(name, email, issueTypes);
        this.agentHandler.addAgent(agent);
        console.log(`Agent created :: name : ${agent.name} : email : ${agent.email}`);
    }

    assignIssue(issueId : string){
        const issue = this.issueHandler.getIssueById(issueId);
        const agent = this.issueAssigningStrategy.getAgentForIssue(issue);
        issue.assignedAgent = agent;
        this.issueHandler.issueList.set(issue.id, issue);
        agent.addIssue(issue);
    }

    getIssues(key : IssueFilters, value : any){
        let issues = [];
        /**
         * {userId} AND {issueType} | {userId} OR {issueType}
         * */
        switch (key){
            case IssueFilters.ISSUE_ID:
                issues.push(this.issueHandler.getIssueById(value));
                break;
            case IssueFilters.ISSUE_TYPE:
                issues = this.issueHandler.getAllIssuesByType(value);
                break;
            case IssueFilters.USER :
                issues = this.issueHandler.getAllUserIssues(value);
                break;
            default :
                throw new Error('Issue Filter not implemented');
        }
        /*
        issueFilter1 : []
        issueFilter2 : []
        AND
        issues : issueFilter1 intersection issueFilter2
        OR
        issues : issueFilter1 union issueFilter2
        * */

        for(let i=0;i<issues.length;i++){
            issues[i].printIssue();
        }
    }

    updateIssue(issueId : string, issueStatus : IssueStatus, desc : string){
        const issue = this.issueHandler.getIssueById(issueId);
        if(!issue){
            throw new Error("Issue not found");
        }
        if(![IssueStatus.OPEN, IssueStatus.IN_PROGRESS].includes(issueStatus)){
            throw new Error("Invalid Issue Status");
        }
        issue.status = issueStatus;
        issue.description = desc;
        this.issueHandler.issueList.set(issue.id, issue);

        console.log(`${issue.id} status updated to ${issueStatus}`);
    }

    resolveIssue(issueId : string, desc : string){
        const issue = this.issueHandler.getIssueById(issueId);
        const agent = issue.assignedAgent!;
        issue.status = IssueStatus.CLOSED;
        issue.description = desc;
        console.log(`${issueId} is marked resolved`)
        agent.resolveIssue();
    }

    viewAgentWorkHistory(){
        for (let [key, value] of this.agentHandler.agentList) {
            value.printAllIssues();
        }
    }

}