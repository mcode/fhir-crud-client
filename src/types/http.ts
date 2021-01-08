export interface RequestHeaders {
  [key: string]: any;
}

export interface RequestArgs {
  id?: string;
  resourceType?: string;
  body?: any;
  params?: {
    [key: string]: any;
  };
}
