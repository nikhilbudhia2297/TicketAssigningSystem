import {Agent} from "../entities/Agent";

export class AgentHandler {
    agentList : Map<string, Agent>; // email : Agent
    agentQueue : Agent[];

    constructor() {
        this.agentList = new Map<string, Agent>();
        this.agentQueue = [];
    }

    addAgent(agent : Agent){
        if(this.agentList.get(agent.email)){
            throw new Error("Agent already exists");
        }
        this.agentList.set(agent.email, agent);
        this.agentQueue.push(agent);
    }

    getAllAgents(){
        // todo
    }
}