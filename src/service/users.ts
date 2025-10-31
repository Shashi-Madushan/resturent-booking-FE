import ApiService from './apiService';
import { sanitizeParams } from './serviceHelpers';
import type {
  ApiResponse,
  Page,
  UpdateUserRequest,
  User,
  UserListQuery,
  apiObject,
} from '../types/types';

import { BASE_PATH } from '../configs/constant';
const RESOURCE = 'users';

export async function listUsers(params?: UserListQuery): Promise<ApiResponse<Page<User>>> {
  const apiObject: apiObject = {
    method: 'GET',
    authentication: true,
    endpoint: RESOURCE,
    basePath: BASE_PATH,
    params: sanitizeParams(params),
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<Page<User>>>;
}

export async function getUserById(userId: string): Promise<ApiResponse<User>> {
  const apiObject: apiObject = {
    method: 'GET',
    authentication: true,
    endpoint: `${RESOURCE}/${userId}`,
    basePath: BASE_PATH,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<User>>;
}

export async function updateUser(userId: string, payload: UpdateUserRequest): Promise<ApiResponse<User>> {
  const apiObject: apiObject = {
    method: 'PUT',
    authentication: true,
    endpoint: `${RESOURCE}/${userId}`,
    basePath: BASE_PATH,
    body: payload,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<User>>;
}

export async function deactivateUser(userId: string): Promise<ApiResponse<void>> {
  const apiObject: apiObject = {
    method: 'DELETE',
    authentication: true,
    endpoint: `${RESOURCE}/${userId}`,
    basePath: BASE_PATH,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<void>>;
}
