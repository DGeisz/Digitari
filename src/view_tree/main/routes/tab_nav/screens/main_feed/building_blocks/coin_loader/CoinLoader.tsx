import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Image, View } from "react-native";

const coinSize = 100;

const r = 21 / 30;

const CoinLoader: React.FC = () => {
    const animatedHeight = useRef(new Animated.Value(0)).current;

    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        setTime(0);

        const increase = setInterval(() => {
            setTime((time) => {
                if (time >= 300) {
                    clearInterval(increase);

                    return time;
                } else {
                    return time + 1;
                }
            });
        }, 100);

        // animatedheight.setvalue(0);
        //
        // animated.timing(animatedheight, {
        //     tovalue: 1,
        //     duration: 2000,
        //     easing: easing.linear,
        //     usenativedriver: true,
        // }).start();start
    }, []);

    console.log("Here's time: ", time);

    return (
        <View style={{ position: "relative" }}>
            <View>
                <Image
                    source={require("../../../../../../../../../assets/coin_semi_soft_gray.png")}
                    style={{
                        height: coinSize,
                        width: coinSize,
                    }}
                />
            </View>
            <View
                style={{
                    position: "absolute",
                    width: coinSize,
                    height: Math.floor(
                        (((21 * time) / 300 + 5) / 30) * coinSize
                    ),
                    bottom: 0,
                    left: 0,
                    overflow: "hidden",
                }}
            >
                <Image
                    source={require("../../../../../../../../../assets/coin.png")}
                    style={{
                        position: "absolute",
                        height: coinSize,
                        width: coinSize,
                        bottom: 0,
                        left: 0,
                    }}
                />
            </View>
        </View>
    );
};

export default CoinLoader;
