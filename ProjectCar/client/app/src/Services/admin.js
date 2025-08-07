import axios from "axios";
import { config } from "./config";

const token = localStorage.getItem('token');

export async function getAllBasicInfo() {
  try {
    
    const url = `${config.serverUrl}/admin/getInfo`
    const response = await axios.get(url, { headers: {
          Authorization: `Bearer ${token}`}
        })

    console.log(response)
    return response;

  } catch (error) {
    console.log(`Exception :` ,error);
  }
}