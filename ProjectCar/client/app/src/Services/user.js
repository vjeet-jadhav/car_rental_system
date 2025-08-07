import { config } from "./config";
import axios from "axios";

export async function loginUser(email, password,city) {
  try {
    const body = { email, password , city};
    const url = `${config.serverUrl}/user/signin`;
    const response = await axios.post(url, body);
    console.log(response)
    return response.data;
  } catch (ex) {
    console.log(`Exception :`, ex);
  }
}