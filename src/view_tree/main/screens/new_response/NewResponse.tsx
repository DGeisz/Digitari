import React, { useContext, useEffect, useState } from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import {
    NewResponseNavProp,
    NewResponseRouteProp,
} from "../../MainEntryNavTypes";
import { basicLayouts } from "../../../../global_styles/BasicLayouts";
import { styles } from "./NewResponseStyles";
import { localFirstName, localUid } from "../../../../global_state/UserState";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { palette } from "../../../../global_styles/Palette";
import MessageInput from "../../../../global_building_blocks/message_input/MessageInput";
import { useMutation } from "@apollo/client";
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
} from "../../../context/tutorial_context/TutorialContext";
import InstructionsModal from "./building_blocks/instructions_modal/InstructionsModal";

interface Props {
    route: NewResponseRouteProp;
    navigation: NewResponseNavProp;
}

const NewResponse: React.FC<Props> = (props) => {
    const firstName = localFirstName();
    const uid = localUid();

    const [anony, setAnony] = useState<boolean>(false);

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
                        coin(existing) {
                            return Math.max(
                                existing - props.route.params.responseCost,
                                0
                            );
                        },
                    },
                });

                /*
                 * Do a quick challenge check
                 */
                challengeCheck(cache);

                props.navigation.pop();
                props.navigation.navigate("Convo", {
                    cvid: data.createConvo.id,
                    pid: props.route.params.pid,
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
                await createConvo({
                    variables: {
                        pid: props.route.params.pid,
                        anonymous: anony,
                        message: text,
                    },
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
                goBack={() => setTimeout(props.navigation.goBack, 500)}
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
                    <Text style={styles.postAsText}>{"Message as: "}</Text>
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
                    />
                )}
            </TouchableOpacity>
        </>
    );
};

export default NewResponse;
