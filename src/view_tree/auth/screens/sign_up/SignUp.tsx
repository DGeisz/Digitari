import React from "react";
import SocialAuth from "../../building_blocks/social_auth/SocialAuth";
import { SignUpNavProp } from "../../AuthEntryNavTypes";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";

interface Props {
    navigation: SignUpNavProp;
}

const SignUp: React.FC<Props> = (props) => {
    return (
        <SocialAuth
            actionCommand="Sign up"
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
            emailAction={() => props.navigation.navigate("NewAccountName")}
        />
    );
};

export default SignUp;
