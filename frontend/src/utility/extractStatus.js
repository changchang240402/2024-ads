import { ADS_STATUS } from "../const/config";

export const extractStatus = (status) => {
    switch (status) {
        case 0:
            return ADS_STATUS[0];
        case 1:
            return ADS_STATUS[1];
        default:
            return ADS_STATUS[0];
    }
};
