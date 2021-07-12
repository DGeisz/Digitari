import React, { useEffect, useState } from "react";
import {
    Linking,
    AppState,
    FlatList,
    Text,
    TouchableOpacity,
    View,
    Keyboard,
} from "react-native";
import { styles } from "./InvitesStyles";
import * as Contacts from "expo-contacts";
import { InvitesNavProp } from "../../MainEntryNavTypes";
import { Contact } from "expo-contacts";
import InviteUser from "./building_blocks/invite_user/InviteUser";
import { SearchBar } from "react-native-elements";
import { useMutation, useQuery } from "@apollo/client";
import {
    GET_REMAINING_INVITES,
    GetRemainingInvitesData,
    GetRemainingInvitesVariables,
} from "./gql/Queries";
import { localUid } from "../../../../global_state/UserState";
import LoadingWheel from "../../../../global_building_blocks/loading_wheel/LoadingWheel";
import ErrorMessage from "../../../../global_building_blocks/error_message/ErrorMessage";
import {
    GEN_INVITE_CODE,
    GenInviteCodeData,
    GenInviteCodeVariables,
} from "./gql/Mutations";
import { USER_TYPENAME } from "../../../../global_types/UserTypes";
import { DOUBLE_NEWLINE } from "../../../../global_utils/StringUtils";

const pageSize = 30;

interface Props {
    navigation: InvitesNavProp;
}

const Invites: React.FC<Props> = (props) => {
    const uid = localUid();

    const [hasAccess, setHasAccess] = useState<boolean>(false);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [search, setSearch] = useState<string>("");

    const [offset, setOffset] = useState<number>(0);

    const getContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();

        if (status === "granted") {
            setHasAccess(true);

            const { data } = await Contacts.getContactsAsync({
                fields: [
                    Contacts.Fields.Name,
                    Contacts.Fields.FirstName,
                    Contacts.Fields.PhoneNumbers,
                    Contacts.Fields.Image,
                    Contacts.Fields.ImageAvailable,
                ],
                name: !!search ? search : undefined,
                pageSize,
                pageOffset: 0,
            });

            const finalContacts = data.filter(
                (contact) =>
                    !!contact.name &&
                    !!contact.phoneNumbers &&
                    contact.phoneNumbers.length > 0
            );

            setOffset(data.length);
            setContacts(finalContacts);
        } else {
            setHasAccess(false);
        }
    };

    /*
     * Handle any permission changes when this screen comes
     * back into view
     */
    useEffect(() => {
        return props.navigation.addListener("focus", getContacts);
    }, []);

    /*
     * Handle scenario where user returns from settings
     */
    useEffect(() => {
        AppState.addEventListener("change", getContacts);

        return () => {
            AppState.removeEventListener("change", getContacts);
        };
    }, []);

    useEffect(() => {
        getContacts().then();
    }, [search]);

    const { data, loading, error, refetch } = useQuery<
        GetRemainingInvitesData,
        GetRemainingInvitesVariables
    >(GET_REMAINING_INVITES, {
        variables: {
            uid,
        },
    });

    const [genInviteCode] = useMutation<
        GenInviteCodeData,
        GenInviteCodeVariables
    >(GEN_INVITE_CODE, {
        update(cache, { data }) {
            if (!!data?.genInviteCode) {
                cache.modify({
                    id: cache.identify({
                        __typename: USER_TYPENAME,
                        id: uid,
                    }),
                    fields: {
                        remainingInvites(existing) {
                            return existing - 1;
                        },
                    },
                });
            }
        },
    });

    if (loading) {
        return <LoadingWheel />;
    }

    if (error) {
        return <ErrorMessage refresh={refetch} />;
    }

    const remainingInvites = !!data?.user ? data.user.remainingInvites : 0;
    const finalContacts = remainingInvites > 0 && hasAccess ? contacts : [];

    return (
        <View style={styles.invitesContainer}>
            <FlatList
                ListHeaderComponent={
                    <>
                        <TouchableOpacity
                            style={styles.invitesHeader}
                            activeOpacity={1}
                            onPress={Keyboard.dismiss}
                        >
                            <Text style={styles.invitesHeaderText}>
                                Honestly, Digitari is way more fun when all your
                                friends are on the platform.
                                {DOUBLE_NEWLINE}
                                Plus, you get 500 extra digicoin{" "}
                                <Text style={styles.italics}>
                                    for free
                                </Text>{" "}
                                when someone you invite creates an account.{" "}
                                {DOUBLE_NEWLINE}
                                How's that for a good deal? 😉
                            </Text>
                            <Text style={styles.invitesRemaining}>
                                Remaining invites: {remainingInvites}
                            </Text>
                        </TouchableOpacity>
                        {remainingInvites < 1 ? (
                            <View style={styles.noInvitesContainer}>
                                <Text style={styles.noInvitesText}>
                                    🎉 You used all your invites! 🎉
                                </Text>
                            </View>
                        ) : hasAccess ? (
                            <SearchBar
                                placeholder="Search contacts..."
                                onChangeText={(text) => {
                                    setSearch(text);
                                }}
                                value={search}
                                containerStyle={styles.searchContainer}
                                inputContainerStyle={
                                    styles.searchInputContainer
                                }
                                lightTheme
                            />
                        ) : (
                            <View style={styles.promptContainer}>
                                <Text style={styles.promptText}>
                                    We need your permission to access your
                                    contacts so that you can invite your friends
                                </Text>
                                <TouchableOpacity
                                    style={styles.promptButton}
                                    onPress={async () => {
                                        await Linking.openURL("app-settings:");
                                    }}
                                >
                                    <Text style={styles.promptButtonText}>
                                        Open settings
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </>
                }
                data={finalContacts}
                renderItem={({ item }) => (
                    <InviteUser contact={item} genInviteCode={genInviteCode} />
                )}
                keyExtractor={(item) => item.id}
                onScroll={Keyboard.dismiss}
                onEndReached={async () => {
                    if (hasAccess) {
                        const { data } = await Contacts.getContactsAsync({
                            fields: [
                                Contacts.Fields.Name,
                                Contacts.Fields.FirstName,
                                Contacts.Fields.PhoneNumbers,
                                Contacts.Fields.Image,
                                Contacts.Fields.ImageAvailable,
                            ],
                            name: !!search ? search : undefined,
                            pageSize,
                            pageOffset: offset,
                        });

                        const newContacts = data.filter(
                            (contact) => !!contact.name
                        );

                        setOffset((lastOffset) => lastOffset + data.length);
                        setContacts((lastContacts) => [
                            ...lastContacts,
                            ...newContacts,
                        ]);
                    }
                }}
            />
        </View>
    );
};

export default Invites;
