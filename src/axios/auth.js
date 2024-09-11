import axios from "axios";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

const api = axios.create({baseURL:API_URL});

export const register = async (userData) => {
  try {
    // id, password, nickname
    const response = await api.post(`/register`, userData);
    let res = {
      rescode: response.status,
      resdesc: response.statusText,
      data: response.data,
    };
    // console.log(res);
    return res; // message, success
  } catch (error) {
    // if (axios.isAxiosError(error)) {
    //   console.log("회원가입api : ", error);
    // }
    let res = {
      rescode: error.response.status,
      resdesc: error.response.statusText,
      data: error.response.data,
    };
    console.log(res);
    return res;
  }
};

export const login = async (userData) => {
  try {
    // id, password
    const response = await api.post(`/login`, userData);
    let res = {
      rescode: response.status,
      resdesc: response.statusText,
      data: response.data,
    };
    console.log(res);

    return res; // accessToken, userId, success, avatar, nickname
  } catch (error) {
    console.error(error);
    let res = {
      rescode: error.response.status,
      resdesc: error.response.statusText,
      data: error.response.data,
    };
    console.log(res);
    return res;
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await api.get(`/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let res = {
      rescode: response.status,
      resdesc: response.statusText,
      data: response.data,
    };
    // console.log(res);
    return res; // id, nickname, avatar, success
  } catch (error) {
    let res = {
      rescode: error.response.status,
      resdesc: error.response.statusText,
      data: error.response.data,
    };
    console.log(res);
    return res;
  }
};

export const updateProfile = async (formData, token) => {
  try {
    // avatar, nickname
    const response = await api.patch(`/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    let res = {
      rescode: response.status,
      resdesc: response.statusText,
      data: response.data,
    };
    // console.log(res);
    return res; // avatar, nickname, message, success
  } catch (error) {
    let res = {
      rescode: error.response.status,
      resdesc: error.response.statusText,
      data: error.response.data,
    };
    console.log(res);
    return res;
  }
};
