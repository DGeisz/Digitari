import * as React from "react";
import { View } from "react-native";
import { styles } from "./WhiteScreenStyles";

interface Props {
    height: number;
}

const WhiteScreen: React.FC<Props> = ({ height }) => {
    return <View style={[styles.whiteScreen, { height }]} />;
};

export default WhiteScreen;
