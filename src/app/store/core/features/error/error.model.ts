export enum ErrorKey {
  LOADING_EMPLOYEES = 'LOADING_EMPLOYEES',
}
export interface ApplicationError {
  errorCode?: number;
  message: string;
}
export type ErrorState = {
  [key in ErrorKey]?: ApplicationError;
};
