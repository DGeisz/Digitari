import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./ErrorMessageStyles";

interface Props {
    refresh: () => void;
}

export default class ErrorMessage extends React.PureComponent<Props> {
    render() {
        return (
            <View style={styles.errorStateContainer}>
                <Text style={styles.errorFailText}>Connection failed!</Text>
                <Text style={styles.errorFailText}>
                    Please check your connection and try again
                </Text>
                <TouchableOpacity
                    style={{ marginTop: 15 }}
                    onPress={() => {
                        this.props.refresh && this.props.refresh();
                    }}
                >
                    <Text style={styles.errorRefreshText}>Refresh</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
