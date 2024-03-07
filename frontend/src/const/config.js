export const AppBaseUrl = import.meta.env.REACT_APP_API ?? 'http://localhost:8000/api';
export const FETCH_ADS_SUCCESS = 'FETCH_ADS_SUCCESS';
export const ADS_PER_PAGE = 5;
export const START_PAGE = 1;
export const ADS_STATUS = ['Active', 'Paused'];
export const HUMAN_OBJECT = ['Male', 'Female', 'Everyone'];
export const USER_PER_PAGE = [5, 7];
export const PER_PAGE = [10, 15, 20];
export const DEFAULT_USER_PER_PAGE = 5;
export const DEFAULT_ADS_PER_PAGE = 15;
export const USER_SORT_LABEL = 'USER_SORT_LABEL';
export const USER_STATUS = {
    active: 'active',
    banned: 'banned'
};
export const BIDDING_STRATEGY = ['CPA', 'CPC'];
export const SORT = {
    Ascending: 'asc',
    Decrease: 'desc'
};
export const OPEN_VIEW_POPUP = 'OPEN_VIEW_POPUP';
export const CLOSE_VIEW_POPUP = 'CLOSE_VIEW_POPUP';
export const OPEN_EDIT_POPUP = 'OPEN_EDIT_POPUP';
export const CLOSE_EDIT_POPUP = 'CLOSE_EDIT_POPUP';
export const SLACK_TEST_NOTI_URL = 'https://test-notiworld.slack.com/archives/C06N63GFZCZ';
export const ADS_ITEM_ACTION = {
    view: 'view',
    edit: 'edit',
}
