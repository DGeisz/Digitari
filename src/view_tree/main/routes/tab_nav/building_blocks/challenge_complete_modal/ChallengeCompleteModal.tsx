import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { styles } from "./ChallengeCompleteModalStyles";
import { useMutation, useQuery } from "@apollo/client";
import {
    USER_CHALLENGE_RECEIPTS,
    UserChallengeReceiptsData,
    UserChallengeReceiptsVariables,
} from "./gql/Queries";
import { localUid } from "../../../../../../global_state/UserState";
import { challengeMessageFromReceipt } from "../../../../../../global_types/ChallengeTypes";
import {
    VIEW_CHALLENGE_RECEIPT,
    ViewChallengeReceiptData,
    ViewChallengeReceiptVariables,
} from "./gql/Mutations";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";

interface Props {
    openWallet: () => void;
}

const ChallengeCompleteModal: React.FC<Props> = (props) => {
    const [timeoutVisible, setTimeoutVisible] = useState<boolean>(false);
    const uid = localUid();

    useEffect(() => {
        if (!timeoutVisible) {
            setTimeout(() => {
                setTimeoutVisible(true);
            }, 1000);
        }
    }, [timeoutVisible]);

    const { data, loading, error } = useQuery<
        UserChallengeReceiptsData,
        UserChallengeReceiptsVariables
    >(USER_CHALLENGE_RECEIPTS, {
        variables: {
            uid,
        },
    });

    const [viewChallengeReceipt] = useMutation<
        ViewChallengeReceiptData,
        ViewChallengeReceiptVariables
    >(VIEW_CHALLENGE_RECEIPT, {
        update(cache, { data }) {
            if (!!data?.viewChallengeReceipt) {
                /*
                 * Update the user
                 */
                cache.modify({
                    id: cache.identify({
                        __typename: USER_TYPENAME,
                        id: uid,
                    }),
                    fields: {
                        challengeReceipts(existing: string[]) {
                            return existing.filter(
                                (receipt) =>
                                    receipt !== data.viewChallengeReceipt
                            );
                        },
                    },
                });
            }
        },
    });

    const visible =
        timeoutVisible &&
        !!data?.user &&
        data.user.challengeReceipts.length > 0;
    const receipt =
        !!data?.user && data.user.challengeReceipts.length > 0
            ? data.user.challengeReceipts[0]
            : "";

    return (
        <Modal isVisible={visible}>
            <View style={styles.outerContainer}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderText}>
                            Challenge complete!
                        </Text>
                    </View>
                    <Text style={styles.modalBodyText}>
                        {challengeMessageFromReceipt(receipt)}
                    </Text>
                    <View style={styles.modalFooter}>
                        <TouchableOpacity
                            style={styles.modalCollectButton}
                            onPress={() => {
                                props.openWallet();
                                setTimeoutVisible(false);
                                viewChallengeReceipt({
                                    variables: {
                                        receipt,
                                    },
                                    optimisticResponse: {
                                        viewChallengeReceipt: receipt,
                                    },
                                    update(cache, { data }) {
                                        console.log(
                                            "Here we're updating!",
                                            data,
                                            receipt
                                        );
                                        /*
                                         * Update the user
                                         */
                                        cache.modify({
                                            id: cache.identify({
                                                __typename: USER_TYPENAME,
                                                id: uid,
                                            }),
                                            fields: {
                                                challengeReceipts(
                                                    existing: string[]
                                                ) {
                                                    return existing.filter(
                                                        (eRec) =>
                                                            eRec !== receipt
                                                    );
                                                },
                                            },
                                        });
                                    },
                                }).then();
                            }}
                        >
                            <Text style={styles.modalCollectButtonText}>
                                Collect Reward
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ChallengeCompleteModal;
