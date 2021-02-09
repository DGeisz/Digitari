import { gql } from "@apollo/client";

// Dismiss mutation
export const DISMISS_CONVO = gql`
    mutation DismissConvo($cid: ID!) {
        dismissConvo(cid: $cid) {
            id
        }
    }
`;

export const DISMISS_CONVO_TYPE = gql`
    mutation DismissConvo($cid: ID!) {
        dismissConvo(cid: $cid) {
            id
            __typename
        }
    }
`;

export interface DismissMutationData {
    dismissConvo: {
        id: string;
        __typename: string;
    };
}

export interface DismissMutationVariables {
    cid: string;
}

// Block Convo
export const BLOCK_INITIAL_CONVO = gql`
    mutation BlockInitialConvo($cid: ID!) {
        blockInitialConvo(cid: $cid) {
            id
        }
    }
`;

export const BLOCK_INITIAL_CONVO_TYPE = gql`
    mutation BlockInitialConvo($cid: ID!) {
        blockInitialConvo(cid: $cid) {
            id
            __typename
        }
    }
`;

export interface BlockInitialMutationData {
    blockInitialConvo: {
        id: string;
        __typename: string;
    };
}

export interface BlockInitialMutationVariables {
    cid: string;
}
