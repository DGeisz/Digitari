import { MessageType } from "../../../../../../global_types/MessageTypes";
import { useContext } from "react";
import { TutorialContext } from "../../../../../context/tutorial_context/TutorialContext";

export function useZariahMessages(): MessageType[] {
    const { tutConvoMessages } = useContext(TutorialContext);

    return tutConvoMessages;
}
