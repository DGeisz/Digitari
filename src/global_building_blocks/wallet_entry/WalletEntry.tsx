import React from "react";
import { styles } from "./WalletEntryStyles";
import { View, Text } from "react-native";
import { WalletEntryType } from "../../global_types/WalletEntryTypes";
import { millisToRep } from "../../global_utils/TimeRepUtils";
import CoinBox from "../coin_box/CoinBox";
import { palette } from "../../global_styles/Palette";

interface Props {
    walletEntry: WalletEntryType;
}

export default class WalletEntry extends React.PureComponent<Props> {
    render() {
        return (
            <View style={styles.walletEntryContainer}>
                <View style={styles.walletEntryLeft}>
                    <Text style={styles.entryTimeText} numberOfLines={2}>
                        {millisToRep(Date.now() - this.props.walletEntry.time)}
                    </Text>
                </View>
                <View style={styles.walletEntryMiddle}>
                    <Text style={styles.walletEntryText}>
                        {this.props.walletEntry.content}
                    </Text>
                </View>
                <View style={styles.walletEntryRight}>
                    <CoinBox
                        coinSize={20}
                        amount={this.props.walletEntry.coin}
                        showCoinPlus
                        boxColor={palette.oceanSurf}
                    />
                </View>
            </View>
        );
    }
}
