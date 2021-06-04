import { createContext } from "react";

export enum TutorialScreen {
    /*
     * First profile screens
     */
    Welcome,
    ProfileDescription,
    OpenTierPrompt,
    TapTier,
    OpenWalletPrompt,
    TapWallet,

    /*
     * First wallet screens
     */
    ExplainDigicoin,
    ExplainTierWage,
    CollectTierWage,
    FirstCollectTap,
    NewPostPrompt,
    TapNewPost,

    /*
     * New post screens
     */
    NewPostContent,
    InputPostContent,
    NewPostTarget,
    NewPostRecipients,
    InputPostRecipients,
    PostFinished,
    TapPost,

    /*
     * Return to wallet from new post,
     * let's go to feed
     */
    OpenFeedPrompt,
    TapHome,

    /*
     * Feed screens
     */
    IntroduceFeed,
    LikeFirstPost,
    TapLike,
    ExplainDigicoinLike,
    ExplainCustomLike,
    CustomLikePost,
    CustomTapLike,
    ExplainResponse,
    RespondToPost,
    TapRespond,

    /*
     * New response screens
     */
    ExplainIdentity,
    PromptResponseMessage,
}

interface TutorialContextType {
    tutorialActive: boolean;
    tutorialScreen: TutorialScreen;
    advanceTutorial: () => void;
    setScreen: (screen: TutorialScreen) => void;
    skipTutorial: () => void;
    tutorialPostLiked: boolean;
    likeTutorialPost: (like: boolean) => void;
    tutorialPostCustomLiked: boolean;
    customLikeTutorialPost: (like: boolean) => void;
}

export const TutorialContext = createContext<TutorialContextType>({
    tutorialActive: false,
    tutorialScreen: TutorialScreen.Welcome,
    advanceTutorial: () => {},
    setScreen: () => {},
    skipTutorial: () => {},
    tutorialPostCustomLiked: false,
    tutorialPostLiked: false,
    likeTutorialPost: () => {},
    customLikeTutorialPost: () => {},
});
