import apiUrl from "../config.json";
import Notiflix, { Loading, Notify } from "notiflix";
import http from "./httpServices";

export async function store(formData: any, url: string) {
  const apiEndpoint = apiUrl.apiUrl;
  const success = 1;
  const fail = 0;
  try {
    Loading.pulse();
    let { data } = await http.post(apiEndpoint + url, formData);
    Loading.remove();
    Notify.success(data.message);
    return success;
  } catch (error: any) {
    const message = error.response.data.message;
    Notiflix.Report.failure("Error!!!", message, "Okay");
    Loading.remove();
    return fail;
  }
}

export async function sell(formData: any, url: string) {
  const apiEndpoint = apiUrl.apiUrl;
  const fail = 0;
  try {
    Loading.pulse();
    let { data } = await http.post(apiEndpoint + url, formData);
    Loading.remove();
    if (data.data.error) {
    } else {
      Notify.success(data.data.message);
    }
    return data;
  } catch (error: any) {
    console.log(error);
    let status = error.response.status;
    if (status === 422) {
      Notiflix.Report.failure("Error!!!", "Invalid Input", "Okay");
    }
    let message =
      status > 399 && status < 415
        ? "Invalid Username or Password"
        : "Something went wrong, please try again";
    Notiflix.Report.failure("Error!!!", message, "Okay");
    Loading.remove();
    return fail;
  }
}

export async function get(url: string, loader = true) {
  const apiEndpoint = apiUrl.apiUrl;
  try {
    if (loader) {
      Loading.pulse();
    }

    let { data } = await http.get(apiEndpoint + url);
    if (loader) {
      Loading.remove();
    }

    return data;
  } catch (error) {
    let message = "Something went wrong, please try again";
    if (loader) {
      Loading.remove();
    }
    Notiflix.Report.failure("Error!!!", message, "Okay");
  }
}

export async function deleteData(url: string, id: any) {
  const apiEndpoint = apiUrl.apiUrl;
  try {
    Loading.pulse();
    let { data } = await http.get(apiEndpoint + url + "/" + id);
    Loading.remove();
    Notify.success(data.message);
  } catch (error) {
    console.log(error);
    let message = "Something went wrong, please try again";
    Loading.remove();
    Notiflix.Report.failure("Error!!!", message, "Okay");
  }
}
