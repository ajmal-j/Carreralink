export interface IResponseData {
  totalDocs: number;
  topIndustries?: string[];
  totalPages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
