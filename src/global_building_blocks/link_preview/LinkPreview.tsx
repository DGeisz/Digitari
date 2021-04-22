import React from "react";
import { Image, Text, TouchableOpacity, View, Linking } from "react-native";
import { getLinkPreview } from "link-preview-js";
import { LinkInfo } from "../../global_types/LinkTypes";
import { styles } from "./LinkPreviewStyles";

interface Props {
    url: string;
}

interface State {
    fetched: boolean;
    title?: string;
    siteName?: string;
    image?: string;
}

export default class LinkPreview extends React.PureComponent<Props, State> {
    state = {
        fetched: false,
        title: undefined,
        siteName: undefined,
        image: undefined,
    };

    componentDidMount() {
        getLinkPreview(this.props.url)
            .then((raw) => {
                const data = raw as LinkInfo;

                console.log(data);

                this.setState({
                    fetched: true,
                    title: data.title,
                    siteName: data.siteName,
                    image:
                        !!data.images && !!data.images.length
                            ? data.images[0]
                            : undefined,
                });
            })
            .catch((_) => {
                this.setState({
                    fetched: true,
                });
            });
    }

    render() {
        console.log(this.state);

        return (
            <TouchableOpacity
                style={styles.linkPreviewContainer}
                activeOpacity={0.5}
                onPress={() => {
                    Linking.openURL(this.props.url);
                }}
            >
                {!!this.state.image && (
                    <Image
                        style={styles.linkPreviewImage}
                        source={{ uri: this.state.image }}
                    />
                )}
                <View style={styles.previewFooter}>
                    <Text style={styles.footerText} numberOfLines={1}>
                        {!this.state.image
                            ? this.props.url
                            : !!this.state.title
                            ? this.state.title
                            : !!this.state.siteName
                            ? this.state.siteName
                            : this.props.url}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}
