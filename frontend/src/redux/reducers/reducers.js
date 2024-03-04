import { combineReducers } from 'redux';
import { FETCH_ADS_SUCCESS, USER_SORT_LABEL } from '../../const/config';

const adsReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_ADS_SUCCESS:
            return action.payload.ads;
        default:
            return state;
    }
};

const paginationReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_ADS_SUCCESS:
            return action.payload.pagination;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    ads: adsReducer,
    pagination: paginationReducer,
});

export default rootReducer;
