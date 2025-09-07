import axios from "axios";
import { config } from "./config";

const token = sessionStorage.getItem("token");

// USER SIGNUP
export async function userSignUp({ firstName, lastName, email, password, city, state, zipCode, mob_num,licenseNumber,dateOfBirth }) {
  const body = { firstName, lastName, email, password, city, state, zipCode, mob_num,licenseNumber,dateOfBirth };
  const url = `${config.serverUrl}/user/signup`;
  try {
    const result = await axios.post(url, body);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function loginUser(email, password) {
  try {
    const body = { email, password};
    const url = `${config.serverUrl}/user/signin`;
    const response = await axios.post(url, body);
    console.log(response)
    return response;
  } catch (ex) {
    console.log(`Exception :`, ex);
  }
}


export async function getAvailableCars({ startTrip, endTrip }) {
  const body = { startTrip, endTrip };
  const url = `${config.serverUrl}/user/serachCar`;
  console.log("body +", body);
  try {
    const result = await axios.post(url, body);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getAllCarCities() {
  const url = `${config.serverUrl}/user/getCarCity`;
  try {
    const result = await axios.get(url);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getServiceAreaJS({ city }) {
  const url = `${config.serverUrl}/user/getCarServiceArea?city=${city}`;
  try {
    const result = await axios.get(url);

    return result;
  }
  catch (e) {
    console.log(e);
  }
}


export async function getCarsAfterFilter(filters, tripInfo) {
  const body = {
    carFilter: {
      fuelType: filters.fuelType,
      transmissionType: filters.transmissionType,
      seatCapacity: filters.seatCapacity,
      rating: filters.rating,
      serviceArea: filters.serviceArea
    },
    availableCars: {
      startTrip: tripInfo.startTrip,
      endTrip: tripInfo.endTrip
    }
  };
  console.log("body yaar", body);
  const url = `${config.serverUrl}/user/applyFilters`;
  try {
    const result = await axios.post(url, body);
    return result;
  }
  catch (e) {
    console.log(e);

  }
}

export async function getUser() {
  try {
    // const token = localStorage.getItem('token');
    const url = `${config.serverUrl}/user/info`

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    return response;
  }
  catch (ex) {
    console.log(`exception: `, ex)
  }
}

export async function updateUserInfo(firstName, lastName, email, mob_num) {
  try {
    const body = { firstName, lastName, email, mob_num };
    const url = `${config.serverUrl}/user/editProfile`

    const response = await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response;
  }
  catch (ex) {
    console.log(`exception: `, ex)

  }
}

export async function getTheBookingAndPaymentStatus(getData) {
  const body = "";
  console.log("body to send backed", getData);
  const url = `${config.serverUrl}/api/payment/verify`;
  try {
    const result = await axios.post(url, getData);
    return result;
  }
  catch (e) {
    console.log(e);
  }
}

export async function getBooking() {
  const url = `${config.serverUrl}/user/myBooking`;
  const token = sessionStorage.getItem("token");
  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return result;
  } catch (e) {
    console.log(e, "get user bookings");
  }
}

// getTopCars

export async function getTopCars() {
  const url = `${config.serverUrl}/user/getTop3Cars`;
  try {
    const result = await axios.get(url)
    return result;
  } catch (e) {
    console.log(e, "get top cars bookings services");
  }
}

export async function getAllCarsForBrowse() {
  const url = `${config.serverUrl}/user/topCars`;
  try {
    const result = await axios.get(url)
    return result;
  } catch (e) {
    console.log(e, "get top cars bookings services");
  }
}

// 

export async function submitFeedback(props) {
  const body = props;
  const url = `${config.serverUrl}/user/review`;
  const token = sessionStorage.getItem("token");
  try {
    const result = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return result;
  } catch (e) {
    console.log(e, "submiting review js");
  }
}

// getFeedbacksForHome

export async function getFeedbacksForHome() {
 
  const url = `${config.serverUrl}/user/getTopReviews`;
  
  try {
    const result = await axios.get(url)
    return result;
  } catch (e) {
    console.log(e, "get feedback js");
  }
}