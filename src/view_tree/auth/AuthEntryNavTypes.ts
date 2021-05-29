import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type AuthStackType = {
    ForgotPwd: undefined;
    Launch: undefined;
    InviteCode: undefined;
    NewAccountEmailPwd: {
        firstName: string;
        lastName: string;
    };
    NewAccountName: undefined;
    ResetPwd: {
        email: string;
    };
    ResetPwdSuccess: undefined;
    SignIn: undefined;
    SignInEmailPwd: undefined;
    SignUp: undefined;
    VerifyEmail: {
        email: string;
        pwd: string;
    };
    TermsAndConditions: undefined;
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
export type InviteCodeNavProp = StackNavigationProp<
    AuthStackType,
    "InviteCode"
>;

/**
 * Route props
 */
export type NewAccountEmailPwdRouteProp = RouteProp<
    AuthStackType,
    "NewAccountEmailPwd"
>;
export type ResetPwdRouteProp = RouteProp<AuthStackType, "ResetPwd">;
export type VerifyEmailRouteProp = RouteProp<AuthStackType, "VerifyEmail">;
