import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    NormalizedCacheObject,
    useReactiveVar,
} from "@apollo/client";
import { AuthOptions, createAuthLink } from "aws-appsync-auth-link";
import { AUTH_TYPE } from "aws-appsync";
import { Auth } from "aws-amplify";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import { userAuthenticated } from "../../../global_state/AuthState";
import { useMemo } from "react";
import { cache } from "../../../global_state/Cache";
// @ts-ignore
import { API_ENDPOINT } from "react-native-dotenv";

const url = API_ENDPOINT;
const region = "us-east-2";
const auth: AuthOptions = {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => {
        try {
            const session = await Auth.currentSession();

            return session.getIdToken().getJwtToken();
        } catch (e) {
            return "";
        }
    },
};

const authLink = ApolloLink.from([
    createAuthLink({ url, region, auth }),
    createSubscriptionHandshakeLink({ url, region, auth }),
]);

const noAuth: AuthOptions = {
    type: AUTH_TYPE.AWS_IAM,
    credentials: () => Auth.currentCredentials(),
};

const httpLink = createHttpLink({ uri: url });

const unAuthLink = ApolloLink.from([
    createAuthLink({ url, region, auth: noAuth }),
    httpLink,
]);

export function useApollo(): ApolloClient<NormalizedCacheObject> {
    const authenticated = useReactiveVar(userAuthenticated);

    return useMemo<ApolloClient<NormalizedCacheObject>>(() => {
        if (authenticated) {
            return new ApolloClient({
                link: authLink,
                cache,
            });
        } else {
            return new ApolloClient({
                link: unAuthLink,
                cache,
            });
        }
    }, [authenticated]);
}
