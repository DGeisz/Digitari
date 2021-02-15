import * as React from "react";
import { Image, View, Text } from "react-native";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { styles } from "./LaunchStyles";
import AuthButton from "../../building_blocks/auth_button/AuthButton";
import { LaunchNavProp } from "../../AuthEntryNavTypes";

interface Props {
    navigation: LaunchNavProp;
}

const logoWidth = 250;
const logoHeight = (106 / 384) * logoWidth;

const Launch: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={basicLayouts.flexGrid5}>
            <View style={[basicLayouts.flexRow, basicLayouts.grid5]}>
                <Image
                    source={require("../../../../../assets/digi_logo.png")}
                    style={{
                        height: logoHeight,
                        width: logoWidth,
                    }}
                />
                {/*<Text style={styles.launchTitleText}>digitari</Text>*/}
            </View>
            <AuthButton
                onPress={() => navigation.navigate("SignIn")}
                text="Sign in"
                marginTop={70}
            />
            <AuthButton
                onPress={() => navigation.navigate("SignUp")}
                text="Sign up"
                marginTop={20}
            />
        </View>
    );
};

export default Launch;
