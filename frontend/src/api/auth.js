import api from "./axios";

export const login = async (email, password) => {
    const response =  await api.post("/login", {email, password});
    return response.data;
}

export const signup = async (email, password, username) => {
    const response =  await api.post("/signup", {email, password, username});
    return response.data;
}