import { gql } from "@apollo/client";

export const UPDATE_BIO = gql`
    mutation UpdateBio($bio: String) {
        updateBio(bio: $bio) {
            id
            bio
        }
    }
`;

export interface UpdateBioData {
    updateBio: {
        bio: string;
    };
}

export interface UpdateBioVariables {
    bio: string;
}

export const UPDATE_PROFILE_PIC = gql`
    mutation UpdateProfilePic($imgName: String) {
        updateProfilePic(imgName: $imgName) {
            url
            presignedUrl
        }
    }
`;

export interface UpdateProfilePicData {
    updateProfilePic: {
        url: string;
        presignedUrl: string;
    };
}

export interface UpdateProfilePicVariables {
    imgName: string;
}
