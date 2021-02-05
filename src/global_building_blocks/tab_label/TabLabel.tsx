import * as React from "react";
import { Text } from "react-native";
import { styles } from "./TabLabelStyles";

interface Props {
    title: string;
    color: string;
}

const TabLabel: React.FC<Props> = ({ title, color }) => {
    return <Text style={[styles.tabTitleText, { color: color }]}>{title}</Text>;
};

export default TabLabel;
