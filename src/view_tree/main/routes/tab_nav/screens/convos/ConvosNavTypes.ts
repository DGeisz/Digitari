import { StackNavigationProp } from "@react-navigation/stack";

export type ConvosNavType = {
    ActiveConvos: undefined;
    NewConvos: undefined;
};

export type ActiveConvosNavProp = StackNavigationProp<
    ConvosNavType,
    "ActiveConvos"
>;
export type NewConvosNavProp = StackNavigationProp<ConvosNavType, "NewConvos">;
