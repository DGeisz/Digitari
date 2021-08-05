import React from "react";
import { Text, View } from "react-native";
import { styles } from "./TabLabelStyles";

interface Props {
    title: string;
    color: string;
    active?: boolean;
}

export default class TabLabel extends React.PureComponent<Props> {
    render() {
        return (
            <View style={styles.tabContainer}>
                {!!this.props.active && <View style={styles.dot} />}
                <Text
                    style={[styles.tabTitleText, { color: this.props.color }]}
                >
                    {this.props.title}
                </Text>
            </View>
        );
    }
}
