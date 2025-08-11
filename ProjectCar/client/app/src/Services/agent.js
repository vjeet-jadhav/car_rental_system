// services/historyService.js
import axios from 'axios';
import { config } from "./config";
import PendingRequests from './../Screens/Agent/PendingRequests';


const token = sessionStorage.getItem('token');



export const fetchHistory = async () => {
  const token = sessionStorage.getItem('token');

  try {
    const token = sessionStorage.getItem('token');
    const url = `${config.serverUrl}/agent/history`
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
};

export const fetchPendingRequests = async () => {
  const token = sessionStorage.getItem('token');

  try {
    const token = sessionStorage.getItem('token');
    const url = `${config.serverUrl}/agent`
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
};

export const verifyRequest = async (id) => {

  const token = sessionStorage.getItem('token');


  const url = `${config.serverUrl}/agent/${id}/verify`
  const response = await axios.put(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );


  console.log(token);
  return response;
};

export const rejectRequest = async (id) => {

  const token = sessionStorage.getItem('token');

  const url = `${config.serverUrl}/agent/${id}/reject`
  const response = await axios.put(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
