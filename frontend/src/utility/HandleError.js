import { Toastify } from "../toastify/Toastify";

function HandleError(error, navigate) {
    if (error.response && error.response.status === 401) {
        navigate("/");
    }

    if (error.response) {
        Toastify.error(error.response.data.message);
    }
}

export default HandleError;
