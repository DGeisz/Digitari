import * as React from "react";
import { FlatList, Keyboard, TouchableOpacity, View } from "react-native";
import MessageInput from "../../../global_building_blocks/message_input/MessageInput";
import { basicLayouts } from "../../../global_styles/BasicLayouts";
import StrippedPost from "../../../global_building_blocks/stripped_post/StrippedPost";
import { exampleStrippedPost } from "../../../global_types/PostTypes";
import { convoMsgExample } from "../../../global_types/ConvoMsgTypes";
import ConvoMsg from "../../../global_building_blocks/convo_msg/ConvoMsg";
import { localUid } from "../../../global_state/UserState";

interface Props {}

const data = [
    convoMsgExample,
    convoMsgExample,
    convoMsgExample,
    convoMsgExample,
    convoMsgExample,
    convoMsgExample,
    convoMsgExample,
];

const Convo: React.FC<Props> = () => {
    const uid = localUid();
    const listRef: React.RefObject<FlatList> = React.useRef<FlatList>(null);

    return (
        <MessageInput
            onSend={() => {}}
            onKeyboardShow={() => {
                listRef.current?.scrollToEnd();
            }}
        >
            <View style={basicLayouts.flexGrid1}>
                <FlatList
                    ListHeaderComponent={
                        <StrippedPost showEscrow post={exampleStrippedPost} />
                    }
                    data={data}
                    renderItem={({ item }) => (
                        <ConvoMsg
                            msg={item}
                            left={Math.random() > 0.51}
                            showUser={true}
                            showBlockMsg={true}
                        />
                    )}
                />
            </View>
        </MessageInput>
    );
};

export default Convo;
