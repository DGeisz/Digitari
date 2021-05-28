import React from "react";
import Modal from "react-native-modal";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./DonationModalStyles";
import CoinBox from "../../../coin_box/CoinBox";
import { toCommaRep } from "../../../../global_utils/ValueRepUtils";
import { palette } from "../../../../global_styles/Palette";

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

export default class DonationModal extends React.PureComponent<Props, State> {
    state = {
        amount: NaN,
        error: "",
    };

    submit = () => {
        if (isNaN(this.state.amount)) {
            this.setState({ error: "Please set amount" });
        } else if (this.state.amount <= 0) {
            this.setState({ error: "Donate at least one coin" });
        } else {
            this.props.donateCoin(this.state.amount);
            this.props.hide();
        }
    };

    render() {
        return (
            <Modal
                isVisible={this.props.visible}
                style={styles.donateModal}
                onBackdropPress={this.props.hide}
            >
                <View style={styles.donateContainer}>
                    <View style={styles.donateHeader}>
                        <Text style={styles.donateTitle}>Custom</Text>
                    </View>
                    <Text style={styles.errorText}>{this.state.error}</Text>
                    <TextInput
                        style={styles.donateInput}
                        keyboardType="numeric"
                        placeholder="Amount..."
                        placeholderTextColor={palette.semiSoftGray}
                        value={
                            isNaN(this.state.amount)
                                ? ""
                                : toCommaRep(this.state.amount).toString()
                        }
                        onChangeText={(text) => {
                            const noCommas = text.replace(/,/g, "");
                            const amount = parseInt(noCommas);

                            if (amount > this.props.userCoin) {
                                this.setState({
                                    error: "You don't have enough coin",
                                    amount: parseInt(noCommas),
                                });
                            } else {
                                this.setState({
                                    error: "",
                                    amount: parseInt(noCommas),
                                });
                            }
                        }}
                    />
                    <View style={styles.donateFooter}>
                        <TouchableOpacity
                            style={styles.donateButton}
                            onPress={this.submit}
                        >
                            <View style={styles.donateButtonTextContainer}>
                                <Text style={styles.donateButtonText}>
                                    Like
                                </Text>
                            </View>
                            <CoinBox
                                amount={
                                    isNaN(this.state.amount)
                                        ? 0
                                        : this.state.amount
                                }
                                showAbbreviated
                                coinSize={23}
                                fontSize={15}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={this.props.hide}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}
