import { gql } from "@apollo/client";

export const REPORT_CONVO = gql`
    mutation ReportConvo($cvid: ID!, $report: String!) {
        reportConvo(cvid: $cvid, report: $report)
    }
`;

export interface ReportConvoData {
    reportConvo: string;
}

export interface ReportConvoVariables {
    cvid: string;
    report: string;
}
