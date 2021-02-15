import { StackNavigationProp } from "@react-navigation/stack";

export type AuthStackType = {
    ForgotPwd: undefined;
    Launch: undefined;
    NewAccountEmailPwd: {
        firstName: string;
        lastName: string;
    };
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
export type NewAccountNameNavProp = StackNavigationProp<
    AuthStackType,
    "NewAccountName"
>;
export type NewAccountEmailPwdNavProp = StackNavigationProp<
    AuthStackType,
    "NewAccountEmailPwd"
>;
export type SignInEmailPwdNavProp = StackNavigationProp<
    AuthStackType,
    "SignInEmailPwd"
>;
export type ForgotPwdNavProp = StackNavigationProp<AuthStackType, "ForgotPwd">;
export type ResetPwdNavProp = StackNavigationProp<AuthStackType, "ResetPwd">;
export type ResetPwdSuccessNavProp = StackNavigationProp<
    AuthStackType,
    "ResetPwdSuccess"
>;

/**
 * Route props
 */
