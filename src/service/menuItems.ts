import ApiService from './apiService';
import { sanitizeParams } from './serviceHelpers';
import type {
  ApiResponse,
  MenuItem,
  MenuItemMultipartPayload,
  MenuItemQuery,
  MenuItemReplacePayload,
  MenuItemMutation,
  Page,
  apiObject,
} from '../types/types';

import { BASE_PATH } from '../configs/constant';

function buildMenuItemFormData(
  restaurantId: string,
  payload: MenuItemMultipartPayload,
): FormData {
  const data: MenuItemMutation = {
    ...payload.menuItem,
    restaurantId: payload.menuItem.restaurantId ?? restaurantId,
  };

  const formData = new FormData();
  formData.append('menuItem', JSON.stringify(data));
  if (payload.image) {
    formData.append('image', payload.image);
  }
  return formData;
}

export async function listMenuItems(
  restaurantId: string,
  params?: MenuItemQuery,
): Promise<ApiResponse<Page<MenuItem>>> {
  const apiObject: apiObject = {
    method: 'GET',
    authentication: false,
    endpoint: `restaurants/${restaurantId}/menu-items`,
    basePath: BASE_PATH,
    params: sanitizeParams(params),
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<Page<MenuItem>>>;
}

export async function getMenuItem(
  restaurantId: string,
  menuItemId: string,
): Promise<ApiResponse<MenuItem>> {
  const apiObject: apiObject = {
    method: 'GET',
    authentication: false,
    endpoint: `restaurants/${restaurantId}/menu-items/${menuItemId}`,
    basePath: BASE_PATH,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<MenuItem>>;
}

export async function createMenuItem(
  restaurantId: string,
  payload: MenuItemMultipartPayload,
): Promise<ApiResponse<MenuItem>> {
  const apiObject: apiObject = {
    method: 'POST',
    authentication: true,
    endpoint: `restaurants/${restaurantId}/menu-items`,
    basePath: BASE_PATH,
    body: buildMenuItemFormData(restaurantId, payload),
    multipart: true,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<MenuItem>>;
}

export async function updateMenuItem(
  restaurantId: string,
  menuItemId: string,
  payload: MenuItemMultipartPayload,
): Promise<ApiResponse<MenuItem>> {
  const apiObject: apiObject = {
    method: 'PUT',
    authentication: true,
    endpoint: `restaurants/${restaurantId}/menu-items/${menuItemId}`,
    basePath: BASE_PATH,
    body: buildMenuItemFormData(restaurantId, payload),
    multipart: true,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<MenuItem>>;
}

export async function deleteMenuItem(
  restaurantId: string,
  menuItemId: string,
): Promise<ApiResponse<void>> {
  const apiObject: apiObject = {
    method: 'DELETE',
    authentication: true,
    endpoint: `restaurants/${restaurantId}/menu-items/${menuItemId}`,
    basePath: BASE_PATH,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<void>>;
}

export async function replaceMenuItems(
  restaurantId: string,
  items: MenuItemReplacePayload,
): Promise<ApiResponse<MenuItem[]>> {
  const normalizedItems = items.map((item) => ({
    ...item,
    restaurantId: item.restaurantId ?? restaurantId,
  }));

  const apiObject: apiObject = {
    method: 'PUT',
    authentication: true,
    endpoint: `restaurants/${restaurantId}/menu-items`,
    basePath: BASE_PATH,
    body: normalizedItems,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<MenuItem[]>>;
}
