import React from "react";
import { View, Text } from "react-native";
import { millisToRep } from "../../global_utils/TimeRepUtils";
import { styles } from "./StrippedPostStyles";
import { StrippedPostType } from "../../global_types/PostTypes";
import CoinBox from "../coin_box/CoinBox";

interface Props {
    post: StrippedPostType;
    postIsLink?: boolean;
    showEscrow?: boolean;
}

export default class StrippedPost extends React.PureComponent<Props> {
    static defaultProps = {
        postIsLink: true,
        showEscrow: false,
    };

    render() {
        return (
            <View style={[styles.postContainer]}>
                <View style={styles.postMain}>
                    <View style={styles.postHeader}>
                        <Text style={styles.postUserText}>
                            {this.props.post.user}
                        </Text>
                        <Text style={styles.postDotText}>·</Text>
                        <Text style={styles.postTimeText}>
                            {millisToRep(Date.now() - this.props.post.time)}
                        </Text>
                    </View>
                    <View style={styles.postMainBody}>
                        <Text style={styles.postMainText}>
                            {this.props.post.content}
                        </Text>
                    </View>
                    {this.props.showEscrow && (
                        <View style={styles.postMainFooter}>
                            <View style={styles.escrowContainer}>
                                <Text style={styles.escrowText}>Escrow</Text>
                                <CoinBox
                                    amount={this.props.post.convoReward}
                                    coinSize={24}
                                    fontSize={16}
                                />
                            </View>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}
