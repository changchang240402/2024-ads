import { Toastify } from "../toastify/Toastify";
import api from "../utility/api";
import { formatDate } from '../utility/formatdate';
import { handleUnauthorized } from "./userDashboardService";

function groupService() {
    const groups = {
        async getGroupData(page, search, bidding, status, totalSort) {
            try {
                const queryParams = new URLSearchParams({
                    page: page + 1,
                    name: search,
                    biddingStrategy: bidding,
                    status: status,
                    sort: totalSort
                });
                const response = await api.get(`/groups?${queryParams}`);
                if (response.status === 200) {
                    return {
                        groups: response.data.data,
                        total_pages: response.data.last_page,
                        total: response.data.total
                    };
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        handleUnauthorized();
                    }
                    Toastify.error(error.response.data.message);
                } else {
                    Toastify.error("An unexpected error occurred.");
                }

                return {
                    data: [],
                    total_pages: 0,
                    total: 0
                };
            }
        }
    };

    const groupDetail = {
        async getGroupData(id, currentPage) {
            try {
                const queryPage = new URLSearchParams({
                    page: currentPage + 1
            });
                const response = await api.get(`/groups/${id}?${queryPage}`);
                if (response.status === 200) {
                    return {
                        group: response.data.group,
                        total_ads: response.data.ads.total,
                        ads: response.data.ads.data,
                        total_pages: response.data.ads.last_page,
                    };
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        handleUnauthorized();
                    }
                    Toastify.error(error.response.data.message);
                } else {
                    Toastify.error("An unexpected error occurred.");
                }
            }
        }
    };

    return {
        groups,
        groupDetail
    };
}

export default groupService;