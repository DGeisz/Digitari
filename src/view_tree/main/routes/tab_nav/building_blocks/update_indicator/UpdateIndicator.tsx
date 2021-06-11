import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { styles } from "./UpdateIndicatorStyles";

const animationDuration = 1400;

interface Props {
    dotSize?: number;
}

const UpdateIndicator: React.FC<Props> = (props) => {
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
                        toValue: !!props.dotSize ? props.dotSize : 3,
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
