import axios from './axiosConfig';
import apiConfig from './apiConfig';
import Cookies from "js-cookie";
import type { apiObject } from '../types/types';
import * as constant from "../configs/constant";

async function callApi(apiObject:apiObject) {
  let body = {};
  let headers: Record<string, any> = {};
  let method = apiObject.method ? apiObject.method.toLowerCase() : 'get';
  if (method === 'post' || method === 'put' || method === 'patch') {
    body = apiObject.body ? apiObject.body : {};
  }

  // Set Content-Type unless multipart (browser will set boundary)
  if (apiObject.multipart) {
    // do not set Content-Type for multipart/form-data to allow browser to add boundary
  } else if (apiObject.urlencoded) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
  } else {
    headers['Content-Type'] = 'application/json';
  }

  if (apiObject.authentication) {
    const token = Cookies.get(constant.ACCESS_TOKEN);
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let serverUrl = apiConfig.serverUrl || '';
  let basePath = apiConfig.basePath || '';

  if (apiObject.basePath){
    basePath = apiObject.basePath;
  }

  // Build URL safely to avoid duplicate slashes
  const trim = (s = '') => s.replace(/^\/+|\/+$/g, '');
  const parts = [trim(serverUrl), trim(basePath), trim(apiObject.endpoint || '')].filter(Boolean);
  const url = parts.length ? parts.join('/') : '';

  let result;

  // Build axios config
  const config: any = { headers };
  if (apiObject.timeout) config.timeout = apiObject.timeout;
  if (apiObject.responseType) config.responseType = apiObject.responseType;

  if (method === 'get' || method === 'delete') {
    if (apiObject.params) config.params = apiObject.params;
  }

  try {
    let response;
    if (method === 'get' || method === 'delete') {
      response = await (axios as any)[method](url, config);
    } else {
      response = await (axios as any)[method](url, body, config);
    }

    const payload = response?.data ?? {};
    const statusCode = response?.status ?? 0;
    const desc = (payload as any)?.desc ?? (payload as any)?.result ?? (payload as any)?.message ?? '';
    const success = typeof (payload as any)?.success === 'boolean' ? (payload as any)?.success : statusCode < 400;
    // Normalise so callers can always read `response.data`, even if backend omits it
    const normalizedData = (payload && typeof payload === 'object' && 'data' in payload)
      ? (payload as any).data
      : payload;
    result = {
      success,
      ...payload,
      desc,
      status: statusCode,
      data: normalizedData,
    };
  } catch (error: any) {
    // Network/timeout (no response)
    if (!error || !error.response) {
      result = {
        success: false,
        status: 2,
        result: "Your connection was interrupted",
        data: null,
      };
    } else {
      const statusCode = error.response.status;
      const respData = error.response.data ?? {};
      if (statusCode === 401) {
        result = {
          success: false,
          status: 2,
          result: "Your session expired! Please login again..",
          data: null,
        };
        if (apiObject.type !== "AUTH") {
          Cookies.remove(constant.ACCESS_TOKEN);
        }
      } else if (statusCode === 403) {
        result = {
          success: false,
          status: 2,
          result: "Access is denied.",
          data: null,
        };
      } else if (statusCode === 417) {
        result = {
          success: false,
          status: 2,
          result: "Oops! Something went wrong.",
          data: null,
        };
      } else {
        const message = respData.result ?? respData.message ?? 'Sorry, something went wrong';
        result = {
          success: false,
          status: 0,
          result: message,
          data: null,
        };
      }
    }
  }

  return result;
}
export default {callApi};
