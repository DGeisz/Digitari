import React, { useEffect, useRef, useState } from "react";
import {
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ConvoNavProp, ConvoRouteProp } from "../../MainEntryNavTypes";
import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import {
    CONVO,
    CONVO_MESSAGES,
    CONVO_POST,
    ConvoData,
    ConvoMessagesData,
    ConvoMessagesVariables,
    ConvoPostData,
    ConvoPostVariables,
    ConvoVariables,
} from "./gql/Queries";
import LoadingWheel from "../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../global_building_blocks/error_message/ErrorMessage";
import { styles } from "./ConvoStyles";
import Post from "../../../../global_building_blocks/post/Post";
import Tier from "../../../../global_building_blocks/tier/Tier";
import UserLabel from "../../../../global_building_blocks/convo_cover/building_blocks/user_label/UserLabel";
import { millisToRep } from "../../../../global_utils/TimeRepUtils";
import CoinBox from "../../../../global_building_blocks/coin_box/CoinBox";
import { palette } from "../../../../global_styles/Palette";
import ConvoMsg from "../../../../global_building_blocks/convo_msg/ConvoMsg";
import ResponseResponse from "./building_blocks/response_response/ResponseResponse";
import { localHid, localUid } from "../../../../global_state/UserState";
import {
    CONVO_TYPENAME,
    ConvoStatus,
    TARGET_MESSAGE_COUNT_THRESHOLD,
} from "../../../../global_types/ConvoTypes";
import {
    BlockedFooter,
    DismissedFooter,
    PendingFinishFooter,
    SuccessFooter,
} from "./building_blocks/status_footers/StatusFooters";
import MessageInput from "../../../../global_building_blocks/message_input/MessageInput";
import {
    ACTIVATE_CONVO,
    ActivateConvoData,
    ActivateConvoVariables,
    BLOCK_CONVO,
    BlockConvoData,
    BlockConvoVariables,
    CREATE_MESSAGE,
    CreateMessageData,
    CreateMessageVariables,
    DISMISS_CONVO,
    DismissConvoData,
    DismissConvoVariables,
    MARK_CONVO_VIEWED,
    MarkConvoViewedData,
    MarkConvoViewedVariables,
} from "./gql/Mutations";
import { QUERY_TYPENAME } from "../../../../global_gql/Schema";
import { USER_TYPENAME } from "../../../../global_types/UserTypes";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";

function getCheckLeft(uid: string, tid: string): (id: string) => boolean {
    if (uid === tid) {
        return (id: string) => id !== tid;
    } else {
        return (id: string) => id === tid;
    }
}

interface Props {
    route: ConvoRouteProp;
    navigation: ConvoNavProp;
}

