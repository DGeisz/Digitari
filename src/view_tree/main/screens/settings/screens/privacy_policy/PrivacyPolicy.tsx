import React from "react";
import WebView from "react-native-webview";
import { policy } from "./source/policy";

const PrivacyPolicy: React.FC = () => {
    return <WebView source={{ html: policy }} originWhitelist={["*"]} />;
};

export default PrivacyPolicy;
