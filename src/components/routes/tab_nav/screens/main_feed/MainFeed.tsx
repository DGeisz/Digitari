import * as React from "react";
import { View } from "react-native";
import Post from "../../../../../building_blocks/post/Post";
import { postExampleNoLink } from "../../../../../building_blocks/post/PostTypes";
import { basicLayouts } from "../../../../../global_styles/BasicLayouts";

interface Props {}

const MainFeed: React.FC<Props> = () => {
    return <View style={basicLayouts.flexGrid1}>
        <View style={{justifyContent: "center", flex: 1}}>
            <Post post={postExampleNoLink} />
        </View>
    </View>;
};

export default MainFeed;
