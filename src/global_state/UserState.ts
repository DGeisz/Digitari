import { makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const localSuid = makeVar<string>("");

export const NAME_KEY = "NAME_KEY";

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
