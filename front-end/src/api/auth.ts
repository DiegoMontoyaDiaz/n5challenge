import axios from "axios";
import { LOGIN_URL } from "../constants";


function login(name: string) {
    return axios.post(`${LOGIN_URL}/api-login/v1/userAuthentication`, { name })
        .then(response => response.data as { token: string });
}

export const AuthAPI = {
    login
};
