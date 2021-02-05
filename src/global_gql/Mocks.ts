import { feedMocks } from "../view_tree/routes/tab_nav/screens/main_feed/gql/Mocks";
import { walletMocks } from "../view_tree/routes/tab_nav/screens/wallet/gql/Mocks";
import { userPostMocks } from "../view_tree/routes/tab_nav/screens/profile/sub_screens/user_posts/gql/Mocks";

export const allMocks: any[] = [...feedMocks, ...walletMocks, ...userPostMocks];

console.log(allMocks.length);
