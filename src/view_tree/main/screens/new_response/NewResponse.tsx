import React, { useContext, useEffect, useState } from "react";
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
    TutorialContext,
    TutorialScreen,
} from "../../../tutorial/context/tutorial_context/TutorialContext";
import InstructionsModal from "./building_blocks/instructions_modal/InstructionsModal";
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

    const { pid } = props.route.params;

    const [anony, setAnony] = useState<boolean>(false);
    const [content, setContent] = useState<string>("");

    const [optimisticSent, setOpt] = useState<boolean>(false);

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
                console.log(data.createConvo);

                cache.modify({
                    id: cache.identify({
                        __typename: USER_TYPENAME,
                        id: uid,
                    }),
                    fields: {
                        coin(existing) {
                            return Math.max(
                                existing - props.route.params.responseCost,
                                0
                            );
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
                console.log("No new data for new response");
            }
        },
    });

    const {
        tutorialActive,
        tutorialScreen,
        setTutConvoMessages,
        advanceTutorial,
    } = useContext(TutorialContext);

    const onSend = async (text: string) => {
        if (tutorialActive) {
            setTutConvoMessages([
                {
                    id: "tutMsg0",
                    anonymous: false,
                    content: text,
                    time: Date.now().toString(),
                    uid,
                    tid: "z",
                    user: firstName,
                },
            ]);

            props.navigation.navigate("Convo", {
                cvid: "tutConvo0",
                pid: "tut0",
            });

            advanceTutorial();
        } else {
            try {
                const now = Date.now().toString();

                console.log(
                    "Do I have necessary data? ",
                    !!postData?.post && !!userData?.user
                );

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
                                      stier: ranking2Tier(
                                          userData.user.ranking
                                      ),
                                      sranking: userData.user.ranking,
                                      sname: anony ? "" : firstName,
                                      sanony: anony,
                                      sviewed: true,

                                      tid: postData.post.uid,
                                      ttier: postData.post.tier,
                                      tranking: tier2MinRanking(
                                          postData.post.tier
                                      ),
                                      tname: postData.post.user,
                                      tviewed: false,

                                      targetMsgCount: 0,
                                      convoReward: postData.post.convoReward,
                                      responseCost: postData.post.responseCost,
                                  },
                              }
                            : undefined,
                });
            } catch (e) {
                console.log("Send error", e);
            }
        }
    };

    useEffect(() => {
        return props.navigation.addListener("beforeRemove", (e) => {
            if (
                tutorialActive &&
                tutorialScreen !== TutorialScreen.RespondToPost &&
                tutorialScreen !== TutorialScreen.PopToFeed
            ) {
                e.preventDefault();
            }
        });
    }, [tutorialActive, tutorialScreen]);

    return (
        <>
            <InstructionsModal
                goBack={() =>
                    setTimeout(() => {
                        props.navigation.goBack();
                        props.navigation.navigate("TabNav", {
                            screen: "MainFeed",
                        });
                    }, 500)
                }
            />
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
                        onPress={() => !tutorialActive && setAnony(true)}
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
                        autoFocus={
                            !tutorialActive ||
                            tutorialScreen === TutorialScreen.InputResponse
                        }
                        onSend={onSend}
                        onChangeText={setContent}
                    />
                )}
            </TouchableOpacity>
        </>
    );
};

export default NewResponse;
