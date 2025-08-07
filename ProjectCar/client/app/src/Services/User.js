// import {axios} from "axios"

export async function userSignUp({firstName,lastName,email,password,confirmpassword,city,state,zipCode,mob_num})
{
    const body = {firstName,lastName,email,password,confirmpassword,city,state,zipCode,mob_num};
    console.log(body);
}