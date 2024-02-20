import { Toastify } from "../toastify/Toastify";
import api from "../utility/api";
import { formatdatetime } from '../utility/formatdate';

function campaignService() {
    const handleUnauthorized = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userName");
        window.location.href = "/";
    };

    const campaigns = {
        async getCampaignData(page, searchTerm, startDate, budgetSort) {
            try {
                const queryParams = new URLSearchParams({
                    page: page + 1,
                    name: searchTerm,
                    datetime: startDate ? formatdatetime(startDate) : '',
                    sort: budgetSort
                });
                const response = await api.get(`/campaigns?${queryParams}`);
                if (response.status === 200) {
                    return {
                        data: response.data.data,
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

    return {
        campaigns,
    };
}

export default campaignService;
