import { createContext, useState } from "react";
import { LayoutAnimation } from "react-native";
import { MessageType } from "../../../global_types/MessageTypes";

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
    InputResponse,

    /*
     * First convo screens
     */
    IntroduceConvo,
    ExplainConvo,
    ZariahResponse,
    PromptReply,
    ZariahBackNForth,
    ExplainFinish,
    PromptFinish,
    TapFinish,
    ExplainSuccess,

    /*
     * Transition back to feed
     */
    PopToFeed,

    /*
     * Feed post convo
     */
    PromptReturnToWallet,
    TapWallet2,
}

interface TutorialContextType {
    /*
     * Basic info about whether to show the tutorial
     */
    tutorialActive: boolean;
    setTutorialActive: (active: boolean) => void;

    /*
     * Info and methods to manipulate the current tutorial screen
     */
    tutorialScreen: TutorialScreen;
    advanceTutorial: () => void;
    setScreen: (screen: TutorialScreen) => void;

    /*
     * Method to skip out of the tutorial
     */
    skipTutorial: () => void;

    /*
     * State for liking the first post
     */
    tutorialPostLiked: boolean;
    likeTutorialPost: (like: boolean) => void;
    /*
     * State for custom liking the second post
     */
    tutorialPostCustomLiked: boolean;
    customLikeTutorialPost: (like: boolean) => void;

    /*
     * State for the first convo
     */
    tutConvoMessages: MessageType[];
    setTutConvoMessages: (
        messages: MessageType[] | ((messages: MessageType[]) => MessageType[])
    ) => void;
}

export const TutorialContext = createContext<TutorialContextType>({
    tutorialActive: false,
    setTutorialActive: () => {},
    tutorialScreen: TutorialScreen.Welcome,
    advanceTutorial: () => {},
    setScreen: () => {},
    skipTutorial: () => {},
    tutorialPostCustomLiked: false,
    tutorialPostLiked: false,
    likeTutorialPost: () => {},
    customLikeTutorialPost: () => {},
    tutConvoMessages: [],
    setTutConvoMessages: () => {},
});

export function useTutorialContextValues(): TutorialContextType {
    const [showTutorial, setTutorialActive] = useState<boolean>(false);
    const [currentTutorialScreen, setTutorialScreen] = useState<TutorialScreen>(
        TutorialScreen.PromptReturnToWallet
    );

    const [tutorialPostLiked, likeTutorialPost] = useState<boolean>(false);
    const [tutorialPostCustomLiked, customLikeTutorialPost] = useState<boolean>(
        false
    );

    const [tutConvoMessages, setTutConvoMessages] = useState<MessageType[]>([]);

    return {
        tutorialActive: showTutorial,
        setTutorialActive,
        tutorialScreen: currentTutorialScreen,
        skipTutorial: () => setTutorialActive(false),
        advanceTutorial: () => {
            LayoutAnimation.easeInEaseOut();
            setTutorialScreen((current) => current + 1);
        },
        setScreen: (screen) => {
            LayoutAnimation.easeInEaseOut();
            setTutorialScreen(screen);
        },
        tutorialPostLiked,
        tutorialPostCustomLiked,
        likeTutorialPost,
        customLikeTutorialPost,
        tutConvoMessages,
        setTutConvoMessages,
    };
}
