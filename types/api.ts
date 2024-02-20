export interface ListResponse<T> {
  docs: Array<T>;
  meta: {
    total: number;
  };
}

export interface ResponseDetail<T> {
  docs: T;
  meta: {};
}

export interface ErrorResponse {
  message: string;
}

export interface SuccessResponse {
  message: string;
  data?: string;
}

export interface CommonAttribute {
  createdAt: Date;
  updatedAt: Date | null;
  id: number;
}

export interface CommonFunction {
  onSuccess?: () => void;
  onError?: () => void;
}

export interface CommonParams {
  offset?: number;
  limit?: number;
  keyword?: string;
  // language: LOCALE;
}
