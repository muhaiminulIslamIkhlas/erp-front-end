import axios from "axios";
import jwtDecode from "jwt-decode";
import http from "./httpServices";
import apiUrl from "../config.json";
import Notiflix from "notiflix";

const apiEndpoint = apiUrl.apiUrl;
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(username: string, password: string) {
  try {
    const { data } = await http.post(apiEndpoint + "login", {
      name:username,
      password,
    });
    localStorage.setItem(tokenKey, data.access_token);
    axios.defaults.headers.common = {
      Authorization: `Bearer ${data.access_token}`,
    };
  } catch (error: any) {
    console.log(error)
    let statusText = error.response.data.message;
    Notiflix.Report.failure("Error!!!", statusText, "Okay");
  }
}

export function loginWithJwt(jwt: any) {
  localStorage.setItem(tokenKey, jwt);
}

export async function logout() {
  localStorage.removeItem(tokenKey);
  try {
    await http.post(apiEndpoint + "logout");
  } catch (error: any) {
    let status = error.response.status;
    let message =
      status > 399 && status < 415
        ? "Invalid Username or Password"
        : "Something went wrong, please try again";
    Notiflix.Report.failure("Error!!!", message, "Okay");
  }
}

export function getCurrentUser() {
  try {
    const jwt: any = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
