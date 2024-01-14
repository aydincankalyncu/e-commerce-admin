import axios from "axios";
import { REST_URL } from "./constants";
import { concatUrl, modifyHeader } from ".";


export const getRequest = async<T> (url: string, data?: any) => {
  return await axios.get<T>(concatUrl(REST_URL, url), { params: data, headers: modifyHeader() });
}

export const postRequest = async<T>(url: string, data?: any, headerShown = true) => {
  return await axios.post<T>(concatUrl(REST_URL, url), data, {
    headers: modifyHeader(headerShown)
  })
}

export const putRequest = async <T>(url: string, data?: any, headerShown = true) => {
  return await axios.put<T>(concatUrl(REST_URL, url), data, {
    headers: modifyHeader(headerShown)
  });
}

export const deleteRequest = async <T>(url: string, headerShown = true) => {
  return await axios.delete<T>(concatUrl(REST_URL, url), {
    headers: modifyHeader(headerShown)
  });
}

export const updateRequest = async <T>(url: string, data?: any, headerShown = true) => {
  return await axios.patch<T>(concatUrl(REST_URL, url), data, {
    headers: modifyHeader(headerShown)
  });
}