export const AppBaseUrl = import.meta.env.REACT_APP_API ?? 'http://localhost:8000/api';
export const FETCH_ADS_SUCCESS = 'FETCH_ADS_SUCCESS';
export const ADS_PER_PAGE = 5;
export const START_PAGE = 1;
export const ADS_STATUS = ['Active', 'Paused'];
export const HUMAN_OBJECT = ['Male','Female','Everyone'];
export const USER_PER_PAGE = [5, 7];
export const PER_PAGE = [10, 15, 20];
export const DEFAULT_USER_PER_PAGE = 5;
export const DEFAULT_ADS_PER_PAGE = 15;
export const USER_SORT_LABEL = 'USER_SORT_LABEL';
export const USER_STATUS = {
    active: 'active',
    banned: 'banned'
};
