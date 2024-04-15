export interface IResponseData {
  totalDocs: number;
  docs: T[];
  topIndustries?: string[];
  totalPages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
