import React, { useContext, useEffect, useState } from "react";
import { AppState, Linking, Text, TouchableOpacity, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import LoadingWheel from "../../../../../../../../global_building_blocks/loading_wheel/LoadingWheel";
import { ScanNavProp } from "../../SearchAndScanNavTypes";
import { styles } from "./ScanStyles";
import { DOUBLE_NEWLINE } from "../../../../../../../../global_utils/StringUtils";
import {
    Digicode,
    DigicodeType,
} from "../../../../../../../../global_types/DigicodeTypes";
import { TabNavContext } from "../../../../TabNavContext";

interface Props {
    navigation: ScanNavProp;
}

const Scan: React.FC<Props> = (props) => {
    const { openUser, openCommunity } = useContext(TabNavContext);

    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const [lastData, setLastData] = useState<string>("");

    const requestPermission = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setLastData("");

        if (status === "granted") {
            setHasPermission(true);
        } else {
            setHasPermission(false);
        }

        setLoading(false);
    };

    useEffect(() => {
        (async () => {
            await requestPermission();
        })();
    }, []);

    useEffect(() => {
        const unSub = props.navigation.addListener("focus", requestPermission);
        AppState.addEventListener("change", requestPermission);

        return () => {
            unSub();
            AppState.removeEventListener("change", requestPermission);
        };
    }, []);

    if (loading) {
        return <LoadingWheel />;
    }

    if (hasPermission) {
        return (
            <View style={styles.scannerContainer}>
                <View style={styles.scannerFrame}>
                    <BarCodeScanner
                        style={styles.scanner}
                        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                        onBarCodeScanned={({ data }) => {
                            if (data !== lastData) {
                                console.log(data);
                                try {
                                    const raw = JSON.parse(data);

                                    if (
                                        typeof raw === "object" &&
                                        typeof raw.type !== "undefined" &&
                                        typeof raw.id === "string"
                                    ) {
                                        const digicode = raw as Digicode;

                                        switch (digicode.type) {
                                            case DigicodeType.User:
                                                openUser(digicode.id);
                                                break;
                                            case DigicodeType.Community:
                                                openCommunity(digicode.id);
                                                break;
                                        }
                                    }
                                } catch (e) {
                                    if (__DEV__) {
                                        console.log("Scan error:", e);
                                    }
                                }

                                setLastData(data);
                            }
                        }}
                    />
                </View>
                <Text style={styles.scannerText}>
                    Wanna skip a search? Scan your friend's digicode to open
                    their profile. {DOUBLE_NEWLINE}
                    Just tap a user or community's name on their profile to
                    access their digicode.
                </Text>
            </View>
        );
    } else {
        return (
            <View style={styles.promptContainer}>
                <Text style={styles.promptText}>
                    We need your permission to access your camera so that you
                    can scan your friends digicodes
                </Text>
                <TouchableOpacity
                    style={styles.promptButton}
                    onPress={async () => {
                        await Linking.openURL("app-settings:");
                    }}
                >
                    <Text style={styles.promptButtonText}>Open settings</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

export default Scan;
