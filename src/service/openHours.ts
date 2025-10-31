import ApiService from './apiService';
import { sanitizeParams } from './serviceHelpers';
import type {
  ApiResponse,
  OpenHour,
  OpenHourMutation,
  OpenHourQuery,
  OpenHourReplacePayload,
  Page,
  apiObject,
} from '../types/types';

import { BASE_PATH } from '../configs/constant';

export async function listOpenHours(
  restaurantId: string,
  params?: OpenHourQuery,
): Promise<ApiResponse<Page<OpenHour>>> {
  const apiObject: apiObject = {
    method: 'GET',
    authentication: false,
    endpoint: `restaurants/${restaurantId}/open-hours`,
    basePath: BASE_PATH,
    params: sanitizeParams(params),
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<Page<OpenHour>>>;
}

export async function createOpenHour(
  restaurantId: string,
  payload: OpenHourMutation,
): Promise<ApiResponse<OpenHour>> {
  const body = { ...payload, restaurantId: payload.restaurantId ?? restaurantId };
  const apiObject: apiObject = {
    method: 'POST',
    authentication: true,
    endpoint: `restaurants/${restaurantId}/open-hours`,
    basePath: BASE_PATH,
    body,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<OpenHour>>;
}

export async function updateOpenHour(
  restaurantId: string,
  openHourId: string,
  payload: OpenHourMutation,
): Promise<ApiResponse<OpenHour>> {
  const body = { ...payload, restaurantId: payload.restaurantId ?? restaurantId };
  const apiObject: apiObject = {
    method: 'PUT',
    authentication: true,
    endpoint: `restaurants/${restaurantId}/open-hours/${openHourId}`,
    basePath: BASE_PATH,
    body,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<OpenHour>>;
}

export async function replaceOpenHours(
  restaurantId: string,
  payload: OpenHourReplacePayload,
): Promise<ApiResponse<OpenHour[]>> {
  const body = payload.map((item) => ({
    ...item,
    restaurantId: item.restaurantId ?? restaurantId,
  }));

  const apiObject: apiObject = {
    method: 'PUT',
    authentication: true,
    endpoint: `restaurants/${restaurantId}/open-hours`,
    basePath: BASE_PATH,
    body,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<OpenHour[]>>;
}
