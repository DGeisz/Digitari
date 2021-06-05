import { MessageType } from "../../../../../../global_types/MessageTypes";
import { useContext, useEffect } from "react";
import {
    TutorialContext,
    TutorialScreen,
} from "../../../../../context/tutorial_context/TutorialContext";
import {
    ConvoStatus,
    ConvoType,
} from "../../../../../../global_types/ConvoTypes";
import { zariahConvo } from "../../data/tutorial_convos/tutorial_convos";
import {
    localFirstName,
    localUid,
} from "../../../../../../global_state/UserState";

export function useZariahConvo(): {
    messages: MessageType[];
    convo: ConvoType;
} {
    const {
        advanceTutorial,
        tutConvoMessages,
        tutorialScreen,
        setTutConvoMessages,
    } = useContext(TutorialContext);

    const firstName = localFirstName();

    useEffect(() => {
        if (tutorialScreen === TutorialScreen.ZariahResponse) {
            setTimeout(() => {
                setTutConvoMessages((messages) => [
                    messages[0],
                    {
                        id: "tutMsg1",
                        anonymous: false,
                        content:
                            `Hey ${firstName}! Thanks for saying hi! ` +
                            "I love Surfer's Paradise because it has some " +
                            "of the most beautiful beaches in the whole world. " +
                            "Have you been to Australia?",
                        time: Date.now().toString(),
                        uid: "z",
                        tid: localUid(),
                        user: "Zariah",
                    },
                ]);

                advanceTutorial();
            }, 500);
        }
    }, [tutorialScreen]);

    useEffect(() => {
        if (tutConvoMessages.length === 3) {
            setTimeout(() => {
                setTutConvoMessages((messages) => [
                    ...messages,
                    {
                        id: "tutMsg3",
                        anonymous: false,
                        content:
                            "Interesting! Beaches aren't for everyone, " +
                            "but I sure love 'em. Thanks again for " +
                            "reaching out!",
                        time: Date.now().toString(),
                        uid: "z",
                        tid: localUid(),
                        user: "Zariah",
                    },
                ]);

                setTimeout(advanceTutorial, 200);
            }, 500);
        }
    }, [tutConvoMessages.length]);

    return {
        messages: tutConvoMessages,
        convo: Object.assign<ConvoType, Partial<ConvoType>>(zariahConvo, {
            sname: firstName,
            status:
                tutorialScreen < TutorialScreen.ZariahResponse
                    ? ConvoStatus.New
                    : tutorialScreen > TutorialScreen.TapFinish
                    ? ConvoStatus.Finished
                    : ConvoStatus.Active,
            targetMsgCount: Math.floor(tutConvoMessages.length / 2),
        }),
    };
}
