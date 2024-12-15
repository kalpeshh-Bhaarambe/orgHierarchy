import {
  Component,
  CreateEffectOptions,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import {
  addTextIcon,
  banIcon,
  ClarityIcons,
  cogIcon,
  pencilIcon,
  switchIcon,
  userIcon,
} from '@cds/core/icon';
import '@cds/core/icon/register.js';
import { ClarityModule } from '@clr/angular';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TreeNode } from 'primeng/api';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { SharedConstants } from '../../../shared/constants/shared.constants';
import { Employee } from '../../../store/employee/employee.model';

interface GraphNode extends TreeNode {
  data: Employee;
}

@Component({
  selector: 'app-graph-view',
  standalone: true,
  imports: [
    OrganizationChartModule,
    PanelModule,
    ToastModule,
    ClarityModule,
    PopoverModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './graph-view.component.html',
  styleUrl: './graph-view.component.scss',
})
export class GraphViewComponent {
  public employeesList = input.required<Employee[]>();
  public graphFromEmployeeId = input<number>();
  public action = output<{
    employeeId: number;
    actionType: string;
  }>();
  public actionButtons = SharedConstants.actionButtons;
  public data = signal<GraphNode[]>([]);
  public selectedNode!: GraphNode;

  constructor() {
    ClarityIcons.addIcons(
      userIcon,
      cogIcon,
      addTextIcon,
      pencilIcon,
      banIcon,
      switchIcon,
    );

    effect(
      () => {
        this.updateEmployeesList(this.employeesList());
      },
      { allowSignalWrites: true } as CreateEffectOptions,
    );
  }

  updateEmployeesList = (newEmployees: Employee[]): void =>
    this.data.set(this.transformToGraphNodes(newEmployees));

  onNodeSelect = (node: TreeNode) =>
    this.action.emit({ employeeId: node.data.id, actionType: 'navigate' });

  private transformToGraphNodes = (employees: Employee[]): GraphNode[] => {
    const employeeMap: { [key: number]: GraphNode } = {};
    const roots: GraphNode[] = [];

    employees.forEach((employee) => {
      employeeMap[employee.id] = {
        label: employee.name,
        data: employee,
        expanded: true,
        children: [],
      };
    });

    employees.forEach((employee) => {
      if (employee.id === this.graphFromEmployeeId()) {
        roots.push(employeeMap[employee.id]);
      } else {
        const managerNode = employeeMap[employee.managerId];
        if (managerNode && managerNode.children) {
          managerNode.children.push(employeeMap[employee.id]);
        }
      }
    });

    return roots;
  };

  onAction = (employeeId: number, actionType: string) =>
    this.action.emit({ employeeId, actionType });
}
