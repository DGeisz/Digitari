import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import {
    LevelReward,
    LevelRewardType,
} from "../../../../../../global_types/LevelTypes";
import { styles } from "./LevelRewardCompStyles";
import CoinBox from "../../../../../../global_building_blocks/coin_box/CoinBox";
import { FontAwesome } from "@expo/vector-icons";
import { palette } from "../../../../../../global_styles/Palette";
import Modal from "react-native-modal";
import { modalStyles } from "../../../../../../global_styles/OptionsModalStyles";
import { getRewardDescription } from "../../utils/reward_description_utils";

const REWARDS_QUANTA = 600;

interface Props {
    reward: LevelReward;
    index: number;
    scale: number;
}

const LevelRewardComp: React.FC<Props> = (props) => {
    const [infoModalVisible, showInfoModal] = useState<boolean>(false);

    const rewardsScale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(rewardsScale, {
                    toValue: props.scale,
                    useNativeDriver: true,
                    duration: REWARDS_QUANTA,
                }),
                Animated.timing(rewardsScale, {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: REWARDS_QUANTA,
                }),
            ])
        );

        setTimeout(animation.start, 200 * props.index);

        return animation.stop;
    }, []);

    if (props.reward.reward === LevelRewardType.Coin) {
        return (
            <Animated.View
                style={[
                    styles.container,
                    { transform: [{ scale: rewardsScale }] },
                ]}
            >
                <CoinBox
                    amount={props.reward.quantity}
                    showAbbreviated={false}
                    coinSize={35}
                    fontSize={19}
                    showCoinPlus
                    fontWeight="bold"
                />
            </Animated.View>
        );
    }

    const { description, title, modalDescription } = getRewardDescription(
        props.reward
    );

    return (
        <Animated.View
            style={[styles.container, { transform: [{ scale: rewardsScale }] }]}
        >
            <Text style={styles.rewardText}>{description}</Text>
            {!!modalDescription && (
                <>
                    <Modal isVisible={infoModalVisible}>
                        <View style={modalStyles.modalOuterContainer}>
                            <View style={modalStyles.modalContainer}>
                                <View style={modalStyles.modalHeader}>
                                    <Text style={modalStyles.modalHeaderText}>
                                        {title}
                                    </Text>
                                </View>
                                <Text style={styles.modalDescription}>
                                    {modalDescription}
                                </Text>
                                <View style={modalStyles.modalFooter}>
                                    <TouchableOpacity
                                        style={modalStyles.closeButton}
                                        onPress={() => showInfoModal(false)}
                                    >
                                        <Text
                                            style={modalStyles.closeButtonText}
                                        >
                                            Close
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => showInfoModal(true)}
                    >
                        <FontAwesome
                            name="info"
                            size={18}
                            color={palette.deepBlue}
                        />
                    </TouchableOpacity>
                </>
            )}
        </Animated.View>
    );
};

export default LevelRewardComp;
