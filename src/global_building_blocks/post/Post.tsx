import React, { useContext, useRef, useState } from "react";
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
import { useApolloClient } from "@apollo/client";
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
import {
    TutorialContext,
    TutorialScreen,
} from "../../view_tree/context/tutorial_context/TutorialContext";

const COMMUNITY_NAME_MAX_LEN = 30;

interface Props {
    post: PostType;
    feedPost: boolean;
    userCoin: number;
    userFirstName: string;
    stripped?: boolean;
    openUser: (uid: string) => void;
    openCommunity: (cmid: string) => void;
    donateToPost?: (
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
    openReport: (pid: string) => void;
}

const Post: React.FC<Props> = (props) => {
    const uid = localUid();

    const client = useApolloClient();

    const [postModalVisible, setPostModalVisible] = useState<boolean>(false);
    const [postModalError, setPostModalError] = useState<string>("");
    const [postModalLoading, setPostModalLoading] = useState<boolean>(false);

    const [donationModalVisible, setDonationVisible] = useState<boolean>(false);
    const [error, setPostError] = useState<string>("");

    const [animatedCoinAmount, setCoinAmount] = useState<number>(0);

    const [picModalVisible, setPicVisible] = useState<boolean>(false);

    const {
        tutorialActive,
        tutorialScreen,
        likeTutorialPost,
        advanceTutorial,
        customLikeTutorialPost,
    } = useContext(TutorialContext);

    const animatedHeight = useRef(new Animated.Value(0)).current;
    const animatedOpacity = useRef(new Animated.Value(0)).current;

    const setError = (error: string) => {
        LayoutAnimation.easeInEaseOut();
        setPostError(error);

        setTimeout(() => {
            LayoutAnimation.easeInEaseOut();
            setPostError("");
        }, 5000);
    };

    const donateCoin = async (amount: number) => {
        /*
         * Make sure we aren't donating to our own post
         */
        if (props.post.uid === localUid()) {
            setError("You can't like your own post");
        } else {
            const { id: pid } = props.post;

            setCoinAmount(amount);
            animatedHeight.setValue(0);
            animatedOpacity.setValue(1);

            const animationDuration = 500;

            Animated.parallel([
                Animated.timing(animatedHeight, {
                    toValue: -80,
                    duration: animationDuration,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedOpacity, {
                    toValue: 0,
                    duration: animationDuration,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                animatedOpacity.setValue(0);
            });

            if (!tutorialActive && !!props.donateToPost) {
                try {
                    await props.donateToPost({
                        variables: {
                            pid: props.post.id,
                            amount,
                        },
                        optimisticResponse: {
                            donateToPost: {
                                uid: localUid(),
                                pid,
                                tuid: props.post.uid,
                                amount,
                                name: props.userFirstName,
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
                    setError(
                        "An error occurred.  Make sure you have enough coin and try again"
                    );
                }
            }
        }
    };

    let communityName = "";

    if (!!props.post.communityName) {
        if (props.post.communityName.length > COMMUNITY_NAME_MAX_LEN) {
            communityName = [
                props.post.communityName.substring(0, COMMUNITY_NAME_MAX_LEN),
                "...",
            ].join("");
        } else {
            communityName = props.post.communityName;
        }
    }

    return (
        <View
            style={[
                styles.postContainer,
                {
                    marginBottom:
                        props.stripped || props.noBottomMargin ? 0 : 20,
                },
            ]}
        >
            <CancelConfirmModal
                visible={postModalVisible}
                loading={postModalLoading}
                body={`Use ${toCommaRep(
                    props.post.responseCost
                )} digicoin to message ${props.post.user}? 
                                \nThe reward for a successful convo is ${
                                    props.post.convoReward
                                } digicoin.`}
                title={"New Message"}
                error={postModalError}
                onConfirm={async () => {
                    setPostModalLoading(true);

                    try {
                        const { data } = await client.query<
                            PostResponseCheckData,
                            PostResponseCheckVariables
                        >({
                            query: POST_RESPONSE_CHECK,
                            variables: {
                                pid: props.post.id,
                            },
                            fetchPolicy: "no-cache",
                        });

                        if (!!data?.postResponseCheck) {
                            setPostModalVisible(false);

                            !!props.onMessage &&
                                props.onMessage(
                                    props.post.user,
                                    props.post.id,
                                    props.post.responseCost
                                );
                        } else {
                            setPostModalError(
                                "You've already responded to this post"
                            );
                        }
                    } catch (e) {
                        setPostModalError(
                            "An error occurred. Please try again"
                        );
                    } finally {
                        setPostModalLoading(false);
                    }
                }}
                onCancel={() => setPostModalLoading(false)}
            />
            <DonationModal
                donateCoin={async (amount) => {
                    if (tutorialActive) {
                        if (
                            tutorialScreen === TutorialScreen.CustomTapLike &&
                            props.post.id === "tut1"
                        ) {
                            customLikeTutorialPost();
                            await donateCoin(amount);

                            setTimeout(() => {
                                advanceTutorial();
                            }, 700);
                        }
                    } else {
                        await donateCoin(amount);
                    }
                }}
                userCoin={props.userCoin}
                visible={donationModalVisible}
                hide={() => setDonationVisible(false)}
            />
            <TouchableOpacity
                style={[
                    styles.postContentContainer,
                    props.standAlone ? styles.pCCBottomBorder : {},
                ]}
                activeOpacity={1}
                onPress={() =>
                    !tutorialActive &&
                    props.postIsLink &&
                    !!props.openPost &&
                    props.openPost(props.post.id)
                }
            >
                {!props.stripped && (
                    <View style={styles.postSideBuffer}>
                        <View style={styles.sideBufferTop}>
                            <Tier size={30} tier={props.post.tier} />
                            <View style={styles.sideBufferDivider} />
                        </View>
                        <View style={styles.sideBufferBottom}>
                            <Animated.View
                                pointerEvents="none"
                                style={[
                                    styles.animatedContainer,
                                    {
                                        transform: [
                                            {
                                                translateY: animatedHeight,
                                            },
                                        ],
                                        opacity: animatedOpacity,
                                    },
                                ]}
                            >
                                <CoinBox
                                    showCoinPlus
                                    amount={animatedCoinAmount}
                                    coinSize={30}
                                    fontSize={14}
                                />
                            </Animated.View>
                            {props.post.coinDonated ? (
                                <CoinBox
                                    active
                                    showAmount={false}
                                    coinSize={30}
                                    fontSize={14}
                                    paddingVertical={0}
                                />
                            ) : (
                                <TouchableOpacity
                                    onPress={async () => {
                                        if (tutorialActive) {
                                            if (
                                                tutorialScreen ===
                                                    TutorialScreen.TapLike &&
                                                props.post.id === "tut0"
                                            ) {
                                                likeTutorialPost(true);
                                                await donateCoin(10);

                                                setTimeout(() => {
                                                    advanceTutorial();
                                                }, 700);
                                            }
                                        } else {
                                            await donateCoin(10);
                                        }
                                    }}
                                    onLongPress={() => {
                                        if (tutorialActive) {
                                            if (
                                                tutorialScreen ===
                                                    TutorialScreen.CustomTapLike &&
                                                props.post.id === "tut1"
                                            ) {
                                                setDonationVisible(true);
                                            }
                                        } else {
                                            setDonationVisible(true);
                                        }
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
                                {toRep(props.post.coin)}
                            </Text>
                        </View>
                    </View>
                )}
                <View style={styles.postMain}>
                    {!!error && <Text style={styles.errorText}>{error}</Text>}
                    <View style={styles.postHeader}>
                        <View style={styles.postHeaderLeft}>
                            <View style={styles.postHeaderTop}>
                                <TouchableOpacity
                                    onPress={() =>
                                        !tutorialActive &&
                                        props.openUser(props.post.uid)
                                    }
                                    activeOpacity={0.5}
                                >
                                    <Text style={styles.postUserText}>
                                        {props.post.user}
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.postDotText}>·</Text>
                                <Text style={styles.postTimeText}>
                                    {millisToRep(
                                        Date.now() - parseInt(props.post.time)
                                    )}
                                </Text>
                            </View>
                            <View style={styles.postHeaderBottom}>
                                {props.post.target ===
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
                                            !tutorialActive &&
                                            !!props.post.cmid &&
                                            props.openCommunity(props.post.cmid)
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
                        <View style={styles.postHeaderRight}>
                            <OptionsModal
                                post={props.post}
                                canBlock={props.feedPost}
                                openReport={props.openReport}
                            />
                        </View>
                    </View>
                    <View style={styles.postMainBody}>
                        <Text style={styles.postMainText}>
                            {props.post.content}
                        </Text>
                    </View>
                    {props.stripped ? null : props.post.addOn ===
                      PostAddOn.Text ? (
                        <View style={styles.addOnTextContainer}>
                            <Text
                                style={styles.addOnText}
                                numberOfLines={
                                    !!props.abbreviateAddOn ? 4 : undefined
                                }
                            >
                                {props.post.addOnContent}
                            </Text>
                        </View>
                    ) : props.post.addOn === PostAddOn.Image ? (
                        <View style={styles.addOnImageContainer}>
                            <PicModal
                                url={props.post.addOnContent}
                                visible={picModalVisible}
                                hide={() => setPicVisible(false)}
                            />
                            <TouchableOpacity
                                onPress={() => setPicVisible(true)}
                                activeOpacity={1}
                            >
                                <Image
                                    style={styles.addOnImage}
                                    source={{
                                        uri: props.post.addOnContent,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    ) : props.post.addOn === PostAddOn.Link ? (
                        <LinkPreview url={props.post.addOnContent} />
                    ) : null}
                    {!props.stripped && props.showFooter ? (
                        <View style={styles.postMainFooter}>
                            <View style={styles.mainFooterLeft}>
                                <View style={styles.infoIconContainer}>
                                    <Entypo
                                        name="pencil"
                                        size={20}
                                        color={palette.semiSoftGray}
                                    />
                                    <Text style={styles.infoIconText}>
                                        {toRep(props.post.responseCount)}
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
                                        {toRep(props.post.convoCount)}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.mainFooterRight}>
                                <TouchableOpacity
                                    style={[
                                        styles.responseButton,
                                        uid === props.post.uid
                                            ? {
                                                  backgroundColor:
                                                      palette.heavySoap,
                                              }
                                            : {},
                                    ]}
                                    activeOpacity={
                                        uid === props.post.uid ? 1 : 0.5
                                    }
                                    onPress={() =>
                                        !tutorialActive &&
                                        uid !== props.post.uid &&
                                        setPostModalVisible(true)
                                    }
                                >
                                    <View
                                        style={[
                                            styles.costContainer,
                                            uid === props.post.uid
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
                                            style={styles.pencil}
                                            color={
                                                uid === props.post.uid
                                                    ? palette.lightGray
                                                    : palette.beneathTheWaves
                                            }
                                        />
                                        <CoinBox
                                            amount={props.post.convoReward}
                                            coinSize={17}
                                            showCoinPlus
                                            boxColor={palette.lightForestGreen}
                                        />
                                    </View>
                                    <CoinBox
                                        amount={props.post.responseCost}
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
};

Post.defaultProps = {
    feedPost: false,
    stripped: false,
    showFullRespond: false,
    standAlone: false,
    postIsLink: true,
    showFooter: true,
    abbreviateAddOn: true,
    noBottomMargin: false,
};

export default React.memo(Post, (oldProps, nextProps) => {
    return (
        oldProps.post === nextProps.post &&
        oldProps.userCoin === nextProps.userCoin &&
        oldProps.userFirstName === nextProps.userFirstName
    );
});
