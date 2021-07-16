import { makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";

/*
 * State for first time opening app
 */
export const firstTimeOpeningApp = makeVar<boolean>(true);

const FIRST_OPEN_KEY = "FIRST_OPEN_KEY";

AsyncStorage.getItem(FIRST_OPEN_KEY).then((raw) => {
    if (!!raw) {
        firstTimeOpeningApp(JSON.parse(raw));
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
        firstProfile(JSON.parse(raw));
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

/*
 * State for first time in convos
 */
export const firstConvos = makeVar<boolean>(true);

const FIRST_CONVOS = "FIRST_CONVOS";

AsyncStorage.getItem(FIRST_CONVOS).then((raw) => {
    if (!!raw) {
        // firstConvos(JSON.parse(raw));
    }
});

export function openedFirstConvos() {
    firstConvos(false);
    AsyncStorage.setItem(FIRST_CONVOS, JSON.stringify(false)).then();
}

// DEV fn
export function removeFirstConvos() {
    AsyncStorage.removeItem(FIRST_CONVOS).then();
}

/*
 * State for first feed
 */
export const firstFeed = makeVar<boolean>(true);

const FIRST_FEED = "FIRST_FEED";

AsyncStorage.getItem(FIRST_FEED).then((raw) => {
    if (!!raw) {
        // firstFeed(JSON.parse(raw));
    }
});

export function openedFirstFeed() {
    firstFeed(false);
    AsyncStorage.setItem(FIRST_FEED, JSON.stringify(false)).then();
}

// Dev fn
export function removeFirstFeed() {
    AsyncStorage.removeItem(FIRST_FEED).then();
}

/*
 * State for first bolt
 */
export const firstBolt = makeVar<boolean>(true);

const FIRST_BOLT = "FIRST_BOLT";

AsyncStorage.getItem(FIRST_BOLT).then((raw) => {
    if (!!raw) {
        // firstBolt(JSON.parse(raw))
    }
});

export function tappedFirstBolt() {
    firstBolt(false);
    AsyncStorage.setItem(FIRST_BOLT, JSON.stringify(false)).then();
}

// Dev fn
export function removeFirstBolt() {
    AsyncStorage.removeItem(FIRST_BOLT).then();
}
