import React from "react";
import {
    TransactionType,
    TransactionTypesEnum,
} from "../../../../../../../../global_types/TransactionTypes";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./TransactionStyles";
import { millisToRep } from "../../../../../../../../global_utils/TimeRepUtils";
import CoinBox from "../../../../../../../../global_building_blocks/coin_box/CoinBox";
import BoltBox from "../../../../../../../../global_building_blocks/bolt_box/BoltBox";
import { palette } from "../../../../../../../../global_styles/Palette";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

interface Props {
    transaction: TransactionType;
    openConvo: (cvid: string, pid: string) => void;
    openUser: (uid: string) => void;
    openChallenges: () => void;
    showBottomBorder: boolean;
    lastCollectionTime: number;
}

const Transaction: React.FC<Props> = (props) => {
    let icon;

    if (Math.random() > 0.75) {
        icon = (
            <FontAwesome
                name="user"
                size={22}
                color={palette.deepBlue}
                style={styles.userIcon}
            />
        );
    } else {
        if (Math.random() > 0.66) {
            icon = (
                <Ionicons
                    name={"ios-chatbubbles"}
                    size={22}
                    style={styles.userIcon}
                    color={palette.deepBlue}
                />
            );
        } else {
            if (Math.random() > 0.5) {
                icon = (
                    <MaterialIcons
                        name="dynamic-feed"
                        size={22}
                        color={palette.semiSoftGray}
                    />
                );
            } else {
                icon = (
                    <MaterialIcons
                        name="bolt"
                        size={30}
                        color={palette.semiSoftGray}
                    />
                );
            }
        }
    }

    icon = null;

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={[
                styles.transactionContainer,
                { borderBottomWidth: props.showBottomBorder ? 1 : 0 },
            ]}
            onPress={() => {
                switch (props.transaction.transactionType) {
                    case TransactionTypesEnum.User:
                        return props.openUser(props.transaction.data);
                    case TransactionTypesEnum.Convo:
                        const [cvid, pid] = props.transaction.data.split(":");

                        if (!!cvid && !!pid) {
                            return props.openConvo(cvid, pid);
                        }

                        break;
                    case TransactionTypesEnum.Challenge:
                        return props.openChallenges();
                }
            }}
        >
            <View style={styles.coinContainer}>
                {icon}
                <CoinBox
                    coinSize={20}
                    amount={props.transaction.coin}
                    active={
                        parseInt(props.transaction.time) >
                        props.lastCollectionTime
                    }
                />
            </View>
            <View style={styles.messageContainer}>
                <Text style={styles.messageText} numberOfLines={3}>
                    {props.transaction.message}
                </Text>
            </View>
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>
                    {millisToRep(Date.now() - parseInt(props.transaction.time))}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default React.memo(Transaction, (prevProps, nextProps) => {
    return (
        prevProps.transaction === nextProps.transaction &&
        prevProps.showBottomBorder === nextProps.showBottomBorder &&
        prevProps.lastCollectionTime === nextProps.lastCollectionTime
    );
});
