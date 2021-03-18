export interface ISearchQuery {
  limit: string;
  from: string;
  search: string;
}

export interface ICreateRequest {
  text: string;
  definition: string;
}

export interface IFindRequest {
  text: string;
}
