import * as React from "react";
import { FlatList } from "react-native";
import { exampleConvoCover } from "../../../global_types/ConvoCoverTypes";
import ConvoCover from "../../../global_building_blocks/convo_cover/ConvoCover";
import Post from "../../../global_building_blocks/post/Post";
import { postExampleWithLink } from "../../../global_types/PostTypes";

interface Props {}

const data = [exampleConvoCover, exampleConvoCover, exampleConvoCover];

const PostScreen: React.FC<Props> = () => {
    return (
        <FlatList
            ListHeaderComponent={
                <Post
                    post={postExampleWithLink}
                    showFullRespond
                    standAlone
                    showConvos={false}
                />
            }
            data={data}
            renderItem={({ item, index }) => (
                <ConvoCover
                    showUnViewedDot={false}
                    convoCover={item}
                    showBottomBorder={index !== data.length - 1}
                />
            )}
            keyExtractor={(item, index) => [item.id, index].join(":")}
        />
    );
};

export default PostScreen;
