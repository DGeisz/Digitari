import * as React from "react";
import { styles } from "./WalletEntryStyles";
import { View, Text } from "react-native";
import { WalletEntryType } from "../../global_types/WalletEntryTypes";
import { millisToRep } from "../../global_utils/TimeRepUtils";
import CoinBox from "../coin_box/CoinBox";
import { palette } from "../../global_styles/Palette";

interface Props {
    walletEntry: WalletEntryType
}

const WalletEntry: React.FC<Props> = ({walletEntry}) => {
    return (
        <View style={styles.walletEntryContainer}>
            <View style={styles.walletEntryLeft}>
                <Text style={styles.entryTimeText} numberOfLines={2}>
                    {millisToRep(Date.now() - walletEntry.time)}
                </Text>
            </View>
            <View style={styles.walletEntryMiddle}>
                <Text style={styles.walletEntryText}>
                    {walletEntry.content}
                </Text>
            </View>
            <View style={styles.walletEntryRight}>
                <CoinBox coinSize={20} amount={walletEntry.coin} showCoinPlus boxColor={palette.oceanSurf}/>
            </View>
        </View>
    );
};

export default WalletEntry;