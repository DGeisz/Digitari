import { StackNavigationProp } from "@react-navigation/stack";

export type AuthStackType = {
    ForgotPwd: undefined;
    Launch: undefined;
    NewAccountEmailPwd: undefined;
    NewAccountName: undefined;
    ResetPwd: undefined;
    ResetPwdSuccess: undefined;
    SignIn: undefined;
    SignInEmailPwd: undefined;
    SignUp: undefined;
    VerifyEmail: undefined;
};

/**
 * Nav props
 */
export type LaunchNavProp = StackNavigationProp<AuthStackType, "Launch">;
export type SignInNavProp = StackNavigationProp<AuthStackType, "SignIn">;
export type SignUpNavProp = StackNavigationProp<AuthStackType, "SignUp">;
