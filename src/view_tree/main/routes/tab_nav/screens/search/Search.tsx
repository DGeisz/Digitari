import * as React from "react";
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

const Search: React.FC = () => {
    const { openNew, openCommunity, openUser } = React.useContext(
        TabNavContext
    );
    const [query, setQuery] = React.useState<string>("");

    const [searched, setSearched] = React.useState<boolean>(false);

    const [
        searchQuery,
        { data, called, loading, error, refetch },
    ] = useLazyQuery<SearchQueryData, SearchQueryVariables>(SEARCH);

    React.useEffect(() => {
        if (called) {
            setSearched(true);
        }
    }, [called]);

    const performSearch = async () => {
        if (!!query) {
            await searchQuery({ variables: { text: query } });
            setSearched(true);
        }
    };

    return (
        <>
            <TouchableOpacity
                activeOpacity={1}
                style={basicLayouts.flexGrid1}
                onPress={Keyboard.dismiss}
            >
                <SearchBar
                    placeholder="Search..."
                    onChangeText={(text) => {
                        setQuery(text);
                        setSearched(false);
                    }}
                    value={query}
                    showLoading={loading}
                    onSubmitEditing={performSearch}
                    onCancel={() => setSearched(false)}
                    containerStyle={styles.searchContainer}
                    inputContainerStyle={styles.searchInputContainer}
                    lightTheme
                />
                {error ? (
                    <ErrorMessage refresh={() => !!refetch && refetch()} />
                ) : searched && query && data?.search ? (
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
