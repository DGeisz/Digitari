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

// Activate Convo
export const ACTIVATE_CONVO = gql`
    mutation ActivateConvo($cid: ID!) {
        activateConvo(cid: $cid) {
            id
        }
    }
`;

export const ACTIVATE_CONVO_TYPE = gql`
    mutation ActivateConvo($cid: ID!) {
        activateConvo(cid: $cid) {
            id
            __typename
        }
    }
`;

export interface ActivateConvoMutationData {
    activateConvo: {
        id: string;
        __typename: string;
    };
}

export interface ActivateConvoMutationVariables {
    cid: string;
}

// Block message (effectively blocks entire convo)
export const BLOCK_MESSAGE = gql`
    mutation BlockMessage($cid: ID!) {
        blockMessage(cid: $cid) {
            id
        }
    }
`;

export const BLOCK_MESSAGE_TYPE = gql`
    mutation BlockMessage($cid: ID!) {
        blockMessage(cid: $cid) {
            id
            __typename
        }
    }
`;

export interface BlockMessageMutationData {
    blockMessage: {
        id: string;
        __typename: string;
    };
}

export interface BlockMessageMutationVariables {
    cid: string;
}

// Finish Convo
export const FINISH_CONVO = gql`
    mutation FinishConvo($cid: ID!) {
        finishConvo(cid: $cid) {
            id
        }
    }
`;

export const FINISH_CONVO_TYPE = gql`
    mutation FinishConvo($cid: ID!) {
        finishConvo(cid: $cid) {
            id
            __typename
        }
    }
`;

export interface FinishConvoMutationData {
    finishConvo: {
        id: string;
        __typename: string;
    };
}

export interface FinishConvoMutationVariables {
    cid: string;
}
