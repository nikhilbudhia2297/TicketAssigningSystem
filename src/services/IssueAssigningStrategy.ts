import {Agent} from "../entities/Agent";
import {Issue} from "../entities/Issue";

export interface IssueAssigningStrategy {
    getAgentForIssue(issue : Issue) : Agent
}