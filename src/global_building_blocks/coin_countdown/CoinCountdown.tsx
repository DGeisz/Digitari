import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles, countdownCoinSize } from "./CoinCountdownStyles";
import CoinBox from "../coin_box/CoinBox";
import { palette } from "../../global_styles/Palette";

const countdownAmount = 30;

interface Props {
    referenceTime: number;
    onNextPosts: () => void;
    amount: number;
    showSkip?: boolean;
    onSkip?: () => void;
}

const CoinCountdown: React.FC<Props> = (props) => {
    const [time, setTime] = useState<number>(Date.now());

    useEffect(() => {
        const increase = setInterval(() => {
            setTime((time) => {
                if (time - props.referenceTime > countdownAmount * 1000) {
                    clearInterval(increase);

                    return time;
                } else {
                    return Date.now();
                }
            });
        }, 1000);

        return () => {
            clearInterval(increase);
        };
    }, []);

    const elapsed = Math.max(
        Math.floor((time - props.referenceTime) / 1000),
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
