export interface ISearchRequest {
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

export interface IRandomRequest {
  count: string;
}
