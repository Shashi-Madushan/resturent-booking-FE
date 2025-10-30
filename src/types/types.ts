export type apiObject = {
  endpoint?: string;
  method?: string;
  body?: Record<string, any>;
  headers?: Record<string, any>;
  params?: Record<string, any>;
  type?: string;
  authentication?: boolean;
  multipart?: boolean;
  urlencoded?: boolean;
  timeout?: number;
  responseType?: string;
  basePath?: string;
};