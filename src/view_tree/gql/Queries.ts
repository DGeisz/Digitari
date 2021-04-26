import { gql } from "@apollo/client";

export const HID = gql`
    query Hid {
        hid
    }
`;

export interface HidData {
    hid: string;
}
