import React from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./NewButtonStyles";
import { FontAwesome } from "@expo/vector-icons";
import { palette } from "../../global_styles/Palette";
import {
    TutorialContext,
    TutorialScreen,
} from "../../view_tree/tutorial/context/tutorial_context/TutorialContext";
import UpdateIndicator from "../../view_tree/main/routes/tab_nav/building_blocks/update_indicator/UpdateIndicator";

interface Props {
    openNew: () => void;
}

export default class NewButton extends React.PureComponent<Props> {
    render() {
        return (
            <TutorialContext.Consumer>
                {({ tutorialActive, tutorialScreen, advanceTutorial }) => (
                    <View style={styles.viewContainer} pointerEvents="box-none">
                        <TouchableOpacity
                            style={styles.newPostButton}
                            onPress={() => {
                                if (
                                    tutorialActive &&
                                    tutorialScreen === TutorialScreen.TapNewPost
                                ) {
                                    this.props.openNew();
                                    advanceTutorial();
                                } else if (!tutorialActive) {
                                    this.props.openNew();
                                }
                            }}
                            activeOpacity={0.5}
                        >
                            {tutorialActive &&
                                tutorialScreen ===
                                    TutorialScreen.TapNewPost && (
                                    <View style={styles.pulseContainer}>
                                        <UpdateIndicator dotSize={6} />
                                    </View>
                                )}
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
