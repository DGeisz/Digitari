import React from "react";
import { styles } from "./WalletHeaderStyles";
import { Text, TouchableOpacity, View } from "react-native";
import { WalletType } from "../../../../../../../../global_types/WalletTypes";
import {
    millisIn10Minutes,
    millisToCountdown,
} from "../../../../../../../../global_utils/TimeRepUtils";
import CoinBox from "../../../../../../../../global_building_blocks/coin_box/CoinBox";
import { palette } from "../../../../../../../../global_styles/Palette";

interface Props {
    wallet: WalletType;
}

interface State {
    bonus: boolean;
    timeDelta: number;
}

export default class WalletHeader extends React.PureComponent<Props, State> {
    state = {
        bonus:
            this.props.wallet.expirationTime - Date.now() > millisIn10Minutes,
        timeDelta:
            this.props.wallet.expirationTime - Date.now() > millisIn10Minutes
                ? this.props.wallet.expirationTime -
                  Date.now() -
                  millisIn10Minutes
                : this.props.wallet.expirationTime - Date.now(),
    };

    render() {
        // setInterval(() => {
        //     const delta = this.props.wallet.expirationTime - Date.now();
        //
        //     if (delta > millisIn10Minutes) {
        //         this.setState({bonus: true, timeDelta: delta - millisIn10Minutes});
        //     } else {
        //         this.setState({bonus: false, timeDelta: delta});
        //     }
        // }, 1000);

        return (
            <View style={styles.walletContainer}>
                <View style={styles.walletLeft}>
                    <View style={styles.walletLeftTop}>
                        <Text style={styles.walletSumText}>Current Sum:</Text>
                        <CoinBox
                            amount={this.props.wallet.sum}
                            coinSize={22}
                            boxColor={palette.lightForestGreen}
                            showCoinPlus
                            fontSize={16}
                        />
                    </View>
                    <View style={styles.walletLeftBottom}>
                        <Text style={styles.walletCountDownText}>
                            {this.state.bonus
                                ? "Bonus Countdown: "
                                : "Expiration Countdown: "}
                            <Text
                                style={{
                                    color: this.state.bonus
                                        ? palette.primary
                                        : palette.danger,
                                }}
                            >
                                {millisToCountdown(this.state.timeDelta)}
                            </Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.walletRight}>
                    <TouchableOpacity
                        style={styles.walletCollectButton}
                        activeOpacity={0.5}
                    >
                        <Text style={styles.collectButtonText}>Collect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
