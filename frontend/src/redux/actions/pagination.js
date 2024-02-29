import { FETCH_ADS_SUCCESS } from "../../const/config";

export const fetchAdsSuccess = (ads, pagination) => {
    return {
        type: FETCH_ADS_SUCCESS,
        payload: {
            ads,
            pagination,
        }
    };
};
