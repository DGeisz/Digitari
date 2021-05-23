import { gql } from "@apollo/client";

export const GEN_INVITE_CODE = gql`
    mutation GenInviteCode {
        genInviteCode
    }
`;

export interface GenInviteCodeData {
    genInviteCode: string;
}

export interface GenInviteCodeVariables {}
