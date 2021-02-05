import {gql} from '@apollo/client';

export const schema = gql`
    type User {
        id: ID!
        user: String!
        level: Int!
        bio: String!
        ranking: Int!
        blocked: Int!
        beenBlocked: Int!
        successfulConvos: Int!
        coin: Int!
        followers: Int!
        following: Int!
    }
    
    
`;