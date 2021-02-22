import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./PostStyles";
import Tier from "../tier/Tier";
import CoinBox from "../coin_box/CoinBox";
import { Entypo } from "@expo/vector-icons";
import ConvoCover from "../convo_cover/ConvoCover";
import { PostType } from "../../global_types/PostTypes";
import { millisToRep } from "../../global_utils/TimeRepUtils";
import { palette } from "../../global_styles/Palette";
import CancelConfirmModal from "../cancel_confirm_modal/CancelConfirmModal";
import { toCommaRep } from "../../global_utils/ValueRepUtils";

interface Props {
    post: PostType;
    showConvos?: boolean;
    showFooter?: boolean;
    openConvo?: (cid: string) => void;
    showFullRespond?: boolean;
    standAlone?: boolean;
    postIsLink?: boolean;
    onPress?: (pid: string) => void;
    onMessage?: (tname: string, pid: string, responseCost: number) => void;
}

interface State {
    postModalVisible: boolean;
}

export default class Post extends React.PureComponent<Props, State> {
    static defaultProps = {
        showConvos: true,
        showFullRespond: false,
        standAlone: false,
        postIsLink: true,
        showFooter: true,
    };

    state = {
        postModalVisible: false,
    };

    render() {
        return (
            <View
                style={[
                    styles.postContainer,
                    { marginBottom: this.props.standAlone ? 0 : 20 },
                ]}
            >
                <CancelConfirmModal
                    visible={this.state.postModalVisible}
                    body={`Use ${toCommaRep(
                        this.props.post.responseCost
                    )} digicoin to message ${this.props.post.user}?`}
                    title={"New Message"}
                    onConfirm={() => {
                        this.setState({ postModalVisible: false });
                        this.props.onMessage &&
                            this.props.onMessage(
                                this.props.post.user,
                                this.props.post.id,
                                this.props.post.responseCost
                            );
                    }}
                    onCancel={() => this.setState({ postModalVisible: false })}
                />
                <TouchableOpacity
                    style={[
                        styles.postContentContainer,
                        this.props.standAlone ? styles.pCCBottomBorder : {},
                    ]}
                    activeOpacity={1}
                    onPress={() =>
                        this.props.postIsLink &&
                        this.props.onPress &&
                        this.props.onPress(this.props.post.id)
                    }
                >
                    <View style={styles.postSideBuffer}>
                        <View style={styles.sideBufferTop}>
                            <Tier size={30} ranking={this.props.post.ranking} />
                            <View style={styles.sideBufferDivider} />
                        </View>
                        <View style={styles.sideBufferBottom}>
                            <CoinBox
                                amount={this.props.post.coin}
                                coinSize={22}
                                fontSize={14}
                            />
                        </View>
                    </View>
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
                        {this.props.showFooter && (
                            <View style={styles.postMainFooter}>
                                <View style={styles.mainFooterLeft}>
                                    <TouchableOpacity>
                                        <CoinBox
                                            amount={0}
                                            showAmount={false}
                                            coinSize={25}
                                            active={this.props.post.coinDonated}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.mainFooterRight}>
                                    {this.props.showFullRespond ? (
                                        <>
                                            <View style={styles.exRightTop}>
                                                <View
                                                    style={
                                                        styles.rewardContainer
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            styles.convoRewardText
                                                        }
                                                    >
                                                        Convo Reward
                                                    </Text>
                                                    <CoinBox
                                                        amount={
                                                            this.props.post
                                                                .convoReward
                                                        }
                                                        coinSize={24}
                                                        fontSize={16}
                                                        showCoinPlus
                                                    />
                                                </View>
                                            </View>
                                            <View style={styles.exRightBottom}>
                                                <TouchableOpacity
                                                    style={
                                                        styles.responseButton
                                                    }
                                                    activeOpacity={0.5}
                                                    onPress={() =>
                                                        this.setState({
                                                            postModalVisible: true,
                                                        })
                                                    }
                                                >
                                                    <View
                                                        style={
                                                            styles.costContainer
                                                        }
                                                    >
                                                        <Entypo
                                                            name="pencil"
                                                            size={24}
                                                            style={
                                                                styles.pencil
                                                            }
                                                            color={
                                                                palette.beneathTheWaves
                                                            }
                                                        />
                                                        <Text
                                                            style={
                                                                styles.exResponseText
                                                            }
                                                        >
                                                            Message
                                                        </Text>
                                                    </View>
                                                    <CoinBox
                                                        amount={
                                                            this.props.post
                                                                .responseCost
                                                        }
                                                        coinSize={17}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                    ) : (
                                        <TouchableOpacity
                                            style={styles.responseButton}
                                            activeOpacity={0.5}
                                            onPress={() =>
                                                this.setState({
                                                    postModalVisible: true,
                                                })
                                            }
                                        >
                                            <View style={styles.costContainer}>
                                                <Entypo
                                                    name="pencil"
                                                    size={24}
                                                    style={styles.pencil}
                                                    color={
                                                        palette.beneathTheWaves
                                                    }
                                                />
                                                <CoinBox
                                                    amount={
                                                        this.props.post
                                                            .convoReward
                                                    }
                                                    coinSize={17}
                                                    showCoinPlus
                                                    boxColor={
                                                        palette.lightForestGreen
                                                    }
                                                />
                                            </View>
                                            <CoinBox
                                                amount={
                                                    this.props.post.responseCost
                                                }
                                                coinSize={17}
                                            />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
                {this.props.showConvos && !!this.props.post.convos.length && (
                    <View style={styles.postConvosContainer}>
                        {this.props.post.convos.map((convo, index) => {
                            const showBottom =
                                index != this.props.post.convos.length - 1;
                            return (
                                <ConvoCover
                                    key={
                                        this.props.post.id +
                                        this.props.post.time +
                                        index
                                    }
                                    openConvo={this.props.openConvo}
                                    showUnViewedDot={false}
                                    convoCover={convo}
                                    showBottomBorder={showBottom}
                                />
                            );
                        })}
                    </View>
                )}
            </View>
        );
    }
}
