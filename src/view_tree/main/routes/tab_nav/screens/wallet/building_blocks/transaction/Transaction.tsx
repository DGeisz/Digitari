import React from "react";
import {
    TransactionType,
    TransactionTypesEnum,
} from "../../../../../../../../global_types/TransactionTypes";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./TransactionStyles";
import { millisToRep } from "../../../../../../../../global_utils/TimeRepUtils";
import CoinBox from "../../../../../../../../global_building_blocks/coin_box/CoinBox";

interface Props {
    transaction: TransactionType;
    openConvo: (cvid: string, pid: string) => void;
    openUser: (uid: string) => void;
    openChallenges: () => void;
    showBottomBorder: boolean;
    lastCollectionTime: number;
}

export default class Transaction extends React.PureComponent<Props> {
    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                style={[
                    styles.transactionContainer,
                    { borderBottomWidth: this.props.showBottomBorder ? 1 : 0 },
                ]}
                onPress={() => {
                    switch (this.props.transaction.transactionType) {
                        case TransactionTypesEnum.User:
                            return this.props.openUser(
                                this.props.transaction.data
                            );
                        case TransactionTypesEnum.Convo:
                            const [
                                cvid,
                                pid,
                            ] = this.props.transaction.data.split(":");

                            if (!!cvid && !!pid) {
                                return this.props.openConvo(cvid, pid);
                            }

                            break;
                        case TransactionTypesEnum.Challenge:
                            return this.props.openChallenges();
                    }
                }}
            >
                <View style={styles.coinContainer}>
                    <CoinBox
                        coinSize={20}
                        amount={this.props.transaction.coin}
                        active={
                            parseInt(this.props.transaction.time) >
                            this.props.lastCollectionTime
                        }
                    />
                </View>
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText} numberOfLines={3}>
                        {this.props.transaction.message}
                    </Text>
                </View>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>
                        {millisToRep(
                            Date.now() - parseInt(this.props.transaction.time)
                        )}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
