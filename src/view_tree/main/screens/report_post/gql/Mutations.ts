import { gql } from "@apollo/client";

export const REPORT_POST = gql`
    mutation ReportPost($pid: ID!, $report: String!) {
        reportPost(pid: $pid, report: $report)
    }
`;

export interface ReportPostData {
    reportPost: string;
}

export interface ReportPostVariables {
    pid: string;
    report: string;
}
