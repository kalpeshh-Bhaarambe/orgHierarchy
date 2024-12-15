import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  NO_ERRORS_SCHEMA,
  output,
} from '@angular/core';
import { ClarityModule, ClrDatagridSortOrder } from '@clr/angular';
import { SharedConstants } from '../../../shared/constants/shared.constants';
import { Employee } from '../../../store/employee/employee.model';

@Component({
  selector: 'app-grid-view',
  standalone: true,
  imports: [ClarityModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.scss',
})
export class GridViewComponent {
  public employeesList = input.required<Employee[]>();
  public action = output<{
    employeeId: number;
    actionType: string;
  }>();
  public actionButtons = SharedConstants.actionButtons;
  public gridColumns = SharedConstants.labels;
  public ascSort = ClrDatagridSortOrder.ASC;

  onRowClick = (event: Event, employeeId: number) => {
    const srctarget = event.target as Element;
    if (srctarget.localName === 'clr-dg-cell') {
      this.action.emit({ employeeId, actionType: 'navigate' });
    }
  };

  onAction = (employeeId: number, actionType: string): void =>
    this.action.emit({ employeeId, actionType });
}
