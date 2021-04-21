import React, { useState } from "react";
import {
    ActivityIndicator,
    Keyboard,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Input } from "react-native-elements";
import { styles } from "./NewCommunityStyles";
import { palette } from "../../../../../../global_styles/Palette";
import { basicLayouts } from "../../../../../../global_styles/BasicLayouts";
import CoinBox from "../../../../../../global_building_blocks/coin_box/CoinBox";
import { StoreObject, useMutation, useQuery } from "@apollo/client";
import {
    CREATE_COMMUNITY_CHECK,
    CreateCommunityCheckQueryData,
    CreateCommunityCheckQueryVariables,
} from "./gql/Queries";
import ErrorMessage from "../../../../../../global_building_blocks/error_message/ErrorMessage";
import LoadingWheel from "../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import {
    CREATE_COMMUNITY,
    CREATE_COMMUNITY_FRAGMENT,
    CreateCommunityMutationData,
    CreateCommunityMutationVariables,
} from "./gql/Mutations";
import { USER_TYPENAME } from "../../../../../../global_types/UserTypes";
import { localUid } from "../../../../../../global_state/UserState";
import { NewCommunityNavProp } from "../../../../MainEntryNavTypes";
import { COMMUNITY_TYPENAME } from "../../../../../../global_types/CommunityTypes";

interface Props {
    navigation: NewCommunityNavProp;
}

const NewCommunity: React.FC<Props> = (props) => {
    const uid = localUid();

    const {
        data: checkData,
        error: checkError,
        loading: checkLoading,
        refetch,
    } = useQuery<
        CreateCommunityCheckQueryData,
        CreateCommunityCheckQueryVariables
    >(CREATE_COMMUNITY_CHECK, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: "network-only",
    });

    const [createCommunity] = useMutation<
        CreateCommunityMutationData,
        CreateCommunityMutationVariables
    >(CREATE_COMMUNITY, {
        update(cache, { data }) {
            if (!!data?.createCommunity) {
                if (!!checkData?.createCommunityCoinCheck) {
                    cache.modify({
                        id: cache.identify({
                            __typename: USER_TYPENAME,
                            id: uid,
                        }),
                        fields: {
                            coin(existing) {
                                return (
                                    existing -
                                    checkData.createCommunityCoinCheck.price
                                );
                            },
                        },
                    });
                }

                cache.writeFragment({
                    fragment: CREATE_COMMUNITY_FRAGMENT,
                    id: cache.identify({
                        __typename: COMMUNITY_TYPENAME,
                        id: data.createCommunity.id,
                    }),
                    data: data.createCommunity,
                });

                props.navigation.navigate("NewPost", {
                    cmid: data.createCommunity.id,
                });
            } else {
                props.navigation.navigate("NewPost", {});
            }
        },
    });

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const create = async () => {
        if (!(name && description)) {
            setError(true);
        } else {
            setLoading(true);

            try {
                await createCommunity({
                    variables: {
                        name,
                        description,
                    },
                });
            } catch (e) {
                setLoading(false);
            }
        }
    };

    if (!checkData?.createCommunityCoinCheck && checkLoading) {
        return <LoadingWheel />;
    }

    if (checkError) {
        return <ErrorMessage refresh={refetch} />;
    }

    return (
        <>
            {checkData &&
            checkData.createCommunityCoinCheck.coin >=
                checkData.createCommunityCoinCheck.price ? (
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.newCommunityContainer}
                    onPress={Keyboard.dismiss}
                >
                    {error && (
                        <Text style={styles.errorText}>
                            Please enter your community's name and description
                        </Text>
                    )}
                    <Input
                        placeholder="Community name"
                        labelStyle={{ color: palette.hardGray }}
                        label="Name"
                        onChangeText={(text) => setName(text)}
                    />
                    <Input
                        placeholder="Community description"
                        labelStyle={{ color: palette.hardGray }}
                        label="Description"
                        onChangeText={(text) => setDescription(text)}
                        multiline
                    />
                    <View style={styles.createContainer}>
                        {loading ? (
                            <ActivityIndicator
                                color={palette.deepBlue}
                                size="large"
                            />
                        ) : (
                            <TouchableOpacity
                                style={styles.createButton}
                                activeOpacity={0.5}
                                onPress={create}
                            >
                                <View style={styles.createButtonTextContainer}>
                                    <Text style={styles.createButtonText}>
                                        Create
                                    </Text>
                                </View>
                                <CoinBox
                                    fontSize={18}
                                    coinSize={25}
                                    amount={
                                        checkData?.createCommunityCoinCheck
                                            .price
                                    }
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </TouchableOpacity>
            ) : (
                <View style={styles.cantCreateContainer}>
                    <Text style={styles.cantCreateText}>
                        {`You need ${checkData?.createCommunityCoinCheck.price} digicoin to create a community`}
                    </Text>
                </View>
            )}
        </>
    );
};

export default NewCommunity;
