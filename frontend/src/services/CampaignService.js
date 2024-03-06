import { Toastify } from "../toastify/Toastify";
import api from "../utility/api";
import { formatDate } from '../utility/formatdate';
import * as yup from "yup";
import { HUMAN_OBJECT } from '../const/config';
import { handleUnauthorized } from "./userDashboardService";

function campaignService() {
    const schema = yup.object({
        campaign_name: yup.string()
            .required('Campaign name is a required field')
            .max(100, 'Campaign name must be at most 100 characters'),
        campaign_goal: yup.string().
            required('Campaign goal is a required field').
            max(255, 'Campaign goal must be at most 255 characters'),
        budget: yup.number()
            .typeError('Budget must be a number')
            .required()
            .min(0)
            .max(99999999.99),
        start_date: yup.date()
            .typeError('Start date must be a date')
            .required('Start date is required'),
        end_date: yup.date()
            .typeError('End date must be a date')
            .required('End date is required')
            .min(yup.ref('start_date'), 'End date must be after start date'),
        ad_message: yup.string()
            .required('Ad message is a required field')
            .max(255, 'Ad message must be at most 255 characters'),
        human: yup.string()
            .required()
            .oneOf(HUMAN_OBJECT, 'Target object is required'),
        start_age: yup.number()
            .typeError('Start age must be a number')
            .required('Start age is required')
            .integer('Start age must be an integer')
            .min(3, 'Start age must be greater than or equal to 3')
            .max(100, 'Start age must be less than or equal to 100'),
        end_age: yup.number()
            .typeError('End age age must be a number')
            .required('End age is required')
            .integer('End age must be an integer')
            .min(3, 'End age must be greater than or equal to 3')
            .max(100, 'End age must be less than or equal to 100')
            .moreThan(yup.ref('start_age'), 'End age must be greater than start age'),
        activities: yup.string()
            .required('Activities is a required field')
            .max(100, 'Activities must be at most 100 characters'),
        distribution_strategy: yup.string()
            .required('Distribution strategy is a required field')
            .max(255, 'Distribution strategy must be at most 255 characters'),
    })
    const createCampaign = async (
        campaign_name, campaign_goal, budget, start_date, end_date, ad_message, human, start_age, end_age, activities, distribution_strategy
    ) => {
        try {
            const response = await api.post("/campaigns", {
                campaign_name,
                campaign_goal,
                budget,
                start_date,
                end_date,
                ad_message,
                human,
                start_age,
                end_age,
                activities,
                distribution_strategy
            });
            if (response.status === 200) {

                Toastify.success("Campaign Successful");
                // return response.data;
                setTimeout(() => {
                    window.location.reload();
                }, 1000);

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
    const editCampaign = async (
        id, campaign_name, campaign_goal, budget, start_date, end_date, ad_message, human, start_age, end_age, activities, distribution_strategy
    ) => {
        try {
            const response = await api.put(`/campaigns/${id}`, {
                campaign_name,
                campaign_goal,
                budget,
                start_date,
                end_date,
                ad_message,
                human,
                start_age,
                end_age,
                activities,
                distribution_strategy
            });
            if (response.status === 200) {

                Toastify.success("Edit Successful");
                // return response.data;
                setTimeout(() => {
                    window.location.reload();
                }, 1000);

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

    const campaigns = {
        async getCampaignData(page, search, startDate, budgetSort) {
            try {
                const queryParams = new URLSearchParams({
                    page: page + 1,
                    name: search,
                    datetime: startDate ? formatDate(startDate) : '',
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
    const campaignDetail = {
        async getCampaignData(id) {
            try {
                const response = await api.get(`/campaigns/${id}`);
                if (response.status === 200) {
                    return {
                        campaign: response.data.campaign,
                        total_group: response.data.total_group,
                        total_ads: response.data.total_ads,
                        ads: response.data.ads,
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
        campaigns,
        schema,
        createCampaign,
        editCampaign,
        campaignDetail,
    };
}

export default campaignService;
