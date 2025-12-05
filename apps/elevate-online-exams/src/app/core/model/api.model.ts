export interface PaginatedResponse {
  message: string;
  metadata: MetaData;
}

export interface MetaData {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}
