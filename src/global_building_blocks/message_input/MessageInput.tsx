import React, { useEffect, useRef, useState } from "react";
import {
    EmitterSubscription,
    Keyboard,
    Platform,
    TextInput,
    TouchableOpacity,
    View,
    Text,
    Dimensions,
    ScrollView,
} from "react-native";
import { scheduleLayoutAnimation } from "../../global_animations/KeyboardAnimation";
import { styles } from "./MessageInputStyles";
import { basicLayouts } from "../../global_styles/BasicLayouts";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { palette } from "../../global_styles/Palette";
import { MESSAGE_MAX_LEN } from "../../global_types/MessageTypes";

const { height } = Dimensions.get("window");
const windowHeight = height;

interface Props {
    onSend: (text: string) => void;
    onChangeText?: (text: string) => void;
    onKeyboardShow?: () => void;
    inputPlaceholder?: string;
    autoFocus?: boolean;
    blockInput?: boolean;
}

const MessageInput: React.FC<Props> = ({
    children,
    onKeyboardShow,
    onSend,
    inputPlaceholder,
    autoFocus,
    blockInput,
    onChangeText,
}) => {
    const insets = useSafeAreaInsets();

    //Height of the window to avoid keyboard
    const [height, setHeight] = useState<number>(insets.bottom);

    //Boolean to determine if the child's initial height has been set
    const [isChildFixed, fixChild] = useState<boolean>(false);

    //Message text
    const [text, setText] = useState<string>("");

    //Text input ref
    const textInputRef: React.RefObject<TextInput> = useRef<TextInput>(null);

    const handleSend = (): void => {
        if (!!text) {
            Keyboard.dismiss();
            onSend(text);
            setText("");
            textInputRef.current && textInputRef.current.clear();
            if (Platform.OS === "ios") {
                textInputRef.current &&
                    textInputRef.current.setNativeProps({ text: "" });
                setTimeout(() => {
                    textInputRef.current &&
                        textInputRef.current.setNativeProps({ text: "" });
                }, 500);
            }
        }
    };

    useEffect(() => {
        if (autoFocus) {
            setTimeout(() => {
                textInputRef.current && textInputRef.current.focus();
            }, 500);
        }

        let subscriptions: EmitterSubscription[] = [];
        if (Platform.OS == "ios") {
            subscriptions.push(
                Keyboard.addListener("keyboardWillShow", (event) => {
                    scheduleLayoutAnimation(event);
                    setHeight(event.endCoordinates.height);
                    onKeyboardShow && onKeyboardShow();
                })
            );
            subscriptions.push(
                Keyboard.addListener("keyboardWillHide", (event) => {
                    scheduleLayoutAnimation(event);
                    setHeight(insets.bottom);
                })
            );
        } else {
            subscriptions.push(
                Keyboard.addListener("keyboardDidShow", (event) => {
                    scheduleLayoutAnimation(event);
                    onKeyboardShow && onKeyboardShow();
                })
            );
            subscriptions.push(
                Keyboard.addListener("keyboardDidHide", (event) => {
                    scheduleLayoutAnimation(event);
                })
            );
        }

        return function cleanup() {
            subscriptions.forEach((sub) => sub.remove());
        };
    }, [autoFocus]);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View
                    style={{ flex: 1 }}
                    onLayout={() => {
                        if (!isChildFixed) {
                            fixChild(true);
                        }
                    }}
                >
                    <View
                        style={basicLayouts.flexGrid1}
                        pointerEvents="box-none"
                    >
                        {children}
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <View style={basicLayouts.flexRow}>
                        <TextInput
                            style={styles.input}
                            ref={textInputRef}
                            placeholder={inputPlaceholder}
                            multiline={true}
                            scrollEnabled={true}
                            value={text}
                            onChangeText={(text) => {
                                const message = text.substring(
                                    0,
                                    MESSAGE_MAX_LEN
                                );

                                setText(message);
                                !!onChangeText && onChangeText(message);
                            }}
                            autoFocus={autoFocus}
                            editable={!blockInput}
                        />
                        <TouchableOpacity
                            activeOpacity={!!text ? 0.3 : 1}
                            onPress={handleSend}
                        >
                            <MaterialIcons
                                name="send"
                                size={28}
                                color={
                                    !!text
                                        ? palette.deepBlue
                                        : palette.notDeepBlue
                                }
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ height: height, backgroundColor: "white" }} />
        </View>
    );
};

MessageInput.defaultProps = {
    inputPlaceholder: "Message...",
    autoFocus: false,
};

export default MessageInput;
