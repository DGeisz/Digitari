import * as React from "react";
import { View } from "react-native";
import { basicLayouts } from "../../../../../global_styles/BasicLayouts";
import ProfileHeader from "./sub_screens/profile_header/ProfileHeader";
import UserPosts from "./sub_screens/user_posts/UserPosts";
import TabLabel from "../../../../../global_building_blocks/tab_label/TabLabel";
import UserConvos from "./sub_screens/user_convos/UserConvos";
import { exampleUser } from "../../../../../global_types/UserTypes";
import UserStats from "./sub_screens/user_stats/UserStats";
import { createMaterialCollapsibleTopTabNavigator, useCollapsibleScene } from "react-native-collapsible-tab-view";

interface Props {}

const Tab = createMaterialCollapsibleTopTabNavigator();

export default class Profile extends React.PureComponent<Props> {
    render() {
        return (
            <View style={basicLayouts.flexGrid1}>

                <Tab.Navigator
                    collapsibleOptions={{
                        renderHeader: () => <ProfileHeader user={exampleUser}/>,
                        headerHeight: 250,
                    }}
                >
                    <Tab.Screen
                        name="UserPosts"
                        options={{
                            tabBarLabel: ({ color }) => (
                                <TabLabel title={"Posts"} color={color} />
                            )
                        }}
                    >
                        {() => <UserPosts routeKey={"UserPosts"}/>}
                    </Tab.Screen>
                    <Tab.Screen
                        name="UserConvos"
                        options={{
                            tabBarLabel: ({ color }) => (
                                <TabLabel title={"Convos"} color={color} />
                            )
                        }}
                    >
                        {() => <UserConvos routeKey={"UserConvos"}/>}
                    </Tab.Screen>
                    <Tab.Screen
                        name="UserStats"
                        options={{
                            tabBarLabel: ({ color }) => (
                                <TabLabel title={"Stats"} color={color} />
                            )
                        }}
                    >
                        {() => <UserStats routeKey="UserStats" user={exampleUser} />}
                    </Tab.Screen>
                </Tab.Navigator>
            </View>
        );
    }
};

{/*<PanGestureHandler onGestureEvent={this.onGestureEvent} onHandlerStateChange={this.handleStateChange}>*/}
{/*    <Animated.View style={[basicLayouts.flexGrid1, {*/}
{/*        // top: this.translateY*/}
{/*        transform: [*/}
{/*            {*/}
{/*                translateY: this.translateY*/}
{/*            }*/}
{/*        ]*/}
{/*    }]} onLayout={({nativeEvent: {layout: {y}}}) => {*/}
{/*        console.log("yoder", y);*/}
{/*        this.translateY.setOffset(y);*/}
{/*    }}>*/}
{/*</Animated.View>*/}
{/*</PanGestureHandler>*/}


// state = {
//     ty: 0
// }
//
// translateY = new Animated.Value(0);
//
// onGestureEvent = Animated.event([
//     {
//         nativeEvent: {
//             translationY: this.translateY
//         }
//     }
// ], {useNativeDriver: true});
//
// constructor(props: Props) {
//     super(props);
//
//     this.translateY.addListener(({value}) => {
//         console.log("Yote:", value);
//         if (!isNaN(value)) {
//             this.setState({ty: value});
//         }
//     });
// }
//
// handleStateChange = ({nativeEvent}: any) => {
//     if (nativeEvent.state === State.ACTIVE) {
//         this.translateY.setOffset(this.state.ty);
//     }
// };
