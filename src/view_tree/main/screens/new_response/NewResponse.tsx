import * as React from "react";
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
import {
    NEW_CONVO,
    NewResponseMutationData,
    NewResponseMutationVariables,
} from "./gql/Mutations";
import {
    CONVO_TYPENAME,
    convoStatus,
} from "../../../../global_types/ConvoTypes";
import { NEW_RESPONSE_CONVO } from "./gql/Fragments";
import { QUERY_TYPENAME } from "../../../../global_gql/Schema";
import { UPDATE_CONVO_STATUS } from "../convo/gql/Fragments";
import { USER_TYPENAME } from "../../../../global_types/UserTypes";

interface Props {
    route: NewResponseRouteProp;
    navigation: NewResponseNavProp;
}

const NewResponse: React.FC<Props> = (props) => {
    const firstName = localFirstName();
    const uid = localUid();

    const [anony, setAnony] = React.useState<boolean>(false);

    const [newConvoBase] = useMutation<
        NewResponseMutationData,
        NewResponseMutationVariables
    >(NEW_CONVO, {
        update(cache, { data }) {
            if (!!data?.newConvo) {
                cache.modify({
                    id: cache.identify({
                        __typename: QUERY_TYPENAME,
                    }),
                    fields: {
                        activeConvos(existing) {
                            const newConvoRef = cache.writeFragment({
                                fragment: NEW_RESPONSE_CONVO,
                                data: data.newConvo,
                            });

                            return [newConvoRef, ...existing];
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
                            return existing - props.route.params.responseCost;
                        },
                    },
                });

                props.navigation.pop();
                props.navigation.navigate("Convo", { cid: data.newConvo.id });
            } else {
                console.log("No new data for new response");
            }
        },
    });

    const onSend = async (text: string) => {
        try {
            await newConvoBase({
                variables: {
                    pid: props.route.params.pid,
                    sanony: anony,
                    msg: text,
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
                        anony ? {} : { backgroundColor: palette.oceanSurf },
                    ]}
                    onPress={() => setAnony(false)}
                >
                    <Text style={styles.postAsText}>{firstName}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.postAsChoice,
                        anony ? { backgroundColor: palette.oceanSurf } : {},
                    ]}
                    onPress={() => {
                        setAnony(true);
                    }}
                >
                    <MaterialCommunityIcons
                        name="incognito"
                        size={17}
                        color={palette.hardGray}
                    />
                </TouchableOpacity>
            </View>
            <MessageInput autoFocus onSend={onSend} />
        </TouchableOpacity>
    );
};

export default NewResponse;
