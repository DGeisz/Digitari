import * as React from "react";
import TabNav from "./routes/tab_nav/TabNav";
import Convo from "./screens/convo/Convo";
import NewResponse from "./screens/new_response/NewResponse";
import PostScreen from "./screens/post_screen/PostScreen";
import AccountSettings from "./screens/account_settings/AccountSettings";
import { getTabNavHeaderTitle } from "./routes/tab_nav/TabNavUtils";
import { createStackNavigator } from "@react-navigation/stack";
import { MainEntryStack } from "./MainEntryNavTypes";
import New from "./screens/new/New";
import NewCommunity from "./screens/new/screens/new_community/NewCommunity";
import Community from "./screens/community/Community";

const RootStack = createStackNavigator<MainEntryStack>();

const MainEntry: React.FC = () => {
    return (
        <RootStack.Navigator
            initialRouteName="Community"
            screenOptions={{
                headerTruncatedBackTitle: "",
                headerBackTitle: "",
            }}
        >
            <RootStack.Screen
                name="TabNav"
                component={TabNav}
                options={({ route }) => {
                    return {
                        headerTitle: getTabNavHeaderTitle(route),
                    };
                }}
            />
            <RootStack.Screen name="Convo" component={Convo} />
            <RootStack.Screen name="New" component={New} />
            <RootStack.Screen
                name="NewResponse"
                component={NewResponse}
                options={{ title: "New Message" }}
                initialParams={{ tname: "", pid: "", responseCost: 0 }}
            />
            <RootStack.Screen
                name="PostScreen"
                component={PostScreen}
                options={{ title: "Post" }}
            />
            <RootStack.Screen
                name="AccountSettings"
                component={AccountSettings}
            />
            <RootStack.Screen
                name="NewCommunity"
                options={{ title: "New Community" }}
                component={NewCommunity}
            />
            <RootStack.Screen
                name={"Community"}
                component={Community}
                initialParams={{ cmid: "d02cb1ab-2f62-40b7-8d80-3016f2eaa5ae" }}
            />
        </RootStack.Navigator>
    );
};

export default MainEntry;
