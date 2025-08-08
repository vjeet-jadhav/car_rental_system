import axios from 'axios';
import { config } from "./config";

const token = localStorage.getItem('token');

export const fetchHistory = async () => {
  try {
    const url = `${config.serverUrl}/host/get-booking-history`
    const response = await axios.get(url, { headers: {
          Authorization: `Bearer ${token}`}
        })
    console.log(response.data);    
    return response.data;
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
};

export const fetchTotalEarnings = async () => {
  try {
    const url = `${config.serverUrl}/host/earning`
    const response = await axios.get(url, { headers: {
          Authorization: `Bearer ${token}`}
        })
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching total earnings:', error);
    throw error;
  }
};
    