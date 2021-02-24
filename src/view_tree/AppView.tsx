import * as React from "react";
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
import { localUid } from "../global_state/UserState";

const AppView: React.FC = () => {
    const [checkedAuth, setCheckAuth] = React.useState<boolean>(false);
    const [fetchedUser, setFetchedUser] = React.useState<boolean>(false);

    const [authenticated, setAuthenticated] = React.useState<boolean>(true);
    const [newUser, setNewUser] = React.useState<boolean>(false);
    const client = useApolloClient();

    React.useEffect(() => {
        Hub.listen("auth", async ({ payload: { event } }: HubCapsule) => {
            console.log("Amplify Hub event:", event);

            try {
                const { sub } = (
                    await Auth.currentSession()
                ).getIdToken().payload;

                !!sub && localUid(sub);
                setAuthenticated(true);
            } catch (_) {
                setAuthenticated(false);
            }
        });

        (async () => {
            try {
                const { sub } = (
                    await Auth.currentSession()
                ).getIdToken().payload;

                !!sub && localUid(sub);
                setAuthenticated(true);
            } catch (_) {
                setAuthenticated(false);
            }
            setCheckAuth(true);
        })();
    }, []);

    React.useEffect(() => {
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

    React.useEffect(() => {
        console.log("Calling fetch effect");

        (async () => {
            try {
                const { sub, email, given_name, family_name } = (
                    await Auth.currentSession()
                ).getIdToken().payload;

                !!sub && localUid(sub);

                console.log(
                    "Here are user attributes: ",
                    email,
                    given_name,
                    family_name
                );

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

                    console.log("Here is data", data?.createOrFetchUser);

                    if (data?.createOrFetchUser) {
                        setFetchedUser(true);
                        setNewUser(!!data.createOrFetchUser.newUser);
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
