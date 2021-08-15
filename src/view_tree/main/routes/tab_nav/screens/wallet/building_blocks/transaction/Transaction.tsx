import React from "react";
import {
    TransactionIcon,
    TransactionType,
    TransactionTypesEnum,
} from "../../../../../../../../global_types/TransactionTypes";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./TransactionStyles";
import { millisToRep } from "../../../../../../../../global_utils/TimeRepUtils";
import CoinBox from "../../../../../../../../global_building_blocks/coin_box/CoinBox";
import { palette } from "../../../../../../../../global_styles/Palette";
import {
    FontAwesome,
    FontAwesome5,
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons";
import BoltBox from "../../../../../../../../global_building_blocks/bolt_box/BoltBox";

interface Props {
    transaction: TransactionType;
    openConvo: (cvid: string, pid: string) => void;
    openUser: (uid: string) => void;
    openPost: (pid: string) => void;
    openChallenges: () => void;
    showBottomBorder: boolean;
    lastCollectionTime: number;
}

const Transaction: React.FC<Props> = (props) => {
    const transactionActive =
        parseInt(props.transaction.time) > props.lastCollectionTime;

    let icon;
    const iconBlue = transactionActive ? palette.deepBlue : palette.notDeepBlue;

    switch (props.transaction.transactionIcon) {
        case TransactionIcon.Convo:
            icon = (
                <Ionicons
                    name={"ios-chatbubbles"}
                    size={22}
                    style={styles.icon}
                    color={iconBlue}
                />
            );
            break;
        case TransactionIcon.Feed:
            icon = (
                <MaterialIcons
                    name="dynamic-feed"
                    size={22}
                    color={palette.semiSoftGray}
                />
            );
            break;
        case TransactionIcon.User:
            icon = (
                <FontAwesome
                    name="user"
                    size={22}
                    color={iconBlue}
                    style={styles.icon}
                />
            );
            break;
        case TransactionIcon.Challenge:
            icon = (
                <FontAwesome5
                    name="medal"
                    size={21}
                    color={iconBlue}
                    style={styles.icon}
                />
            );
            break;
        case TransactionIcon.Community:
            icon = (
                <FontAwesome
                    name="users"
                    size={20}
                    color={iconBlue}
                    style={styles.icon}
                />
            );
            break;
        case TransactionIcon.Post:
            icon = (
                <FontAwesome
                    name="pencil"
                    size={20}
                    color={iconBlue}
                    style={styles.icon}
                />
            );
            break;
        default:
            icon = (
                <Ionicons name="heart" size={23} color={palette.semiSoftGray} />
            );
    }

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
                    case TransactionTypesEnum.Post:
                        return props.openPost(props.transaction.data);
                }
            }}
        >
            <View style={styles.coinContainer}>
                {icon}
                {typeof props.transaction.coin !== "undefined" && (
                    <CoinBox
                        coinSize={20}
                        amount={props.transaction.coin}
                        active={
                            parseInt(props.transaction.time) >
                            props.lastCollectionTime
                        }
                    />
                )}
                {typeof props.transaction.bolts !== "undefined" && (
                    <BoltBox
                        boltSize={20}
                        amount={props.transaction.bolts}
                        active={
                            parseInt(props.transaction.time) >
                            props.lastCollectionTime
                        }
                        moveTextRight={2}
                    />
                )}
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
