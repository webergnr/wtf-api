export interface ISearchQuery {
  limit: string;
  from: string;
  search: string;
}

export interface ICreateBodyRequest {
  text: string;
  definition: string;
}

export interface IFindParams {
  text: string;
}

export interface IRandomParams {
  count: string;
}

export interface IEditParams {
  id: string;
}

export interface IEditBodyRequest {
  text: string;
  definition: string;
}
