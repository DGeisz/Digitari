import * as React from "react";
import { View } from "react-native";
import { basicLayouts } from "../../../../../global_styles/BasicLayouts";
import ConvoMsg from "../../../../../global_building_blocks/convo_msg/ConvoMsg";
import { convoMsgExample } from "../../../../../global_types/ConvoMsgTypes";

interface Props {}

const MainFeed: React.FC<Props> = () => {
    return (
        <View style={basicLayouts.flexGrid1}>
            <View style={basicLayouts.flexGrid4}>
                <ConvoMsg
                    msg={convoMsgExample}
                    showBlockMsg={true}
                    left={true}
                    showUser={true}
                />
                <ConvoMsg
                    msg={convoMsgExample}
                    showBlockMsg={true}
                    left={false}
                    showUser={true}
                />
            </View>
        </View>
    );
};

export default MainFeed;
