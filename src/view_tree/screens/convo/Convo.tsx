import * as React from "react";
import { FlatList, Keyboard, TouchableOpacity, View } from "react-native";
import MessageInput from "../../../global_building_blocks/message_input/MessageInput";
import { basicLayouts } from "../../../global_styles/BasicLayouts";
import StrippedPost from "../../../global_building_blocks/stripped_post/StrippedPost";
import { exampleStrippedPost } from "../../../global_types/PostTypes";
import ConvoMsg from "../../../global_building_blocks/convo_msg/ConvoMsg";
import { localSuid, localUid } from "../../../global_state/UserState";
import ResponseResponse from "./building_blocks/response_response/ResponseResponse";
import { convoStatus, ConvoType } from "../../../global_types/ConvoTypes";
import { NetworkStatus, useQuery } from "@apollo/client";
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
import { HeaderBackButton } from "@react-navigation/stack";

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
    const listRef: React.RefObject<FlatList> = React.useRef<FlatList>(null);

    const { data, error, networkStatus, refetch } = useQuery<
        QueryData,
        QueryVariables
    >(GET_CONVO, {
        variables: { cid: props.route.params.cid },
        notifyOnNetworkStatusChange: true,
    });

    console.log(data, error, networkStatus);

    const [stillSpin, setStillSpin] = React.useState<boolean>(false);

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
                            <ResponseResponse />
                        </>
                    );
                } else {
                    return (
                        <View style={basicLayouts.flexGrid1}>
                            <FlatList
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
                        <PendingFinishFooter onPress={() => {}} />
                    ) : null;

                return (
                    <MessageInput
                        onSend={() => {}}
                        onKeyboardShow={() => {
                            listRef.current?.scrollToEnd();
                        }}
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
                                    renderItem={({ item }) => (
                                        <ConvoMsg
                                            msg={item}
                                            left={checkLeft(item.uid)}
                                            showUser={true}
                                            showBlockMsg={true}
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
