import React from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./NewButtonStyles";
import { FontAwesome } from "@expo/vector-icons";
import { palette } from "../../global_styles/Palette";

interface Props {
    openNew: () => void;
}

export default class NewButton extends React.PureComponent<Props> {
    render() {
        return (
            <View style={styles.viewContainer} pointerEvents="box-none">
                <TouchableOpacity
                    style={styles.newPostButton}
                    onPress={this.props.openNew}
                    activeOpacity={0.5}
                >
                    <FontAwesome
                        name="pencil"
                        size={35}
                        color={palette.white}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
