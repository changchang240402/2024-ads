import { CLOSE_EDIT_POPUP, CLOSE_VIEW_POPUP, OPEN_EDIT_POPUP, OPEN_VIEW_POPUP } from "../../const/config";

export const openViewPopup = () => ({
    type: OPEN_VIEW_POPUP,
});

export const closeViewPopup = () => ({
    type: CLOSE_VIEW_POPUP,
});

export const openEditPopup = () => ({
    type: OPEN_EDIT_POPUP,
});

export const closeEditPopup = () => ({
    type: CLOSE_EDIT_POPUP,
});
