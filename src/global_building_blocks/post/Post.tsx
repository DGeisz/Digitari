import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Image,
    LayoutAnimation,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./PostStyles";
import {
    Entypo,
    FontAwesome,
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons";
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
import { DIGIBOLT_PRICE, USER_TYPENAME } from "../../global_types/UserTypes";
import PicModal from "./building_blocks/pic_modal/PicModal";
import OptionsModal from "./building_blocks/options_modal/OptionsModal";
import SymbolModal from "./building_blocks/symbol_modal/SymbolModal";
import LightningFlyer from "./building_blocks/lightning_flyer/LightningFlyer";
import LikeFlyer from "./building_blocks/like_flyer/LikeFlyer";
import { nameFontToPostStyle } from "./fonts/nameFonts";
import {
    profileColor2Style,
    stickerToEmoji,
} from "../../global_types/ShopTypes";
import BoltBox from "../bolt_box/BoltBox";
import { userPost2BoltCount } from "./utils/bolt_utils";
import BoltInstructions from "./building_blocks/bolt_instructions/BoltInstructions";
import { firstBolt } from "../../global_state/FirstImpressionsState";
import CoinBox from "../coin_box/CoinBox";
import { convoReward } from "../../global_types/ConvoTypes";
import { DOUBLE_NEWLINE } from "../../global_utils/StringUtils";
import { addBoltTransaction } from "../../view_tree/main/hooks/use_realtime_updates/subscription_handlers/utils/cache_utils";
import {
    TransactionIcon,
    TransactionTypesEnum,
} from "../../global_types/TransactionTypes";

const COMMUNITY_NAME_MAX_LEN = 30;

const BOLT_QUANTA = 500;
const BOLT_SCALE = 1.2;

interface Props {
    post: PostType;
    feedPost?: boolean;
    userCoin: number;
    userBolts: number;
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
    const { id: pid } = props.post;

    const availableBolts = Math.floor(props.userCoin / DIGIBOLT_PRICE);

    const [postModalVisible, setPostModalVisible] = useState<boolean>(false);
    const [postModalError, setPostModalError] = useState<string>("");
    const [postModalLoading, setPostModalLoading] = useState<boolean>(false);

    const [instructionsVisible, showInstructions] = useState<boolean>(false);

    const [error, setPostError] = useState<string>("");

    const [symbolModalVisible, showSymbolModal] = useState<boolean>(false);

    const [picModalVisible, setPicVisible] = useState<boolean>(false);

    const boltScale = useRef(new Animated.Value(1)).current;

    const tapScale = useRef(new Animated.Value(1)).current;

    const dotScale = useRef(new Animated.Value(0)).current;
    const dotOpacity = useRef(new Animated.Value(0.5)).current;

    const [boltId, setBoltId] = useState<number>(0);

    /*
     * Lightning animation
     */
    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(dotScale, {
                        toValue: 3,
                        useNativeDriver: true,
                        duration: 2 * BOLT_QUANTA,
                    }),
                    Animated.timing(dotOpacity, {
                        toValue: 0,
                        useNativeDriver: true,
                        duration: 2 * BOLT_QUANTA,
                    }),
                    Animated.sequence([
                        Animated.parallel([
                            Animated.timing(boltScale, {
                                toValue: BOLT_SCALE,
                                useNativeDriver: true,
                                duration: BOLT_QUANTA,
                            }),
                            Animated.timing(tapScale, {
                                toValue: BOLT_SCALE,
                                useNativeDriver: true,
                                duration: BOLT_QUANTA,
                            }),
                        ]),
                        Animated.parallel([
                            Animated.timing(boltScale, {
                                toValue: 1,
                                useNativeDriver: true,
                                duration: BOLT_QUANTA,
                            }),
                            Animated.timing(tapScale, {
                                toValue: 1,
                                useNativeDriver: true,
                                duration: BOLT_QUANTA,
                            }),
                        ]),
                    ]),
                ]),
                Animated.sequence([
                    Animated.parallel([
                        Animated.timing(boltScale, {
                            toValue: BOLT_SCALE,
                            useNativeDriver: true,
                            duration: BOLT_QUANTA,
                        }),
                        Animated.timing(tapScale, {
                            toValue: BOLT_SCALE,
                            useNativeDriver: true,
                            duration: BOLT_QUANTA,
                        }),
                    ]),
                    Animated.parallel([
                        Animated.timing(boltScale, {
                            toValue: 1,
                            useNativeDriver: true,
                            duration: BOLT_QUANTA,
                        }),
                        Animated.timing(tapScale, {
                            toValue: 1,
                            useNativeDriver: true,
                            duration: BOLT_QUANTA,
                        }),
                    ]),
                ]),
                Animated.parallel([
                    Animated.timing(dotScale, {
                        toValue: 0,
                        useNativeDriver: true,
                        duration: 0,
                    }),
                    Animated.timing(dotOpacity, {
                        toValue: 0.5,
                        useNativeDriver: true,
                        duration: 0,
                    }),
                ]),
            ])
        );
        animation.start();

        return animation.stop;
    }, []);

    const [errorTimeout, setErrorTimeout] = useState<number | undefined>(
        undefined
    );

    const setError = (error: string) => {
        LayoutAnimation.easeInEaseOut();
        setPostError(error);

        if (!!errorTimeout) {
            clearTimeout(errorTimeout);
        }

        setErrorTimeout(
            setTimeout(() => {
                LayoutAnimation.easeInEaseOut();
                setPostError("");
                setErrorTimeout(undefined);
            }, 4000)
        );
    };

    const [numBolts, setNumBolts] = useState<number>(0);

    /*
     * This is used to give the appearance that
     * coin has been donated before it has
     */
    const [bulkTimeout, setBulkTimeout] = useState<number | undefined>(
        undefined
    );

    const tapBolt = async () => {
        if (props.post.uid !== uid && remainingBolts > 0) {
            if (firstBolt()) {
                showInstructions(true);
            }

            const currentBolts = numBolts + 1;

            if (currentBolts <= availableBolts) {
                setBoltId(1 + Math.random());
                setNumBolts(currentBolts);

                if (typeof bulkTimeout !== "undefined") {
                    clearTimeout(bulkTimeout);
                }

                setBulkTimeout(
                    setTimeout(async () => {
                        /*
                         * First immediately set num bolts to
                         * zero to prepare for the next batch
                         */
                        setNumBolts(0);

                        /*
                         * Then actually handle the mutation
                         */
                        !!props.donateToPost &&
                            (await props.donateToPost({
                                variables: {
                                    pid: props.post.id,
                                    amount: currentBolts,
                                },
                                optimisticResponse: {
                                    donateToPost: {
                                        uid: localUid(),
                                        pid,
                                        tuid: props.post.uid,
                                        amount: currentBolts,
                                        name: props.userFirstName,
                                    },
                                },
                                update(cache, { data }) {
                                    if (!!data?.donateToPost) {
                                        /*
                                         * Increase post digicoin
                                         */
                                        client.cache.modify({
                                            id: client.cache.identify({
                                                __typename: POST_TYPENAME,
                                                id: props.post.id,
                                            }),
                                            fields: {
                                                coin(existing: number) {
                                                    return (
                                                        existing +
                                                        currentBolts *
                                                            DIGIBOLT_PRICE
                                                    );
                                                },
                                                boltsBought(existing: number) {
                                                    return (
                                                        existing + currentBolts
                                                    );
                                                },
                                            },
                                        });

                                        cache.modify({
                                            id: cache.identify({
                                                __typename: USER_TYPENAME,
                                                id: uid,
                                            }),
                                            fields: {
                                                coin(existing) {
                                                    existing = parseInt(
                                                        existing
                                                    );

                                                    return (
                                                        existing -
                                                        currentBolts *
                                                            DIGIBOLT_PRICE
                                                    ).toString();
                                                },
                                                coinSpent(existing) {
                                                    existing = parseInt(
                                                        existing
                                                    );

                                                    return (
                                                        existing +
                                                        currentBolts *
                                                            DIGIBOLT_PRICE
                                                    ).toString();
                                                },
                                                boltTransTotal(existing) {
                                                    existing = parseInt(
                                                        existing
                                                    );

                                                    return (
                                                        existing + currentBolts
                                                    ).toString();
                                                },
                                            },
                                        });

                                        addBoltTransaction(
                                            {
                                                tid: uid,
                                                time: Date.now().toString(),
                                                bolts: currentBolts,
                                                message: `You gave ${toCommaRep(
                                                    currentBolts *
                                                        DIGIBOLT_PRICE
                                                )} coin to the post: "${
                                                    props.post.content
                                                }"`,
                                                transactionType:
                                                    TransactionTypesEnum.Post,
                                                transactionIcon:
                                                    TransactionIcon.Like,
                                                data: pid,
                                            },
                                            cache
                                        );
                                    }
                                },
                            }));
                    }, 500)
                );
            } else {
                setError("You need 10 digicoin to get a digibolt");
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

    let remainingBolts: number;

    if (!!props.post.boltsBought) {
        remainingBolts =
            userPost2BoltCount(uid, pid) - props.post.boltsBought - numBolts;
    } else {
        remainingBolts = userPost2BoltCount(uid, pid) - numBolts;
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
            <BoltInstructions
                hideModal={() => showInstructions(false)}
                visible={instructionsVisible}
            />
            <CancelConfirmModal
                visible={postModalVisible}
                loading={postModalLoading}
                body={`Use ${toCommaRep(
                    props.post.responseCost
                )} digicoin to respond to ${
                    props.post.user
                }?${DOUBLE_NEWLINE}The reward for a successful convo is ${convoReward(
                    props.post.responseCost
                )} digibolts.`}
                title={"New Response"}
                error={postModalError}
                onConfirm={async () => {
                    setPostModalLoading(true);

                    if (props.userCoin < props.post.responseCost) {
                        setPostModalError("You don't have enough digicoin!");
                    } else {
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
                                    "You've already responded to this post!"
                                );
                            }
                        } catch (e) {
                            setPostModalError(
                                "An error occurred. Please try again"
                            );
                        }
                    }

                    setPostModalLoading(false);
                }}
                onCancel={() => setPostModalVisible(false)}
            />
            <SymbolModal
                visible={symbolModalVisible}
                hide={() => showSymbolModal(false)}
            />
            <TouchableOpacity
                style={[
                    styles.postContentContainer,
                    props.standAlone ? styles.pCCBottomBorder : {},
                ]}
                activeOpacity={1}
                onPress={() =>
                    props.postIsLink &&
                    !!props.openPost &&
                    props.openPost(props.post.id)
                }
            >
                {!props.stripped && (
                    <View
                        style={styles.postSideBuffer}
                        pointerEvents={"box-none"}
                    >
                        <View style={styles.sideBufferTop}>
                            <TouchableOpacity
                                onPress={() => props.openUser(props.post.uid)}
                                activeOpacity={0.5}
                            >
                                {!!props.post.userPic ? (
                                    <Image
                                        style={styles.userImageContainer}
                                        source={{ uri: props.post.userPic }}
                                    />
                                ) : (
                                    <View style={styles.userIconContainer}>
                                        <FontAwesome
                                            name="user"
                                            color={palette.white}
                                            size={23}
                                        />
                                    </View>
                                )}
                            </TouchableOpacity>
                            <View style={styles.sideBufferDivider} />
                        </View>
                        <TouchableOpacity
                            style={styles.sideBufferBottom}
                            onPress={tapBolt}
                            activeOpacity={1}
                        >
                            <LightningFlyer boltId={boltId} />
                            {props.post.uid === uid || remainingBolts < 1 ? (
                                <MaterialIcons
                                    name="bolt"
                                    size={35}
                                    color={palette.lightGray}
                                />
                            ) : (
                                <>
                                    <Animated.View
                                        style={{
                                            transform: [{ scale: boltScale }],
                                        }}
                                    >
                                        <BoltBox
                                            amount={remainingBolts}
                                            boltSize={35}
                                            fontColor={palette.deepBlue}
                                            fontSize={22}
                                            moveTextRight={7}
                                        />
                                    </Animated.View>
                                    <Animated.View
                                        style={[
                                            styles.dot,
                                            {
                                                opacity: dotOpacity,
                                                transform: [
                                                    { scale: dotScale },
                                                ],
                                            },
                                        ]}
                                    />
                                    <Animated.View
                                        style={[
                                            styles.tapContainer,
                                            {
                                                transform: [
                                                    { scale: tapScale },
                                                ],
                                            },
                                        ]}
                                    >
                                        <Text style={styles.tapText}>Tap!</Text>
                                    </Animated.View>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                )}
                <View style={styles.postMain}>
                    {!!error && <Text style={styles.errorText}>{error}</Text>}
                    <View style={styles.postHeader}>
                        <View style={styles.postHeaderLeft}>
                            <View style={styles.postHeaderTop}>
                                <TouchableOpacity
                                    onPress={() =>
                                        props.openUser(props.post.uid)
                                    }
                                    activeOpacity={0.5}
                                >
                                    <Text
                                        style={[
                                            nameFontToPostStyle(
                                                props.post.nameFont
                                            ),
                                            profileColor2Style(
                                                props.post.nameColor
                                            ),
                                        ]}
                                    >
                                        {/*User and user sticker*/}
                                        {props.post.user}
                                        {!!props.post.sticker &&
                                            ` ${stickerToEmoji(
                                                props.post.sticker
                                            )}`}
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
                                canBlock={!!props.feedPost}
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
                            <TouchableOpacity
                                style={styles.mainFooterLeft}
                                onPress={() => showSymbolModal(true)}
                            >
                                <View style={styles.infoIconContainer}>
                                    <Image
                                        source={require("../../../assets/coin2_semi_soft_gray.png")}
                                        style={{
                                            height: 24,
                                            width: 24,
                                            transform: [
                                                {
                                                    translateY: 1,
                                                },
                                                {
                                                    translateX: -2,
                                                },
                                            ],
                                        }}
                                    />
                                    <Text
                                        style={[
                                            styles.infoIconText,
                                            {
                                                transform: [
                                                    {
                                                        translateY: 2,
                                                    },
                                                    {
                                                        translateX: -4,
                                                    },
                                                ],
                                            },
                                        ]}
                                    >
                                        {toRep(
                                            props.post.coin +
                                                numBolts * DIGIBOLT_PRICE
                                        )}
                                    </Text>
                                    <LikeFlyer coinId={boltId} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.mainFooterCenter}
                                onPress={() => showSymbolModal(true)}
                            >
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
                            </TouchableOpacity>
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
                                    onPress={() => {
                                        uid !== props.post.uid &&
                                            setPostModalVisible(true);
                                    }}
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
                                        <BoltBox
                                            boxColor={palette.lightForestGreen}
                                            amount={convoReward(
                                                props.post.responseCost
                                            )}
                                            showBoltPlus
                                            paddingVertical={3}
                                            moveTextRight={2}
                                            boltSize={17}
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
