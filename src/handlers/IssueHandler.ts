import {Issue} from "../entities/Issue";
import {IssueType} from "../entities/IssueType";

export class IssueHandler {
    // TODO : Should be Private
    issueList : Map<string, Issue>; // issueId -> issue

    constructor() {
        this.issueList = new Map<string, Issue>();
    }

    addIssue(issue: Issue) {
        this.issueList.set(issue.id, issue);
    }

    getIssueById(issueId : string) {
        const issue =  this.issueList.get(issueId);
        if(!issue){
            throw new Error("Issue not found");
        }
        return issue;
    }

    getAllUserIssues(userEmail : string){
        let issues : Issue[] = []
        for (let [key, value] of this.issueList) {
            const issue = value;
            if(issue.userEmail == userEmail){
                issues.push(issue);
            }
        }
        return issues;
    }

    getAllIssuesByType(issueType : IssueType){
        let issues : Issue[] = []
        for (let [key, value] of this.issueList) {
            const issue = value;
            if(issue.issueType == issueType){
                issues.push(issue);
            }
        }
        return issues;
    }
}