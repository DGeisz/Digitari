import { makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";

/*User id*/
const UID_KEY = "UID_KEY";

export const localUid = makeVar<string>("");

AsyncStorage.getItem(UID_KEY).then((raw) => {
    if (raw) {
        const uid = JSON.parse(raw);
        localUid(uid);
    }
});

export function setLocalUid(uid: string): void {
    localUid(uid);
    AsyncStorage.setItem(UID_KEY, JSON.stringify(uid)).then();
}

/*User hidden id*/
const HID_KEY = "HID_KEY";

export const localHid = makeVar<string>("");

AsyncStorage.getItem(HID_KEY).then((raw) => {
    if (raw) {
        const uid = JSON.parse(raw);
        localHid(uid);
    }
});

export function setLocalHid(hid: string): void {
    localHid(hid);
    AsyncStorage.setItem(HID_KEY, JSON.stringify(hid)).then();
}

/*User first name*/
const NAME_KEY = "NAME_KEY";

export const localFirstName = makeVar<string>("");

AsyncStorage.getItem(NAME_KEY).then((raw) => {
    if (raw) {
        const name = JSON.parse(raw);
        localFirstName(name);
    }
});

export function setLocalFirstName(name: string): void {
    localFirstName(name);
    AsyncStorage.setItem(NAME_KEY, JSON.stringify(name)).then();
}

/*User last name*/
const LAST_NAME_KEY = "LAST_NAME_KEY";

export const localLastName = makeVar<string>("");

AsyncStorage.getItem(LAST_NAME_KEY).then((raw) => {
    if (raw) {
        const name = JSON.parse(raw);
        localLastName(name);
    }
});

export function setLocalLastName(name: string): void {
    localLastName(name);
    AsyncStorage.setItem(LAST_NAME_KEY, JSON.stringify(name)).then();
}
