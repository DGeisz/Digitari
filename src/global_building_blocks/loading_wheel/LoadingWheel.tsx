import * as React from "react";
import { ActivityIndicator, View } from "react-native";
import { styles } from "./LoadingWheelStyles";
import { palette } from "../../global_styles/Palette";

export default class LoadingWheel extends React.PureComponent {
    render() {
        return (
            <View style={styles.loadingWheel}>
                <ActivityIndicator color={palette.deepBlue} size="large" />
            </View>
        );
    }
}
