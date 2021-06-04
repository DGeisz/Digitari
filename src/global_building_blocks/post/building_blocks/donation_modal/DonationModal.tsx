import React, { useContext, useState } from "react";
import Modal from "react-native-modal";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./DonationModalStyles";
import CoinBox from "../../../coin_box/CoinBox";
import { toCommaRep } from "../../../../global_utils/ValueRepUtils";
import { palette } from "../../../../global_styles/Palette";
import { TutorialContext } from "../../../../view_tree/context/tutorial_context/TutorialContext";

interface Props {
    visible: boolean;
    hide: () => void;
    donateCoin: (amount: number) => void;
    userCoin: number;
}

interface State {
    amount: number;
    error: string;
}

const DonationModal: React.FC<Props> = (props) => {
    const [amount, setAmount] = useState<number>(NaN);
    const [error, setError] = useState<string>("");

    const { tutorialActive } = useContext(TutorialContext);

    const submit = () => {
        if (isNaN(amount)) {
            setError("Please set amount");
        } else if (amount <= 0) {
            setError("Donate at least one coin");
        } else {
            props.donateCoin(amount);
            props.hide();
        }
    };

    return (
        <Modal
            isVisible={props.visible}
            style={styles.donateModal}
            onBackdropPress={props.hide}
        >
            <View style={styles.donateContainer}>
                <View style={styles.donateHeader}>
                    <Text style={styles.donateTitle}>Custom</Text>
                </View>
                <Text style={styles.errorText}>{error}</Text>
                <TextInput
                    autoFocus
                    style={styles.donateInput}
                    keyboardType="numeric"
                    placeholder="Amount..."
                    placeholderTextColor={palette.semiSoftGray}
                    value={isNaN(amount) ? "" : toCommaRep(amount).toString()}
                    onChangeText={(text) => {
                        const noCommas = text.replace(/,/g, "");
                        const amount = parseInt(noCommas);

                        if (amount > props.userCoin) {
                            setError("You don't have enough coin");
                            setAmount(parseInt(noCommas));
                        } else {
                            setError("");
                            setAmount(parseInt(noCommas));
                        }
                    }}
                    onBlur={() => {
                        if (tutorialActive) {
                            setAmount(100);
                        }
                    }}
                />
                <View style={styles.donateFooter}>
                    <TouchableOpacity
                        style={styles.donateButton}
                        onPress={submit}
                    >
                        <View style={styles.donateButtonTextContainer}>
                            <Text style={styles.donateButtonText}>Like</Text>
                        </View>
                        <CoinBox
                            amount={isNaN(amount) ? 0 : amount}
                            showAbbreviated
                            coinSize={23}
                            fontSize={15}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={props.hide}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default DonationModal;
