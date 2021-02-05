import { feedMocks } from "../view_tree/routes/tab_nav/screens/main_feed/gql/Mocks";
import { walletMocks } from "../view_tree/routes/tab_nav/screens/wallet/gql/Mocks";

export const allMocks: any[] = [...feedMocks, ...walletMocks];

console.log(allMocks.length);
