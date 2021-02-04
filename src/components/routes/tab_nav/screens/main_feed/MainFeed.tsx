import * as React from "react";
import { View } from "react-native";
import Post from "../../../../../global_building_blocks/post/Post";
import { basicLayouts } from "../../../../../global_styles/BasicLayouts";
import { postExampleNoLink } from "../../../../../global_types/PostTypes";
import CoinBox from "../../../../../global_building_blocks/coin_box/CoinBox";
import { palette } from "../../../../../global_styles/Palette";
import ConvoCover from "../../../../../global_building_blocks/convo_cover/ConvoCover";
import { convoCoverExample } from "../../../../../global_types/ConvoCoverTypes";
import WalletEntry from "../../../../../global_building_blocks/wallet_entry/WalletEntry";
import { walletEntryExample } from "../../../../../global_types/WalletEntryTypes";

interface Props {}

const MainFeed: React.FC<Props> = () => {
    return (
        <View style={basicLayouts.flexGrid1}>
            <View style={basicLayouts.flexGrid4}>
                <WalletEntry walletEntry={walletEntryExample}/>
            </View>
        </View>
    );
};

export default MainFeed;
