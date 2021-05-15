import React from "react";
import {
    Animated,
    Easing,
    Image,
    LayoutAnimation,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./PostStyles";
import Tier from "../tier/Tier";
import CoinBox from "../coin_box/CoinBox";
import { Entypo, Ionicons } from "@expo/vector-icons";
import {
    POST_TYPENAME,
    PostAddOn,
    PostTarget,
    PostType,
} from "../../global_types/PostTypes";
import { millisToRep } from "../../global_utils/TimeRepUtils";
import { palette } from "../../global_styles/Palette";
import CancelConfirmModal from "../cancel_confirm_modal/CancelConfirmModal";
import { toCommaRep, toRep } from "../../global_utils/ValueRepUtils";
import LinkPreview from "../link_preview/LinkPreview";
import { localUid } from "../../global_state/UserState";
import { ApolloConsumer } from "@apollo/client";
import {
    POST_RESPONSE_CHECK,
    PostResponseCheckData,
    PostResponseCheckVariables,
} from "./gql/Queries";
import { FetchResult } from "@apollo/client/link/core";
import { MutationFunctionOptions } from "@apollo/client/react/types/types";
import { DonateToPostData, DonateToPostVariables } from "./gql/Mutations";
import DonationModal from "./building_blocks/donation_modal/DonationModal";
import { USER_TYPENAME } from "../../global_types/UserTypes";
import { challengeCheck } from "../../global_gql/challenge_check/challenge_check";
import PicModal from "./building_blocks/pic_modal/PicModal";
import OptionsModal from "./building_blocks/options_modal/OptionsModal";

const COMMUNITY_NAME_MAX_LEN = 30;

interface Props {
    post: PostType;
    feedPost: boolean;
    userCoin: number;
    userFirstName: string;
    stripped: boolean;
    openUser: (uid: string) => void;
    openCommunity: (cmid: string) => void;
    donateToPost: (
        options?: MutationFunctionOptions<
            DonateToPostData,
            DonateToPostVariables
        >
    ) => Promise<FetchResult<DonateToPostData>>;
    openPost?: (pid: string) => void;
    abbreviateAddOn?: boolean;
    showFooter?: boolean;
    showFullRespond?: boolean;
    standAlone?: boolean;
    postIsLink?: boolean;
    noBottomMargin?: boolean;
    onMessage?: (tname: string, pid: string, responseCost: number) => void;
}

interface State {
    postModalVisible: boolean;
    postModalError?: string;
    postModalLoading: boolean;
    donationModalVisible: boolean;
    error: string;
    animatedHeight: Animated.Value;
    animatedOpacity: Animated.Value;
    animatedCoinAmount: number;
    picModalVisible: boolean;
}

export default class Post extends React.PureComponent<Props, State> {
    static defaultProps = {
        feedPost: false,
        stripped: false,
        showFullRespond: false,
        standAlone: false,
        postIsLink: true,
        showFooter: true,
        abbreviateAddOn: true,
        noBottomMargin: false,
    };

    state = {
        postModalVisible: false,
        postModalError: undefined,
        postModalLoading: false,
        donationModalVisible: false,
        error: "",
        animatedHeight: new Animated.Value(0),
        animatedOpacity: new Animated.Value(0),
        animatedCoinAmount: 0,
        picModalVisible: false,
    };

    setError = (error: string) => {
        LayoutAnimation.easeInEaseOut();
        this.setState({ error });

        setTimeout(() => {
            LayoutAnimation.easeInEaseOut();
            this.setState({ error: "" });
        }, 5000);
    };

    donateCoin = async (amount: number) => {
        /*
         * Make sure we aren't donating to our own post
         */
        if (this.props.post.uid === localUid()) {
            this.setError("You can't donate to your own post");
        } else {
            const { id: pid } = this.props.post;

            this.setState({ animatedCoinAmount: amount });
            this.state.animatedHeight.setValue(0);
            this.state.animatedOpacity.setValue(1);

            const animationDuration = 500;

            Animated.parallel([
                Animated.timing(this.state.animatedHeight, {
                    toValue: -80,
                    duration: animationDuration,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(this.state.animatedOpacity, {
                    toValue: 0,
                    duration: animationDuration,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                this.state.animatedOpacity.setValue(0);
            });

            try {
                await this.props.donateToPost({
                    variables: {
                        pid: this.props.post.id,
                        amount,
                    },
                    optimisticResponse: {
                        donateToPost: {
                            uid: localUid(),
                            pid,
                            tuid: this.props.post.uid,
                            amount,
                            name: this.props.userFirstName,
                        },
                    },
                    update(cache, { data }) {
                        if (!!data?.donateToPost) {
                            cache.modify({
                                id: cache.identify({
                                    __typename: POST_TYPENAME,
                                    id: pid,
                                }),
                                fields: {
                                    coinDonated() {
                                        return true;
                                    },
                                    coin(existing) {
                                        return existing + amount;
                                    },
                                },
                            });

                            cache.modify({
                                id: cache.identify({
                                    __typename: USER_TYPENAME,
                                    id: localUid(),
                                }),
                                fields: {
                                    coin(existing) {
                                        return existing - amount;
                                    },
                                },
                            });

                            challengeCheck(cache);
                        }
                    },
                });
            } catch (e) {
                console.log("This is error: ", e);
                this.setError(
                    "An error occurred.  Make sure you have enough coin and try again"
                );
            }
        }
    };

    hidePicModal = () => {
        this.setState({ picModalVisible: false });
    };

    showPicModal = () => {
        this.setState({ picModalVisible: true });
    };

    render() {
        let communityName = "";
        let uid = localUid();

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
            <ApolloConsumer>
                {(client) => {
                    return (
                        <View
                            style={[
                                styles.postContainer,
                                {
                                    marginBottom:
                                        this.props.stripped ||
                                        this.props.noBottomMargin
                                            ? 0
                                            : 20,
                                },
                            ]}
                        >
                            <CancelConfirmModal
                                visible={this.state.postModalVisible}
                                loading={this.state.postModalLoading}
                                body={`Use ${toCommaRep(
                                    this.props.post.responseCost
                                )} digicoin to message ${this.props.post.user}? 
                                \nThe reward for a successful convo is ${
                                    this.props.post.convoReward
                                } digicoin.`}
                                title={"New Message"}
                                error={this.state.postModalError}
                                onConfirm={async () => {
                                    this.setState({ postModalLoading: true });
                                    try {
                                        const { data } = await client.query<
                                            PostResponseCheckData,
                                            PostResponseCheckVariables
                                        >({
                                            query: POST_RESPONSE_CHECK,
                                            variables: {
                                                pid: this.props.post.id,
                                            },
                                            fetchPolicy: "no-cache",
                                        });

                                        if (!!data?.postResponseCheck) {
                                            this.setState({
                                                postModalVisible: false,
                                            });

                                            !!this.props.onMessage &&
                                                this.props.onMessage(
                                                    this.props.post.user,
                                                    this.props.post.id,
                                                    this.props.post.responseCost
                                                );
                                        } else {
                                            this.setState({
                                                postModalError:
                                                    "You've already responded to this post",
                                            });
                                        }
                                    } catch (e) {
                                        this.setState({
                                            postModalError:
                                                "An error occurred. Please try again",
                                        });
                                    } finally {
                                        this.setState({
                                            postModalLoading: false,
                                        });
                                    }
                                }}
                                onCancel={() =>
                                    this.setState({ postModalVisible: false })
                                }
                            />
                            <DonationModal
                                donateCoin={this.donateCoin}
                                userCoin={this.props.userCoin}
                                visible={this.state.donationModalVisible}
                                hide={() =>
                                    this.setState({
                                        donationModalVisible: false,
                                    })
                                }
                            />
                            <TouchableOpacity
                                style={[
                                    styles.postContentContainer,
                                    this.props.standAlone
                                        ? styles.pCCBottomBorder
                                        : {},
                                ]}
                                activeOpacity={1}
                                onPress={() =>
                                    this.props.postIsLink &&
                                    !!this.props.openPost &&
                                    this.props.openPost(this.props.post.id)
                                }
                            >
                                {!this.props.stripped && (
                                    <View style={styles.postSideBuffer}>
                                        <View style={styles.sideBufferTop}>
                                            <Tier
                                                size={30}
                                                tier={this.props.post.tier}
                                            />
                                            <View
                                                style={styles.sideBufferDivider}
                                            />
                                        </View>
                                        <View style={styles.sideBufferBottom}>
                                            <Animated.View
                                                pointerEvents="none"
                                                style={[
                                                    styles.animatedContainer,
                                                    {
                                                        transform: [
                                                            {
                                                                translateY: this
                                                                    .state
                                                                    .animatedHeight,
                                                            },
                                                        ],
                                                        opacity: this.state
                                                            .animatedOpacity,
                                                    },
                                                ]}
                                            >
                                                <CoinBox
                                                    showCoinPlus
                                                    amount={
                                                        this.state
                                                            .animatedCoinAmount
                                                    }
                                                    coinSize={30}
                                                    fontSize={14}
                                                />
                                            </Animated.View>
                                            {this.props.post.coinDonated ? (
                                                <CoinBox
                                                    active
                                                    showAmount={false}
                                                    coinSize={30}
                                                    fontSize={14}
                                                    paddingVertical={0}
                                                />
                                            ) : (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.donateCoin(
                                                            1
                                                        ).then();
                                                    }}
                                                    onLongPress={() => {
                                                        this.setState({
                                                            donationModalVisible: true,
                                                        });
                                                    }}
                                                >
                                                    <CoinBox
                                                        active={false}
                                                        showAmount={false}
                                                        coinSize={30}
                                                        fontSize={14}
                                                        paddingVertical={0}
                                                    />
                                                </TouchableOpacity>
                                            )}
                                            <Text style={styles.coinText}>
                                                {toRep(this.props.post.coin)}
                                            </Text>
                                        </View>
                                    </View>
                                )}
                                <View style={styles.postMain}>
                                    {!!this.state.error && (
                                        <Text style={styles.errorText}>
                                            {this.state.error}
                                        </Text>
                                    )}
                                    <View style={styles.postHeader}>
                                        <View style={styles.postHeaderLeft}>
                                            <View style={styles.postHeaderTop}>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        this.props.openUser(
                                                            this.props.post.uid
                                                        )
                                                    }
                                                    activeOpacity={0.5}
                                                >
                                                    <Text
                                                        style={
                                                            styles.postUserText
                                                        }
                                                    >
                                                        {this.props.post.user}
                                                    </Text>
                                                </TouchableOpacity>
                                                <Text
                                                    style={styles.postDotText}
                                                >
                                                    ·
                                                </Text>
                                                <Text
                                                    style={styles.postTimeText}
                                                >
                                                    {millisToRep(
                                                        Date.now() -
                                                            parseInt(
                                                                this.props.post
                                                                    .time
                                                            )
                                                    )}
                                                </Text>
                                            </View>
                                            <View
                                                style={styles.postHeaderBottom}
                                            >
                                                {this.props.post.target ===
                                                PostTarget.MyFollowers ? (
                                                    <>
                                                        <Entypo
                                                            name="arrow-right"
                                                            style={
                                                                styles.targetIcon
                                                            }
                                                            size={18}
                                                            color={
                                                                palette.semiSoftGray
                                                            }
                                                        />
                                                        <Text
                                                            style={
                                                                styles.followersTargetText
                                                            }
                                                        >
                                                            Followers
                                                        </Text>
                                                    </>
                                                ) : (
                                                    <TouchableOpacity
                                                        style={
                                                            styles.communityTargetButton
                                                        }
                                                        activeOpacity={0.5}
                                                        onPress={() =>
                                                            !!this.props.post
                                                                .cmid &&
                                                            this.props.openCommunity(
                                                                this.props.post
                                                                    .cmid
                                                            )
                                                        }
                                                    >
                                                        <Entypo
                                                            name="arrow-right"
                                                            style={
                                                                styles.targetIcon
                                                            }
                                                            size={18}
                                                            color={
                                                                palette.deepBlue
                                                            }
                                                        />
                                                        <Text
                                                            style={
                                                                styles.communityTargetText
                                                            }
                                                        >
                                                            {communityName}
                                                        </Text>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                        </View>
                                        <View style={styles.postHeaderRight}>
                                            <OptionsModal
                                                post={this.props.post}
                                                canBlock={this.props.feedPost}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.postMainBody}>
                                        <Text style={styles.postMainText}>
                                            {this.props.post.content}
                                        </Text>
                                    </View>
                                    {this.props.stripped ? null : this.props
                                          .post.addOn === PostAddOn.Text ? (
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
                                    ) : this.props.post.addOn ===
                                      PostAddOn.Image ? (
                                        <View
                                            style={styles.addOnImageContainer}
                                        >
                                            <PicModal
                                                url={
                                                    this.props.post.addOnContent
                                                }
                                                visible={
                                                    this.state.picModalVisible
                                                }
                                                hide={this.hidePicModal}
                                            />
                                            <TouchableOpacity
                                                onPress={this.showPicModal}
                                                activeOpacity={1}
                                            >
                                                <Image
                                                    style={styles.addOnImage}
                                                    source={{
                                                        uri: this.props.post
                                                            .addOnContent,
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    ) : this.props.post.addOn ===
                                      PostAddOn.Link ? (
                                        <LinkPreview
                                            url={this.props.post.addOnContent}
                                        />
                                    ) : null}
                                    {!this.props.stripped &&
                                    this.props.showFooter ? (
                                        <View style={styles.postMainFooter}>
                                            <View style={styles.mainFooterLeft}>
                                                <View
                                                    style={
                                                        styles.infoIconContainer
                                                    }
                                                >
                                                    <Entypo
                                                        name="pencil"
                                                        size={20}
                                                        color={
                                                            palette.semiSoftGray
                                                        }
                                                    />
                                                    <Text
                                                        style={
                                                            styles.infoIconText
                                                        }
                                                    >
                                                        {toRep(
                                                            this.props.post
                                                                .responseCount
                                                        )}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View
                                                style={styles.mainFooterCenter}
                                            >
                                                <View
                                                    style={
                                                        styles.infoIconContainer
                                                    }
                                                >
                                                    <Ionicons
                                                        name="chatbubbles"
                                                        size={18}
                                                        color={
                                                            palette.semiSoftGray
                                                        }
                                                    />
                                                    <Text
                                                        style={
                                                            styles.infoIconText
                                                        }
                                                    >
                                                        {toRep(
                                                            this.props.post
                                                                .convoCount
                                                        )}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View
                                                style={styles.mainFooterRight}
                                            >
                                                <TouchableOpacity
                                                    style={[
                                                        styles.responseButton,
                                                        uid ===
                                                        this.props.post.uid
                                                            ? {
                                                                  backgroundColor:
                                                                      palette.heavySoap,
                                                              }
                                                            : {},
                                                    ]}
                                                    activeOpacity={
                                                        uid ===
                                                        this.props.post.uid
                                                            ? 1
                                                            : 0.5
                                                    }
                                                    onPress={() =>
                                                        uid !==
                                                            this.props.post
                                                                .uid &&
                                                        this.setState({
                                                            postModalVisible: true,
                                                        })
                                                    }
                                                >
                                                    <View
                                                        style={[
                                                            styles.costContainer,
                                                            uid ===
                                                            this.props.post.uid
                                                                ? {
                                                                      borderRightColor:
                                                                          palette.semiSoftGray,
                                                                  }
                                                                : {},
                                                        ]}
                                                    >
                                                        <Entypo
                                                            name="pencil"
                                                            size={24}
                                                            style={
                                                                styles.pencil
                                                            }
                                                            color={
                                                                uid ===
                                                                this.props.post
                                                                    .uid
                                                                    ? palette.lightGray
                                                                    : palette.beneathTheWaves
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
                                                            this.props.post
                                                                .responseCost
                                                        }
                                                        coinSize={17}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ) : (
                                        <View style={styles.footerBuffer} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            </ApolloConsumer>
        );
    }
}
