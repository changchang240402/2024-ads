import { useNavigate } from "react-router-dom";
import { Toastify } from "../toastify/Toastify";
import api from "../utility/api";

function AuthService() {
    const navigate = useNavigate();
    const login = async (email, password) => {
        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });
            if (response.status === 200) {

                Toastify.success("Login Successful");

                localStorage.setItem("accessToken", response.data.access_token);
                localStorage.setItem("refreshToken", response.data.refresh_token);
                localStorage.setItem("userName", response.data.user.name);

                const role = response.data.user.role;
                role && navigate(`/${role === "admin" ? "admin" : "dashboard"}`);
            }
        } catch (error) {
            if (error.response) {
                Toastify.error(error.response.data.message);
            }
        }
    };

    const logout = async () => {
        try {
            const response = await api.post("/auth/logout");
            if (response.status === 200) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("userName");
                navigate("/");
            }
        } catch (error) {
            if (error.response) {
                Toastify.error(error.response.data.message);
            }
        }
    }

    const getUserProfile = async () => {
        try {
            const response = await api.get("/auth/me");
            if (response.status === 200) {
                return response.data.user;
            }
        } catch (error) {
            if (error.response) {
                Toastify.error(error.response.data.message);
            }
        }
    }

    return {
        login,
        logout,
        getUserProfile
    };
}

export default AuthService;
