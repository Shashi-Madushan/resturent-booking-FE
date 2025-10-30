import ApiService from './apiService';
import { type apiObject } from '../types/types';
export async function loginUser(userCredentials :any) {
  const apiObject: apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = false;
  apiObject.endpoint = 'auth/authenticate';
  apiObject.body = userCredentials;
  // apiObject.basePath = "signIn";
  apiObject.type = "AUTH";
  return await ApiService.callApi(apiObject);
}

export async function changePassword(obj:any) {
  const apiObject:apiObject = {};
  apiObject.method = 'POST';
  apiObject.authentication = true;
  apiObject.endpoint = 'auth/changePassword';
  apiObject.body = obj;
  return await ApiService.callApi(apiObject);
}
