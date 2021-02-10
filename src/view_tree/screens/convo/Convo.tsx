import * as React from "react";
import { FlatList, View } from "react-native";
import MessageInput from "../../../global_building_blocks/message_input/MessageInput";
import { basicLayouts } from "../../../global_styles/BasicLayouts";
import StrippedPost from "../../../global_building_blocks/stripped_post/StrippedPost";
import { exampleStrippedPost } from "../../../global_types/PostTypes";
import ConvoMsg from "../../../global_building_blocks/convo_msg/ConvoMsg";
import {
    localFirstName,
    localSuid,
    localUid,
} from "../../../global_state/UserState";
import ResponseResponse from "./building_blocks/response_response/ResponseResponse";
import {
    CONVO_TYPENAME,
    convoStatus,
    ConvoType,
} from "../../../global_types/ConvoTypes";
import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import { GET_CONVO } from "./gql/Queries";
import { ConvoNavProp, ConvoRouteProp } from "../../MainEntryNavTypes";
import LoadingWheel from "../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../global_building_blocks/error_message/ErrorMessage";
import {
    BlockedFooter,
    DismissedFooter,
    PendingFinishFooter,
    SuccessFooter,
} from "./building_blocks/status_footers/StatusFooters";
import {
    ACTIVATE_CONVO,
    ActivateConvoMutationData,
    ActivateConvoMutationVariables,
    BLOCK_INITIAL_CONVO,
    BLOCK_MESSAGE,
    BlockInitialMutationData,
    BlockInitialMutationVariables,
    BlockMessageMutationData,
    BlockMessageMutationVariables,
    DISMISS_CONVO,
    DismissMutationData,
    DismissMutationVariables,
    FINISH_CONVO,
    FinishConvoMutationData,
    FinishConvoMutationVariables,
    SEND_MESSAGE,
    SendMessageMutationData,
    SendMessageMutationVariables,
} from "./gql/Mutations";
import { QUERY_TYPENAME } from "../../../global_gql/Schema";
import { USER_TYPENAME } from "../../../global_types/UserTypes";
import {
    BLOCK_CONVO,
    MESSAGE_SENT,
    UPDATE_CONVO_STATUS,
} from "./gql/Fragments";
import { CONVO_MSG_TYPENAME } from "../../../global_types/ConvoMsgTypes";

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

interface QueryData {
    convo: ConvoType;
}

interface QueryVariables {
    cid: string;
}

