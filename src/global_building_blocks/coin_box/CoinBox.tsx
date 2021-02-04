import * as React from "react";
import { Image, View, Text } from "react-native";
import { styles } from "./CoinBoxStyles";
import { toRep } from "../../global_utils/ValueRepUtils";
import { palette } from "../../global_styles/Palette";

interface Props {
    amount: number;
    showAmount?: boolean;
    fontSize?: number;
    fontColor?: string;
    coinSize?: number;
    boxColor?: string;
}

const defaultProps: Props = {
    amount: 0,
    fontSize: 12,
    showAmount: true,
    fontColor: palette.hardGray,
    coinSize: 12,
    boxColor: palette.transparent,
}

const CoinBox: React.FC<Props> = ({
    amount,
    fontSize,
    showAmount,
    coinSize,
    boxColor,
    fontColor,
}) => {
    return (
        <View style={[styles.coinBoxContainer, { backgroundColor: boxColor }]}>
            <Image
                source={require("../../../assets/coin.png")}
                style={{ height: coinSize, width: coinSize }}
            />
            {showAmount && <Text
                style={[
                    styles.coinBoxText,
                    { fontSize: fontSize, color: fontColor },
                ]}
            >
                {toRep(amount)}
            </Text>}
        </View>
    );
};

CoinBox.defaultProps = defaultProps;

export default CoinBox;
