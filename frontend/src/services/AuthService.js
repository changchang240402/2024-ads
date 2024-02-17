import api from "../utility/api";
import { useNavigate } from "react-router-dom";
import { Toastify } from "../toastify/Toastify";

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
                localStorage.setItem("refresponsehToken", response.data.refresh_token);
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

    return {
        login,
    };
}

export default AuthService;
