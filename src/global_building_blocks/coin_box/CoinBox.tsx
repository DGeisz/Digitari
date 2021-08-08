import React from "react";
import { Image, View, Text } from "react-native";
import { styles } from "./CoinBoxStyles";
import { toCommaRep, toRep } from "../../global_utils/ValueRepUtils";
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
    showAbbreviated?: boolean;
    paddingVertical?: number;
    paddingRight?: number;
    outOfCoin?: number;
    fontWeight?: "bold" | "500" | "600" | "700";
}

export default class CoinBox extends React.Component<Props> {
    static defaultProps = {
        amount: 0,
        active: true,
        fontSize: 12,
        showAmount: true,
        fontColor: palette.hardGray,
        coinSize: 12,
        boxColor: palette.transparent,
        showCoinPlus: false,
        showAbbreviated: true,
        fontWeight: "600",
    };

    render() {
        return (
            <View
                style={[
                    styles.coinBoxContainer,
                    { backgroundColor: this.props.boxColor },
                    !!this.props.paddingVertical
                        ? { paddingVertical: this.props.paddingVertical }
                        : {},
                    !!this.props.paddingRight
                        ? { paddingRight: this.props.paddingRight }
                        : {},
                ]}
            >
                {this.props.active ? (
                    <Image
                        source={require("../../../assets/coin.png")}
                        style={{
                            height: this.props.coinSize,
                            width: this.props.coinSize,
                        }}
                    />
                ) : (
                    <Image
                        source={require("../../../assets/coin_semi_soft_gray.png")}
                        style={{
                            height: this.props.coinSize,
                            width: this.props.coinSize,
                        }}
                    />
                )}
                {!!this.props.showAmount ? (
                    <Text
                        style={[
                            styles.coinBoxText,
                            {
                                fontSize: this.props.fontSize,
                                color: this.props.fontColor,
                                fontWeight: this.props.fontWeight,
                            },
                        ]}
                    >
                        {(this.props.showCoinPlus ? "+" : "") +
                            (this.props.showAbbreviated
                                ? toRep(this.props.amount)
                                : toCommaRep(this.props.amount))}
                        {!!this.props.outOfCoin && (
                            <Text>
                                {" / "}
                                {this.props.showAbbreviated
                                    ? toRep(this.props.outOfCoin)
                                    : toCommaRep(this.props.outOfCoin)}
                            </Text>
                        )}
                    </Text>
                ) : (
                    <></>
                )}
            </View>
        );
    }
}
