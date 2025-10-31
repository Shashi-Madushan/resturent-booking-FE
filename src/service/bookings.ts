import ApiService from './apiService';
import { sanitizeParams } from './serviceHelpers';
import type {
  ApiResponse,
  AvailabilityResult,
  Booking,
  CheckAvailabilityQuery,
  CreateBookingRequest,
  Page,
  PaginationQuery,
  UpdateBookingRequest,
  apiObject,
} from '../types/types';

import { BASE_PATH } from '../configs/constant';

export async function checkAvailability(
  query: CheckAvailabilityQuery,
): Promise<ApiResponse<AvailabilityResult>> {
  const apiObject: apiObject = {
    method: 'GET',
    authentication: false,
    endpoint: 'bookings/check',
    basePath: BASE_PATH,
    params: sanitizeParams(query),
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<AvailabilityResult>>;
}

export async function createBooking(
  userId: string,
  payload: CreateBookingRequest,
): Promise<ApiResponse<Booking>> {
  const apiObject: apiObject = {
    method: 'POST',
    authentication: true,
    endpoint: `users/${userId}/bookings`,
    basePath: BASE_PATH,
    body: payload,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<Booking>>;
}

export async function listBookings(
  userId: string,
  params?: PaginationQuery,
): Promise<ApiResponse<Page<Booking>>> {
  const apiObject: apiObject = {
    method: 'GET',
    authentication: true,
    endpoint: `users/${userId}/bookings`,
    basePath: BASE_PATH,
    params: sanitizeParams(params),
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<Page<Booking>>>;
}

export async function getBookingById(
  userId: string,
  bookingId: string,
): Promise<ApiResponse<Booking>> {
  const apiObject: apiObject = {
    method: 'GET',
    authentication: true,
    endpoint: `users/${userId}/bookings/${bookingId}`,
    basePath: BASE_PATH,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<Booking>>;
}

export async function updateBooking(
  userId: string,
  bookingId: string,
  payload: UpdateBookingRequest,
): Promise<ApiResponse<Booking>> {
  const apiObject: apiObject = {
    method: 'PUT',
    authentication: true,
    endpoint: `users/${userId}/bookings/${bookingId}`,
    basePath: BASE_PATH,
    body: payload,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<Booking>>;
}

export async function deleteBooking(userId: string, bookingId: string): Promise<ApiResponse<void>> {
  const apiObject: apiObject = {
    method: 'DELETE',
    authentication: true,
    endpoint: `users/${userId}/bookings/${bookingId}`,
    basePath: BASE_PATH,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<void>>;
}
