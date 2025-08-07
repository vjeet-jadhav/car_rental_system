
import axios from "axios"
import { config } from "./config";

// USER SIGNUP
export async function userSignUp({firstName,lastName,email,password,city,state,zipCode,mob_num})
{
    const body = {firstName,lastName,email,password,city,state,zipCode,mob_num};
    const url = `${config.serverUrl}/user/signup`;
    try{
        const result = await axios.post(url,body);
        console.log(result);
    }catch(e)
    {
        console.log(e);
    }
}

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