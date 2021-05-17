import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import { removeTransactionReceipt } from "../../../../../../../../global_state/CoinUpdates";
import { TransactionReceipt } from "../../../../../../../../global_types/TransactionTypes";
import CoinBox from "../../../../../../../../global_building_blocks/coin_box/CoinBox";

interface Props {
    receipt: TransactionReceipt;
}

const SingleCoin: React.FC<Props> = (props) => {
    const animatedOpacity = useRef(new Animated.Value(1)).current;
    const animatedHeight = useRef(new Animated.Value(0)).current;
    const animatedX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const duration = 1000;
        const velocity = 2 * (Math.random() - 0.5) * 100;

        Animated.parallel([
            Animated.timing(animatedHeight, {
                toValue: -250,
                easing: Easing.linear,
                duration,
                useNativeDriver: true,
            }),
            Animated.timing(animatedOpacity, {
                toValue: 0,
                easing: Easing.linear,
                duration,
                useNativeDriver: true,
            }),
            Animated.spring(animatedX, {
                toValue: 0,
                useNativeDriver: true,
                velocity,
                damping: 4,
                stiffness: 200,
                mass: 6,
            }),
        ]).start(() => {
            animatedHeight.setValue(0);
            animatedX.setValue(0);
            animatedOpacity.setValue(0);
        });

        setTimeout(() => {
            removeTransactionReceipt(props.receipt.id);
        }, duration);
    }, []);

    return (
        <Animated.View
            style={{
                position: "absolute",
                opacity: animatedOpacity,
                transform: [
                    {
                        translateY: animatedHeight,
                    },
                    {
                        translateX: animatedX,
                    },
                ],
            }}
        >
            <CoinBox
                amount={props.receipt.amount}
                showCoinPlus
                fontSize={16}
                coinSize={20}
            />
        </Animated.View>
    );
};

export default SingleCoin;
