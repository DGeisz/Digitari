import * as React from "react";
import { ScrollView, View, Dimensions, Animated } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { basicLayouts } from "../../../../../global_styles/BasicLayouts";
import ProfileHeader from "./sub_screens/profile_header/ProfileHeader";
import UserPosts from "./sub_screens/user_posts/UserPosts";
import TabLabel from "../../../../../global_building_blocks/tab_label/TabLabel";
import UserConvos from "./sub_screens/user_convos/UserConvos";
import { exampleUser } from "../../../../../global_types/UserTypes";
import UserStats from "./sub_screens/user_stats/UserStats";

interface Props {}

const Tab = createMaterialTopTabNavigator();

export default class Profile extends React.PureComponent<Props> {

    translateY = new Animated.Value(0);
    onGestureEvent = Animated.event([
        {
            nativeEvent: {
                absoluteY: this.translateY
            }
        }
    ], {useNativeDriver: true});

    render() {
        return (
            <View style={basicLayouts.flexGrid1}>
                <PanGestureHandler onGestureEvent={this.onGestureEvent}>
                    <Animated.View style={[basicLayouts.flexGrid1, {
                        // top: this.translateY
                        transform: [
                            {
                                translateY: this.translateY
                            }
                        ]
                    }]} onLayout={({nativeEvent: {layout: {y}}}) => {
                        console.log("yoder", y);
                        this.translateY.setOffset(y);
                    }}>
                        <ProfileHeader user={exampleUser} />
                        <Tab.Navigator tabBarOptions={{}}>
                            <Tab.Screen
                                name="UserPosts"
                                component={UserPosts}
                                options={{
                                    tabBarLabel: ({ color }) => (
                                        <TabLabel title={"Posts"} color={color} />
                                    )
                                }}
                            />
                            <Tab.Screen
                                name="UserConvos"
                                component={UserConvos}
                                options={{
                                    tabBarLabel: ({ color }) => (
                                        <TabLabel title={"Convos"} color={color} />
                                    )
                                }}
                            />
                            <Tab.Screen
                                name="UserStats"
                                options={{
                                    tabBarLabel: ({ color }) => (
                                        <TabLabel title={"Stats"} color={color} />
                                    )
                                }}
                            >
                                {() => <UserStats user={exampleUser} />}
                            </Tab.Screen>
                        </Tab.Navigator>
                    </Animated.View>
                </PanGestureHandler>
            </View>
        );
    }
};

