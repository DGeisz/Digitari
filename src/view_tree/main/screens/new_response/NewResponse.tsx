import React, { useState } from "react";
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
import {
    COLLECT_EARNINGS,
    CollectEarningsData,
} from "../../routes/tab_nav/screens/wallet/gql/Mutations";

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
                // cache.modify({
                //     id: cache.identify({
                //         __typename: QUERY_TYPENAME,
                //     }),
                //     fields: {
                //         activeConvos(existing) {
                //             const newConvoRef = cache.writeFragment({
                //                 fragment: NEW_RESPONSE_CONVO,
                //                 data: data.newConvo,
                //             });
                //
                //             return [newConvoRef, ...existing];
                //         },
                //     },
                // });

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

    const onSend = async (text: string) => {
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
    };

    return (
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
                <Text style={styles.postAsText}>{"Post as: "}</Text>
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
                    onPress={() => {
                        setAnony(true);
                    }}
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
                <MessageInput autoFocus onSend={onSend} />
            )}
        </TouchableOpacity>
    );
};

export default NewResponse;
