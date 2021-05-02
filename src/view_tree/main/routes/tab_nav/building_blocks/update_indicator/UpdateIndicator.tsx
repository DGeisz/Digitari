import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import { styles } from "./UpdateIndicatorStyles";

const animationDuration = 1400;

const UpdateIndicator: React.FC = () => {
    const opacityAnim = useRef(new Animated.Value(1)).current;
    const dotSize = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(opacityAnim, {
                        toValue: 0,
                        useNativeDriver: true,
                        duration: animationDuration,
                    }),
                    Animated.timing(dotSize, {
                        toValue: 3,
                        useNativeDriver: true,
                        duration: animationDuration,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(opacityAnim, {
                        toValue: 1,
                        useNativeDriver: true,
                        duration: 0,
                    }),
                    Animated.timing(dotSize, {
                        toValue: 0,
                        useNativeDriver: true,
                        duration: 0,
                    }),
                ]),
            ])
        ).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.indicatorDot,
                {
                    opacity: opacityAnim,
                    transform: [
                        {
                            scaleY: dotSize,
                        },
                        {
                            scaleX: dotSize,
                        },
                    ],
                },
            ]}
        />
    );
};

export default UpdateIndicator;
