import {
    PostAddOn,
    PostTarget,
    PostType,
} from "../../../../../../../../global_types/PostTypes";
import { millisInHour } from "../../../../../../../../global_utils/TimeRepUtils";

export const tutorialPosts: PostType[] = [
    {
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

        convoReward: 30,
        responseCost: 10,

        coin: 43,

        convoCount: 2,
        responseCount: 5,
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

        convoReward: 75,
        responseCost: 25,

        coin: 475,

        convoCount: 11,
        responseCount: 20,
    },
];
