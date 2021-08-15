import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

/**
 * Function takes incoming react navigation route,
 * and returns the proper name for that route to
 * render.
 *
 * This is used to display the proper name of the
 * screen in the higher-order react navigation stack
 */
export function getTabNavHeaderTitle(route: any): string {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "MainFeed";
    switch (routeName) {
        case "MainFeed":
            return "Home";
        case "Search":
            return "Search & Scan";
        default:
            return routeName;
    }
}
