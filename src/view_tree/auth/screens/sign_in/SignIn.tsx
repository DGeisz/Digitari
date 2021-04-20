import React from "react";
import SocialAuth from "../../building_blocks/social_auth/SocialAuth";
import { SignInNavProp } from "../../AuthEntryNavTypes";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";

interface Props {
    navigation: SignInNavProp;
}

const SignIn: React.FC<Props> = (props) => {
    return (
        <SocialAuth
            actionCommand="Sign in"
            facebookAction={() =>
                Auth.federatedSignIn({
                    provider: CognitoHostedUIIdentityProvider.Facebook,
                })
            }
            googleAction={() =>
                Auth.federatedSignIn({
                    provider: CognitoHostedUIIdentityProvider.Google,
                })
            }
            appleAction={() =>
                Auth.federatedSignIn({
                    provider: CognitoHostedUIIdentityProvider.Apple,
                })
            }
            emailAction={() => props.navigation.navigate("SignInEmailPwd")}
        />
    );
};

export default SignIn;
