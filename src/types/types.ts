export type apiObject = {
  endpoint?: string;
  method?: string;
  body?: unknown;
  headers?: Record<string, unknown>;
  params?: Record<string, unknown>;
  type?: string;
  authentication?: boolean;
  multipart?: boolean;
  urlencoded?: boolean;
  timeout?: number;
  responseType?: string;
  basePath?: string;
};

export type QueryParamValue = string | number | boolean;

export type QueryParams = Record<string, QueryParamValue>;

export interface ApiResponse<T = unknown> {
  status: number;
  success?: boolean;
  result?: string;
  desc?: string;
  data?: T;
  [key: string]: unknown;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  [key: string]: unknown;
}

export interface PaginationQuery extends Record<string, unknown> {
  page?: number;
  size?: number;
  sort?: string;
}

export type UserRole = 'USER' | 'ADMIN' | 'MANAGER' | 'OWNER' | (string & {});

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface AuthResult {
  token: string;
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
  user?: User;
  [key: string]: unknown;
}

export type SigninResponse = AuthResult;

export type SignupResponse = User;

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: UserRole;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export interface UserListQuery extends PaginationQuery {
  search?: string;
  role?: UserRole;
  active?: boolean;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  active?: boolean;
}

export type Uploadable = File | Blob;

export interface OpenHours {
  id: number;
  dayOfWeek: string;
  openingTime: string;
  closingTime: string;
  restaurantId: number | null;
  closed: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  description?: string;
  capacity?: number;
  active?: boolean;
  imageUrl?: string;
  openHours?: OpenHours[];
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export interface RestaurantMutation {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  description?: string;
  capacity?: number;
  active?: boolean;
}

export interface RestaurantPayload {
  restaurant: RestaurantMutation;
  image?: Uploadable | null;
}

export interface RestaurantQuery extends PaginationQuery {
  name?: string;
  active?: boolean;
}

export interface MenuItem {
  id: string;
  itemName: string;
  price: number;
  description?: string;
  available?: boolean;
  restaurantId: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export interface MenuItemMutation {
  itemName?: string;
  price?: number;
  description?: string;
  available?: boolean;
  restaurantId?: string;
}

export interface MenuItemMultipartPayload {
  menuItem: MenuItemMutation;
  image?: Uploadable | null;
}

export interface MenuItemQuery extends PaginationQuery {
  availableOnly?: boolean;
}

export type MenuItemReplacePayload = MenuItemMutation[];

export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export interface OpenHour {
  id: string;
  restaurantId: string;
  dayOfWeek: DayOfWeek;
  openingTime: string;
  closingTime: string;
  [key: string]: unknown;
}

export interface OpenHourMutation {
  dayOfWeek: DayOfWeek;
  openingTime: string;
  closingTime: string;
  restaurantId?: string;
}

export interface OpenHourQuery extends PaginationQuery {}

export type OpenHourReplacePayload = OpenHourMutation[];

export interface AvailabilityResult {
  available: boolean;
  availableTables?: string[];
  [key: string]: unknown;
}

export interface CheckAvailabilityQuery extends Record<string, unknown> {
  restaurantId: string;
  requiredSeats: number;
  start: string;
  end: string;
}

export interface Booking {
  id: string;
  restaurantId: string;
  tableId: string;
  userId: string;
  start: string;
  end: string;
  seats: number;
  notes?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export interface CreateBookingRequest {
  restaurantId: string;
  tableId: string;
  start: string;
  end: string;
  seats: number;
  notes?: string;
}

export interface UpdateBookingRequest {
  start?: string;
  end?: string;
  seats?: number;
  notes?: string;
}

export interface Favorite {
  id: string;
  userId: string;
  restaurantId: string;
  createdAt: string;
  [key: string]: unknown;
}

export interface FavoriteRequest {
  restaurantId: string;
}

export interface FavoriteQuery extends PaginationQuery {}

export interface FavoriteStatus {
  favorite: boolean;
  [key: string]: unknown;
}

export interface Table {
  id: string;
  tableNumber: number;
  seats: number;
  restaurantId: string;
  available?: boolean;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export interface TableMutation {
  tableNumber?: number;
  seats?: number;
  restaurantId?: string;
}

export interface CreateTableRequest {
  tableNumber: number;
  seats: number;
  restaurantId: string;
}

export interface TableQuery extends PaginationQuery {}

export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt?: string;
  [key: string]: unknown;
}

export interface CreateReviewRequest {
  restaurantId: string;
  rating: number;
  comment?: string;
}

export interface UpdateReviewRequest {
  rating?: number;
  comment?: string;
}

export interface ReviewQuery extends PaginationQuery {}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  [key: string]: unknown;
}

export interface ReviewCheckResponse {
  reviewed: boolean;
  [key: string]: unknown;
}