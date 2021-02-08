import { KeyboardEvent, LayoutAnimation } from "react-native";

export const scheduleLayoutAnimation = function (event: KeyboardEvent) {
    if (!event) {
        return;
    }
    const { duration, easing } = event;
    if (duration != null && duration !== 0) {
        LayoutAnimation.configureNext({
            duration: duration,
            update: {
                duration: duration,
                type:
                    (easing != null && LayoutAnimation.Types[easing]) ||
                    "keyboard",
            },
        });
    }
};
