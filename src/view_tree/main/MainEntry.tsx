import * as React from "react";
import TabNav from "./routes/tab_nav/TabNav";
import Convo from "./screens/convo/Convo";
import NewPost from "./screens/new_post/NewPost";
import NewResponse from "./screens/new_response/NewResponse";
import PostScreen from "./screens/post_screen/PostScreen";
import AccountSettings from "./screens/account_settings/AccountSettings";
import { getTabNavHeaderTitle } from "./routes/tab_nav/TabNavUtils";
import { createStackNavigator } from "@react-navigation/stack";
import { MainEntryStack } from "./MainEntryNavTypes";

const RootStack = createStackNavigator<MainEntryStack>();

const MainEntry: React.FC = () => {
    return (
        <RootStack.Navigator
            initialRouteName="TabNav"
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
            <RootStack.Screen name="NewPost" component={NewPost} />
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
        </RootStack.Navigator>
    );
};

export default MainEntry;