import React, { useState } from "react";
import {
    EmitterSubscription,
    Keyboard,
    Platform,
    TouchableOpacity,
    View,
} from "react-native";
import { authStyles } from "../../styles/AuthStyles";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { Input } from "react-native-elements";
import AuthButton from "../../building_blocks/auth_button/AuthButton";
import { NewAccountNameNavProp } from "../../AuthEntryNavTypes";
import { scheduleLayoutAnimation } from "../../../../global_animations/KeyboardAnimation";
import { useAuthKeyboardBuffer } from "../../building_blocks/use_auth_keyboard_buffer/UseAuthKeyboardBuffer";

interface Props {
    navigation: NewAccountNameNavProp;
}

const NewAccountName: React.FC<Props> = (props) => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [active, setActive] = useState<boolean>(false);

    const bufferHeight = useAuthKeyboardBuffer();

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={authStyles.paddedAuthContainer}
            onPress={Keyboard.dismiss}
        >
            <View style={basicLayouts.grid5}>
                <Input
                    placeholder={"First name..."}
                    onChangeText={(text) => {
                        setFirstName(text);

                        if (firstName && lastName) {
                            setActive(true);
                        } else {
                            setActive(false);
                        }
                    }}
                />
                <Input
                    placeholder={"Last name..."}
                    onChangeText={(text) => {
                        setLastName(text);

                        if (firstName && lastName) {
                            setActive(true);
                        } else {
                            setActive(false);
                        }
                    }}
                />
                <AuthButton
                    marginTop={20}
                    onPress={() => {
                        props.navigation.navigate("NewAccountEmailPwd", {
                            firstName,
                            lastName,
                        });
                    }}
                    text={"Next"}
                    active={active}
                />
            </View>
            <View style={{ height: bufferHeight }} />
        </TouchableOpacity>
    );
};

export default NewAccountName;
