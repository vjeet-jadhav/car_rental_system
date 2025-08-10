import axios from 'axios';
import { config } from "./config";
import { data } from 'react-router-dom';



export const fetchHistory = async () => {
  try {
    const url = `${config.serverUrl}/host/get-booking-history`
    const token = sessionStorage.getItem('token');
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
    const token = sessionStorage.getItem('token');
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
  const token = sessionStorage.getItem("token");

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
 * Register a new car (including address).
 * Expects backend to return ApiResponseWithId:
 * { message: "...", data: { carId: 123 } }
 *
 * Returns normalized object:
 * { status: 'success'|'error', message: string, data?: { carId: number } }
 */
export async function registerCar(carDto) {
  const url = `${config.serverUrl}/car/registration`;
  const token = sessionStorage.getItem('token');

  try {
    const res = await axios.post(url, carDto, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // res.data should be ApiResponseWithId { message, data: { carId: ... } }
    const body = res.data || {};
    const message = body.message || 'Car registered';
    const data = body.data || null;

    return { status: 'success', message, data };
  } catch (e) {
    // normalize error
    if (e.response?.data?.message) {
      return { status: 'error', message: e.response.data.message };
    }
    if (e.response?.data) {
      // if backend returned some JSON without message
      return { status: 'error', message: JSON.stringify(e.response.data) };
    }
    return { status: 'error', message: e.message || 'Network error' };
  }
}

/**
 * Upload multiple car images.
 * POST -> /uploadMul/{carId} with form field 'files' repeated.
 *
 * filesInOrder must be [main, front, back, left, right]
 */
export async function uploadCarImages(carId, filesInOrder) {
  const url = `${config.serverUrl}/user/uploadMul/${carId}`;
  const token = sessionStorage.getItem('token');

  const form = new FormData();
  filesInOrder.forEach((f) => {
    form.append('files', f);
  });

  try {
    const res = await axios.post(url, form, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    return { status: 'success', message: 'Images uploaded', data: res.data };
  } catch (e) {
    if (e.response?.data?.message) {
      return { status: 'error', message: e.response.data.message };
    }
    if (e.response?.data) {
      return { status: 'error', message: JSON.stringify(e.response.data) };
    }
    return { status: 'error', message: e.message || 'Network error' };
  }
}


/**
 * Fetch all cars for the logged-in host (backend GET /car).
 * Returns normalized { status, data, message } where data is array of CarResponseDTOs.
 */
export async function getMyCars() {
  const url = `${config.serverUrl}/host`;
  const token = sessionStorage.getItem('token');
  try {
    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { status: 'success', data: res.data };
  } catch (e) {
    if (e.response?.data?.message) {
      return { status: 'error', message: e.response.data.message };
    }
    return { status: 'error', message: e.message || 'Network error' };
  }
}

export async function getCarById(carId)
{
    const url = `${config.serverUrl}/host/getcar/${carId}`;
    const token = sessionStorage.getItem('token');

    try{
        const res = await axios.get(url, {
            headers :{
                Authorization : `Bearer ${token}`
            }
        });
        console.log('Fetched car from backend:', res.data);
        return { status : 'success', data : res.data};
    }catch(e)
    {
        if(e.response?.data?.message)
        {
            return { status : error, message : response.data.message};
        }
        return { status : error, message : e.message || 'Network Error'}
    }
}


export async function updateCar(carDto) {
    const url = `${config.serverUrl}/car/update`;
    const token = sessionStorage.getItem('token');

    try{
        const res = await axios.put(url, carDto,
            {
                headers : { Authorization : `Bearer ${token}` }
            });
         return { status : 'success', message : res.data.message }
    } catch(e)
    {
        if (e.response?.data?.message) {
      return { status: 'error', message: e.response.data.message };
    }
    return { status: 'error', message: e.message || 'Network error' };
    } 
}


export async function sheduleCar(carId, scheduleFields){
    const url = `${config.serverUrl}/host/shedule-car/${carId}`;
    const token = sessionStorage.getItem('token');

    try{
        const res = await axios.put(url, scheduleFields,
            {
                headers : { Authorization : `Bearer ${token}` }
            });
         return { status : 'success', message : res.data.message }
    } catch(e)
    {
        if (e.response?.data?.message) {
      return { status: 'error', message: e.response.data.message };
    }
    return { status: 'error', message: e.message || 'Network error' };
    } 
}


/**
 * Unschedule car
 * PUT /host/unschedule-car/{carId}
 */
export async function unsheduleCar(carId) {
  const url = `${config.serverUrl}/host/unschedule-car/${carId}`;
  const token = sessionStorage.getItem('token');

  try {
    const res = await axios.put(url, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return { status: 'success', message: res.data?.message || 'Unsheduled', data: res.data };
  } catch (e) {
    if (e.response?.data?.message) return { status: 'error', message: e.response.data.message };
    if (e.response?.data) return { status: 'error', message: JSON.stringify(e.response.data) };
    return { status: 'error', message: e.message || 'Network error' };
  }
}


export async function getCarRatings(carId) {
  const url = `${config.serverUrl}/car/ratings/${carId}`;
  const token = sessionStorage.getItem('token');

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return {
      status: 'success',
      data: res.data
    };
  } catch (e) {
    return {
      status: 'error',
      message: e.response?.data?.message || e.message || 'Network Error'
    };
  }
}
