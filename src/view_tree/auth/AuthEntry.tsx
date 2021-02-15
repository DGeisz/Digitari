import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
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

const AuthStack = createStackNavigator();

const AuthEntry: React.FC = () => {
    return (
        <AuthStack.Navigator
            initialRouteName="Launch"
            screenOptions={{
                headerTruncatedBackTitle: "",
                headerBackTitle: "",
                headerTransparent: true,
                cardStyle: { backgroundColor: palette.white },
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
                options={{ title: "Forgot password" }}
            />
            <AuthStack.Screen
                name="ResetPwd"
                component={ResetPwd}
                options={{ title: "Reset password" }}
            />
            <AuthStack.Screen
                name="ResetPwdSuccess"
                component={ResetPwdSuccess}
                options={{ title: "" }}
            />

            {/*Sign up screens*/}
            <AuthStack.Screen
                name="SignUp"
                component={SignUp}
                options={{ title: "Sign up" }}
            />
            <AuthStack.Screen
                name="NewAccountName"
                component={NewAccountName}
                options={{ title: "Sign up" }}
            />
            <AuthStack.Screen
                name="NewAccountEmailPwd"
                component={NewAccountEmailPwd}
                options={{ title: "Sign up" }}
            />
            <AuthStack.Screen
                name="VerifyEmail"
                component={VerifyEmail}
                options={{ title: "Verify email" }}
            />
        </AuthStack.Navigator>
    );
};

export default AuthEntry;
