import { gql } from "@apollo/client";

export const REPORT_USER = gql`
    mutation ReportUser($uid: ID!, $report: String!) {
        reportUser(uid: $uid, report: $report)
    }
`;

export interface ReportUserData {
    reportUser: string;
}

export interface ReportUserVariables {
    uid: string;
    report: string;
}
