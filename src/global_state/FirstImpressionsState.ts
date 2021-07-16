import { makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";

/*
 * State for first time opening app
 */
export const firstTimeOpeningApp = makeVar<boolean>(true);

const FIRST_OPEN_KEY = "FIRST_OPEN_KEY";

AsyncStorage.getItem(FIRST_OPEN_KEY).then((raw) => {
    if (!!raw) {
        // firstTimeOpeningApp(JSON.parse(raw));
    }
});

export function openedAppFirstTime() {
    firstTimeOpeningApp(false);
    AsyncStorage.setItem(FIRST_OPEN_KEY, JSON.stringify(false)).then();
}

// DEV fn
export function removeAppFirstTime() {
    AsyncStorage.removeItem(FIRST_SHOP_KEY).then();
}

/*
 * State for first time viewing profile
 */
export const firstProfile = makeVar<boolean>(true);

const FIRST_PROFILE_KEY = "FIRST_PROFILE_KEY";

AsyncStorage.getItem(FIRST_PROFILE_KEY).then((raw) => {
    if (!!raw) {
        // firstProfile(JSON.parse(raw));
    }
});

export function openedFirstProfile() {
    firstProfile(false);
    AsyncStorage.setItem(FIRST_PROFILE_KEY, JSON.stringify(false)).then();
}

// DEV fn
export function removeFirstProfile() {
    AsyncStorage.removeItem(FIRST_PROFILE_KEY).then();
}

/*
 * State for first time in shop
 */
export const firstShop = makeVar<boolean>(true);

const FIRST_SHOP_KEY = "FIRST_SHOP_KEY";

AsyncStorage.getItem(FIRST_SHOP_KEY).then((raw) => {
    if (!!raw) {
        // firstShop(JSON.parse(raw));
    }
});

export function openedFirstShop() {
    firstShop(false);
    AsyncStorage.setItem(FIRST_SHOP_KEY, JSON.stringify(false)).then();
}

// DEV fn
export function removeFirstShop() {
    AsyncStorage.removeItem(FIRST_SHOP_KEY).then();
}

/*
 * State for first time in wallet
 */
export const firstWallet = makeVar<boolean>(true);

const FIRST_WALLET_KEY = "FIRST_WALLET_KEY";

AsyncStorage.getItem(FIRST_WALLET_KEY).then((raw) => {
    if (!!raw) {
        // firstWallet(JSON.parse(raw));
    }
});

export function openedFirstWallet() {
    firstWallet(false);
    AsyncStorage.setItem(FIRST_WALLET_KEY, JSON.stringify(false)).then();
}

// DEV fn
export function removeFirstWallet() {
    AsyncStorage.removeItem(FIRST_WALLET_KEY).then();
}
