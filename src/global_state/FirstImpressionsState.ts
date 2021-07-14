import { makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";

/*
 * State for first time opening app
 */
export const firstTimeOpeningApp = makeVar<boolean>(true);

const FIRST_OPEN_KEY = "FIRST_OPEN_KEY";

AsyncStorage.getItem(FIRST_OPEN_KEY).then((raw) => {
    if (!!raw) {
        const opened = JSON.parse(raw);
        firstTimeOpeningApp(opened);
    }
});

export function openedAppFirstTime() {
    firstTimeOpeningApp(false);
    AsyncStorage.setItem(FIRST_OPEN_KEY, JSON.stringify(false)).then();
}

/*
 * DEV Function
 */
export function removeAppFirstTime() {
    AsyncStorage.removeItem(FIRST_OPEN_KEY).then();
}

/*
 * State for first time viewing profile
 */
export const firstProfile = makeVar<boolean>(true);

const FIRST_PROFILE_KEY = "FIRST_PROFILE_KEY";

AsyncStorage.getItem(FIRST_PROFILE_KEY).then((raw) => {
    if (!!raw) {
        const viewed = JSON.parse(raw);
        firstProfile(viewed);
    }
});

export function openedFirstProfile() {
    firstProfile(false);
    AsyncStorage.setItem(FIRST_PROFILE_KEY, JSON.stringify(false)).then();
}
