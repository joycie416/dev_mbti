import axios from "axios";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

export const register = async (userData) => {
  try {
    // id, password, nickname
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // message, success
  } catch (error) {
    return error;
  }
};

export const login = async (userData) => {
  try {
    // id, password
    const response = await axios.post(`${API_URL}/login`, userData);
    console.log(response);
    return response.data; // accessToken, userId, success, avatar, nickname
  } catch (error) {
    return error;
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user`, `Bearer ${token}`);
    return response.data; // id, nickname, avatar, success
  } catch (error) {
    return error;
  }
};

export const updateProfile = async (formData) => {
  try {
    // avatar, nickname
    const response = await axios.patch(`${API_URL}/profile`, `Bearer ${token}`);
    return response.data; // avatar, nickname, message, success
  } catch (error) {
    return error;
  }
};
