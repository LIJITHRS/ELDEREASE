import { commonAPI } from "./commonAPI"
import {baseURL} from "./baseurl"

//register api


 export const registerAPI = async(user)=>{
   return await commonAPI('POST',`${baseURL}/user/register`,user,"")
} 

//login api
/* export const loginAPI = async(user)=>{
  return await commonAPI('POST',`${baseURL}/user/login`,user,"")
} */

// Add Event API (Requires authentication token)
/* export const addeventAPI = async (eventData, token) => {
   return await commonAPI('POST', `${baseURL}/events`, eventData, token);
}; */