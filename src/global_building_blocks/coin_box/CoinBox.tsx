import * as React from "react";
import { Image, View, Text } from "react-native";
import { styles } from "./CoinBoxStyles";
import { toRep } from "../../global_utils/ValueRepUtils";
import { palette } from "../../global_styles/Palette";

interface Props {
    amount: number;
    active?: boolean;
    showAmount?: boolean;
    fontSize?: number;
    fontColor?: string;
    coinSize?: number;
    boxColor?: string;
    showCoinPlus?: boolean;
}

const defaultProps: Props = {
    amount: 0,
    active: true,
    fontSize: 12,
    showAmount: true,
    fontColor: palette.hardGray,
    coinSize: 12,
    boxColor: palette.transparent,
    showCoinPlus: false,
};

const CoinBox: React.FC<Props> = ({
    amount,
    active,
    fontSize,
    showAmount,
    coinSize,
    boxColor,
    fontColor,
    showCoinPlus,
}) => {
    return (
        <View style={[styles.coinBoxContainer, { backgroundColor: boxColor }]}>
            {active ? (
                <Image
                    source={require("../../../assets/coin.png")}
                    style={{ height: coinSize, width: coinSize }}
                />
            ) : (
                <Image
                    source={require("../../../assets/coin_semi_soft_gray.png")}
                    style={{ height: coinSize, width: coinSize }}
                />
            )}
            {showAmount && (
                <Text
                    style={[
                        styles.coinBoxText,
                        { fontSize: fontSize, color: fontColor },
                    ]}
                >
                    {(showCoinPlus ? "+" : "") + toRep(amount)}
                </Text>
            )}
        </View>
    );
};

CoinBox.defaultProps = defaultProps;

export default CoinBox;
