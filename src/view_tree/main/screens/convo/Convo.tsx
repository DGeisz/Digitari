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
    MAX_CONVO_MESSAGES_PER_PAGE,
} from "./gql/Queries";
import LoadingWheel from "../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../global_building_blocks/error_message/ErrorMessage";
import { styles } from "./ConvoStyles";
import Post from "../../../../global_building_blocks/post/Post";
import Tier from "../../../../global_building_blocks/tier/Tier";
import UserLabel from "../../../../global_building_blocks/convo_cover/building_blocks/user_label/UserLabel";
import { millisToRep } from "../../../../global_utils/TimeRepUtils";
import { palette } from "../../../../global_styles/Palette";
import ConvoMsg from "../../../../global_building_blocks/convo_msg/ConvoMsg";
import ResponseResponse from "./building_blocks/response_response/ResponseResponse";
import { localHid, localUid } from "../../../../global_state/UserState";
import {
    CONVO_ACTIVATION_COST,
    CONVO_TYPENAME,
    ConvoStatus,
    ConvoType,
    MESSAGE_COUNT_THRESHOLD,
} from "../../../../global_types/ConvoTypes";
import {
    BlockedFooter,
    DeletedFooter,
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
    FINISH_CONVO,
    FinishConvoData,
    FinishConvoVariables,
    MARK_CONVO_VIEWED,
    MarkConvoViewedData,
    MarkConvoViewedVariables,
} from "./gql/Mutations";
import { QUERY_TYPENAME } from "../../../../global_gql/Schema";
import { USER_TYPENAME } from "../../../../global_types/UserTypes";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import {
    ACTIVE_CONVOS,
    ActiveConvosData,
    ActiveConvosVariables,
} from "../../routes/tab_nav/screens/convos/sub_screens/active_convos/gql/Queries";
import {
    DONATE_TO_POST,
    DonateToPostData,
    DonateToPostVariables,
} from "../../../../global_building_blocks/post/gql/Mutations";
import {
    TransactionType,
    TransactionTypesEnum,
} from "../../../../global_types/TransactionTypes";
import { addTransaction } from "../../hooks/use_realtime_updates/subscription_handlers/utils/cache_utils";
import { challengeCheck } from "../../../../global_gql/challenge_check/challenge_check";
import ConvoOptionsModal from "./building_blocks/convo_options_modal/ConvoOptionsModal";
import { PostType } from "../../../../global_types/PostTypes";
import { MessageType } from "../../../../global_types/MessageTypes";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../../routes/tab_nav/screens/profile/gql/Queries";
import { firstConvoPage } from "../../../../global_state/FirstImpressionsState";
import InstructionsModal from "./building_blocks/instruction_modal/InstructionsModal";

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

    const { cvid, pid } = props.route.params;
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

    const { data: selfData } = useQuery<
        GetUserQueryData,
        GetUserQueryVariables
    >(GET_USER, {
        variables: {
            uid,
        },
    });

    const userBolts: number = !!selfData?.user
        ? parseInt(selfData.user.bolts)
        : 0;

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
            optimisticResponse: !!convoData?.convo
                ? {
                      dismissConvo: {
                          ...convoData.convo,
                          status: ConvoStatus.Dismissed,
                      },
                  }
                : undefined,
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
            optimisticResponse: !!convoData?.convo
                ? {
                      blockConvo: {
                          convo: {
                              ...convoData.convo,
                              status: ConvoStatus.Blocked,
                          },
                          tid: "",
                      },
                  }
                : undefined,
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
        optimisticResponse: !!convoData?.convo
            ? {
                  activateConvo: {
                      ...convoData.convo,
                      status: ConvoStatus.Active,
                  },
              }
            : undefined,
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
                 * Update user's bolts
                 */
                cache.modify({
                    id: cache.identify({
                        __typename: USER_TYPENAME,
                        id: uid,
                    }),
                    fields: {
                        bolts(existing) {
                            existing = parseInt(existing);

                            return (
                                existing - CONVO_ACTIVATION_COST
                            ).toString();
                        },
                    },
                });

                const activeConvos = cache.readQuery<
                    ActiveConvosData,
                    ActiveConvosVariables
                >({
                    query: ACTIVE_CONVOS,
                });

                if (!!activeConvos?.activeConvos) {
                    cache.writeQuery<ActiveConvosData, ActiveConvosVariables>({
                        query: ACTIVE_CONVOS,
                        data: {
                            activeConvos: [
                                data.activateConvo,
                                ...activeConvos.activeConvos,
                            ],
                        },
                    });
                }
            }
        },
    });

    const [finishConvo] = useMutation<FinishConvoData, FinishConvoVariables>(
        FINISH_CONVO,
        {
            variables: {
                cvid,
            },
            optimisticResponse: !!convoData?.convo
                ? {
                      finishConvo: {
                          convo: {
                              ...convoData.convo,
                              status: ConvoStatus.Finished,
                          },
                          tid: "",
                      },
                  }
                : undefined,
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
                            return ConvoStatus.Finished;
                        },
                    },
                });

                /*
                 * Remove convo from active convos
                 */
                cache.modify({
                    id: cache.identify({
                        __typename: QUERY_TYPENAME,
                    }),
                    fields: {
                        activeConvos(existing, { readField }) {
                            return existing.filter(
                                (reqRef: any) =>
                                    readField("id", reqRef) !== cvid
                            );
                        },
                    },
                });

                /*
                 * Increase the user's ranking, successfulConvos, and
                 * increase their trans total by the convo reward
                 */
                cache.modify({
                    id: cache.identify({
                        __typename: USER_TYPENAME,
                        id: uid,
                    }),
                    fields: {
                        ranking(existing) {
                            return existing + 1;
                        },
                        successfulConvos(existing) {
                            return existing + 1;
                        },
                    },
                });

                /*
                 * Add a transaction
                 */
                if (!!convoData?.convo) {
                    let transactionMessage: string;

                    if (uid === convoData.convo.tid) {
                        if (convoData.convo.sanony) {
                            transactionMessage = `You successfully finished a convo`;
                        } else {
                            transactionMessage = `You successfully finished your convo with ${convoData.convo.sname}`;
                        }
                    } else {
                        transactionMessage = `You successfully finished your convo with ${convoData.convo.tname}`;
                    }

                    const transaction: TransactionType = {
                        tid: uid,
                        time: Date.now().toString(),
                        coin: 0,
                        message: transactionMessage,
                        transactionType: TransactionTypesEnum.Convo,
                        data: `${cvid}:${convoData.convo.pid}`,
                    };

                    addTransaction(transaction, cache);
                }

                /*
                 * Do a quick challenge check
                 */
                challengeCheck(cache);
            },
        }
    );

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

                /*
                 * Modify the order of active convos so the most active
                 * convo is up top
                 */
                const activeConvosData = cache.readQuery<
                    ActiveConvosData,
                    ActiveConvosVariables
                >({
                    query: ACTIVE_CONVOS,
                });

                if (!!activeConvosData?.activeConvos) {
                    let convos = [...activeConvosData.activeConvos];
                    convos.sort(
                        (a, b) => parseInt(b.lastTime) - parseInt(a.lastTime)
                    );

                    cache.writeQuery<ActiveConvosData, ActiveConvosVariables>({
                        query: ACTIVE_CONVOS,
                        data: {
                            activeConvos: convos,
                        },
                    });
                }
            }
        },
    });

    const [donateToPost] = useMutation<DonateToPostData, DonateToPostVariables>(
        DONATE_TO_POST
    );

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
    const [fetchMoreLen, setFetchMoreLen] = useState<number>(
        MAX_CONVO_MESSAGES_PER_PAGE - 5
    );

    const [animateMessages, setAnimateMessages] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setAnimateMessages(true);
        }, 1000);

        props.navigation.setOptions({ animationEnabled: true });
    }, []);

    let convo: ConvoType;
    let post: PostType;
    let messages: MessageType[];

    /*
     * For instructions
     */
    const [instructionsModal, showInstructions] = useState<boolean>(
        firstConvoPage()
    );

    if (!!postError) {
        return <ErrorMessage refresh={postRefetch} />;
    }

    if (!!convoError) {
        return <ErrorMessage refresh={convoRefetch} />;
    }

    if (!!messagesError) {
        return <ErrorMessage refresh={messagesRefetch} />;
    }

    if (
        (!postData?.post && postLoading) ||
        (!convoData?.convo && convoLoading) ||
        networkStatus === NetworkStatus.loading ||
        networkStatus === NetworkStatus.setVariables ||
        networkStatus === NetworkStatus.fetchMore
    ) {
        return <LoadingWheel />;
    }

    if (!messagesData?.convoMessages || !postData?.post || !convoData?.convo) {
        return (
            <View style={styles.noConvoContainer}>
                <Text style={styles.noConvoText}>
                    This convo no longer exists
                </Text>
            </View>
        );
    }

    convo = convoData.convo;
    post = postData.post;
    messages = messagesData.convoMessages;

    /*
     * Get fields necessary to render the conversation
     */
    const isActive = convo.status === ConvoStatus.Active;
    const {
        status,
        targetMsgCount,
        sourceMsgCount,
        tid,
        tname,
        sname,
        sid,
        sanony,
    } = convo;

    const checkLeft = getCheckLeft(uid, tid);

    /*
     * Create the main convo content
     */
    const convoContent = (
        <>
            <InstructionsModal
                hideModal={() => showInstructions(false)}
                visible={instructionsModal}
            />
            <FlatList
                ref={scrollRef}
                contentContainerStyle={styles.convoListContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={
                            networkStatus === NetworkStatus.refetch || stillSpin
                        }
                        onRefresh={() => {
                            setStillSpin(true);
                            !!messagesRefetch && messagesRefetch();
                            !!convoRefetch && convoRefetch();
                            !!postRefetch && postRefetch();

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
                                    donateToPost={donateToPost}
                                    userCoin={0}
                                    userBolts={0}
                                    userFirstName={""}
                                    stripped
                                    openUser={(uid) =>
                                        props.navigation.navigate("User", {
                                            uid,
                                        })
                                    }
                                    openReport={(pid) => {
                                        props.navigation.navigate(
                                            "ReportPost",
                                            {
                                                pid,
                                            }
                                        );
                                    }}
                                    post={post}
                                    openPost={(pid) =>
                                        props.navigation.navigate(
                                            "PostScreen",
                                            {
                                                pid,
                                            }
                                        )
                                    }
                                    openCommunity={(cmid) =>
                                        props.navigation.navigate("Community", {
                                            cmid,
                                        })
                                    }
                                />
                            </TouchableOpacity>
                            <View style={styles.coverContainer}>
                                <View style={styles.convoTop}>
                                    <View style={styles.convoUserMapContainer}>
                                        <Tier
                                            ranking={convo.sranking}
                                            size={14}
                                        />
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (!sanony) {
                                                    props.navigation.navigate(
                                                        "User",
                                                        {
                                                            uid: sid,
                                                        }
                                                    );
                                                }
                                            }}
                                            activeOpacity={sanony ? 1 : 0.5}
                                        >
                                            <UserLabel
                                                name={convo.sname}
                                                anonymous={convo.sanony}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.arrowText}>
                                            {"  ➤  "}
                                        </Text>
                                        <Tier
                                            ranking={convo.tranking}
                                            size={14}
                                        />
                                        <TouchableOpacity
                                            onPress={() => {
                                                props.navigation.navigate(
                                                    "User",
                                                    {
                                                        uid: tid,
                                                    }
                                                );
                                            }}
                                            activeOpacity={0.5}
                                        >
                                            <UserLabel
                                                name={convo.tname}
                                                anonymous={false}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.mainHeaderDotText}>
                                            ·
                                        </Text>
                                        <Text style={styles.coverTimeText}>
                                            {millisToRep(
                                                Date.now() - parseInt(convoTime)
                                            )}
                                        </Text>
                                    </View>
                                    <View style={styles.convoOptionsContainer}>
                                        <ConvoOptionsModal
                                            openReportConvo={() => {
                                                props.navigation.navigate(
                                                    "ReportConvo",
                                                    { cvid }
                                                );
                                            }}
                                            convo={convo}
                                            goBack={props.navigation.goBack}
                                            cvid={cvid}
                                            pid={pid}
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
                data={messages}
                renderItem={({ item, index }) => (
                    <ConvoMsg
                        animateMsg={animateMessages}
                        showBlockMsg={
                            participant &&
                            isActive &&
                            index === messages.length - 1
                        }
                        left={checkLeft(item.uid)}
                        msg={item}
                        showUser={true}
                        onBlock={async () => {
                            try {
                                await blockConvo();
                            } catch (e) {
                                if (__DEV__) {
                                    console.log("Block error: ", e);
                                }
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
                        case ConvoStatus.Deleted:
                            return <DeletedFooter />;
                        case ConvoStatus.Active:
                            if (participant) {
                                if (uid === tid) {
                                    if (
                                        sourceMsgCount >=
                                        MESSAGE_COUNT_THRESHOLD
                                    ) {
                                        return (
                                            <PendingFinishFooter
                                                onFinish={finishConvo}
                                                finishMessage={"Finish convo?"}
                                            />
                                        );
                                    }
                                } else if (
                                    targetMsgCount >= MESSAGE_COUNT_THRESHOLD
                                ) {
                                    return (
                                        <PendingFinishFooter
                                            onFinish={async () => {
                                                await finishConvo();
                                            }}
                                            finishMessage={
                                                "Finish convo and collect reward?"
                                            }
                                        />
                                    );
                                }
                            }

                            return <View />;
                        case ConvoStatus.New:
                            if (sid === uid || sid === hid) {
                                return (
                                    <View style={styles.noResponseContainer}>
                                        <Text style={styles.noResponseText}>
                                            {tname} hasn't responded yet
                                        </Text>
                                    </View>
                                );
                            }

                            return <View />;
                        default:
                            return <View />;
                    }
                }}
                onEndReached={async () => {
                    if (
                        !!messagesData?.convoMessages &&
                        messagesData.convoMessages.length > fetchMoreLen
                    ) {
                        const messages = messagesData.convoMessages;

                        const lastTime = messages[messages.length - 1].time;
                        const ffLen = messages.length;

                        setFetchMoreLen(ffLen);

                        !!fetchMore &&
                            (await fetchMore({
                                variables: {
                                    lastTime,
                                },
                            }));
                    }
                }}
            />
        </>
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
                        if (__DEV__) {
                            console.log("Send error: ", e);
                        }
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
                    userBolts={userBolts}
                    onBlock={async () => {
                        try {
                            await blockConvo();
                        } catch (e) {
                            if (__DEV__) {
                                console.log("Block error: ", e);
                            }
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
                            if (__DEV__) {
                                console.log("Activation error: ", e);
                            }
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
