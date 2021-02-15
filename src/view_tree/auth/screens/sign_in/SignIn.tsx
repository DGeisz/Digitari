import * as React from "react";
import SocialAuth from "../../building_blocks/social_auth/SocialAuth";
import { SignInNavProp } from "../../AuthEntryNavTypes";

interface Props {
    navigation: SignInNavProp;
}

const SignIn: React.FC<Props> = (props) => {
    return (
        <SocialAuth
            actionCommand="Sign in"
            facebookAction={() => {}}
            googleAction={() => {}}
            appleAction={() => {}}
            emailAction={() => props.navigation.navigate("SignInEmailPwd")}
        />
    );
};

export default SignIn;
