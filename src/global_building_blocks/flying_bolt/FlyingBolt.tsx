import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import BoltBox from "../bolt_box/BoltBox";

interface Props {
    animationHeight: number;
    amount: number;
    boltSize: number;
    fontSize: number;
    fuse: number;
    moveTextRight?: number;
    paddingRight?: number;
}

const FlyingBolt: React.FC<Props> = (props) => {
    const animatedHeight = useRef(new Animated.Value(0)).current;
    const animatedOpacity = useRef(new Animated.Value(0)).current;

    const shockTheNation = () => {
        animatedHeight.setValue(0);
        animatedOpacity.setValue(1);

        const animationDuration = 600;

        Animated.parallel([
            Animated.timing(animatedHeight, {
                toValue: -1 * props.animationHeight,
                duration: animationDuration,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
            Animated.timing(animatedOpacity, {
                toValue: 0,
                duration: animationDuration,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ]).start();
    };

    useEffect(() => {
        if (!!props.fuse) {
            shockTheNation();
        }
    }, [props.fuse]);

    return (
        <Animated.View
            style={{
                transform: [
                    {
                        translateY: animatedHeight,
                    },
                ],
                opacity: animatedOpacity,
            }}
        >
            <BoltBox
                showBoltPlus
                amount={props.amount}
                fontSize={props.fontSize}
                boltSize={props.boltSize}
                moveTextRight={props.moveTextRight}
                paddingRight={props.paddingRight}
            />
        </Animated.View>
    );
};

export default FlyingBolt;
