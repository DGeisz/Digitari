import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
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
    BLOCK_CONVO,
    BlockConvoData,
    BlockConvoVariables,
    DISMISS_CONVO,
    DismissConvoData,
    DismissConvoVariables,
    MARK_CONVO_VIEWED,
    MarkConvoViewedData,
    MarkConvoViewedVariables,
} from "./gql/Mutations";
import { QUERY_TYPENAME } from "../../../../global_gql/Schema";
import { USER_TYPENAME } from "../../../../global_types/UserTypes";

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
            cvid: props.route.params.cvid,
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
            cvid: props.route.params.cvid,
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
            cvid: props.route.params.cvid,
        },
        update(cache) {
            console.log("Marked convo as viewed!");

            cache.modify({
                id: cache.identify({
                    id: props.route.params.cvid,
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
                cvid: props.route.params.cvid,
            },
            update(cache) {
                /*
                 * Change the convo status
                 */
                cache.modify({
                    id: cache.identify({
                        id: props.route.params.cvid,
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
                                    readField("id", reqRef) !==
                                    props.route.params.cvid
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
                cvid: props.route.params.cvid,
            },
            update(cache) {
                /*
                 * Change the convo status
                 */
                cache.modify({
                    id: cache.identify({
                        id: props.route.params.cvid,
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
                                    readField("id", reqRef) !==
                                    props.route.params.cvid
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
    const { status, targetMsgCount, tid, sid, sanony } = convoData.convo;

    const checkLeft = getCheckLeft(uid, tid);

    // const status = convoData.convo.status;

    /*
     * Make the footer
     */

    console.log("Convo time", convoData.convo);

    const convoContent = (
        <FlatList
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
                />
            )}
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
        return <MessageInput onSend={() => {}}>{convoContent}</MessageInput>;
    } else if (uid === tid && status === ConvoStatus.New) {
        console.log("We should be here?");
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
                    onRespond={() => {}}
                />
            </>
        );
    } else {
        return convoContent;
    }
};

export default Convo;

// const uid = localUid();
// const suid = localSuid();
// const firstName = localFirstName();
// const cid = props.route.params.cid;
//
// // Query
// const { data, error, networkStatus, refetch } = useQuery<
//     QueryData,
//     QueryVariables
// >(GET_CONVO, {
//     variables: { cid: cid },
//     notifyOnNetworkStatusChange: true,
// });
//
// // Mutations
// const [dismissConvo] = useMutation<
//     DismissMutationData,
//     DismissMutationVariables
// >(DISMISS_CONVO, {
//     variables: { cid: cid },
//     optimisticResponse: {
//         dismissConvo: {
//             id: cid,
//             __typename: CONVO_TYPENAME,
//         },
//     },
//     update(cache) {
//         // Remove convo from new convos query
//         cache.modify({
//             id: cache.identify({
//                 __typename: QUERY_TYPENAME,
//             }),
//             fields: {
//                 newConvos(existing, { readField }) {
//                     return existing.filter(
//                         (reqRef: any) => readField("id", reqRef) !== cid
//                     );
//                 },
//             },
//         });
//     },
// });
//
// const [blockConvo] = useMutation<
//     BlockInitialMutationData,
//     BlockInitialMutationVariables
// >(BLOCK_INITIAL_CONVO, {
//     variables: { cid: cid },
//     optimisticResponse: {
//         blockInitialConvo: {
//             id: cid,
//             __typename: CONVO_TYPENAME,
//         },
//     },
//     update(cache) {
//         // Remove convo from new convos query
//         cache.modify({
//             id: cache.identify({
//                 __typename: QUERY_TYPENAME,
//             }),
//             fields: {
//                 newConvos(existing, { readField }) {
//                     return existing.filter(
//                         (reqRef: any) => readField("id", reqRef) !== cid
//                     );
//                 },
//             },
//         });
//
//         cache.writeFragment({
//             id: cache.identify({
//                 __typename: CONVO_TYPENAME,
//                 id: cid,
//             }),
//             data: {
//                 status: convoStatus.blocked,
//             },
//             fragment: BLOCK_CONVO,
//         });
//
//         // Increase user blocked count
//         cache.modify({
//             id: cache.identify({
//                 __typename: USER_TYPENAME,
//                 id: uid,
//             }),
//             fields: {
//                 blocked(existing) {
//                     return existing + 1;
//                 },
//                 ranking(existing) {
//                     return existing - 1;
//                 },
//             },
//         });
//     },
// });
//
// const [activateConvo] = useMutation<
//     ActivateConvoMutationData,
//     ActivateConvoMutationVariables
// >(ACTIVATE_CONVO, {
//     variables: { cid: cid },
//     optimisticResponse: {
//         activateConvo: {
//             id: cid,
//             __typename: CONVO_TYPENAME,
//         },
//     },
//     update(cache) {
//
//         // Remove convo from new convos and add to active convos
//         cache.modify({
//             id: cache.identify({
//                 __typename: QUERY_TYPENAME,
//             }),
//             fields: {
//                 newConvos(existing, { readField }) {
//                     return existing.filter(
//                         (reqRef: any) => readField("id", reqRef) !== cid
//                     );
//                 },
//                 activeConvos(existing) {
//                     // Update the convo status as well
//                     const updatedConvoRef = cache.writeFragment({
//                         id: cache.identify({
//                             __typename: CONVO_TYPENAME,
//                             id: cid,
//                         }),
//                         data: {
//                             status: convoStatus.active,
//                         },
//                         fragment: UPDATE_CONVO_STATUS,
//                     });
//
//                     return [updatedConvoRef, ...existing];
//                 },
//             },
//         });
//
//         cache.modify({
//             id: cache.identify({
//                 __typename: USER_TYPENAME,
//                 id: uid,
//             }),
//             fields: {
//                 coin(existing) {
//                     if (!!data?.convo) {
//                         return Math.max(
//                             existing - data.convo.post.convoReward,
//                             0
//                         );
//                     } else {
//                         return existing;
//                     }
//                 },
//             },
//         });
//     },
// });
//
// const [blockMessage] = useMutation<
//     BlockMessageMutationData,
//     BlockMessageMutationVariables
// >(BLOCK_MESSAGE, {
//     variables: { cid: cid },
//     optimisticResponse: {
//         blockMessage: {
//             id: cid,
//             __typename: CONVO_TYPENAME,
//         },
//     },
//     update(cache) {
//         cache.writeFragment({
//             id: cache.identify({
//                 __typename: CONVO_TYPENAME,
//                 id: cid,
//             }),
//             data: {
//                 status: convoStatus.blocked,
//             },
//             fragment: BLOCK_CONVO,
//         });
//
//         // Increase user blocked count
//         cache.modify({
//             id: cache.identify({
//                 __typename: USER_TYPENAME,
//                 id: uid,
//             }),
//             fields: {
//                 blocked(existing) {
//                     console.log("Blocked: ", existing);
//                     return existing + 1;
//                 },
//                 ranking(existing) {
//                     console.log("Ranking: ", existing);
//                     return existing - 1;
//                 },
//             },
//         });
//     },
// });
//
// const [finishConvo] = useMutation<
//     FinishConvoMutationData,
//     FinishConvoMutationVariables
// >(FINISH_CONVO, {
//     variables: { cid: cid },
//     optimisticResponse: {
//         finishConvo: {
//             id: cid,
//             __typename: CONVO_TYPENAME,
//         },
//     },
//     update(cache) {
//         cache.writeFragment({
//             id: cache.identify({
//                 __typename: CONVO_TYPENAME,
//                 id: cid,
//             }),
//             data: {
//                 status: convoStatus.finished,
//             },
//             fragment: BLOCK_CONVO,
//         });
//
//         // Increase user successful Convo count
//         cache.modify({
//             id: cache.identify({
//                 __typename: USER_TYPENAME,
//                 id: uid,
//             }),
//             fields: {
//                 successfulConvos(existing) {
//                     return existing + 1;
//                 },
//                 ranking(existing) {
//                     return existing + 1;
//                 },
//             },
//         });
//
//         // Increase target's coin by the amount of the reward
//         cache.modify({
//             id: cache.identify({
//                 __typename: USER_TYPENAME,
//                 id: uid,
//             }),
//             fields: {
//                 coin(existing) {
//                     if (!!data?.convo && data.convo.cover.tid === uid) {
//                         return existing + data.convo.post.convoReward;
//                     } else {
//                         return existing;
//                     }
//                 },
//             },
//         });
//     },
// });
//
// // Send message
// const [sendMsgBase] = useMutation<
//     SendMessageMutationData,
//     SendMessageMutationVariables
// >(SEND_MESSAGE, {
//     update(cache, { data }) {
//         console.log("ang", data);
//
//         cache.modify({
//             id: cache.identify({
//                 __typename: CONVO_TYPENAME,
//                 id: cid,
//             }),
//             fields: {
//                 messages(existing) {
//                     const newMsgRef = cache.writeFragment({
//                         data: data?.sendMessage,
//                         fragment: MESSAGE_SENT,
//                     });
//
//                     return [newMsgRef, ...existing];
//                 },
//             },
//         });
//     },
// });
//
// async function sendMessage(msg: string) {
//     if (!!data?.convo) {
//         const { tid, sanony } = data.convo.cover;
//         const anony = uid === tid ? false : sanony;
//         const muid = anony ? suid : uid;
//
//         await sendMsgBase({
//             variables: {
//                 cid,
//                 uid: muid,
//                 user: firstName,
//                 anonymous: anony,
//                 content: msg,
//             },
//             optimisticResponse: {
//                 sendMessage: {
//                     id: cid,
//                     uid: muid,
//                     user: firstName,
//                     time: Date.now(),
//                     anonymous: anony,
//                     content: msg,
//                 },
//             },
//         });
//     }
// }
//
// // Set title of page
// useEffect(() => {
//     if (!!data?.convo) {
//         const { sid, tid, sanony, sname, tname } = data.convo.cover;
//
//         if (uid === tid || uid === sid || suid === suid) {
//             if (uid === tid && !sanony) {
//                 props.navigation.setOptions({ title: sname });
//             } else if (uid !== tid) {
//                 props.navigation.setOptions({ title: tname });
//             }
//         }
//     }
// }, [data]);
//
// const [autoFocus, setAutoFocus] = useState<boolean>(false);
// const listRef: React.RefObject<FlatList> = useRef<FlatList>(null);
//
// if (!data?.convo && networkStatus === NetworkStatus.loading) {
//     return <LoadingWheel />;
// }
//
// if (error) {
//     console.log(error);
//     return <ErrorMessage refresh={refetch} />;
// }
//
// if (!!data?.convo) {
//     const { sid, tid } = data.convo.cover;
//
//     // Check if user is a conversation participant
//     if (uid === tid || uid === sid || suid === suid) {
//         let status = data.convo.status;
//         const checkLeft = getCheckLeft(uid, tid);
//
//         if (status === convoStatus.new) {
//             if (uid === tid) {
//                 return (
//                     <>
//                         <View style={basicLayouts.flexGrid1}>
//                             <FlatList
//                                 ref={listRef}
//                                 ListHeaderComponent={
//                                     <StrippedPost post={data.convo.post} />
//                                 }
//                                 data={data.convo.messages}
//                                 renderItem={({ item }) => (
//                                     <ConvoMsg
//                                         msg={item}
//                                         left={checkLeft(item.uid)}
//                                         showUser={true}
//                                         showBlockMsg={false}
//                                     />
//                                 )}
//                                 keyExtractor={(item, index) =>
//                                     [item.id, index].join(":")
//                                 }
//                             />
//                         </View>
//                         <ResponseResponse
//                             respondModalMessage={`Respond to message and place ${data.convo.post.convoReward} digicoin in escrow?`}
//                             onBlock={async () => {
//                                 try {
//                                     await blockConvo();
//                                 } catch (e) {
//                                     console.log(e);
//                                 } finally {
//                                     props.navigation.pop();
//                                 }
//                             }}
//                             onDismiss={async () => {
//                                 try {
//                                     await dismissConvo();
//                                 } catch (e) {
//                                     console.log(e);
//                                 } finally {
//                                     props.navigation.pop();
//                                 }
//                             }}
//                             onMessage={async () => {
//                                 try {
//                                     setAutoFocus(true);
//                                     await activateConvo();
//                                 } catch (e) {
//                                     console.log(e);
//                                 }
//                             }}
//                         />
//                     </>
//                 );
//             } else {
//                 return (
//                     <View style={basicLayouts.flexGrid1}>
//                         <FlatList
//                             ref={listRef}
//                             ListHeaderComponent={
//                                 <StrippedPost post={data.convo.post} />
//                             }
//                             data={data.convo.messages}
//                             renderItem={({ item }) => (
//                                 <ConvoMsg
//                                     msg={item}
//                                     left={checkLeft(item.uid)}
//                                     showUser={true}
//                                     showBlockMsg={false}
//                                 />
//                             )}
//                             keyExtractor={(item, index) =>
//                                 [item.id, index].join(":")
//                             }
//                         />
//                     </View>
//                 );
//             }
//         } else if (status < 0) {
//             let footer;
//
//             switch (status) {
//                 case convoStatus.dismissed:
//                     footer = <DismissedFooter />;
//                     break;
//                 case convoStatus.blocked:
//                     footer = <BlockedFooter />;
//                     break;
//                 case convoStatus.finished:
//                     footer = <SuccessFooter />;
//                     break;
//             }
//
//             return (
//                 <View style={basicLayouts.flexGrid1}>
//                     <FlatList
//                         ref={listRef}
//                         ListHeaderComponent={
//                             <StrippedPost post={data.convo.post} />
//                         }
//                         ListFooterComponent={footer}
//                         data={data.convo.messages}
//                         renderItem={({ item }) => (
//                             <ConvoMsg
//                                 msg={item}
//                                 left={checkLeft(item.uid)}
//                                 showUser={true}
//                                 showBlockMsg={false}
//                             />
//                         )}
//                         keyExtractor={(item, index) =>
//                             [item.id, index].join(":")
//                         }
//                     />
//                 </View>
//             );
//         } else {
//             const footer =
//                 status === convoStatus.pendingCompletion ? (
//                     <PendingFinishFooter
//                         onFinish={finishConvo}
//                         finishMessage={
//                             uid === tid
//                                 ? "Finish convo and collect reward?"
//                                 : "Finish convo?"
//                         }
//                     />
//                 ) : null;
//
//             return (
//                 <MessageInput
//                     onSend={sendMessage}
//                     onKeyboardShow={() => {
//                         listRef.current?.scrollToEnd();
//                     }}
//                     autoFocus={autoFocus}
//                 >
//                     <>
//                         <View style={basicLayouts.flexGrid1}>
//                             <FlatList
//                                 ref={listRef}
//                                 ListFooterComponent={footer}
//                                 ListHeaderComponent={
//                                     <StrippedPost
//                                         showEscrow
//                                         post={exampleStrippedPost}
//                                     />
//                                 }
//                                 data={data.convo.messages}
//                                 renderItem={({ item, index }) => (
//                                     <ConvoMsg
//                                         msg={item}
//                                         left={checkLeft(item.uid)}
//                                         showUser={true}
//                                         showBlockMsg={
//                                             index ===
//                                             data.convo.messages.length - 1
//                                         }
//                                         onBlock={async () => {
//                                             try {
//                                                 setAutoFocus(false);
//                                                 await blockMessage();
//                                             } catch (e) {
//                                                 console.log(e);
//                                             }
//                                         }}
//                                         blockMessage={
//                                             "Block message and drop digicoin in escrow?"
//                                         }
//                                     />
//                                 )}
//                                 keyExtractor={(item, index) =>
//                                     [item.id, index].join(":")
//                                 }
//                             />
//                         </View>
//                     </>
//                 </MessageInput>
//             );
//         }
//     } else {
//         return (
//             <View style={basicLayouts.flexGrid1}>
//                 <FlatList
//                     ref={listRef}
//                     ListHeaderComponent={
//                         <StrippedPost
//                             showEscrow
//                             post={exampleStrippedPost}
//                         />
//                     }
//                     data={data.convo.messages}
//                     renderItem={({ item }) => (
//                         <ConvoMsg
//                             msg={item}
//                             left={item.uid === tid}
//                             showUser={true}
//                             showBlockMsg={false}
//                         />
//                     )}
//                     keyExtractor={(item, index) =>
//                         [item.id, index].join(":")
//                     }
//                 />
//             </View>
//         );
//     }
// } else {
//     return <View />;
// }
