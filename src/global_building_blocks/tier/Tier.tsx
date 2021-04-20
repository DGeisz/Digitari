import React from "react";
import { Text } from "react-native";

interface Props {
    size: number;
    ranking: number;
}

export default class Tier extends React.PureComponent<Props> {
    render() {
        return <Text style={{ fontSize: this.props.size }}>😊</Text>;
    }
}
