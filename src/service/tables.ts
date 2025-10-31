import ApiService from './apiService';
import { sanitizeParams } from './serviceHelpers';
import type {
  ApiResponse,
  AvailabilityResult,
  CreateTableRequest,
  Page,
  Table,
  TableMutation,
  TableQuery,
  apiObject,
} from '../types/types';

import { BASE_PATH } from '../configs/constant';
const RESOURCE = 'tables';

export async function listTables(params?: TableQuery): Promise<ApiResponse<Page<Table>>> {
  const apiObject: apiObject = {
    method: 'GET',
    authentication: false,
    endpoint: RESOURCE,
    basePath: BASE_PATH,
    params: sanitizeParams(params),
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<Page<Table>>>;
}

export async function createTable(payload: CreateTableRequest): Promise<ApiResponse<Table>> {
  const apiObject: apiObject = {
    method: 'POST',
    authentication: true,
    endpoint: RESOURCE,
    basePath: BASE_PATH,
    body: payload,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<Table>>;
}

export async function getTableById(tableId: string): Promise<ApiResponse<Table>> {
  const apiObject: apiObject = {
    method: 'GET',
    authentication: false,
    endpoint: `${RESOURCE}/${tableId}`,
    basePath: BASE_PATH,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<Table>>;
}

export async function updateTable(
  tableId: string,
  payload: TableMutation,
): Promise<ApiResponse<Table>> {
  const apiObject: apiObject = {
    method: 'PUT',
    authentication: true,
    endpoint: `${RESOURCE}/${tableId}`,
    basePath: BASE_PATH,
    body: payload,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<Table>>;
}

export async function deleteTable(tableId: string): Promise<ApiResponse<void>> {
  const apiObject: apiObject = {
    method: 'DELETE',
    authentication: true,
    endpoint: `${RESOURCE}/${tableId}`,
    basePath: BASE_PATH,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<void>>;
}

export async function isTableAvailable(tableId: string): Promise<ApiResponse<AvailabilityResult>> {
  const apiObject: apiObject = {
    method: 'GET',
    authentication: false,
    endpoint: `${RESOURCE}/${tableId}/availability`,
    basePath: BASE_PATH,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<AvailabilityResult>>;
}
