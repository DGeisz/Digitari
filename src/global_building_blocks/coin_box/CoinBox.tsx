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
    };

    render() {

        return (
            <View
                style={[
                    styles.coinBoxContainer,
                    { backgroundColor: this.props.boxColor },
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
                             },
                         ]}
                     >
                         {(this.props.showCoinPlus ? "+" : "") + toRep(this.props.amount)}
                     </Text>
                 ) : <></>}
             </View>
        );
    }
}
