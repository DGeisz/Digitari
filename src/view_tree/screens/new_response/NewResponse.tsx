import * as React from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import {
    NewResponseNavProp,
    NewResponseRouteProp,
} from "../../MainEntryNavTypes";
import { basicLayouts } from "../../../global_styles/BasicLayouts";
import { styles } from "./NewResponseStyles";
import { localFirstName } from "../../../global_state/UserState";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { palette } from "../../../global_styles/Palette";
import MessageInput from "../../../global_building_blocks/message_input/MessageInput";

interface Props {
    route: NewResponseRouteProp;
    navigation: NewResponseNavProp;
}

const NewResponse: React.FC<Props> = (props) => {
    const firstName = localFirstName();

    const [anony, setAnony] = React.useState<boolean>(false);

    const onSend = (text: string) => {
        props.navigation.pop();
        props.navigation.navigate("Convo", { cid: "blue" });
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
                        console.log("Treeeeee");
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
