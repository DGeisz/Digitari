import * as React from "react";
import { EmitterSubscription, Keyboard, Platform } from "react-native";
import { scheduleLayoutAnimation } from "../../../../global_animations/KeyboardAnimation";

export function useAuthKeyboardBuffer(): number {
    const [bufferHeight, setHeight] = React.useState<number>(0);

    React.useEffect(() => {
        let subscriptions: EmitterSubscription[] = [];
        if (Platform.OS == "ios") {
            subscriptions.push(
                Keyboard.addListener("keyboardWillShow", (event) => {
                    scheduleLayoutAnimation(event);
                    setHeight(event.endCoordinates.height);
                })
            );
            subscriptions.push(
                Keyboard.addListener("keyboardWillHide", (event) => {
                    scheduleLayoutAnimation(event);
                    setHeight(0);
                })
            );
        }

        return function cleanup() {
            subscriptions.forEach((sub) => sub.remove());
        };
    }, []);

    return bufferHeight;
}
