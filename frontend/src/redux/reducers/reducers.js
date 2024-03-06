import { combineReducers } from 'redux';
import { CLOSE_EDIT_POPUP, CLOSE_VIEW_POPUP, FETCH_ADS_SUCCESS, OPEN_EDIT_POPUP, OPEN_VIEW_POPUP } from '../../const/config';

const initialState = {
    isShowViewPopup: false,
    isShowEditPopup: false,
};

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

const popupReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_VIEW_POPUP:
            return {
                ...state,
                isShowViewPopup: true,
            };
        case CLOSE_VIEW_POPUP:
            return {
                ...state,
                isShowViewPopup: false,
            };
        case OPEN_EDIT_POPUP:
            return {
                ...state,
                isShowEditPopup: true,
            };
        case CLOSE_EDIT_POPUP:
            return {
                ...state,
                isShowEditPopup: false,
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    ads: adsReducer,
    pagination: paginationReducer,
    popup: popupReducer,
});

export default rootReducer;
