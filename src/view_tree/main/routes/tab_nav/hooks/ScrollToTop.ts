import React from "react";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

export function useScrollToTopOnPress(
    scrollIndex: number,
    navigation: any,
    listRef: React.RefObject<FlatList>
) {
    const [inFocus, setInFocus] = useState<boolean>(false);

    useEffect(() => {
        const unSubFocus = navigation.addListener("focus", () => {
            setInFocus(true);
        });

        const unSubBlur = navigation.addListener("blur", () => {
            setInFocus(false);
        });

        return () => {
            unSubFocus();
            unSubBlur();
        };
    }, []);

    useEffect(() => {
        if (inFocus) {
            !!listRef.current &&
                listRef.current.scrollToOffset({ animated: true, offset: 0 });
        }
    }, [scrollIndex]);
}
