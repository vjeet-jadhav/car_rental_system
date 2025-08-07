import axios from "axios";
import { config } from "./config";

const token = localStorage.getItem('token');

export async function getAllBasicInfo() {
  try {
    
    const url = `${config.serverUrl}/admin/getInfo`
    const response = await axios.get(url, { headers: {
          Authorization: `Bearer ${token}`}
        })

    // console.log(response)
    return response;

  } catch (error) {
    console.log(`Exception :` ,error);
  }
}


export async function getAllAgents() {

  try {

    const url = `${config.serverUrl}/admin/getAgents`
    const response = axios.get(url,{
      headers:{
        Authorization:`Bearer ${token}`
      }
  })

  // console.log(response)
  return response;
    
  } catch (error) {
        
    console.log(`Exception :` ,error);
  }
  
}

export async function getPendingCars() {

  try {

    const url = `${config.serverUrl}/admin/getPendingCars`
    const response = await axios.get(url, { 
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

  return response;
    
  } catch (error) {
    
  }
  
}