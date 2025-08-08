import axios from "axios";
import { config } from "./config";

// USER SIGNUP
export async function userSignUp({ firstName, lastName, email, password, city, state, zipCode, mob_num }) {
  const body = { firstName, lastName, email, password, city, state, zipCode, mob_num };
  const url = `${config.serverUrl}/user/signup`;
  try {
    const result = await axios.post(url, body);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

export async function loginUser(email, password, city) {
  try {
    const body = { email, password, city };
    const url = `${config.serverUrl}/user/signin`;
    const response = await axios.post(url, body);
    console.log(response)
    return response.data;
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


export async function getCarsAfterFilter( filters,tripInfo) {
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
  console.log("body yaar",body);
  const url = `${config.serverUrl}/user/applyFilters`;
  try {
    const result = await axios.post(url,body);
    return result;
  }
  catch (e) {
    console.log(e);

  }}

export async function getUser(){
  try {
    const token = localStorage.getItem('token');
    const url = `${config.serverUrl}/user/info`

    const response = await axios.get(url, {
      headers : {
        Authorization: `Bearer ${token}`
      },
    })
    return response;
  }
  catch (ex) {
    console.log(`exception: `, ex)
  }
}

export async function updateUserInfo(firstName, lastName, email, mob_num){
  try {
    const body = {firstName, lastName, email, mob_num};
    const token = localStorage.getItem('token');
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