import { gql } from "@apollo/client";

export const VALIDATE_INVITE_CODE = gql`
    query ValidateInviteCode($code: String) {
        validInviteCode(code: $code)
    }
`;

export interface ValidateInviteCodeData {
    validInviteCode: boolean;
}

export interface ValidateInviteCodeVariables {
    code: string;
}
