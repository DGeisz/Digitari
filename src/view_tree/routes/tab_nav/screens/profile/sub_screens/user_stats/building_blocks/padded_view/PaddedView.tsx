import * as React from "react";
import { View } from "react-native";

interface Props {
    paddingHorizontal: number;
    paddingVertical: number;
    children: any;
    flexRow?: boolean;
}

export default class PaddedView extends React.PureComponent<Props> {
    static defaultProps = {
        flexRow: false,
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: this.props.paddingHorizontal,
                    paddingVertical: this.props.paddingVertical,
                    flexDirection: this.props.flexRow ? "row" : "column",
                }}
            >
                {this.props.children}
            </View>
        );
    }
}
