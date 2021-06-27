import React, { useEffect, useRef } from "react";
import { Animated, Easing, Text } from "react-native";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { palette } from "../../../../../../global_styles/Palette";
import { styles } from "./BoltFlyerStyles";

interface Props {
    id: number;
    removeFlyer: (id: number) => void;
}

const BoltFlyer: React.FC<Props> = (props) => {
    const boltOpacity = useRef(new Animated.Value(1)).current;
    const boltHeight = useRef(new Animated.Value(0)).current;
    const boltX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const duration = 1000;
        const velocity = 2 * (Math.random() - 0.5) * 150;

        const animation = Animated.parallel([
            Animated.timing(boltHeight, {
                toValue: -250,
                easing: Easing.linear,
                duration,
                useNativeDriver: true,
            }),
            Animated.timing(boltOpacity, {
                toValue: 0,
                easing: Easing.linear,
                duration,
                useNativeDriver: true,
            }),
            Animated.spring(boltX, {
                toValue: 0,
                useNativeDriver: true,
                velocity,
                damping: 4,
                stiffness: 200,
                mass: 6,
            }),
        ]);

        animation.start();

        setTimeout(() => {
            props.removeFlyer(props.id);
        }, duration);

        return animation.stop;
    }, []);
    return (
        <Animated.View
            style={[
                styles.boltContainer,
                {
                    opacity: boltOpacity,
                    transform: [
                        {
                            translateX: boltX,
                        },
                        {
                            translateY: boltHeight,
                        },
                    ],
                },
            ]}
        >
            <Entypo name={"plus"} size={20} color={palette.deepBlue} />
            <MaterialIcons
                name="bolt"
                size={35}
                color={palette.deepBlue}
                style={styles.bolt}
            />
        </Animated.View>
    );
};

export default BoltFlyer;
