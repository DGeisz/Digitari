import * as React from "react";
import MainEntry from "./main/MainEntry";
import AuthEntry from "./auth/AuthEntry";
import * as SplashScreen from "expo-splash-screen";
import { Auth, Hub } from "aws-amplify";
import { HubCapsule } from "aws-amplify-react-native/types";

const AppView: React.FC = () => {
    const [authenticated, setAuthenticated] = React.useState<boolean>(false);

    React.useEffect(() => {
        Hub.listen("auth", async ({ payload: { event } }: HubCapsule) => {
            console.log("Amplify Hub event:", event);

            try {
                await Auth.currentSession();
                setAuthenticated(true);
            } catch (_) {
                setAuthenticated(false);
            }
        });

        (async () => {
            try {
                await Auth.currentSession();
                setAuthenticated(true);
            } catch (_) {
                setAuthenticated(false);
            }
            await SplashScreen.hideAsync();
        })();
    }, []);

    if (authenticated) {
        return <MainEntry />;
    } else {
        return <AuthEntry />;
    }
};

export default AppView;
