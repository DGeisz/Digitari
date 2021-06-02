import React from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./NewButtonStyles";
import { FontAwesome } from "@expo/vector-icons";
import { palette } from "../../global_styles/Palette";
import { TutorialContext } from "../../view_tree/context/tutorial_context/TutorialContext";

interface Props {
    openNew: () => void;
}

export default class NewButton extends React.PureComponent<Props> {
    render() {
        return (
            <TutorialContext.Consumer>
                {({ tutorialActive }) => (
                    <View style={styles.viewContainer} pointerEvents="box-none">
                        <TouchableOpacity
                            style={styles.newPostButton}
                            onPress={() => {
                                if (!tutorialActive) {
                                    this.props.openNew();
                                }
                            }}
                            activeOpacity={0.5}
                        >
                            <FontAwesome
                                name="pencil"
                                size={35}
                                color={palette.white}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </TutorialContext.Consumer>
        );
    }
}
