import { Toastify } from "../toastify/Toastify";
import api from "../utility/api";

function userDashboardService() {
    const handleUnauthorized = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userName");
        window.location.href = "/";
    };

    const extractStatisticsData = (response) => {
        const { ads, group, campaign, ads_paused, platform_ads, statistic_ads } = response.data;

        const total = {
            ads: {
                totalAds: ads.total_advertisement,
                adsDiff: ads.total_advertisement_now,
            },
            groups: {
                totalGroups: group.total_group,
                groupsDiff: group.total_group_now,
            },
            campaigns: {
                totalCampaigns: campaign.total_campaign,
                campaignsDiff: campaign.total_campaign_now,
            },
            adsPaused: {
                totalAdsPaused: ads_paused.total_ads_paused,
                adsPausedDiff: ads_paused.total_ads_paused_now,
            },
        };

        const plasformXlables = platform_ads.count.map(item => item.platform_name);
        const adsThisMonth = platform_ads.count.map(item => item.advertisement_details_count);
        const adsLastMonth = platform_ads.count_last_month.map(item => item.advertisement_details_count);
        const activeAds = statistic_ads.map(item => item.ads_active_month);
        const pausedAds = statistic_ads.map(item => item.ads_paused_month);

        const dataTotalAds = [
            { label: "Active", data: activeAds },
            { label: "Paused", data: pausedAds },
        ];

        const dataPlatforms = [
            { label: "This Month", data: adsThisMonth },
            { label: "Last Month", data: adsLastMonth },
        ];

        return {
            total,
            plasformXlables,
            dataPlatforms,
            dataTotalAds,
        };
    };

    const statistics = async () => {
        try {
            const response = await api.get("/statistics");
            if (response.status === 200) {
                return extractStatisticsData(response);
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
    };

    return {
        statistics,
    };
}

export default userDashboardService;
