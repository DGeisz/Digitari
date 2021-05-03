import React, { useContext, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NewConvos from "./sub_screens/new_convos/NewConvos";
import ActiveConvos from "./sub_screens/active_convos/ActiveConvos";
import TabLabel from "../../../../../../global_building_blocks/tab_label/TabLabel";
import { TabNavContext } from "../../TabNavContext";
import NewButton from "../../../../../../global_building_blocks/new_button/NewButton";
import { useMutation, useQuery } from "@apollo/client";
import { ViewConvosData, VIEWED_CONVOS } from "./gql/Mutations";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";
import { localUid } from "../../../../../../global_state/UserState";
import {
    GET_UPDATE_FLAGS,
    GetUpdateFlagsData,
    GetUpdateFlagsVariables,
} from "../../gql/Queries";
import { useIsFocused } from "@react-navigation/native";
import { ConvosNavProp } from "../../TabNavTypes";

interface Props {
    navigation: ConvosNavProp;
}

const Tab = createMaterialTopTabNavigator();

const Convos: React.FC<Props> = (props) => {
    const uid = localUid();

    const { openNew } = useContext(TabNavContext);

    const [viewConvosScreen] = useMutation<ViewConvosData>(VIEWED_CONVOS, {
        optimisticResponse: {
            viewedConvoUpdate: true,
        },
        update(cache) {
            cache.modify({
                id: cache.identify({
                    __typename: USER_TYPENAME,
                    id: uid,
                }),
                fields: {
                    newConvoUpdate() {
                        return false;
                    },
                },
            });
        },
    });

    const { data: updateData } = useQuery<
        GetUpdateFlagsData,
        GetUpdateFlagsVariables
    >(GET_UPDATE_FLAGS, {
        variables: {
            uid,
        },
    });

    let newConvoUpdate = false;

    if (!!updateData) {
        newConvoUpdate = updateData.user.newConvoUpdate;
    }

    const pageFocused = useIsFocused();

    useEffect(() => {
        return props.navigation.addListener("focus", () => {
            viewConvosScreen().then();
        });
    }, [props.navigation, viewConvosScreen]);

    useEffect(() => {
        if (pageFocused && newConvoUpdate) {
            viewConvosScreen().then();
        }
    }, [pageFocused, newConvoUpdate, viewConvosScreen]);

    return (
        <>
            <Tab.Navigator>
                <Tab.Screen
                    name="ActiveConvos"
                    component={ActiveConvos}
                    options={{
                        tabBarLabel: ({ color }) => (
                            <TabLabel title={"Active"} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="NewConvos"
                    component={NewConvos}
                    options={{
                        tabBarLabel: ({ color }) => (
                            <TabLabel title={"New"} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
            <NewButton openNew={openNew} />
        </>
    );
};

export default Convos;
