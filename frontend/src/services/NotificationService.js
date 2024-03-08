import api from "../utility/api";
import { formatDateToTime } from "../utility/formatdate";
import HandleError from "../utility/HandleError";
import { useNavigate } from "react-router-dom";

function NotificaitonService() {
    const navigate = useNavigate();

    const extractNotifiCationsData = (data) => {
        const notifications = data.notifications.map((item) => {
            return {
                id: item.id,
                title: item.title,
                time: formatDateToTime(item.created_at),
                content: item.content,
                isRead: item.isRead,
                adId: item.advertisement_detail.ad_id,
            };
        });

        return {
            notifications: notifications,
            pagination: data.pagination,
        }
    };

    const getNotifications = async () => {
        try {
            const response = await api.get("/noti");
            if (response.status === 200) {
                return extractNotifiCationsData(response.data);
            }
        } catch (error) {
            HandleError(error, navigate);
        }
    };

    return {
        getNotifications,
    };
}

export default NotificaitonService;