const Convo: React.FC<Props> = (props) => {
    const uid = localUid();
    const suid = localSuid();
    const firstName = localFirstName();
    const cid = props.route.params.cid;

    // Query
    const { data, error, networkStatus, refetch } = useQuery<
        QueryData,
        QueryVariables
    >(GET_CONVO, {
        variables: { cid: cid },
        notifyOnNetworkStatusChange: true,
    });

    // Mutations
    const [dismissConvo] = useMutation<
        DismissMutationData,
        DismissMutationVariables
    >(DISMISS_CONVO, {
        variables: { cid: cid },
        optimisticResponse: {
            dismissConvo: {
                id: cid,
                __typename: CONVO_TYPENAME,
            },
        },
        update(cache) {
            // Remove convo from new convos query
            cache.modify({
                id: cache.identify({
                    __typename: QUERY_TYPENAME,
                }),
                fields: {
                    newConvos(existing, { readField }) {
                        return existing.filter(
                            (reqRef: any) => readField("id", reqRef) !== cid
                        );
                    },
                },
            });
        },
    });

    const [blockConvo] = useMutation<
        BlockInitialMutationData,
        BlockInitialMutationVariables
    >(BLOCK_INITIAL_CONVO, {
        variables: { cid: cid },
        optimisticResponse: {
            blockInitialConvo: {
                id: cid,
                __typename: CONVO_TYPENAME,
            },
        },
        update(cache) {
            // Remove convo from new convos query
            cache.modify({
                id: cache.identify({
                    __typename: QUERY_TYPENAME,
                }),
                fields: {
                    newConvos(existing, { readField }) {
                        return existing.filter(
                            (reqRef: any) => readField("id", reqRef) !== cid
                        );
                    },
                },
            });

            cache.writeFragment({
                id: cache.identify({
                    __typename: CONVO_TYPENAME,
                    id: cid,
                }),
                data: {
                    status: convoStatus.blocked,
                },
                fragment: BLOCK_CONVO,
            });

            // Increase user blocked count
            cache.modify({
                id: cache.identify({
                    __typename: USER_TYPENAME,
                    id: uid,
                }),
                fields: {
                    blocked(existing) {
                        console.log("Blocked: ", existing);
                        return existing + 1;
                    },
                    ranking(existing) {
                        console.log("Ranking: ", existing);
                        return existing - 1;
                    },
                },
            });
        },
    });

    const [activateConvo] = useMutation<
        ActivateConvoMutationData,
        ActivateConvoMutationVariables
    >(ACTIVATE_CONVO, {
        variables: { cid: cid },
        optimisticResponse: {
            activateConvo: {
                id: cid,
                __typename: CONVO_TYPENAME,
            },
        },
        update(cache) {
            // Remove convo from new convos and add to active convos
            cache.modify({
                id: cache.identify({
                    __typename: QUERY_TYPENAME,
                }),
                fields: {
                    newConvos(existing, { readField }) {
                        return existing.filter(
                            (reqRef: any) => readField("id", reqRef) !== cid
                        );
                    },
                    activeConvos(existing) {
                        // Update the convo status as well
                        const updatedConvoRef = cache.writeFragment({
                            id: cache.identify({
                                __typename: CONVO_TYPENAME,
                                id: cid,
                            }),
                            data: {
                                status: convoStatus.active,
                            },
                            fragment: UPDATE_CONVO_STATUS,
                        });

                        return [updatedConvoRef, ...existing];
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
                        if (!!data?.convo) {
                            return existing - data.convo.post.convoReward;
                        } else {
                            return existing;
                        }
                    },
                },
            });
        },
    });

    const [blockMessage] = useMutation<
        BlockMessageMutationData,
        BlockMessageMutationVariables
    >(BLOCK_MESSAGE, {
        variables: { cid: cid },
        optimisticResponse: {
            blockMessage: {
                id: cid,
                __typename: CONVO_TYPENAME,
            },
        },
        update(cache) {
            cache.writeFragment({
                id: cache.identify({
                    __typename: CONVO_TYPENAME,
                    id: cid,
                }),
                data: {
                    status: convoStatus.blocked,
                },
                fragment: BLOCK_CONVO,
            });

            // Increase user blocked count
            cache.modify({
                id: cache.identify({
                    __typename: USER_TYPENAME,
                    id: uid,
                }),
                fields: {
                    blocked(existing) {
                        console.log("Blocked: ", existing);
                        return existing + 1;
                    },
                    ranking(existing) {
                        console.log("Ranking: ", existing);
                        return existing - 1;
                    },
                },
            });
        },
    });

    const [finishConvo] = useMutation<
        FinishConvoMutationData,
        FinishConvoMutationVariables
    >(FINISH_CONVO, {
        variables: { cid: cid },
        optimisticResponse: {
            finishConvo: {
                id: cid,
                __typename: CONVO_TYPENAME,
            },
        },
        update(cache) {
            cache.writeFragment({
                id: cache.identify({
                    __typename: CONVO_TYPENAME,
                    id: cid,
                }),
                data: {
                    status: convoStatus.finished,
                },
                fragment: BLOCK_CONVO,
            });

            // Increase user successful Convo count
            cache.modify({
                id: cache.identify({
                    __typename: USER_TYPENAME,
                    id: uid,
                }),
                fields: {
                    successfulConvos(existing) {
                        return existing + 1;
                    },
                    ranking(existing) {
                        return existing + 1;
                    },
                },
            });

            // Increase target's coin by the amount of the reward
            cache.modify({
                id: cache.identify({
                    __typename: USER_TYPENAME,
                    id: uid,
                }),
                fields: {
                    coin(existing) {
                        if (!!data?.convo && data.convo.cover.tid === uid) {
                            return existing + data.convo.post.convoReward;
                        } else {
                            return existing;
                        }
                    },
                },
            });
        },
    });

    // Send message
    const [sendMsgBase] = useMutation<
        SendMessageMutationData,
        SendMessageMutationVariables
    >(SEND_MESSAGE, {
        update(cache, { data }) {
            cache.modify({
                id: cache.identify({
                    __typename: CONVO_TYPENAME,
                    id: cid,
                }),
                fields: {
                    messages(existing) {
                        const newMsgRef = cache.writeFragment({
                            data: data?.sendMessage,
                            fragment: MESSAGE_SENT,
                        });

                        console.log(newMsgRef);

                        return [newMsgRef, ...existing];
                    },
                },
            });
        },
    });

    async function sendMessage(msg: string) {
        if (!!data?.convo) {
            const { tid, sanony } = data.convo.cover;
            const anony = uid === tid ? false : sanony;
            const muid = anony ? suid : uid;

            await sendMsgBase({
                variables: {
                    cid,
                    uid: muid,
                    user: firstName,
                    anonymous: anony,
                    content: msg,
                },
                optimisticResponse: {
                    sendMessage: {
                        id: cid,
                        uid: muid,
                        user: firstName,
                        time: Date.now(),
                        anonymous: anony,
                        content: msg,
                        __typename: CONVO_MSG_TYPENAME,
                    },
                },
            });
        }
    }

    // Set title of page
    React.useEffect(() => {
        if (!!data?.convo) {
            const { sid, tid, sanony, sname, tname } = data.convo.cover;

            if (uid === tid || uid === sid || suid === suid) {
                if (uid === tid && !sanony) {
                    props.navigation.setOptions({ title: sname });
                } else if (uid !== tid) {
                    props.navigation.setOptions({ title: tname });
                }
            }
        }
    }, [data]);

    const [autoFocus, setAutoFocus] = React.useState<boolean>(false);
    const listRef: React.RefObject<FlatList> = React.useRef<FlatList>(null);

    if (!data?.convo && networkStatus === NetworkStatus.loading) {
        return <LoadingWheel />;
    }

    if (error) {
        console.log(error);
        return <ErrorMessage refresh={refetch} />;
    }

    if (!!data?.convo) {
        const { sid, tid } = data.convo.cover;

        // Check if user is a conversation participant
        if (uid === tid || uid === sid || suid === suid) {
            let status = data.convo.status;
            const checkLeft = getCheckLeft(uid, tid);

            if (status === convoStatus.new) {
                if (uid === tid) {
                    return (
                        <>
                            <View style={basicLayouts.flexGrid1}>
                                <FlatList
                                    ref={listRef}
                                    ListHeaderComponent={
                                        <StrippedPost post={data.convo.post} />
                                    }
                                    data={data.convo.messages}
                                    renderItem={({ item }) => (
                                        <ConvoMsg
                                            msg={item}
                                            left={checkLeft(item.uid)}
                                            showUser={true}
                                            showBlockMsg={false}
                                        />
                                    )}
                                    keyExtractor={(item, index) =>
                                        [item.id, index].join(":")
                                    }
                                />
                            </View>
                            <ResponseResponse
                                respondModalMessage={`Respond to message and place ${data.convo.post.convoReward} digicoin in escrow?`}
                                onBlock={async () => {
                                    try {
                                        await blockConvo();
                                    } catch (e) {
                                        console.log(e);
                                    } finally {
                                        props.navigation.pop();
                                    }
                                }}
                                onDismiss={async () => {
                                    try {
                                        await dismissConvo();
                                    } catch (e) {
                                        console.log(e);
                                    } finally {
                                        props.navigation.pop();
                                    }
                                }}
                                onMessage={async () => {
                                    try {
                                        setAutoFocus(true);
                                        await activateConvo();
                                    } catch (e) {
                                        console.log(e);
                                    }
                                }}
                            />
                        </>
                    );
                } else {
                    return (
                        <View style={basicLayouts.flexGrid1}>
                            <FlatList
                                ref={listRef}
                                ListHeaderComponent={
                                    <StrippedPost post={data.convo.post} />
                                }
                                data={data.convo.messages}
                                renderItem={({ item }) => (
                                    <ConvoMsg
                                        msg={item}
                                        left={checkLeft(item.uid)}
                                        showUser={true}
                                        showBlockMsg={false}
                                    />
                                )}
                                keyExtractor={(item, index) =>
                                    [item.id, index].join(":")
                                }
                            />
                        </View>
                    );
                }
            } else if (status < 0) {
                let footer;

                switch (status) {
                    case convoStatus.dismissed:
                        footer = <DismissedFooter />;
                        break;
                    case convoStatus.blocked:
                        footer = <BlockedFooter />;
                        break;
                    case convoStatus.finished:
                        footer = <SuccessFooter />;
                        break;
                }

                return (
                    <View style={basicLayouts.flexGrid1}>
                        <FlatList
                            ref={listRef}
                            ListHeaderComponent={
                                <StrippedPost post={data.convo.post} />
                            }
                            ListFooterComponent={footer}
                            data={data.convo.messages}
                            renderItem={({ item }) => (
                                <ConvoMsg
                                    msg={item}
                                    left={checkLeft(item.uid)}
                                    showUser={true}
                                    showBlockMsg={false}
                                />
                            )}
                            keyExtractor={(item, index) =>
                                [item.id, index].join(":")
                            }
                        />
                    </View>
                );
            } else {
                const footer =
                    status === convoStatus.pendingCompletion ? (
                        <PendingFinishFooter
                            onFinish={finishConvo}
                            finishMessage={
                                uid === tid
                                    ? "Finish convo and collect reward?"
                                    : "Finish convo?"
                            }
                        />
                    ) : null;

                return (
                    <MessageInput
                        onSend={sendMessage}
                        onKeyboardShow={() => {
                            listRef.current?.scrollToEnd();
                        }}
                        autoFocus={autoFocus}
                    >
                        <>
                            <View style={basicLayouts.flexGrid1}>
                                <FlatList
                                    ref={listRef}
                                    ListFooterComponent={footer}
                                    ListHeaderComponent={
                                        <StrippedPost
                                            showEscrow
                                            post={exampleStrippedPost}
                                        />
                                    }
                                    data={data.convo.messages}
                                    renderItem={({ item, index }) => (
                                        <ConvoMsg
                                            msg={item}
                                            left={checkLeft(item.uid)}
                                            showUser={true}
                                            showBlockMsg={
                                                index ===
                                                data.convo.messages.length - 1
                                            }
                                            onBlock={async () => {
                                                try {
                                                    setAutoFocus(false);
                                                    await blockMessage();
                                                } catch (e) {
                                                    console.log(e);
                                                }
                                            }}
                                            blockMessage={
                                                "Block message and drop digicoin in escrow?"
                                            }
                                        />
                                    )}
                                    keyExtractor={(item, index) =>
                                        [item.id, index].join(":")
                                    }
                                />
                            </View>
                        </>
                    </MessageInput>
                );
            }
        } else {
            return (
                <View style={basicLayouts.flexGrid1}>
                    <FlatList
                        ref={listRef}
                        ListHeaderComponent={
                            <StrippedPost
                                showEscrow
                                post={exampleStrippedPost}
                            />
                        }
                        data={data.convo.messages}
                        renderItem={({ item }) => (
                            <ConvoMsg
                                msg={item}
                                left={item.uid === tid}
                                showUser={true}
                                showBlockMsg={false}
                            />
                        )}
                        keyExtractor={(item, index) =>
                            [item.id, index].join(":")
                        }
                    />
                </View>
            );
        }
    } else {
        return <View />;
    }
};

export default Convo;
