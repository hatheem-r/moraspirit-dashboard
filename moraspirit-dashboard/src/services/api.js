import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json', // Required by the POST endpoint [cite: 39]
  },
});

export const getMembers = async () => {
  const response = await apiClient.get('/members');
  return response.data;
};

export const checkAvailability = async (msp_id, date) => {
  const response = await apiClient.post('/availability/check', {
    msp_id,
    date,
  });
  return response.data;
};