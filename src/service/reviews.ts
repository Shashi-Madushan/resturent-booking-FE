import ApiService from './apiService';
import { sanitizeParams } from './serviceHelpers';
import type {
  ApiResponse,
  CreateReviewRequest,
  Page,
  Review,
  ReviewCheckResponse,
  ReviewQuery,
  ReviewStats,
  UpdateReviewRequest,
  apiObject,
} from '../types/types';

import { BASE_PATH } from '../configs/constant';

export async function listReviews(
  restaurantId: string,
  params?: ReviewQuery,
): Promise<ApiResponse<Page<Review>>> {
  const apiObject: apiObject = {
    method: 'GET',
    authentication: false,
    endpoint: `restaurants/${restaurantId}/reviews`,
    basePath: BASE_PATH,
    params: sanitizeParams(params),
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<Page<Review>>>;
}

export async function getReviewStats(restaurantId: string): Promise<ApiResponse<ReviewStats>> {
  const apiObject: apiObject = {
    method: 'GET',
    authentication: false,
    endpoint: `restaurants/${restaurantId}/reviews/stats`,
    basePath: BASE_PATH,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<ReviewStats>>;
}

export async function createReview(
  restaurantId: string,
  payload: Omit<CreateReviewRequest, 'restaurantId'>,
): Promise<ApiResponse<Review>> {
  const body: CreateReviewRequest = {
    ...payload,
    restaurantId,
  };
  const apiObject: apiObject = {
    method: 'POST',
    authentication: true,
    endpoint: `restaurants/${restaurantId}/reviews`,
    basePath: BASE_PATH,
    body,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<Review>>;
}

export async function updateReview(
  restaurantId: string,
  reviewId: string,
  payload: UpdateReviewRequest,
): Promise<ApiResponse<Review>> {
  const apiObject: apiObject = {
    method: 'PUT',
    authentication: true,
    endpoint: `restaurants/${restaurantId}/reviews/${reviewId}`,
    basePath: BASE_PATH,
    body: payload,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<Review>>;
}

export async function deleteReview(
  restaurantId: string,
  reviewId: string,
): Promise<ApiResponse<void>> {
  const apiObject: apiObject = {
    method: 'DELETE',
    authentication: true,
    endpoint: `restaurants/${restaurantId}/reviews/${reviewId}`,
    basePath: BASE_PATH,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<void>>;
}

export async function hasUserReviewed(
  restaurantId: string,
): Promise<ApiResponse<ReviewCheckResponse>> {
  const apiObject: apiObject = {
    method: 'GET',
    authentication: true,
    endpoint: `restaurants/${restaurantId}/reviews/check`,
    basePath: BASE_PATH,
  };
  return await ApiService.callApi(apiObject) as Promise<ApiResponse<ReviewCheckResponse>>;
}
