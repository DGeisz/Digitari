import { gql } from "@apollo/client";

export const POST_RESPONSE_CHECK = gql`
    query PostResponseCheck($pid: ID) {
        postResponseCheck(pid: $pid)
    }
`;

export interface PostResponseCheckData {
    postResponseCheck: boolean;
}

export interface PostResponseCheckVariables {
    pid: string;
}
