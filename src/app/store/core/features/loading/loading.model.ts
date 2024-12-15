export enum LoadingKey {
  LOADING_EMPLOYEES = 'LOADING_EMPLOYEES'
}

export type LoadingState = {
  [key in LoadingKey]?: boolean;
}
