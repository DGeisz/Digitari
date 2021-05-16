import React, { useState } from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./PasswordStyles";
import { Input } from "react-native-elements";
import { palette } from "../../../../../../global_styles/Palette";
import PwdCheck, {
    checkPwd,
} from "../../../../../auth/building_blocks/pwd_check/PwdCheck";
import AuthButton from "../../../../../auth/building_blocks/auth_button/AuthButton";
import { Auth } from "aws-amplify";
import { PasswordNavProp } from "../../../../MainEntryNavTypes";

interface Props {
    navigation: PasswordNavProp;
}

const Password: React.FC<Props> = (props) => {
    const [oldPwd, setOldPwd] = useState<string>("");
    const [newPwd, setNewPwd] = useState<string>("");
    const [newPwdActive, setPwdActive] = useState<boolean>(false);

    const [error, setError] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    const changePassword = async () => {
        if (!(oldPwd && newPwd && checkPwd(newPwd))) {
            setError("Please enter all fields");
        } else {
            setLoading(true);

            try {
                const user = await Auth.currentAuthenticatedUser();
                await Auth.changePassword(user, oldPwd, newPwd);

                setLoading(false);
                props.navigation.pop();
                props.navigation.navigate("PasswordChanged");
            } catch (e) {
                setError(
                    "An error occurred, make sure you correctly inputted your old password and try again"
                );
                setLoading(false);
            }
        }
    };

    return (
        <TouchableOpacity
            style={styles.passwordContainer}
            onPress={Keyboard.dismiss}
            activeOpacity={1}
        >
            {!!error && <Text style={styles.errorText}>{error}</Text>}
            <Input
                placeholder={"Old password..."}
                leftIcon={{
                    type: "MaterialIcons",
                    name: "lock",
                    color: palette.lightGray,
                }}
                secureTextEntry
                onChangeText={setOldPwd}
                value={oldPwd}
            />
            <Input
                placeholder={"New password..."}
                leftIcon={{
                    type: "MaterialIcons",
                    name: "lock",
                    color: palette.lightGray,
                }}
                secureTextEntry
                onBlur={() => {
                    setPwdActive(false);
                }}
                onFocus={() => {
                    setPwdActive(true);
                }}
                onChangeText={setNewPwd}
                value={newPwd}
            />
            <PwdCheck active={newPwdActive} pwd={newPwd} />
            <View style={styles.footer}>
                <AuthButton
                    marginTop={20}
                    loading={loading}
                    onPress={changePassword}
                    text={"Submit"}
                    active={!!(oldPwd && newPwd && checkPwd(newPwd))}
                />
            </View>
        </TouchableOpacity>
    );
};

export default Password;
