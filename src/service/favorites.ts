import ApiService from './apiService';
import { sanitizeParams } from './serviceHelpers';
import type {
  ApiResponse,
  Favorite,
  FavoriteQuery,
  FavoriteRequest,
  FavoriteStatus,
  Page,
  apiObject,
} from '../types/types';

import { BASE_PATH } from '../configs/constant';

export async function listFavorites(
  userId: string,
  params?: FavoriteQuery,
): Promise<ApiResponse<Page<Favorite>>> {
  const apiObject: apiObject = {
    method: 'GET',
    authentication: true,
    endpoint: `users/${userId}/favorites`,
    basePath: BASE_PATH,
    params: sanitizeParams(params),
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<Page<Favorite>>>;
}

export async function addFavorite(
  userId: string,
  payload: FavoriteRequest,
): Promise<ApiResponse<Favorite>> {
  const apiObject: apiObject = {
    method: 'POST',
    authentication: true,
    endpoint: `users/${userId}/favorites`,
    basePath: BASE_PATH,
    body: payload,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<Favorite>>;
}

export async function removeFavorite(
  userId: string,
  restaurantId: string,
): Promise<ApiResponse<void>> {
  const apiObject: apiObject = {
    method: 'DELETE',
    authentication: true,
    endpoint: `users/${userId}/favorites/${restaurantId}`,
    basePath: BASE_PATH,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<void>>;
}

export async function isRestaurantFavorite(
  userId: string,
  restaurantId: string,
): Promise<ApiResponse<FavoriteStatus>> {
  const apiObject: apiObject = {
    method: 'GET',
    authentication: true,
    endpoint: `users/${userId}/favorites/check/${restaurantId}`,
    basePath: BASE_PATH,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<FavoriteStatus>>;
}
