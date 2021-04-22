import { gql } from "@apollo/client";

export const GET_FEED = gql`
    query GetFeed($uid: ID!, $lastTime: Int) {
        feed(uid: $uid, lastTime: $lastTime) {
            id
            uid

            # Main content
            user
            tier
            time
            content

            # Add on
            addOn
            addOnContent
            target
            cmid
            communityName

            # Coin fields
            convoReward
            responseCost
            coin
            coinDonated
            convos {
                id
                pid

                time
                msg

                sid
                sranking
                sname
                sanony
                sviewed

                tid
                tranking
                tname
                tviewed
            }
        }
    }
`;
