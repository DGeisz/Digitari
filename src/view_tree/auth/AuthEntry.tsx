import React from "react";
import {
    createStackNavigator,
    HeaderBackButton,
} from "@react-navigation/stack";
import Launch from "./screens/launch/Launch";
import SignIn from "./screens/sign_in/SignIn";
import SignInEmailPwd from "./screens/sign_in_email_pwd/SignInEmailPwd";
import ForgotPwd from "./screens/forgot_pwd/ForgotPwd";
import ResetPwd from "./screens/reset_pwd/ResetPwd";
import ResetPwdSuccess from "./screens/reset_pwd_success/ResetPwdSuccess";
import SignUp from "./screens/sign_up/SignUp";
import NewAccountName from "./screens/new_account_name/NewAccountName";
import NewAccountEmailPwd from "./screens/new_account_email_pwd/NewAccountEmailPwd";
import VerifyEmail from "./screens/verify_email/VerifyEmail";
import { palette } from "../../global_styles/Palette";
import { AuthStackType } from "./AuthEntryNavTypes";
import InviteCode from "./screens/invite_code/InviteCode";
import TermsAndConditions from "../main/screens/settings/screens/terms_and_conditions/TermsAndConditions";

const AuthStack = createStackNavigator<AuthStackType>();

const AuthEntry: React.FC = () => {
    return (
        <AuthStack.Navigator
            initialRouteName="Launch"
            screenOptions={{
                headerTruncatedBackTitle: "",
                headerBackTitle: "",
                headerTitleStyle: { color: palette.hardGray },
                headerTransparent: true,
                headerTintColor: palette.deepBlue,
                cardStyle: { backgroundColor: palette.white },
                headerLeftContainerStyle: { marginLeft: 10 },
            }}
        >
            <AuthStack.Screen
                name="Launch"
                component={Launch}
                options={{ title: "" }}
            />

            {/*Sign in screens*/}
            <AuthStack.Screen
                name="SignIn"
                component={SignIn}
                options={{ title: "Sign in" }}
            />
            <AuthStack.Screen
                name="SignInEmailPwd"
                component={SignInEmailPwd}
                options={{ title: "Sign in" }}
            />
            <AuthStack.Screen
                name="ForgotPwd"
                component={ForgotPwd}
                options={{
                    title: "Forgot password",
                }}
            />
            <AuthStack.Screen
                name="ResetPwd"
                component={ResetPwd}
                options={({ navigation }) => ({
                    headerTransparent: false,
                    title: "Reset password",
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={navigation.popToTop}
                        />
                    ),
                })}
            />
            <AuthStack.Screen
                name="ResetPwdSuccess"
                component={ResetPwdSuccess}
                options={({ navigation }) => ({
                    title: "",
                    headerLeft: (props) => (
                        <HeaderBackButton
                            {...props}
                            onPress={navigation.popToTop}
                        />
                    ),
                })}
            />

            {/*Sign up screens*/}
            <AuthStack.Screen
                name="SignUp"
                component={SignUp}
                options={{ title: "Sign up" }}
            />
            <AuthStack.Screen
                name={"InviteCode"}
                component={InviteCode}
                options={{ title: "Validate invite" }}
            />
            <AuthStack.Screen
                name="NewAccountName"
                component={NewAccountName}
                options={{ title: "Name" }}
            />
            <AuthStack.Screen
                name="NewAccountEmailPwd"
                component={NewAccountEmailPwd}
                options={{ title: "Email & Password" }}
            />
            <AuthStack.Screen
                name="VerifyEmail"
                component={VerifyEmail}
                options={{ title: "Verify email" }}
            />
            <AuthStack.Screen
                name="TermsAndConditions"
                component={TermsAndConditions}
                options={{
                    title: "Terms & Conditions",
                    headerTransparent: false,
                }}
            />
        </AuthStack.Navigator>
    );
};

export default AuthEntry;
