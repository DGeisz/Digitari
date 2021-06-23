import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { styles } from "./SelectCommunityModalStyles";
import { SearchBar } from "react-native-elements";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
    GET_MY_COMMUNITIES,
    MyCommunitiesData,
    MyCommunitiesVariables,
    SEARCH_COMMUNITIES,
    SearchCommunitiesData,
    SearchCommunitiesVariables,
} from "./gql/queries";
import { localUid } from "../../../../../../../../global_state/UserState";
import LoadingWheel from "../../../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import CommunitySelection from "./building_blocks/community_selection/CommunitySelection";
import { AntDesign } from "@expo/vector-icons";
import { palette } from "../../../../../../../../global_styles/Palette";

interface Props {
    visible: boolean;
    onHide: () => void;
    selectCommunity: (id: string) => void;
}

const SelectCommunityModal: React.FC<Props> = (props) => {
    const uid = localUid();

    const [search, setSearch] = useState<string>("");

    const {
        data: myCommunities,
        loading: myLoading,
        refetch: myRefetch,
        fetchMore: myFetchMore,
    } = useQuery<MyCommunitiesData, MyCommunitiesVariables>(
        GET_MY_COMMUNITIES,
        {
            variables: {
                uid,
            },
            fetchPolicy: "network-only",
        }
    );

    useEffect(() => {
        if (props.visible) {
            myRefetch().then();
        }
    }, [props.visible]);

    const [
        performSearch,
        {
            data: searchData,
            loading: searchLoading,
            fetchMore: searchFetchMore,
        },
    ] = useLazyQuery<SearchCommunitiesData, SearchCommunitiesVariables>(
        SEARCH_COMMUNITIES,
        {
            variables: {
                search: search,
            },
        }
    );

    return (
        <Modal isVisible={props.visible}>
            <View style={styles.selectContainer}>
                <View style={styles.preHeader}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={props.onHide}
                    >
                        <AntDesign
                            name="close"
                            size={20}
                            color={palette.lightGray}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.selectHeader}>
                    <Text style={styles.selectTitleText}>Select Community</Text>
                </View>
                <SearchBar
                    placeholder="Search..."
                    onChangeText={(text) => {
                        setSearch(text);
                        performSearch({
                            variables: {
                                search: text,
                            },
                        });
                    }}
                    value={search}
                    showLoading={searchLoading}
                    containerStyle={styles.searchContainer}
                    inputContainerStyle={styles.searchInputContainer}
                    lightTheme
                />
                {myLoading ? (
                    <LoadingWheel />
                ) : !!search ? (
                    <>
                        <View style={styles.resultsContainer}>
                            <Text style={styles.resultsTitleText}>
                                Search results
                            </Text>
                        </View>
                        {!!searchData?.search &&
                        searchData.search.length > 0 ? (
                            <FlatList
                                data={searchData.search}
                                renderItem={({ item }) => (
                                    <CommunitySelection
                                        name={item.name}
                                        followers={item.followers}
                                        onSelect={() => {
                                            props.selectCommunity(item.id);
                                            props.onHide();
                                        }}
                                    />
                                )}
                                keyExtractor={(item, index) =>
                                    ["c-s", item.id, index].join(":")
                                }
                                onEndReached={() => {
                                    if (
                                        searchData?.search &&
                                        searchData.search.length > 0
                                    ) {
                                        !!searchFetchMore &&
                                            searchFetchMore({
                                                variables: {
                                                    text: search,
                                                    offset:
                                                        searchData.search
                                                            .length,
                                                },
                                            }).then();
                                    }
                                }}
                            />
                        ) : (
                            <View style={styles.noResultsContainer}>
                                <Text style={styles.noResultsText}>
                                    No results for: {search}
                                </Text>
                            </View>
                        )}
                    </>
                ) : (
                    <>
                        <View style={styles.resultsContainer}>
                            <Text style={styles.resultsTitleText}>
                                My Communities
                            </Text>
                        </View>
                        {!!myCommunities?.following &&
                        myCommunities.following.length > 0 ? (
                            <FlatList
                                data={myCommunities.following}
                                renderItem={({ item }) => (
                                    <CommunitySelection
                                        name={item.name}
                                        onSelect={() => {
                                            props.selectCommunity(item.tid);
                                            props.onHide();
                                        }}
                                    />
                                )}
                                keyExtractor={(item, index) =>
                                    ["m-c", item.tid, index].join(":")
                                }
                                onEndReached={() => {
                                    if (
                                        myCommunities?.following &&
                                        myCommunities.following.length > 0
                                    ) {
                                        const lastTime =
                                            myCommunities.following[
                                                myCommunities.following.length -
                                                    1
                                            ].time;

                                        myFetchMore({
                                            variables: {
                                                uid,
                                                lastTime,
                                            },
                                        }).then();
                                    }
                                }}
                            />
                        ) : (
                            <View style={styles.noResultsContainer}>
                                <Text style={styles.noResultsText}>
                                    Not following any communities
                                </Text>
                            </View>
                        )}
                    </>
                )}
            </View>
        </Modal>
    );
};

export default SelectCommunityModal;
