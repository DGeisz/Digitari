import * as React from "react";
import { Text, View } from "react-native";
import { authStyles } from "../../styles/AuthStyles";
import AuthButton from "../../building_blocks/auth_button/AuthButton";
import {
    ResetPwdNavProp,
    ResetPwdSuccessNavProp,
} from "../../AuthEntryNavTypes";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";

interface Props {
    navigation: ResetPwdSuccessNavProp;
}

const ResetPwdSuccess: React.FC<Props> = (props) => {
    return (
        <View style={authStyles.paddedAuthContainer}>
            <Text
                style={[authStyles.authInstructions, { textAlign: "center" }]}
            >
                Your password was successfully reset
            </Text>
            <View style={basicLayouts.grid5}>
                <AuthButton
                    marginTop={20}
                    onPress={() => {
                        props.navigation.popToTop();
                        props.navigation.navigate("SignIn");
                    }}
                    text={"Sign in"}
                />
            </View>
        </View>
    );
};

export default ResetPwdSuccess;
