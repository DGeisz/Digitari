import React, { useState } from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import {
    NewResponseNavProp,
    NewResponseRouteProp,
} from "../../MainEntryNavTypes";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { styles } from "./NewResponseStyles";
import {
    localFirstName,
    localHid,
    localUid,
} from "../../../../global_state/UserState";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { palette } from "../../../../global_styles/Palette";
import MessageInput from "../../../../global_building_blocks/message_input/MessageInput";
import { useMutation, useQuery } from "@apollo/client";
import { USER_TYPENAME } from "../../../../global_types/UserTypes";
import {
    CREATE_CONVO,
    CreateConvoData,
    CreateConvoVariables,
} from "./gql/Mutations";
import LoadingWheel from "../../../../global_building_blocks/loading_wheel/LoadingWheel";
import { challengeCheck } from "../../../../global_gql/challenge_check/challenge_check";
import {
    CONVO,
    CONVO_MESSAGES,
    ConvoData,
    ConvoMessagesData,
    ConvoMessagesVariables,
    ConvoVariables,
} from "../convo/gql/Queries";
import { POST, PostData, PostVariables } from "../post_screen/gql/Queries";
import { ConvoStatus } from "../../../../global_types/ConvoTypes";
import {
    GET_USER,
    GetUserQueryData,
    GetUserQueryVariables,
} from "../../routes/tab_nav/screens/profile/gql/Queries";
import {
    ranking2Tier,
    tier2MinRanking,
} from "../../../../global_types/TierTypes";

interface Props {
    route: NewResponseRouteProp;
    navigation: NewResponseNavProp;
}

const NewResponse: React.FC<Props> = (props) => {
    const firstName = localFirstName();
    const uid = localUid();
    const hid = localHid();

    const { pid, responseCost } = props.route.params;

    const [anony, setAnony] = useState<boolean>(false);
    const [content, setContent] = useState<string>("");

    const { data: postData } = useQuery<PostData, PostVariables>(POST, {
        variables: {
            pid,
        },
    });

    const { data: userData } = useQuery<
        GetUserQueryData,
        GetUserQueryVariables
    >(GET_USER, {
        variables: {
            uid,
        },
    });

    const [createConvo, { loading }] = useMutation<
        CreateConvoData,
        CreateConvoVariables
    >(CREATE_CONVO, {
        update(cache, { data }) {
            if (!!data?.createConvo) {
                cache.modify({
                    id: cache.identify({
                        __typename: USER_TYPENAME,
                        id: uid,
                    }),
                    fields: {
                        bolts(existing) {
                            existing = parseInt(existing);

                            return Math.max(
                                existing - responseCost,
                                0
                            ).toString();
                        },
                    },
                });

                if (!!postData?.post) {
                    cache.writeQuery<ConvoMessagesData, ConvoMessagesVariables>(
                        {
                            query: CONVO_MESSAGES,
                            variables: {
                                cvid: data.createConvo.id,
                            },
                            data: {
                                convoMessages: [
                                    {
                                        id: data.createConvo.id,
                                        anonymous: anony,
                                        content,
                                        time: Date.now().toString(),
                                        uid,
                                        tid: postData.post.uid,
                                        user: anony ? "" : firstName,
                                    },
                                ],
                            },
                        }
                    );

                    cache.writeQuery<ConvoData, ConvoVariables>({
                        query: CONVO,
                        variables: {
                            cvid: data.createConvo.id,
                        },
                        data: {
                            convo: data.createConvo,
                        },
                    });
                }

                /*
                 * Do a quick challenge check
                 */
                challengeCheck(cache);

                props.navigation.replace("Convo", {
                    cvid: data.createConvo.id,
                    pid,
                    noAnimation: data.createConvo.id.length > 5,
                });
            } else {
                if (__DEV__) {
                    console.log("No new data for new response");
                }
            }
        },
    });

    const onSend = async (text: string) => {
        try {
            const now = Date.now().toString();

            await createConvo({
                variables: {
                    pid,
                    anonymous: anony,
                    message: text,
                },
                optimisticResponse:
                    !!postData?.post && !!userData?.user
                        ? {
                              createConvo: {
                                  id: Math.floor(
                                      100 * Math.random()
                                  ).toString(),
                                  pid,
                                  cmid: !!postData.post.cmid
                                      ? postData.post.cmid
                                      : "",

                                  status: ConvoStatus.New,
                                  initialTime: now,
                                  initialMsg: text,

                                  lastTime: now,
                                  lastMsg: text,

                                  sid: anony ? hid : uid,
                                  stier: ranking2Tier(userData.user.ranking),
                                  sranking: userData.user.ranking,
                                  sname: anony ? "" : firstName,
                                  sanony: anony,
                                  sviewed: true,
                                  sourceMsgCount: 1,

                                  tid: postData.post.uid,
                                  ttier: postData.post.tier,
                                  tranking: tier2MinRanking(postData.post.tier),
                                  tname: postData.post.user,
                                  tviewed: false,

                                  targetMsgCount: 0,
                                  responseCost: postData.post.responseCost,
                              },
                          }
                        : undefined,
            });
        } catch (e) {
            if (__DEV__) {
                console.log("Send error", e);
            }
        }
    };

    return (
        <>
            <TouchableOpacity
                style={basicLayouts.flexGrid1}
                onPress={Keyboard.dismiss}
                activeOpacity={1}
            >
                <View style={styles.targetContainer}>
                    <Text style={styles.arrowText}>
                        {"  ➤  "}
                        <Text style={styles.targetText}>
                            {props.route.params.tname}
                        </Text>
                    </Text>
                </View>
                <View style={styles.postAsChoiceContainer}>
                    <Text style={styles.postAsText}>{"Respond as: "}</Text>
                    <TouchableOpacity
                        style={[
                            styles.postAsChoice,
                            anony ? {} : { backgroundColor: palette.deepBlue },
                        ]}
                        onPress={() => setAnony(false)}
                    >
                        <Text
                            style={[
                                styles.postAsText,
                                anony ? {} : { color: palette.white },
                            ]}
                        >
                            {firstName}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.postAsChoice,
                            anony ? { backgroundColor: palette.deepBlue } : {},
                        ]}
                        onPress={() => setAnony(true)}
                    >
                        <MaterialCommunityIcons
                            name="incognito"
                            size={17}
                            color={anony ? palette.white : palette.hardGray}
                        />
                    </TouchableOpacity>
                </View>
                {loading ? (
                    <LoadingWheel />
                ) : (
                    <MessageInput
                        onSend={onSend}
                        onChangeText={setContent}
                        autoFocus
                    />
                )}
            </TouchableOpacity>
        </>
    );
};

export default NewResponse;
