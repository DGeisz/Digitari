import { gql } from "@apollo/client";

export const UPDATE_CONVO_STATUS = gql`
    fragment UpdateConvoStatus on Convo {
        status
    }
`;

export const BLOCK_CONVO = gql`
    fragment BlockConvo on Convo {
        status
    }
`;

export const MESSAGE_SENT = gql`
    fragment MessageSent on ConvoMsg {
        id
        uid
        user
        time
        anonymous
        content
    }
`;
