import axios from 'axios';

const API_URL = import.meta.env.VITE_SERVER_API;

export const getTestResults = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTestResult = async (resultData) => {
  const response = await axios.post(API_URL, resultData);
  return response.data;
};

export const deleteTestResult = async (id) => {
  const response = await axios.delete(API_URL+`/${id}`);
  return response.data;
};

export const updateTestResultVisibility = async (id, visibility) => {
  const response = await axios.patch(API_URL+`/${id}`, {visibility:!visibility});
  return response.data;
};

// export const getUserResults = async ({user}) => {
//   const response = await axios.get(API_URL+`?userId=${user.userId}`);
//   return response.data;
// };