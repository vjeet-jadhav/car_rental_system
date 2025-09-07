import axios from "axios";
import { config } from "./config";

const token = sessionStorage.getItem('token');

export async function getAllBasicInfo() {
  try {
    
    const token = sessionStorage.getItem('token');
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

    const token = sessionStorage.getItem('token');
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

    const token = sessionStorage.getItem('token');
    const url = `${config.serverUrl}/admin/getPendingCars`
    const response = await axios.get(url, { 
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

  return response;
    
  } catch (error) {
     console.log(`Exception :` ,error);
  }
}

export async function assignAgent(carId,agentId)  {

  try {

    const token = sessionStorage.getItem('token');
    const url = `${config.serverUrl}/admin/assignAgent/${carId}/${agentId}`
    // console.log(carId,agentId)
    const response = await axios.put(url,{}, { 
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

export async function agentSignup(data)  {

  try {

    const token = sessionStorage.getItem('token');
    const url = `${config.serverUrl}/admin/register`
    const body = data
    const response = await axios.post(url,body, { 
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



export async function getCarsInfoApi() {

  const url = `${config.serverUrl}/admin/getCarsInfo`
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(url,{headers:
      {
        Authorization: `Bearer ${token}`
      }
    })

    // console.log(response);
    return response;

  } catch (error) {
    console.log(`Exception :`, error);
  }
  
}

export async function getUserApi(email) {
  const url = `${config.serverUrl}/admin/getUserByEmail/${email}`

  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(url,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  return response;
    
  } catch (error) {
    console.log(`Exception :`, error)
  }
}


export async function restrictUserApi(remark,id) {
  const url = `${config.serverUrl}/admin/restrictUser/${id}/${remark}`
  const body = remark;
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.put(url,{},{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

    return response;

  } catch (error) {
    console.log(`Exception :`, error)
  }
}

export async function restrictCarApi(id) {
  const url = `${config.serverUrl}/admin/restrictCar/${id}`

  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.put(url,{},{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

    return response;
    
  } catch (error) {
    console.log(`Exception :`, error)
  }
}