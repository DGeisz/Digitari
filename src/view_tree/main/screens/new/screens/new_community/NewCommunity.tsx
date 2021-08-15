import React, { useRef, useState } from "react";
import {
    ActivityIndicator,
    Keyboard,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./NewCommunityStyles";
import { palette } from "../../../../../../global_styles/Palette";
import CoinBox from "../../../../../../global_building_blocks/coin_box/CoinBox";
import { useMutation, useQuery } from "@apollo/client";
import {
    USER_COIN_CHECK,
    UserCoinCheckData,
    UserCoinCheckVariables,
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
import { NewPostNavProp } from "../../../../MainEntryNavTypes";
import {
    COMMUNITY_DESCRIPTION_MAX_LEN,
    COMMUNITY_NAME_MAX_LEN,
    COMMUNITY_TYPENAME,
    CREATE_COMMUNITY_PRICE,
    CREATE_COMMUNITY_REWARD,
} from "../../../../../../global_types/CommunityTypes";
import { useAuthKeyboardBuffer } from "../../../../../auth/building_blocks/use_auth_keyboard_buffer/UseAuthKeyboardBuffer";
import { toCommaRep } from "../../../../../../global_utils/ValueRepUtils";
import BoltBox from "../../../../../../global_building_blocks/bolt_box/BoltBox";
import FlyingBolt from "../../../../../../global_building_blocks/flying_bolt/FlyingBolt";
import { addBoltTransaction } from "../../../../hooks/use_realtime_updates/subscription_handlers/utils/cache_utils";
import {
    TransactionIcon,
    TransactionTypesEnum,
} from "../../../../../../global_types/TransactionTypes";

interface Props {
    navigation: NewPostNavProp;
}

const NewCommunity: React.FC<Props> = (props) => {
    const uid = localUid();

    const {
        data,
        loading: checkLoading,
        error: checkError,
        refetch,
    } = useQuery<UserCoinCheckData, UserCoinCheckVariables>(USER_COIN_CHECK, {
        variables: {
            uid,
        },
    });

    const [name, setName] = useState<string>("");

    const [createCommunity] = useMutation<
        CreateCommunityMutationData,
        CreateCommunityMutationVariables
    >(CREATE_COMMUNITY, {
        update(cache, { data }) {
            if (!!data?.createCommunity) {
                setFuse(1 + Math.random());

                cache.modify({
                    id: cache.identify({
                        __typename: USER_TYPENAME,
                        id: uid,
                    }),
                    fields: {
                        coin(existing) {
                            existing = parseInt(existing);

                            return Math.max(
                                existing - CREATE_COMMUNITY_PRICE,
                                0
                            ).toString();
                        },
                        boltTransTotal(existing) {
                            existing = parseInt(existing);

                            return (
                                existing + CREATE_COMMUNITY_REWARD
                            ).toString();
                        },
                    },
                });

                addBoltTransaction(
                    {
                        tid: uid,
                        time: Date.now().toString(),
                        bolts: CREATE_COMMUNITY_REWARD,
                        message: `You created "${name}"`,
                        transactionType: TransactionTypesEnum.Community,
                        transactionIcon: TransactionIcon.Community,
                        data: data.createCommunity.id,
                    },
                    cache
                );

                cache.writeFragment({
                    fragment: CREATE_COMMUNITY_FRAGMENT,
                    id: cache.identify({
                        __typename: COMMUNITY_TYPENAME,
                        id: data.createCommunity.id,
                    }),
                    data: data.createCommunity,
                });

                props.navigation.replace("Community", {
                    cmid: data.createCommunity.id,
                });
            } else {
                props.navigation.goBack();
            }
        },
    });

    const [description, setDescription] = useState<string>("");

    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [fuse, setFuse] = useState<number>(0);

    const keyboardHeight = useAuthKeyboardBuffer();

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

    const scrollViewRef = useRef<ScrollView>(null);

    if (!data?.user && checkLoading) {
        return <LoadingWheel />;
    }

    if (checkError) {
        return <ErrorMessage refresh={refetch} />;
    }

    return (
        <ScrollView ref={scrollViewRef}>
            {!!data && parseInt(data.user.coin) >= CREATE_COMMUNITY_PRICE ? (
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
                    <Text style={styles.fieldTitle}>Name</Text>
                    <TextInput
                        placeholder="What's your community called?"
                        style={styles.fieldInput}
                        value={name}
                        onChangeText={(text) =>
                            setName(text.substring(0, COMMUNITY_NAME_MAX_LEN))
                        }
                    />
                    {COMMUNITY_NAME_MAX_LEN - name.length <= 20 && (
                        <Text style={styles.remainingText}>
                            {COMMUNITY_NAME_MAX_LEN - name.length}
                        </Text>
                    )}
                    <View style={styles.buffer} />
                    <Text style={styles.fieldTitle}>Description</Text>
                    <TextInput
                        placeholder="What should members post about?"
                        style={styles.fieldInput}
                        onFocus={() => {
                            !!scrollViewRef?.current &&
                                scrollViewRef.current.scrollToEnd();
                        }}
                        onChangeText={(text) =>
                            setDescription(
                                text.substring(0, COMMUNITY_DESCRIPTION_MAX_LEN)
                            )
                        }
                        value={description}
                        multiline
                    />
                    {COMMUNITY_DESCRIPTION_MAX_LEN - description.length <=
                        20 && (
                        <Text style={styles.remainingText}>
                            {COMMUNITY_DESCRIPTION_MAX_LEN - description.length}
                        </Text>
                    )}
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
                                    <BoltBox
                                        amount={CREATE_COMMUNITY_REWARD}
                                        boltSize={22}
                                        showBoltPlus
                                        moveTextRight={2}
                                        paddingRight={8}
                                        boxColor={palette.lightForestGreen}
                                        fontSize={16}
                                    />
                                </View>
                                <CoinBox
                                    fontSize={17}
                                    coinSize={28}
                                    fontColor={palette.danger}
                                    showCoinMinus
                                    amount={CREATE_COMMUNITY_PRICE}
                                    showAbbreviated={false}
                                />
                            </TouchableOpacity>
                        )}
                        <View style={styles.flyingBoltContainer}>
                            <FlyingBolt
                                animationHeight={200}
                                amount={CREATE_COMMUNITY_REWARD}
                                boltSize={35}
                                fontSize={28}
                                fuse={fuse}
                            />
                        </View>
                    </View>
                    <View style={{ height: keyboardHeight }} />
                </TouchableOpacity>
            ) : (
                <View style={styles.cantCreateContainer}>
                    <Text style={styles.cantCreateText}>
                        {`You need ${toCommaRep(
                            CREATE_COMMUNITY_PRICE
                        )} digicoin to create a community`}
                    </Text>
                </View>
            )}
        </ScrollView>
    );
};

export default NewCommunity;
