// import { gWalletEntryExample } from "../../../../../../../global_types/WalletEntryTypes";
// import { GET_WALLET_TYPE } from "./Queries";
// import { gExampleWallet } from "../../../../../../../global_types/WalletTypes";
//
// let entries = [];
// for (let i = 0; i < 20; i++) {
//     entries.push(gWalletEntryExample);
// }
//
// const mock: any = {
//     request: {
//         query: GET_WALLET_TYPE,
//         variables: {
//             id: "stacksonstacks",
//         },
//     },
//     result: {
//         data: {
//             wallet: Object.assign({}, gExampleWallet, { entries: entries }),
//         },
//     },
// };
//
// let mocks = [];
//
// for (let i = 0; i < 10; i++) {
//     mocks.push(mock);
// }
//
// export const walletMocks: any[] = mocks;
