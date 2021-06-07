import React, { useContext } from "react";
import {
    TransactionType,
    TransactionTypesEnum,
} from "../../../../../../../../global_types/TransactionTypes";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./TransactionStyles";
import { millisToRep } from "../../../../../../../../global_utils/TimeRepUtils";
import CoinBox from "../../../../../../../../global_building_blocks/coin_box/CoinBox";
import { TutorialContext } from "../../../../../../../context/tutorial_context/TutorialContext";

interface Props {
    transaction: TransactionType;
    openConvo: (cvid: string, pid: string) => void;
    openUser: (uid: string) => void;
    openChallenges: () => void;
    showBottomBorder: boolean;
    lastCollectionTime: number;
}

const Transaction: React.FC<Props> = (props) => {
    const { tutorialActive } = useContext(TutorialContext);

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={[
                styles.transactionContainer,
                { borderBottomWidth: props.showBottomBorder ? 1 : 0 },
            ]}
            onPress={() => {
                if (!tutorialActive) {
                    switch (props.transaction.transactionType) {
                        case TransactionTypesEnum.User:
                            return props.openUser(props.transaction.data);
                        case TransactionTypesEnum.Convo:
                            const [cvid, pid] = props.transaction.data.split(
                                ":"
                            );

                            if (!!cvid && !!pid) {
                                return props.openConvo(cvid, pid);
                            }

                            break;
                        case TransactionTypesEnum.Challenge:
                            return props.openChallenges();
                    }
                }
            }}
        >
            <View style={styles.coinContainer}>
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
                <Text
                    style={styles.messageText}
                    numberOfLines={tutorialActive ? 2 : 3}
                >
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
