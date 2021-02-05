import { GET_WALLET } from "./Queries";
import { exampleWallet } from "../../../../../../global_types/WalletTypes";
import { walletEntryExample } from "../../../../../../global_types/WalletEntryTypes";

let entries = [];
for (let i = 0; i < 20; i++) {
    entries.push(walletEntryExample);
}

const mock: any = {
    request: {
        query: GET_WALLET,
        variables: {
            id: "stacksonstacks",
        },
    },
    result: {
        data: {
            getWallet: Object.assign({}, exampleWallet, { entries: entries }),
        },
    },
};

let mocks = [];

for (let i = 0; i < 10; i++) {
    mocks.push(mock);
}

export const walletMocks: any[] = mocks;
