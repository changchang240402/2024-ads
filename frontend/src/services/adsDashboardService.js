import { useNavigate } from "react-router-dom";

import { Toastify } from "../toastify/Toastify";
import api from "../utility/api";
import { formatDateCustom } from "../utility/formatdate";

function adsDashboardService() {
    const navigate = useNavigate();

    const extractTopAdsData = (data) => {
        const res = data.ads.map((item) => {
            return {
                name: item.ad_name,
                kpi: item.kpi,
                conversion_rate: item.conversion_rate,
            };
        });

        const labels = Object.keys(data.totalAdsByPlatforms);
        const values = Object.values(data.totalAdsByPlatforms);

        const totals = [];
        for (let i = 0; i < labels.length; i++) {
            totals.push({
                value: values[i],
                label: labels[i],
            });
        }

        return {
            topAds: res,
            totalAdsByPlatforms: totals,
        }
    };

    

    const extractAllAdsData = (data) => {
        const res = data.ads.map((item) => {
            return {
                name: item.ad_name,
                content: item.ad_content,
                type: item.advertisement_type.ad_type_name,
                created_at: formatDateCustom(item.created_at),
                updated_at: formatDateCustom(item.updated_at),
                kpi: item.kpi,
                status: (item.status == 1) ? "Active" : "Paused",
            };
        });

        return {
            ads: res,
            pagination: data.pagination,
        }
    }

    const getTopAds = async () => {
        try {
            const response = await api.get("/ads/top");
            if (response.status === 200) {
                const data = extractTopAdsData(response.data);
                return data;
            }
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/");
            }

            if (error.response) {
                Toastify.error(error.response.data.message);
            }
        }
    };

    const getAllAds = async (filter, date, status, page, per_page) => {
        try {
            const response = await api.get("/ads", {
                params: {
                    filter,
                    date,
                    status,
                    page,
                    per_page,
                },
            });

            if (response.status === 200) {
                const data = extractAllAdsData(response.data.ads);
                return data;
            }
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/");
            }

            if (error.response) {
                Toastify.error(error.response.data.message);
            }
        }
    };

    return {
        getTopAds,
        getAllAds
    };
}

export default adsDashboardService;
