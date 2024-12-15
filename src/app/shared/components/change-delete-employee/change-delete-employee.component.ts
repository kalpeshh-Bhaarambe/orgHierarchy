import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { Employee } from '../../../store/employee/employee.model';
import { SharedConstants } from '../../constants/shared.constants';
import { ModalDetails } from '../../model/modal.model';

@Component({
  selector: 'app-change-delete-employee',
  standalone: true,
  imports: [ClarityModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './change-delete-employee.component.html',
  styleUrl: './change-delete-employee.component.scss',
})
export class ChangeDeleteEmployeeComponent {
  public modalDetails = input.required<ModalDetails>();
  public employeeData = input.required<any>();
  public managerList = input.required<Employee[]>();
  public submitForm = output<{ actionType: string; employeeData: Employee }>();
  public cancelForm = output<void>();
  public clrLabelSize: number = 4;
  public clrLayout: string = 'horizontal';
  public formLabels = SharedConstants.labels;
  public messages = SharedConstants.messages;

  onSubmit = (actionType: string) =>
    this.submitForm.emit({ actionType, employeeData: this.employeeData() });

  onCancel = () => this.cancelForm.emit();
}
