import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles, countdownCoinSize } from "./CoinCountdownStyles";
import CoinBox from "../coin_box/CoinBox";
import { palette } from "../../global_styles/Palette";
import UpdateIndicator from "../../view_tree/main/routes/tab_nav/building_blocks/update_indicator/UpdateIndicator";

const countdownAmount = 20;

interface Props {
    referenceTime: number;
    onNextPosts: () => void;
    amount: number;
    showSkip?: boolean;
    onSkip?: () => void;
    accelerate?: boolean;
}

const CoinCountdown: React.FC<Props> = (props) => {
    const [time, setTime] = useState<number>(Date.now());

    const interval = !!props.accelerate ? 400 : 1000;

    useEffect(() => {
        const increase = setInterval(() => {
            setTime((time) => {
                if (time - props.referenceTime > countdownAmount * interval) {
                    clearInterval(increase);

                    return time;
                } else {
                    return Date.now();
                }
            });
        }, interval);

        return () => {
            clearInterval(increase);
        };
    }, []);

    const elapsed = Math.max(
        Math.floor((time - props.referenceTime) / interval),
        0
    );

    const remaining = Math.max(countdownAmount - elapsed, 0);

    if (remaining > 0) {
        return (
            <View style={styles.container}>
                <View style={styles.coinContainer}>
                    <View>
                        <Image
                            source={require("../../../assets/coin_semi_soft_gray.png")}
                            style={styles.grayCoin}
                        />
                    </View>
                    <View
                        style={[
                            styles.blueContainer,
                            {
                                height: Math.floor(
                                    (((21 * elapsed) / countdownAmount + 5) /
                                        30) *
                                        countdownCoinSize
                                ),
                            },
                        ]}
                    >
                        <Image
                            source={require("../../../assets/coin.png")}
                            style={styles.blueCoin}
                        />
                    </View>
                </View>
                <Text style={styles.remainingText}>Reward in {remaining}s</Text>
                {props.showSkip && (
                    <TouchableOpacity
                        style={styles.skipContainer}
                        onPress={() => !!props.onSkip && props.onSkip()}
                    >
                        <Text style={styles.skipText}>Skip reward</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.nextPostsButton}
                    activeOpacity={0.5}
                    onPress={props.onNextPosts}
                >
                    <View style={styles.pulseContainer}>
                        <UpdateIndicator dotSize={10} />
                    </View>
                    <Text style={styles.nextPostsText}>Next posts</Text>
                    <CoinBox
                        boxColor={palette.lightForestGreen}
                        amount={props.amount}
                        showCoinPlus
                        coinSize={25}
                        fontSize={16}
                        paddingRight={8}
                    />
                </TouchableOpacity>
            </View>
        );
    }
};

export default CoinCountdown;
