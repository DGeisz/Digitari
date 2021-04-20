import React from "react";
import { Text } from "react-native";
import { styles } from "./TabLabelStyles";

interface Props {
    title: string;
    color: string;
}

export default class TabLabel extends React.PureComponent<Props> {
    render() {
        return (
            <Text style={[styles.tabTitleText, { color: this.props.color }]}>
                {this.props.title}
            </Text>
        );
    }
}
