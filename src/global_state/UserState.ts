import { makeVar } from "@apollo/client";

const MOCK = true;

const initialUid = MOCK ? "danny" : "";

export const localUid = makeVar<string>(initialUid);

const initialSuid = MOCK ? "sanny" : "";

export const localSuid = makeVar<string>(initialSuid);
