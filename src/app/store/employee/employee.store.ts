import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  addEntities,
  EntityId,
  setAllEntities,
  updateEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import {
  ApplicationError,
  ErrorKey,
  LoadingKey,
  withError,
  withLoading,
} from '../core/features';
import { Employee, initialEmployeeState } from './employee.model';
import { EmployeeService } from './employee.service';

export const EmployeeStore = signalStore(
  { providedIn: 'root' },
  withState(initialEmployeeState),
  withLoading(),
  withError(),
  withEntities({ entity: type<Employee>(), collection: 'employee' }),
  withMethods((state, employeeService = inject(EmployeeService)) => ({
    async getEmployees(): Promise<void> {
      state.setLoading(LoadingKey.LOADING_EMPLOYEES, true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        await employeeService.getEmployees().then((employees: Employee[]) => {
          const employeeMap = new Map<number, Employee>();
          employees.forEach((employee) => {
            employeeMap.set(employee.id, { ...employee, reportees: [] });
            if (
              employee.managerId !== null &&
              employeeMap.has(employee.managerId)
            ) {
              const manager = employeeMap.get(employee.managerId);
              if (manager?.reportees) {
                manager.reportees.push(employee.id);
              }
            }
          });

          const employeesWithReportees = Array.from(employeeMap.values());
          patchState(
            state,
            setAllEntities(employeesWithReportees, { collection: 'employee' }),
          );
        });
      } catch (error) {
        patchState(state, {
          ...setAllEntities([], { collection: 'employee' }),
          error: { [ErrorKey.LOADING_EMPLOYEES]: { message: 'No Data found' } },
        });
      } finally {
        state.setLoading(LoadingKey.LOADING_EMPLOYEES, false);
      }
    },

    async addReportee(employee: Employee): Promise<void> {
      const highestId = state.employeeIds().at(-1) as number;
      const newEmployee = {
        ...employee,
        id: (highestId ?? 0) + 1,
        status: 'Active',
      };
      patchState(state, addEntities([newEmployee], { collection: 'employee' }));
    },

    async editEmployee(employee: Employee): Promise<void> {
      patchState(
        state,
        updateEntity(
          { id: employee.id, changes: employee },
          { collection: 'employee' },
        ),
      );
    },

    async deleteEmployee(id: number): Promise<void> {
      const employees = state.employeeEntityMap();
      const employeeToDelete: Employee = employees[id];
      patchState(
        state,
        updateEntity(
          { id: id, changes: { status: 'Inactive' } },
          { collection: 'employee' },
        ),
        updateEntities(
          {
            ids: employeeToDelete.reportees as EntityId[],
            changes: (employee) => {
              employee.managerId = employeeToDelete.managerId;
              return employee;
            },
          },
          { collection: 'employee' },
        ),
      );

      // If we need to remove completely
      // patchState(state, removeEntity(id, { collection: 'employee' }));
    },

    async changeManager(employeeId: number, managerId: number): Promise<void> {
      patchState(
        state,
        updateEntity(
          {
            id: employeeId,
            changes: {
              managerId,
            },
          },
          { collection: 'employee' },
        ),
      );
    },
  })),
  withComputed(({ employeeEntities, loading, error }) => ({
    activeEmployees: computed(() =>
      employeeEntities().filter((e) => e.status === 'Active'),
    ),
    loadingEmployees: computed(() => loading()[LoadingKey.LOADING_EMPLOYEES]),
    loadingEmployeesError: computed(() => error()[ErrorKey.LOADING_EMPLOYEES]),
  })),
  withHooks({
    onInit({ getEmployees }): void {
      getEmployees();
    },
  }),
  withDevtools('employee'),
);
