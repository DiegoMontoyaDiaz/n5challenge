import axios, { AxiosInstance } from "axios";
import { BACKEND_URL } from "../constants";
import { AuthAPI } from "./auth";

const STATUS_CODE_FOR_REFRESH_LOGIN = [401, 403];
const ERROR_NETWORK = "ERR_NETWORK";

function successRequestGenerator(getToken: () => string) {
    return (config: any) => {
        const token = getToken();
        if (token && config.headers) {
            config.headers["Authorization"] = token;
        }
        return config;
    }
}

function errorResponseGenerator(instance: AxiosInstance) {
    return async (error: any) => {
        const originalConfig = error.config;

        if ((error?.code === ERROR_NETWORK
            || STATUS_CODE_FOR_REFRESH_LOGIN.find(code => code === error?.response?.status) != null)
            && !originalConfig._retry) {
            originalConfig._retry = true;
            originalConfig.headers = {
                "Content-type": "application/json"
            };

            try {
                const user = window.localStorage.getItem("user")!!;
                const loginResponse = await AuthAPI.login(user);
                window.localStorage.setItem("token", loginResponse.token);

                return instance(originalConfig);
            }
            catch (exc) {
                return Promise.reject(exc);
            }
        }
        return Promise.reject(error);
    }
}


function getAuthorization() {
    const auth = window.localStorage.getItem("token");
    return auth ?? "";
}

const baseAxios = axios.create({ baseURL: BACKEND_URL });

baseAxios.interceptors.request.use(
    successRequestGenerator(getAuthorization),
    reject => Promise.reject(reject)
);

baseAxios.interceptors.response.use(
    (response) => response,
    errorResponseGenerator(baseAxios)
);


export default baseAxios;
