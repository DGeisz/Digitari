import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { styles } from "./CoinFlyerStyles";
import CoinBox from "../../../../../coin_box/CoinBox";

interface Props {
    id: number;
    removeFlyer: (id: number) => void;
}

const CoinFlyer: React.FC<Props> = (props) => {
    const coinOpacity = useRef(new Animated.Value(1)).current;
    const coinHeight = useRef(new Animated.Value(0)).current;
    const coinX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const duration = 1000;
        const velocity = 2 * (Math.random() - 0.5) * 150;

        const animation = Animated.parallel([
            Animated.timing(coinHeight, {
                toValue: -250,
                easing: Easing.linear,
                duration,
                useNativeDriver: true,
            }),
            Animated.timing(coinOpacity, {
                toValue: 0,
                easing: Easing.linear,
                duration,
                useNativeDriver: true,
            }),
            Animated.spring(coinX, {
                toValue: 0,
                useNativeDriver: true,
                velocity,
                damping: 4,
                stiffness: 200,
                mass: 6,
            }),
        ]);

        animation.start();

        const timeout = setTimeout(() => {
            props.removeFlyer(props.id);
        }, duration);

        return () => {
            animation.stop();
            clearTimeout(timeout);
        };
    }, []);
    return (
        <Animated.View
            pointerEvents="none"
            style={[
                styles.coinContainer,
                {
                    opacity: coinOpacity,
                    transform: [
                        {
                            translateX: coinX,
                        },
                        {
                            translateY: coinHeight,
                        },
                    ],
                },
            ]}
        >
            <CoinBox amount={10} showCoinPlus coinSize={20} active={false} />
        </Animated.View>
    );
};

export default CoinFlyer;
