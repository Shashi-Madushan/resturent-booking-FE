import ApiService from './apiService';
import Cookies from "js-cookie";
import * as constant from "../configs/constant";
import type {
  apiObject,
  ApiResponse,
  AuthResult,
  SigninRequest,
  SigninResponse,
  SignupRequest,
  SignupResponse,
} from '../types/types';
import { BASE_PATH } from '../configs/constant';

export async function signupUser(payload: SignupRequest): Promise<ApiResponse<SignupResponse>> {
  const apiObject: apiObject = {
    method: 'POST',
    authentication: false,
    endpoint: 'auth/signup',
    body: payload,
    basePath: BASE_PATH,
    type: 'AUTH',
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<SignupResponse>>;
}

export async function signinUser(credentials: SigninRequest): Promise<ApiResponse<SigninResponse>> {
  const apiObject: apiObject = {
    method: 'POST',
    authentication: false,
    endpoint: 'auth/signin',
    body: credentials,
    basePath: BASE_PATH,
    type: 'AUTH',
  };
  
  const response = await ApiService.callApi(apiObject) as ApiResponse<AuthResult>;

  if (response.success) {
    const token = response.data?.token || response.result;
    if (token) {
      Cookies.set(constant.ACCESS_TOKEN, token);
    }
  }
  
  return response;
}