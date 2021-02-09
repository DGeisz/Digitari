import * as React from "react";
import { Image } from "react-native";

interface Props {
    tier: number;
    coinSize: number;
}

export default class ChallengeTier extends React.PureComponent<Props> {
    render() {
        switch (this.props.tier) {
            case 0:
                return (
                    <Image
                        source={require("../../../../assets/poop_coin.png")}
                        style={{
                            height: this.props.coinSize,
                            width: this.props.coinSize,
                        }}
                    />
                );
            case 1:
                return (
                    <Image
                        source={require("../../../../assets/bronze_coin.png")}
                        style={{
                            height: this.props.coinSize,
                            width: this.props.coinSize,
                        }}
                    />
                );
            case 2:
                return (
                    <Image
                        source={require("../../../../assets/silver_coin.png")}
                        style={{
                            height: this.props.coinSize,
                            width: this.props.coinSize,
                        }}
                    />
                );
            case 3:
                return (
                    <Image
                        source={require("../../../../assets/gold_coin.png")}
                        style={{
                            height: this.props.coinSize,
                            width: this.props.coinSize,
                        }}
                    />
                );
            case 4:
                console.log("teer");
                return (
                    <Image
                        source={require("../../../../assets/master_coin.png")}
                        style={{
                            height: this.props.coinSize,
                            width: this.props.coinSize,
                        }}
                    />
                );
            default:
                return (
                    <Image
                        source={require("../../../../assets/master_coin.png")}
                        style={{
                            height: this.props.coinSize,
                            width: this.props.coinSize,
                        }}
                    />
                );
        }
    }
}
