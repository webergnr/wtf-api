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
  id: string;
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

export interface IRemoveParams {
  id: string;
}
