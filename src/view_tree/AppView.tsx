import React, { useEffect, useState } from "react";
import MainEntry from "./main/MainEntry";
import AuthEntry from "./auth/AuthEntry";
import * as SplashScreen from "expo-splash-screen";
import { Auth, Hub } from "aws-amplify";
import { HubCapsule } from "aws-amplify-react-native/types";
import { useApolloClient } from "@apollo/client";
import {
    CREATE_OR_FETCH_USER,
    CreateOrFetchUserMutationData,
    CreateOrFetchUserMutationVariables,
} from "./gql/Mutations";
import {
    setLocalFirstName,
    setLocalHid,
    setLocalUid,
} from "../global_state/UserState";
import { HID, HidData } from "./gql/Queries";

const AppView: React.FC = () => {
    const [checkedAuth, setCheckAuth] = useState<boolean>(false);
    const [fetchedUser, setFetchedUser] = useState<boolean>(false);

    const [authenticated, setAuthenticated] = useState<boolean>(true);
    const [newUser, setNewUser] = useState<boolean>(false);
    const client = useApolloClient();

    useEffect(() => {
        Hub.listen("auth", async ({ payload: { event } }: HubCapsule) => {
            try {
                const { sub, given_name } = (
                    await Auth.currentSession()
                ).getIdToken().payload;

                !!sub && setLocalUid(sub);
                !!given_name && setLocalFirstName(given_name);
                setAuthenticated(true);
            } catch (_) {
                setAuthenticated(false);
            }
        });

        (async () => {
            try {
                const { sub, given_name } = (
                    await Auth.currentSession()
                ).getIdToken().payload;

                !!sub && setLocalUid(sub);
                !!given_name && setLocalFirstName(given_name);
                setAuthenticated(true);
            } catch (_) {
                setAuthenticated(false);
            }
            setCheckAuth(true);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (checkedAuth) {
                if (authenticated) {
                    // If we've authenticated and performed the initial fetch, we show the splash
                    if (fetchedUser) {
                        await SplashScreen.hideAsync();
                    }
                } else {
                    // If we're not authenticated, immediately show auth flow
                    await SplashScreen.hideAsync();
                }
            }
        })();
    }, [fetchedUser, checkedAuth]);

    useEffect(() => {
        (async () => {
            try {
                const { sub, email, given_name, family_name } = (
                    await Auth.currentSession()
                ).getIdToken().payload;

                !!sub && setLocalUid(sub);
                !!given_name && setLocalFirstName(given_name);

                if (authenticated && email && given_name && family_name) {
                    const { data } = await client.mutate<
                        CreateOrFetchUserMutationData,
                        CreateOrFetchUserMutationVariables
                    >({
                        mutation: CREATE_OR_FETCH_USER,
                        variables: {
                            email,
                            firstName: given_name,
                            lastName: family_name,
                        },
                    });

                    if (data?.createOrFetchUser) {
                        setFetchedUser(true);
                        setNewUser(!!data.createOrFetchUser.newUser);
                    }

                    const { data: hidData } = await client.query<HidData>({
                        query: HID,
                    });

                    if (!!hidData?.hid) {
                        setLocalHid(hidData.hid);
                    }
                }
            } finally {
            }
        })();
    }, [authenticated, checkedAuth]);

    if (authenticated) {
        return <MainEntry />;
    } else {
        return <AuthEntry />;
    }
};

export default AppView;
