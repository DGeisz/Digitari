import { feedMocks } from "../view_tree/routes/tab_nav/screens/main_feed/gql/Mocks";
import { walletMocks } from "../view_tree/routes/tab_nav/screens/wallet/gql/Mocks";
import { userPostMocks } from "../view_tree/routes/tab_nav/screens/profile/sub_screens/user_posts/gql/Mocks";
import { userConvosMocks } from "../view_tree/routes/tab_nav/screens/profile/sub_screens/user_convos/gql/Mocks";
import { newConvosMocks } from "../view_tree/routes/tab_nav/screens/convos/sub_screens/new_convos/gql/Mocks";
import { activeConvosMocks } from "../view_tree/routes/tab_nav/screens/convos/sub_screens/active_convos/gql/Mocks";
import { challengeMocks } from "../view_tree/routes/tab_nav/screens/profile/sub_screens/user_challenges/gql/Mocks";
import { postMocks } from "../view_tree/screens/post_screen/gql/Mocks";
import { convoMocks } from "../view_tree/screens/convo/gql/Mocks";

export const allMocks: any[] = [
    ...feedMocks,
    ...walletMocks,
    ...userPostMocks,
    ...userConvosMocks,
    ...newConvosMocks,
    ...activeConvosMocks,
    ...challengeMocks,
    ...postMocks,
    ...convoMocks,
];
