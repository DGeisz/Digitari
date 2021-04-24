import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./PostStyles";
import Tier from "../tier/Tier";
import CoinBox from "../coin_box/CoinBox";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { PostAddOn, PostTarget, PostType } from "../../global_types/PostTypes";
import { millisToRep } from "../../global_utils/TimeRepUtils";
import { palette } from "../../global_styles/Palette";
import CancelConfirmModal from "../cancel_confirm_modal/CancelConfirmModal";
import { toCommaRep, toRep } from "../../global_utils/ValueRepUtils";
import LinkPreview from "../link_preview/LinkPreview";

const COMMUNITY_NAME_MAX_LEN = 30;

interface Props {
    post: PostType;
    openUser: (uid: string) => void;
    openCommunity: (cmid: string) => void;
    openPost?: (pid: string) => void;
    abbreviateAddOn?: boolean;
    showFooter?: boolean;
    showFullRespond?: boolean;
    standAlone?: boolean;
    postIsLink?: boolean;
    onMessage?: (tname: string, pid: string, responseCost: number) => void;
}

interface State {
    postModalVisible: boolean;
}

export default class Post extends React.PureComponent<Props, State> {
    static defaultProps = {
        showFullRespond: false,
        standAlone: false,
        postIsLink: true,
        showFooter: true,
        abbreviateAddOn: true,
    };

    state = {
        postModalVisible: false,
    };

    render() {
        let communityName = "";

        if (!!this.props.post.communityName) {
            if (this.props.post.communityName.length > COMMUNITY_NAME_MAX_LEN) {
                communityName = [
                    this.props.post.communityName.substring(
                        0,
                        COMMUNITY_NAME_MAX_LEN
                    ),
                    "...",
                ].join("");
            } else {
                communityName = this.props.post.communityName;
            }
        }

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
                    )} digicoin to message ${this.props.post.user}? 
                    \nThe reward for a successful convo is ${
                        this.props.post.convoReward
                    } digicoin.`}
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
                        !!this.props.openPost &&
                        this.props.openPost(this.props.post.id)
                    }
                >
                    <View style={styles.postSideBuffer}>
                        <View style={styles.sideBufferTop}>
                            <Tier size={30} tier={this.props.post.tier} />
                            <View style={styles.sideBufferDivider} />
                        </View>
                        <View style={styles.sideBufferBottom}>
                            <TouchableOpacity>
                                <CoinBox
                                    active={!!this.props.post.coinDonated}
                                    showAmount={false}
                                    coinSize={30}
                                    fontSize={14}
                                    paddingVertical={0}
                                />
                            </TouchableOpacity>
                            <Text style={styles.coinText}>
                                {/*{toRep(this.props.post.coin)}*/}
                                {toRep(10000)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.postMain}>
                        <View style={styles.postHeader}>
                            <TouchableOpacity
                                style={styles.postHeaderTop}
                                onPress={() =>
                                    this.props.openUser(this.props.post.uid)
                                }
                                activeOpacity={0.5}
                            >
                                <Text style={styles.postUserText}>
                                    {this.props.post.user}
                                </Text>
                                <Text style={styles.postDotText}>·</Text>
                                <Text style={styles.postTimeText}>
                                    {millisToRep(
                                        Date.now() -
                                            parseInt(this.props.post.time)
                                    )}
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.postHeaderBottom}>
                                {this.props.post.target ===
                                PostTarget.MyFollowers ? (
                                    <>
                                        <Entypo
                                            name="arrow-right"
                                            style={styles.targetIcon}
                                            size={18}
                                            color={palette.semiSoftGray}
                                        />
                                        <Text
                                            style={styles.followersTargetText}
                                        >
                                            Followers
                                        </Text>
                                    </>
                                ) : (
                                    <TouchableOpacity
                                        style={styles.communityTargetButton}
                                        activeOpacity={0.5}
                                        onPress={() =>
                                            !!this.props.post.cmid &&
                                            this.props.openCommunity(
                                                this.props.post.cmid
                                            )
                                        }
                                    >
                                        <Entypo
                                            name="arrow-right"
                                            style={styles.targetIcon}
                                            size={18}
                                            color={palette.deepBlue}
                                        />
                                        <Text
                                            style={styles.communityTargetText}
                                        >
                                            {communityName}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                        <View style={styles.postMainBody}>
                            <Text style={styles.postMainText}>
                                {this.props.post.content}
                            </Text>
                        </View>
                        {this.props.post.addOn === PostAddOn.Text ? (
                            <View style={styles.addOnTextContainer}>
                                <Text
                                    style={styles.addOnText}
                                    numberOfLines={
                                        !!this.props.abbreviateAddOn
                                            ? 4
                                            : undefined
                                    }
                                >
                                    {this.props.post.addOnContent}
                                </Text>
                            </View>
                        ) : this.props.post.addOn === PostAddOn.Image ? (
                            <View style={styles.addOnImageContainer}>
                                <Image
                                    style={styles.addOnImage}
                                    source={{
                                        uri: this.props.post.addOnContent,
                                    }}
                                />
                            </View>
                        ) : this.props.post.addOn === PostAddOn.Link ? (
                            <LinkPreview url={this.props.post.addOnContent} />
                        ) : null}
                        {this.props.showFooter ? (
                            <View style={styles.postMainFooter}>
                                <View style={styles.mainFooterLeft}>
                                    <View style={styles.infoIconContainer}>
                                        <Entypo
                                            name="pencil"
                                            size={20}
                                            color={palette.semiSoftGray}
                                        />
                                        <Text style={styles.infoIconText}>
                                            {toRep(
                                                this.props.post.responseCount
                                            )}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.mainFooterCenter}>
                                    <View style={styles.infoIconContainer}>
                                        <Ionicons
                                            name="chatbubbles"
                                            size={18}
                                            color={palette.semiSoftGray}
                                        />
                                        <Text style={styles.infoIconText}>
                                            {toRep(this.props.post.convoCount)}
                                        </Text>
                                    </View>
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
                        ) : (
                            <View style={styles.footerBuffer} />
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
