export interface PaginatedData<T> {
  count: number;
  next?: string | null;
  prev?: string | null;
  results: T[];
}
