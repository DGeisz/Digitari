import * as React from "react";
import SocialAuth from "../../building_blocks/social_auth/SocialAuth";
import { SignUpNavProp } from "../../AuthEntryNavTypes";

interface Props {
    navigation: SignUpNavProp;
}

const SignUp: React.FC<Props> = (props) => {
    return (
        <SocialAuth
            actionCommand="Sign up"
            facebookAction={() => {}}
            googleAction={() => {}}
            appleAction={() => {}}
            emailAction={() => props.navigation.navigate("NewAccountName")}
        />
    );
};

export default SignUp;
