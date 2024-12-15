import { Injectable } from '@angular/core';
import { firstNames, lastNames } from '../../shared/constants/mock-file';
import { SharedConstants } from '../../shared/constants/shared.constants';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private generateRandomEmployee(id: number, managerId: number): Employee {
    const designations = SharedConstants.designations;

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const designation =
      designations[Math.floor(Math.random() * (designations.length - 1)) + 1];

    return {
      id,
      name: `${firstName} ${lastName}`,
      designation,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@xyz.com`,
      phoneNumber: Math.floor(Math.random() * 1000000000),
      managerId,
      status: 'Active',
    };
  }

  private generateHierarchy(
    employees: Employee[],
    managerId: number,
    level: number,
    maxLevel: number,
  ): void {
    if (level > maxLevel) return;

    const numEmployees = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < numEmployees; i++) {
      const id = employees.length + 1;
      const employee = this.generateRandomEmployee(id, managerId);
      employees.push(employee);
      const randomMaxLevel = Math.floor(Math.random() * 5) + 1;
      this.generateHierarchy(employees, id, level + 1, randomMaxLevel);
    }
  }

  getEmployees(): Promise<Employee[]> {
    /**
     * Uncomment the below line to see the error scenario
     */
    // return Promise.reject('Method not implemented.');

    /**
     * Success scenario
     */
    const employees: Employee[] = [];

    const ceo: Employee = {
      id: 1,
      name: 'Alex Woods',
      designation: 'CEO',
      email: 'john.doe@xyz.com',
      phoneNumber: Math.floor(Math.random() * 1000000000),
      managerId: 0,
      status: 'Active',
    };
    employees.push(ceo);

    this.generateHierarchy(employees, ceo.id, 1, 3);

    return Promise.resolve(employees);
  }
}
