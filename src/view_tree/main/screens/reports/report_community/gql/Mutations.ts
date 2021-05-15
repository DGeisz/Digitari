import { gql } from "@apollo/client";

export const REPORT_COMMUNITY = gql`
    mutation ReportCommunity($cmid: ID!, $report: String!) {
        reportCommunity(cmid: $cmid, report: $report)
    }
`;

export interface ReportCommunityData {
    reportCommunity: string;
}

export interface ReportCommunityVariables {
    cmid: string;
    report: string;
}
