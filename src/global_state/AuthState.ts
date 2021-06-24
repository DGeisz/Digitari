import { makeVar } from "@apollo/client";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorage from "@react-native-community/async-storage";

export const userAuthenticated = makeVar<boolean>(true);

const INVITE_KEY = "INVITE_KEY";

export const inviteCode = makeVar<string>("");

AsyncStorage.getItem(INVITE_KEY).then((raw) => {
    if (raw) {
        const code = JSON.parse(raw);
        inviteCode(code);
    }
});

export function setInviteCode(code: string) {
    inviteCode(code);
    AsyncStorage.setItem(INVITE_KEY, JSON.stringify(code)).then();
}
