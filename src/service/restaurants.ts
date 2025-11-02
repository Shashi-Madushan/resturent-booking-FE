import ApiService from './apiService';
import { sanitizeParams } from './serviceHelpers';
import type {
  ApiResponse,
  Page,
  Restaurant,
  RestaurantPayload,
  RestaurantQuery,
  apiObject,
} from '../types/types';

import { BASE_PATH } from '../configs/constant';
const RESOURCE = 'restaurants';

function buildRestaurantFormData(payload: RestaurantPayload): FormData {
  const formData = new FormData();
  formData.append('restaurant', JSON.stringify(payload.restaurant));
  if (payload.image) {
    formData.append('image', payload.image);
  }
  return formData;
}

export async function listRestaurants(params?: RestaurantQuery): Promise<ApiResponse<Page<Restaurant>>> {
  const apiObject: apiObject = {
    method: 'GET',
    authentication: true,
    endpoint: RESOURCE,
    basePath: BASE_PATH,
    params: sanitizeParams(params),
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<Page<Restaurant>>>;
}

export async function getRestaurantById(restaurantId: string): Promise<ApiResponse<Restaurant>> {
  const apiObject: apiObject = {
    method: 'GET',
    authentication: true,
    endpoint: `${RESOURCE}/${restaurantId}`,
    basePath: BASE_PATH,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<Restaurant>>;
}

export async function createRestaurant(payload: RestaurantPayload): Promise<ApiResponse<Restaurant>> {
  const apiObject: apiObject = {
    method: 'POST',
    authentication: true,
    endpoint: RESOURCE,
    basePath: BASE_PATH,
    body: buildRestaurantFormData(payload),
    multipart: true,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<Restaurant>>;
}

export async function updateRestaurant(
    restaurantId: string,
    payload: RestaurantPayload,
): Promise<ApiResponse<Restaurant>> {
  const apiObject: apiObject = {
    method: 'PUT',
    authentication: true,
    endpoint: `${RESOURCE}/${restaurantId}`,
    basePath: BASE_PATH,
    body: buildRestaurantFormData(payload),
    multipart: true,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<Restaurant>>;
}

export async function deleteRestaurant(restaurantId: string): Promise<ApiResponse<void>> {
  const apiObject: apiObject = {
    method: 'DELETE',
    authentication: true,
    endpoint: `${RESOURCE}/${restaurantId}`,
    basePath: BASE_PATH,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<void>>;
}