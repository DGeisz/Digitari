import React, { useContext, useState } from "react";
import { styles } from "./StatusFooterStyles";
import { Text, TouchableOpacity, View } from "react-native";
import CancelConfirmModal from "../../../../../../global_building_blocks/cancel_confirm_modal/CancelConfirmModal";
import UpdateIndicator from "../../../../routes/tab_nav/building_blocks/update_indicator/UpdateIndicator";

export class DismissedFooter extends React.PureComponent {
    render() {
        return (
            <View style={styles.statusContainer}>
                <View style={styles.dismissedContainer}>
                    <Text style={styles.dismissedText}>Response dismissed</Text>
                </View>
            </View>
        );
    }
}

export class BlockedFooter extends React.PureComponent {
    render() {
        return (
            <View style={styles.statusContainer}>
                <View style={styles.blockedContainer}>
                    <Text style={styles.blockedText}>Convo Blocked</Text>
                </View>
            </View>
        );
    }
}

export class DeletedFooter extends React.PureComponent {
    render() {
        return (
            <View style={styles.statusContainer}>
                <View style={styles.dismissedContainer}>
                    <Text style={styles.dismissedText}>Convo deleted</Text>
                </View>
            </View>
        );
    }
}

export class SuccessFooter extends React.PureComponent {
    render() {
        return (
            <View style={styles.statusContainer}>
                <View style={styles.successContainer}>
                    <Text style={styles.successText}>Successful Convo</Text>
                </View>
            </View>
        );
    }
}

interface PendingProps {
    onFinish: () => void;
    finishMessage: string;
}

interface PendingState {
    modalVisible: boolean;
}

export const PendingFinishFooter: React.FC<PendingProps> = (props) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <View style={styles.statusContainer}>
            <CancelConfirmModal
                visible={modalVisible}
                body={props.finishMessage}
                title={"Finish Convo"}
                onConfirm={() => {
                    setModalVisible(false);
                    setTimeout(props.onFinish, 200);
                }}
                confirmMessage="Finish"
                onCancel={() => setModalVisible(false)}
            />
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.pendingContainer}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.pendingText}>Finish Convo</Text>
            </TouchableOpacity>
        </View>
    );
};

// export class PendingFinishFooter extends React.PureComponent<
//     PendingProps,
//     PendingState
// > {
//     state = {
//         modalVisible: false,
//     };
//
//     render() {
//         return (
//             <View style={styles.statusContainer}>
//                 <CancelConfirmModal
//                     visible={this.state.modalVisible}
//                     body={this.props.finishMessage}
//                     title={"Finish Convo"}
//                     onConfirm={() => {
//                         this.setState({ modalVisible: false });
//                         setTimeout(this.props.onFinish, 200);
//                     }}
//                     confirmMessage="Finish"
//                     onCancel={() => this.setState({ modalVisible: false })}
//                 />
//                 <TouchableOpacity
//                     activeOpacity={0.5}
//                     style={styles.pendingContainer}
//                     onPress={() => this.setState({ modalVisible: true })}
//                 >
//                     <Text style={styles.pendingText}>Finish Convo</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }
