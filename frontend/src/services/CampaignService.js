import { Toastify } from "../toastify/Toastify";
import api from "../utility/api";

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
                    datetime: startDate ? formatDate(startDate) : '',
                    sort: budgetSort
                });
                const response = await api.get(`/campaigns?${queryParams}`);
                if (response.status === 200) {
                    return {
                        data: response.data.data,
                        total_pages: response.data.last_page,
                        total : response.data.total
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
                    total : 0
                };
            }
        }
    };

    const formatDate = (date) => {
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      };

    return {
        campaigns,
    };
}

export default campaignService;
