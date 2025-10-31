import ApiService from './apiService';
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
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<AuthResult>>;
}
