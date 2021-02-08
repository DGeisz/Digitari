import * as React from "react";
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

const { height } = Dimensions.get("window");
const windowHeight = height;

interface Props {
    onSend: (text: string) => void;
    onKeyboardShow?: () => void;
    inputPlaceholder?: string;
}

const MessageInput: React.FC<Props> = ({
    children,
    onKeyboardShow,
    onSend,
    inputPlaceholder,
}) => {
    const insets = useSafeAreaInsets();

    //Height of the window to avoid keyboard
    const [height, setHeight] = React.useState<number>(insets.bottom);

    //Height of the children in the screen
    const [childHeight, setChildHeight] = React.useState<number>(windowHeight);

    //Boolean to determine if the child's initial height has been set
    const [isChildFixed, fixChild] = React.useState<boolean>(false);

    //Message text
    const [text, setText] = React.useState<string>("");
    const canSend = !!text;

    //Text input ref
    const textInputRef: React.RefObject<TextInput> = React.useRef<TextInput>(
        null
    );

    const handleSend = (): void => {
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
    };

    React.useEffect(() => {
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
                    // setHeight(event.endCoordinates.height);
                    onKeyboardShow && onKeyboardShow();
                })
            );
            subscriptions.push(
                Keyboard.addListener("keyboardDidHide", (event) => {
                    scheduleLayoutAnimation(event);
                    // setHeight(0);
                })
            );
        }

        return function cleanup() {
            subscriptions.forEach((sub) => sub.remove());
        };
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View
                    style={{ flex: 1 }}
                    onLayout={(e) => {
                        if (!isChildFixed) {
                            setChildHeight(e.nativeEvent.layout.height);
                            fixChild(true);
                        }
                    }}
                >
                    <View
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            // top: 20,
                            height: childHeight,
                        }}
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
                            onChangeText={setText}
                        />
                        <TouchableOpacity
                            activeOpacity={canSend ? 0.3 : 1}
                            onPress={handleSend}
                        >
                            <MaterialIcons
                                name="send"
                                size={28}
                                color={palette.deepBlue}
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
};

export default MessageInput;
