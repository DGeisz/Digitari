import React, { useContext, useEffect, useState } from "react";
import { styles } from "./SearchStyles";
import { FlatList, Keyboard, Text, TouchableOpacity, View } from "react-native";
import { TabNavContext } from "../../TabNavContext";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import NewButton from "../../../../../../global_building_blocks/new_button/NewButton";
import { SearchBar } from "react-native-elements";
import { SearchEntityEnum } from "../../../../../../global_types/SearchEntity";
import SearchResult from "./building_blocks/search_result/SearchResult";
import { useLazyQuery } from "@apollo/client";
import { SEARCH, SearchQueryData, SearchQueryVariables } from "./gql/Queries";
import { FontAwesome } from "@expo/vector-icons";
import { palette } from "../../../../../../global_styles/Palette";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";

const activeColor = palette.white;
const inactiveColor = palette.mediumGray;

const Search: React.FC = () => {
    const { openNew, openCommunity, openUser } = useContext(TabNavContext);
    const [query, setQuery] = useState<string>("");

    const [searchOption, setSearchOption] = useState<SearchEntityEnum | null>(
        null
    );

    const [
        searchQuery,
        { data, loading, error, refetch, fetchMore },
    ] = useLazyQuery<SearchQueryData, SearchQueryVariables>(SEARCH);

    useEffect(() => {
        if (!!query) {
            searchQuery({
                variables: {
                    text: query,
                    entityType: searchOption,
                },
            });
        }
    }, [searchOption]);

    console.log(data, loading);

    return (
        <>
            <TouchableOpacity
                activeOpacity={1}
                style={basicLayouts.flexGrid1}
                onPress={Keyboard.dismiss}
            >
                <View style={styles.headerContainer}>
                    <SearchBar
                        placeholder="Search..."
                        onChangeText={(text) => {
                            setQuery(text);
                            searchQuery({
                                variables: {
                                    text,
                                    entityType: searchOption,
                                },
                            });
                        }}
                        value={query}
                        showLoading={loading}
                        containerStyle={styles.searchContainer}
                        inputContainerStyle={styles.searchInputContainer}
                        lightTheme
                    />
                    <View style={styles.searchOptionsBar}>
                        <TouchableOpacity
                            style={[
                                styles.searchOption,
                                searchOption === null
                                    ? { backgroundColor: palette.deepBlue }
                                    : {},
                            ]}
                            onPress={() => setSearchOption(null)}
                        >
                            <Text
                                style={[
                                    styles.searchOptionText,
                                    {
                                        color:
                                            searchOption === null
                                                ? activeColor
                                                : inactiveColor,
                                    },
                                ]}
                            >
                                All
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.searchOption,
                                searchOption === SearchEntityEnum.user
                                    ? { backgroundColor: palette.deepBlue }
                                    : {},
                            ]}
                            onPress={() =>
                                setSearchOption(SearchEntityEnum.user)
                            }
                        >
                            <Text
                                style={[
                                    styles.searchOptionText,
                                    {
                                        color:
                                            searchOption ===
                                            SearchEntityEnum.user
                                                ? activeColor
                                                : inactiveColor,
                                    },
                                ]}
                            >
                                Users
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.searchOption,
                                searchOption === SearchEntityEnum.community
                                    ? { backgroundColor: palette.deepBlue }
                                    : {},
                            ]}
                            onPress={() =>
                                setSearchOption(SearchEntityEnum.community)
                            }
                        >
                            <Text
                                style={[
                                    styles.searchOptionText,
                                    {
                                        color:
                                            searchOption ===
                                            SearchEntityEnum.community
                                                ? activeColor
                                                : inactiveColor,
                                    },
                                ]}
                            >
                                Communities
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {error ? (
                    <ErrorMessage refresh={() => !!refetch && refetch()} />
                ) : query && data?.search ? (
                    data.search.length === 0 ? (
                        <View style={styles.noResultsContainer}>
                            <FontAwesome
                                name="search"
                                color={palette.lightGray}
                                size={20}
                            />
                            <Text style={styles.noResultsText}>
                                {`No results for: "${query}"`}
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            style={basicLayouts.flexGrid1}
                            data={data.search}
                            renderItem={({ item }) => (
                                <SearchResult
                                    result={item}
                                    onSelect={
                                        item.entityType ===
                                        SearchEntityEnum.user
                                            ? openUser
                                            : openCommunity
                                    }
                                />
                            )}
                            keyExtractor={(item, index) =>
                                [item, index].join(":")
                            }
                            onEndReached={() => {
                                !!fetchMore &&
                                    !!data?.search &&
                                    fetchMore({
                                        variables: {
                                            text: query,
                                            entityType: searchOption,
                                            offset: data.search.length,
                                        },
                                    });
                            }}
                        />
                    )
                ) : (
                    <View />
                )}
            </TouchableOpacity>
            <NewButton openNew={openNew} />
        </>
    );
};

export default Search;
