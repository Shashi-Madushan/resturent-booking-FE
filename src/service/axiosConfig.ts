import axios from 'axios'
import apiConfig from "./apiConfig";
import * as constant from "../configs/constant";
import Cookies from "js-cookie";
import swal from "sweetalert";

const instance = axios.create(); // changed: create an axios instance

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
}

instance.interceptors.response.use(
  response => response,
  async (error) => {
    const status = error.response ? error.response.status : 0;
    const originalRequest = error.config;

    if (status !== 401) {
      return Promise.reject(error);
    }

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // avoid infinite loop by marking retry attempts
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // If a refresh is already in progress, queue this request
    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((token: string) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          resolve(instance(originalRequest));
        });
      });
    }

    // start refresh
    originalRequest._retry = true;
    isRefreshing = true;

    const URL = `${apiConfig.serverUrl}/${apiConfig.basePath}/auth/refreshToken`;
    const config = {
      headers: {
        Authorization: `Bearer ${Cookies.get(constant.ACCESS_TOKEN)}`,
        isRefreshToken: true
      }
    };

    try {
      const res = await axios.post(URL, {}, config);
      const newToken = res.data?.token ?? res.data?.result;
      if (!newToken) throw new Error('No token returned from refresh');

      Cookies.set(constant.ACCESS_TOKEN, newToken);
      isRefreshing = false;
      onRefreshed(newToken);

      // retry the original request with new token
      originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
      return instance(originalRequest);
    } catch (err) {
      isRefreshing = false;
      refreshSubscribers = [];

      // notify user and redirect to login
      await swal({
        title: "Session expired. Please login again",
        closeOnClickOutside: false,
        buttons: {
          dangerMode: {
            text: "Okay",
            value: "action",
            className: "okay-btn"
          }
        }
      });

      Cookies.remove(constant.ACCESS_TOKEN);
      window.location.href = `${constant.BASE_ROUTE_PATH}/login`;
      return Promise.reject(err);
    }
  }
);

export default instance;
