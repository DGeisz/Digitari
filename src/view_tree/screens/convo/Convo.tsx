import * as React from "react";
import { FlatList, View } from "react-native";
import MessageInput from "../../../global_building_blocks/message_input/MessageInput";

interface Props {}

const Convo: React.FC<Props> = () => {
    return (
        <MessageInput onSend={() => {}}>
            <FlatList data={[]} renderItem={(item) => <View />} />
        </MessageInput>
    );
};

export default Convo;
