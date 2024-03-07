import { useNavigate } from "react-router-dom";

import { Toastify } from "../toastify/Toastify";
import api from "../utility/api";
import { formatDateCustom } from "../utility/formatdate";
import { extractStatus } from "../utility/extractStatus.js";

function AdsDashboardService() {
    const navigate = useNavigate();

    const extractTopAdsData = (data) => {
        const topAds = data.ads.map((item) => {
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
            topAds: topAds,
            totalAdsByPlatforms: totals,
        }
    };

    const extractAllAdsData = (data) => {
        const res = data.ads.map((item) => {
            return {
                id: item.id,
                name: item.ad_name,
                content: item.ad_content,
                created_at: formatDateCustom(item.created_at),
                updated_at: formatDateCustom(item.updated_at),
                kpi: item.kpi,
                status: (item.status === 0) ? "Active" : "Paused",
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

    const getAllAds = async (page, per_page, sort, filter) => {
        try {
            const params = {
                page,
                per_page,
                sortBy: sort.sort || 'id',
                order: sort.direction || 'asc',
                searchBy: filter.search.key || 'name',
                search: filter.search.value || '',
                date: filter.date || '',
                status: filter.status || '',
            };

            const response = await api.get("/ads", {
                params,
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

    const extractAdsDetailsData = (data) => {
        const adsDetails = {
            name: data.ad_name,
            content: data.ad_content,
            kpi: data.kpi,
            type: data.advertisement_type.ad_type_name,
            destinationUrl: data.destination_url,
            status: extractStatus(data.status),
            createdAt: formatDateCustom(data.created_at),
            updatedAt: formatDateCustom(data.updated_at),
            group: data.group.adgroup_name,
            campaign: data.group.campaign.campaign_name,
        };

        const platforms = data.advertisement_details.map((item) => {
            return {
                platform: item.platform.platform_name,
                impressions: item.impressions,
                click: item.clicks,
                ctr: item.ctr,
                cpc: item.cpc,
                cpa: item.cpa,
                conversions: item.conversions,
                conversionRate: item.conversion_rate,
            };
        });

        return {
            adsDetails: adsDetails,
            platforms,
        };
    }

    const getAdsDetails = async (id) => {
        try {
            const response = await api.get(`/ads/${id}`);
            if (response.status === 200) {
                return extractAdsDetailsData(response.data.ads);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/");
            }

            if (error.response) {
                Toastify.error(error.response.data.message);
            }
        }
    }

    const updateKpiAds = async (id, kpi) => {
        try {
            const response = await api.patch(`/ads/${id}`, {
                kpi,
            });

            if (response.status === 200) {
                Toastify.success("KPI updated successfully");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/");
            }

            if (error.response) {
                Toastify.error(error.response.data.message);
            }
        }
    }

    return {
        getTopAds,
        getAllAds,
        getAdsDetails,
        updateKpiAds,
    };
}

export default AdsDashboardService;
