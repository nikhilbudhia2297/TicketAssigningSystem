import {IssueResolutionSystem} from "./IssueResolutionSystem";
import {IssueType} from "./entities/IssueType";
import {IssueFilters} from "./entities/IssueFilters";
import {IssueStatus} from "./entities/IssueStatus";

function driver(){
    const app = new IssueResolutionSystem();

    app.createIssue("T1", IssueType.PAYMENT,  "Payment Failed", "My payment failed but money is debited", "testUser1@test.com");
    app.createIssue("T2", IssueType.MUTUAL_FUND,  "Purchase Failed", "Unable to purchase Mutual Fund", "testUser2@test.com");
    app.createIssue("T3", IssueType.GOLD,  "Purchase Failed", "Unable to purchase Gold", "testUser2@test.com");

    app.addAgent("agent1@test.com", "Agent 1", [IssueType.PAYMENT, IssueType.GOLD]);
    app.addAgent("agent2@test.com", "Agent 2", [IssueType.MUTUAL_FUND]);

    app.assignIssue("ISSUE_1");
    app.assignIssue("ISSUE_2");
    app.assignIssue("ISSUE_3");


    app.getIssues(IssueFilters.USER, "testUser2@test.com");
    app.getIssues(IssueFilters.ISSUE_TYPE, IssueType.PAYMENT);

    app.updateIssue("ISSUE_1", IssueStatus.IN_PROGRESS, "Waiting for payment confirmation");

    app.resolveIssue("ISSUE_1", "PaymentFailed debited amount will get reversed");

    app.viewAgentWorkHistory();
}

driver();