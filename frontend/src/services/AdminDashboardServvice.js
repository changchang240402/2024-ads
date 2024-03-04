import { useNavigate } from "react-router-dom";

import { Toastify } from "../toastify/Toastify";
import api from "../utility/api";
import { formatDateCustom } from "../utility/formatdate";

function AdminDashboardServvice() {
    const navigate = useNavigate();

    const extractAllUsers = (data) => {
        const res = data.users.map((item) => {
            return {
                id: item.id,
                name: item.name,
                email: item.email,
                created_at: formatDateCustom(item.created_at),
                updated_at: formatDateCustom(item.updated_at),
                status: item.status,
            };
        });

        return {
            users: res,
            pagination: data.pagination,
            total: data.total,
        }
    }

    const updateUserStatus = async (id, status) => {
        try {
            const response = await api.put(`/admin/users/${id}`, {
                status: status,
            });

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/");
            }

            if (error.response) {
                Toastify.error(error.response.data.message);
            }
        }
    }

    const getAllUsers = async (page, per_page, sort, filter) => {
        try {
            if (filter.date || filter.status || filter.search.value) {
                page = 1;
            }
            
            const params = {
                page,
                per_page,
                sortBy: sort.sort || 'id',
                order: sort.direction || 'asc',
                searchBy: filter.search.key || 'name',
                search: filter.search.value || '',
                date: filter.date || '',
                status: filter.status || '',
            }

            const response = await api.get("/admin/users", {
                params: params
            });

            if (response.status === 200) {
                const data = extractAllUsers(response.data);
                return data;
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/");
            }

            if (error.response) {
                Toastify.error(error.response.data.message);
            }
        }
    };

    return {
        updateUserStatus,
        getAllUsers,
    };
}

export default AdminDashboardServvice;
