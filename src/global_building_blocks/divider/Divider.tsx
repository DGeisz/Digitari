import React from "react";
import { View } from "react-native";
import { styles } from "./DividerStyles";
import { palette } from "../../global_styles/Palette";

interface Props {
    color?: string;
}

export default class Divider extends React.PureComponent<Props> {
    static defaultProps = {
        color: palette.softGray,
    };

    render() {
        return (
            <View style={styles.dividerContainer}>
                <View
                    style={[
                        styles.divider,
                        { borderBottomColor: this.props.color },
                    ]}
                />
            </View>
        );
    }
}
