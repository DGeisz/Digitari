import { gql } from "@apollo/client";
import { DonationRecordType } from "../../../global_types/DonationRecordTypes";

export const DONATE_TO_POST = gql`
    mutation DonateToPost($pid: ID!, $amount: Int!) {
        donateToPost(pid: $pid, amount: $amount) {
            uid
            pid
            tuid
            amount
            name
        }
    }
`;

export interface DonateToPostData {
    donateToPost: DonationRecordType;
}

export interface DonateToPostVariables {
    pid: string;
    amount: number;
}
