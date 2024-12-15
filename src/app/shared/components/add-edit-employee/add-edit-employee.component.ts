import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  output,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { Employee } from '../../../store/employee/employee.model';
import { SharedConstants } from '../../constants/shared.constants';
import { ModalDetails } from '../../model/modal.model';

@Component({
  selector: 'app-add-edit-employee',
  standalone: true,
  imports: [ClarityModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-employee.component.html',
  styleUrl: './add-edit-employee.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddEditEmployeeComponent {
  public modalDetails = input.required<ModalDetails>();
  public employeeData = input.required<any>();
  public submitForm = output<{ actionType: string; employeeData: Employee }>();
  public cancelForm = output<void>();
  public clrLabelSize: number = 4;
  public clrLayout: string = 'horizontal';
  public designations = SharedConstants.designations;
  public formLabels = SharedConstants.labels;
  public messages = SharedConstants.messages;

  onSubmit = (actionType: string) =>
    this.submitForm.emit({ actionType, employeeData: this.employeeData() });

  onCancel = () => this.cancelForm.emit();
}
