export interface ErrorResponse {
  statusCode: number;
  message: string;
  errorSources: TErrorSources
  }

  export type TErrorSources = {
    path: string | number;
    message: string;
  }[];

 