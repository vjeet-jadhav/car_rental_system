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
    
 

/**
 * Verify RC number with backend.
 *
 * @param {string} rcNumber
 * @returns {Promise<{status: string, data: CarRegistrationDTO|null, message: string}>}
 */
export async function verifyRc(rcNumber) {
  const url = `${config.serverUrl}/car/validate`;
  const body = { rcNumber };
  const token = localStorage.getItem("token");

  try {
    const result = await axios.post(url, body, {
        headers : {
            Authorization : `Bearer ${token}`
        }
    });
    // result.data is your RcValidationResponse<CarRegistrationDTO>
    console.log('validateRc response:', result.data);

    return result.data;
  } catch (e) {
    // if server responded with JSON wrapper, forward it
    if (e.response && e.response.data) {
      return {
        status:  e.response.data.status  || 'error',
        data:    e.response.data.data    || null,
        message: e.response.data.message || 'Verification failed',
      };
    }
    // network / unexpected error
    return {
      status:  'error',
      data:    null,
      message: e.message || 'Network error',
    };
  }
}


/**
 * Register a new car (including address) under the given userId.
 *
 * @param {CarRegistrationDTO} carDto
 * @returns {Promise<{ status: string, message: string }>}
 */
export async function registerCar(carDto) {
  const url   = `${config.serverUrl}/car/registration`;
  const token = localStorage.getItem('token');

  try {
    const res = await axios.post(url, carDto, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Expecting res.data = { message: "New Car Added successfully" }
    return { status: 'success', message: res.data.message };
  } catch (e) {
    // If 404 or other ApiResponse
    if (e.response?.data?.message) {
      return { status: 'error', message: e.response.data.message };
    }
    return { status: 'error', message: e.message || 'Network error' };
  }
}

