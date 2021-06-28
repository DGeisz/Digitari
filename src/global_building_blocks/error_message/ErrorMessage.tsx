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
                <Text style={styles.errorFailText}>
                    Well, shoot. Something went wrong.
                </Text>
                <Text style={styles.errorFailText}>
                    Check your connection and see if that helps!
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
