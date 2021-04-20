import React from "react";
import { View, Text } from "react-native";
import { styles } from "./UserStatStyles";
import CoinBox from "../../../../coin_box/CoinBox";
import { toCommaRep } from "../../../../../global_utils/ValueRepUtils";

interface Props {
    showCoin?: boolean;
    title: string;
    quantity: number;
}

export default class UserStat extends React.PureComponent<Props> {
    static defaultProps = {
        showCoin: false,
    };

    render() {
        return (
            <View style={styles.statContainer}>
                <Text style={styles.statTitle}>{this.props.title}</Text>
                {this.props.showCoin ? (
                    <CoinBox
                        amount={this.props.quantity}
                        fontSize={18}
                        coinSize={30}
                        showAbbreviated
                    />
                ) : (
                    <Text style={styles.statContent}>
                        {toCommaRep(this.props.quantity)}
                    </Text>
                )}
            </View>
        );
    }
}
