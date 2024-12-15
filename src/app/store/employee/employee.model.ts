import { ErrorState, LoadingKey, LoadingState } from '../core/features';

export interface Employee {
  id: number;
  name: string;
  designation: string;
  email: string;
  phoneNumber: number;
  managerId: number;
  status: string;
  managerName?: any;
  reportees?: number[];
}

export interface EmployeeState {
  loading: LoadingState;
  error: ErrorState;
}

export const initialEmployeeState: EmployeeState = {
  loading: { [LoadingKey.LOADING_EMPLOYEES]: true },
  error: {},
};
