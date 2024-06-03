import { Agent } from "../entities/Agent";
import { Issue } from "../entities/Issue";
import { AgentHandler } from "../handlers/AgentHandler";
import {IssueAssigningStrategy} from "./IssueAssigningStrategy";

export class FreeAgentAssigningStrategy implements IssueAssigningStrategy {
    agentHandler: AgentHandler;

    constructor(aH : AgentHandler) {
        this.agentHandler = aH;
    }

    getAgentForIssue(issue: Issue): Agent {
        if(!this.agentHandler.agentQueue.length){
            throw new Error("Agent doesn't exist in QUEUE ");
        }
        const agent = this.agentHandler.agentQueue[0];
        this.agentHandler.agentQueue.shift();
        this.agentHandler.agentQueue.push(agent);
        return agent;
    }

}