const Convo: React.FC<Props> = (props) => {
    const uid = localUid();
    const hid = localHid();

    const { cvid } = props.route.params;

    const [error, setError] = useState<string>("");

    /*
     * Queries
     */
    const {
        data: postData,
        loading: postLoading,
        error: postError,
        refetch: postRefetch,
    } = useQuery<ConvoPostData, ConvoPostVariables>(CONVO_POST, {
        variables: {
            pid: props.route.params.pid,
        },
    });

    const {
        data: convoData,
        loading: convoLoading,
        error: convoError,
        refetch: convoRefetch,
    } = useQuery<ConvoData, ConvoVariables>(CONVO, {
        variables: {
            cvid: cvid,
        },
    });

    const {
        data: messagesData,
        networkStatus,
        error: messagesError,
        refetch: messagesRefetch,
        fetchMore,
    } = useQuery<ConvoMessagesData, ConvoMessagesVariables>(CONVO_MESSAGES, {
        variables: {
            cvid: cvid,
        },
    });

    /*
     * Mutations
     */
    const [markConvoViewed] = useMutation<
        MarkConvoViewedData,
        MarkConvoViewedVariables
    >(MARK_CONVO_VIEWED, {
        variables: {
            cvid: cvid,
        },
        update(cache) {
            cache.modify({
                id: cache.identify({
                    id: cvid,
                    __typename: CONVO_TYPENAME,
                }),
                fields: {
                    tviewed() {
                        return true;
                    },
                    sviewed() {
                        return true;
                    },
                },
            });
        },
    });

    const [dismissConvo] = useMutation<DismissConvoData, DismissConvoVariables>(
        DISMISS_CONVO,
        {
            variables: {
                cvid: cvid,
            },
            update(cache) {
                /*
                 * Change the convo status
                 */
                cache.modify({
                    id: cache.identify({
                        id: cvid,
                        __typename: CONVO_TYPENAME,
                    }),
                    fields: {
                        status() {
                            return ConvoStatus.Dismissed;
                        },
                    },
                });

                /*
                 * Remove convo from new convos
                 */
                cache.modify({
                    id: cache.identify({
                        __typename: QUERY_TYPENAME,
                    }),
                    fields: {
                        newConvos(existing, { readField }) {
                            return existing.filter(
                                (reqRef: any) =>
                                    readField("id", reqRef) !== cvid
                            );
                        },
                    },
                });
            },
        }
    );

    const [blockConvo] = useMutation<BlockConvoData, BlockConvoVariables>(
        BLOCK_CONVO,
        {
            variables: {
                cvid: cvid,
            },
            update(cache) {
                /*
                 * Change the convo status
                 */
                cache.modify({
                    id: cache.identify({
                        id: cvid,
                        __typename: CONVO_TYPENAME,
                    }),
                    fields: {
                        status() {
                            return ConvoStatus.Blocked;
                        },
                    },
                });

                /*
                 * Remove convo from new convos
                 */
                cache.modify({
                    id: cache.identify({
                        __typename: QUERY_TYPENAME,
                    }),
                    fields: {
                        newConvos(existing, { readField }) {
                            return existing.filter(
                                (reqRef: any) =>
                                    readField("id", reqRef) !== cvid
                            );
                        },
                    },
                });

                /*
                 * Update user's blocked and ranking numbers
                 */
                cache.modify({
                    id: cache.identify({
                        __typename: USER_TYPENAME,
                        id: uid,
                    }),
                    fields: {
                        blocked(existing) {
                            return existing + 1;
                        },
                        ranking(existing) {
                            return existing - 1;
                        },
                    },
                });
            },
        }
    );

    const [activateConvo] = useMutation<
        ActivateConvoData,
        ActivateConvoVariables
    >(ACTIVATE_CONVO, {
        variables: {
            cvid: cvid,
        },
        update(cache, { data, errors }) {
            if (!!errors && errors.length > 0) {
                setError("You don't have enough coin to respond.");
            } else if (!!data?.activateConvo) {
                /*
                 * Change the convo status
                 */
                cache.modify({
                    id: cache.identify({
                        id: cvid,
                        __typename: CONVO_TYPENAME,
                    }),
                    fields: {
                        status() {
                            return ConvoStatus.Active;
                        },
                    },
                });

                /*
                 * Remove convo from new convos
                 */
                cache.modify({
                    id: cache.identify({
                        __typename: QUERY_TYPENAME,
                    }),
                    fields: {
                        newConvos(existing, { readField }) {
                            return existing.filter(
                                (reqRef: any) =>
                                    readField("id", reqRef) !== cvid
                            );
                        },
                    },
                });

                /*
                 * Update user's coin
                 */
                cache.modify({
                    id: cache.identify({
                        __typename: USER_TYPENAME,
                        id: uid,
                    }),
                    fields: {
                        coin(existing) {
                            if (!!postData?.post) {
                                return existing - postData.post.convoReward;
                            } else {
                                return existing;
                            }
                        },
                    },
                });

                /*
                 * TODO: On activate, add convo to active convos, and user's convos
                 */
            }
        },
    });

    const [createMessage] = useMutation<
        CreateMessageData,
        CreateMessageVariables
    >(CREATE_MESSAGE, {
        update(cache, { data }) {
            if (!!data?.createMessage && !!messagesData?.convoMessages) {
                cache.writeQuery<ConvoMessagesData, ConvoMessagesVariables>({
                    query: CONVO_MESSAGES,
                    variables: {
                        cvid,
                    },
                    data: {
                        convoMessages: [
                            ...messagesData.convoMessages,
                            data.createMessage,
                        ],
                    },
                });

                /*
                 * Modify the convo
                 */
                cache.modify({
                    id: cache.identify({
                        __typename: CONVO_TYPENAME,
                        id: cvid,
                    }),
                    fields: {
                        lastMsg() {
                            return data.createMessage.content;
                        },
                        lastTime() {
                            return Date.now().toString();
                        },
                    },
                });
            }
        },
    });

    let participant = false;

    if (!!convoData?.convo) {
        participant =
            convoData.convo.sid === uid ||
            convoData.convo.sid === hid ||
            convoData.convo.tid === uid;
    }

    const [convoTime, setConvoTime] = useState<string>(`${Date.now()}`);

    useEffect(() => {
        if (!!convoData?.convo && !!convoData.convo.lastTime) {
            setConvoTime(convoData.convo.lastTime);
        }
    }, [!!convoData?.convo]);

    /*
     * Handle marking the convo as viewed
     */
    useEffect(() => {
        if (participant) {
            markConvoViewed().then();
        }
    }, [
        !!convoData?.convo,
        !!messagesData?.convoMessages ? messagesData.convoMessages.length : 0,
    ]);

    /*
     * Structure ref
     */
    const scrollRef = useRef<FlatList>(null);
    const [stillSpin, setStillSpin] = useState<boolean>(false);

    if (
        postLoading ||
        convoLoading ||
        networkStatus === NetworkStatus.loading ||
        networkStatus === NetworkStatus.setVariables ||
        networkStatus === NetworkStatus.fetchMore ||
        !postData?.post ||
        !convoData?.convo ||
        !messagesData?.convoMessages
    ) {
        return <LoadingWheel />;
    }

    // console.log(messagesData);

    if (!!postError) {
        return <ErrorMessage refresh={postRefetch} />;
    }

    if (!!convoError) {
        return <ErrorMessage refresh={convoRefetch} />;
    }

    if (!!messagesError) {
        return <ErrorMessage refresh={messagesRefetch} />;
    }

    /*
     * Get fields necessary to render the conversation
     */

    const isActive = convoData.convo.status === ConvoStatus.Active;
    const {
        status,
        targetMsgCount,
        tid,
        tname,
        sname,
        sid,
        sanony,
    } = convoData.convo;

    const checkLeft = getCheckLeft(uid, tid);

    // const status = convoData.convo.status;

    /*
     * Make the footer
     */

    const convoContent = (
        <FlatList
            ref={scrollRef}
            refreshControl={
                <RefreshControl
                    refreshing={
                        networkStatus === NetworkStatus.refetch || stillSpin
                    }
                    onRefresh={() => {
                        setStillSpin(true);
                        !!messagesRefetch && messagesRefetch();
                        setTimeout(() => {
                            setStillSpin(false);
                        }, 1000);
                    }}
                    colors={[
                        palette.deepBlue,
                        palette.darkForestGreen,
                        palette.oceanSurf,
                    ]}
                    tintColor={palette.deepBlue}
                />
            }
            ListHeaderComponent={() => (
                <View style={styles.convoContainer}>
                    <View style={styles.convoHeaderContainer}>
                        <TouchableOpacity
                            onPress={() =>
                                props.navigation.navigate("PostScreen", {
                                    pid: props.route.params.pid,
                                })
                            }
                        >
                            <Post
                                stripped
                                openUser={(uid) =>
                                    props.navigation.navigate("User", { uid })
                                }
                                post={postData.post}
                                openPost={(pid) =>
                                    props.navigation.navigate("PostScreen", {
                                        pid,
                                    })
                                }
                                openCommunity={(cmid) =>
                                    props.navigation.navigate("Community", {
                                        cmid,
                                    })
                                }
                            />
                        </TouchableOpacity>
                        <View style={styles.coverContainer}>
                            <View style={styles.convoUserMapContainer}>
                                {/*<View style={styles.headerTop}>*/}
                                <Tier
                                    ranking={convoData.convo.sranking}
                                    size={14}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!sanony) {
                                            props.navigation.navigate("User", {
                                                uid: sid,
                                            });
                                        }
                                    }}
                                    activeOpacity={sanony ? 1 : 0.5}
                                >
                                    <UserLabel
                                        name={convoData.convo.sname}
                                        anonymous={convoData.convo.sanony}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.arrowText}>{"  ➤  "}</Text>
                                <Tier
                                    ranking={convoData.convo.tranking}
                                    size={14}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.navigate("User", {
                                            uid: tid,
                                        });
                                    }}
                                    activeOpacity={0.5}
                                >
                                    <UserLabel
                                        name={convoData.convo.tname}
                                        anonymous={false}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.mainHeaderDotText}>·</Text>
                                <Text style={styles.coverTimeText}>
                                    {millisToRep(
                                        Date.now() - parseInt(convoTime)
                                    )}
                                </Text>
                            </View>
                            <View style={styles.rewardContainer}>
                                <Text style={styles.rewardText}>Reward</Text>
                                <View style={styles.coinBoxContainer}>
                                    <CoinBox
                                        coinSize={20}
                                        fontSize={14}
                                        showCoinPlus
                                        amount={postData.post.convoReward}
                                        boxColor={palette.lightForestGreen}
                                        paddingRight={10}
                                    />
                                </View>
                            </View>
                            {!!error && (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>
                                        {error}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            )}
            data={messagesData.convoMessages}
            renderItem={({ item, index }) => (
                <ConvoMsg
                    showBlockMsg={
                        participant &&
                        isActive &&
                        index === messagesData.convoMessages.length - 1
                    }
                    left={checkLeft(item.uid)}
                    msg={item}
                    showUser={true}
                    onBlock={async () => {
                        try {
                            await blockConvo();
                        } catch (e) {
                            console.log("Block error: ", e);
                        }
                    }}
                />
            )}
            keyExtractor={(item, index) => {
                return [item.id, index].join(":");
            }}
            ListFooterComponent={() => {
                switch (status) {
                    case ConvoStatus.Blocked:
                        return <BlockedFooter />;
                    case ConvoStatus.Dismissed:
                        return <DismissedFooter />;
                    case ConvoStatus.Finished:
                        return <SuccessFooter />;
                    case ConvoStatus.Active:
                        if (participant) {
                            if (uid === tid) {
                                return (
                                    <PendingFinishFooter
                                        onFinish={() => {}}
                                        finishMessage={"Finish convo?"}
                                    />
                                );
                            } else if (
                                targetMsgCount >= TARGET_MESSAGE_COUNT_THRESHOLD
                            ) {
                                return (
                                    <PendingFinishFooter
                                        onFinish={() => {}}
                                        finishMessage={
                                            "Finish convo and collect reward?"
                                        }
                                    />
                                );
                            }
                        }

                        return <View />;
                    default:
                        return <View />;
                }
            }}
        />
    );

    /*
     * If we're not a participant, we just see the conversation
     * */
    if (!participant) {
        return convoContent;
    } else if (status === ConvoStatus.Active) {
        let mAnony: boolean;
        let mUid: string;
        let mTid: string;
        let mUser: string;

        if (uid === tid) {
            /*
             * In this case, this user is the target
             */
            mAnony = false;
            mUid = tid;
            mTid = sid;
            mUser = tname;
        } else {
            /*
             * In this case, this user is the source
             */
            mAnony = sanony;
            mUid = sid;
            mTid = tid;
            mUser = sname;
        }

        return (
            <MessageInput
                onKeyboardShow={() => {
                    setTimeout(() => {
                        !!scrollRef.current && scrollRef.current.scrollToEnd();
                    }, 50);

                    setTimeout(() => {
                        !!scrollRef.current && scrollRef.current.scrollToEnd();
                    }, 500);
                }}
                onSend={async (message) => {
                    try {
                        await createMessage({
                            variables: {
                                cvid: cvid,
                                message,
                            },
                            optimisticResponse: {
                                createMessage: {
                                    id: cvid,
                                    anonymous: mAnony,
                                    content: message,
                                    time: Date.now().toString(),
                                    uid: mUid,
                                    tid: mTid,
                                    user: mUser,
                                },
                            },
                        });
                    } catch (e) {
                        console.log("Send error: ", e);
                    }
                }}
            >
                <View style={basicLayouts.flexGrid1}>{convoContent}</View>
            </MessageInput>
        );
    } else if (uid === tid && status === ConvoStatus.New) {
        return (
            <>
                {convoContent}
                <ResponseResponse
                    responseCost={postData.post.convoReward}
                    onBlock={async () => {
                        try {
                            await blockConvo();
                        } catch (e) {
                            console.log("Block error: ", e);
                        }
                    }}
                    onDismiss={async () => {
                        try {
                            await dismissConvo();
                        } catch (e) {
                            console.log("Dismiss error: ", e);
                        }
                    }}
                    onRespond={async () => {
                        try {
                            await activateConvo();
                        } catch (e) {
                            console.log("Activation error: ", e);
                        }
                    }}
                />
            </>
        );
    } else {
        return convoContent;
    }
};

export default Convo;
