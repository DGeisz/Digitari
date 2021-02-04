import * as React from "react";
import { View } from "react-native";
import Post from "../../../../../global_building_blocks/post/Post";
import { basicLayouts } from "../../../../../global_styles/BasicLayouts";
import { postExampleNoLink } from "../../../../../global_types/PostTypes";
import CoinBox from "../../../../../global_building_blocks/coin_box/CoinBox";
import { palette } from "../../../../../global_styles/Palette";
import ConvoCover from "../../../../../global_building_blocks/convo_cover/ConvoCover";
import { convoCoverExample } from "../../../../../global_types/ConvoCoverTypes";

interface Props {}

const MainFeed: React.FC<Props> = () => {
    return (
        <View style={basicLayouts.flexGrid1}>
            <View style={basicLayouts.flexGrid4}>
                <ConvoCover convoCover={convoCoverExample}/>
            </View>
        </View>
    );
};

export default MainFeed;
