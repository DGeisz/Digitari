import {
    PostAddOn,
    PostTarget,
    PostType,
} from "../../../../../../../../global_types/PostTypes";
import { useContext } from "react";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../../../tutorial/context/tutorial_context/TutorialContext";
import { millisInHour } from "../../../../../../../../global_utils/TimeRepUtils";
import {
    tier2convoReward,
    tier2responseCost,
} from "../../../../../../../../global_types/TierTypes";

export const zariahPost: PostType = {
    id: "tut0",
    uid: "",

    user: "Zariah",
    tier: 0,
    time: (Date.now() - millisInHour).toString(),
    content:
        "Hi! I'm Zariah, and my favorite place in the world is probably Surfer's Paradise in Australia",

    addOn: PostAddOn.None,
    addOnContent: "",
    target: PostTarget.Community,

    cmid: "yote",
    communityName: "New members",

    convoReward: tier2convoReward(0),
    responseCost: tier2responseCost(0),

    coin: 0,

    convoCount: 2,
    responseCount: 5,
};

export function useTutorialPosts(): PostType[] {
    const {
        tutorialPostLiked,
        tutorialScreen,
        tutorialPostCustomLiked,
    } = useContext(TutorialContext);

    const posts = [
        {
            ...zariahPost,
            coin: tutorialPostLiked ? 53 : 43,
            coinDonated: tutorialPostLiked,
        },
        {
            id: "tut1",
            uid: "",

            user: "Bennet",
            tier: 2,
            time: (Date.now() - 2 * millisInHour).toString(),
            content: "Love this doge",

            addOn: PostAddOn.Image,
            addOnContent:
                "https://d3671gkd53urlb.cloudfront.net/03e3c333-71bd-4421-a20d-1ea6c30116ec/p-u0D.jpeg",
            target: PostTarget.Community,

            cmid: "tr",
            communityName: "Doge memes",

            convoReward: tier2convoReward(2),
            responseCost: tier2responseCost(2),

            coin: tutorialPostCustomLiked ? 575 : 475,
            coinDonated: tutorialPostCustomLiked,

            convoCount: 11,
            responseCount: 20,
        },
    ];

    if (tutorialScreen > TutorialScreen.CollectFeedReward) {
        posts.push({
            id: "tut2",
            uid: "",

            user: "Melanie",
            tier: 4,
            time: (Date.now() - 3 * millisInHour).toString(),
            content: "Check out this epic indoor waterfall!",

            addOn: PostAddOn.Image,
            addOnContent:
                "https://d3671gkd53urlb.cloudfront.net/3f0c7ce9-ccf6-4822-829a-93840683b09e/p-BgJ.jpeg",
            target: PostTarget.Community,

            cmid: "tr",
            communityName: "Architecture",

            convoReward: tier2convoReward(4),
            responseCost: tier2responseCost(4),

            coin: 243,
            coinDonated: false,

            convoCount: 11,
            responseCount: 20,
        });
    }

    return posts;
}
