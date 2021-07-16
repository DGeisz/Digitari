import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { palette } from "../../../../../../global_styles/Palette";
import { TabNavContext } from "../../TabNavContext";
import NewButton from "../../../../../../global_building_blocks/new_button/NewButton";
import { styles } from "./MainFeedStyles";
import YourFeed from "./screens/your_feed/YourFeed";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MainFeedTab } from "./MainFeedNavTypes";
import AllPosts from "./screens/all_posts/AllPosts";
import { FeedContext, FeedType } from "./MainFeedContext";
import InstructionsModal from "./building_blocks/instructions_modal/InstructionsModal";
import { firstFeed } from "../../../../../../global_state/FirstImpressionsState";

const Tab = createMaterialTopTabNavigator<MainFeedTab>();

const MainFeed: React.FC = () => {
    const [feedType, setFeed] = useState<FeedType>(FeedType.YourFeed);

    const { openNew } = useContext(TabNavContext);

    const [instructionsVisible, showInstructions] = useState<boolean>(
        firstFeed()
    );

    return (
        <FeedContext.Provider
            value={{
                feedType,
                setType: (feedType1) => setFeed(feedType1),
            }}
        >
            <InstructionsModal
                hideModal={() => showInstructions(false)}
                visible={instructionsVisible}
            />
            <View style={styles.feedContainer}>
                <View style={styles.selectBar}>
                    <TouchableOpacity
                        style={[
                            styles.selectButton,
                            feedType === FeedType.YourFeed
                                ? { backgroundColor: palette.deepBlue }
                                : {},
                        ]}
                        onPress={() => setFeed(FeedType.YourFeed)}
                    >
                        <Text
                            style={[
                                styles.selectText,
                                feedType === FeedType.YourFeed
                                    ? { color: palette.white }
                                    : {},
                            ]}
                        >
                            Your Feed
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.selectButton,
                            feedType === FeedType.AllPosts
                                ? { backgroundColor: palette.deepBlue }
                                : {},
                        ]}
                        onPress={() => setFeed(FeedType.AllPosts)}
                    >
                        <Text
                            style={[
                                styles.selectText,
                                feedType === FeedType.AllPosts
                                    ? { color: palette.white }
                                    : {},
                            ]}
                        >
                            All Posts
                        </Text>
                    </TouchableOpacity>
                </View>
                <Tab.Navigator
                    tabBar={() => {
                        return <View />;
                    }}
                >
                    <Tab.Screen name={"YourFeed"} component={YourFeed} />
                    <Tab.Screen name={"AllPosts"} component={AllPosts} />
                </Tab.Navigator>
            </View>
            <NewButton openNew={openNew} />
        </FeedContext.Provider>
    );
};

export default MainFeed;
