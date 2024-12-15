import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClarityModule, ClrVerticalNavModule } from '@clr/angular';
import { ButtonModule } from 'primeng/button';
import { AddEditEmployeeComponent } from '../../shared/components/add-edit-employee/add-edit-employee.component';
import { ChangeDeleteEmployeeComponent } from '../../shared/components/change-delete-employee/change-delete-employee.component';
import { SharedConstants } from '../../shared/constants/shared.constants';
import {
  initialModalDetails,
  ModalDetails,
} from '../../shared/model/modal.model';
import { Employee } from './../../store/employee/employee.model';
import { EmployeeStore } from './../../store/employee/employee.store';
import { GraphViewComponent } from './graph-view/graph-view.component';
import { GridViewComponent } from './grid-view/grid-view.component';
import { HeaderComponent } from './header/header.component';
import { ClarityIcons, snowflakeIcon } from '@cds/core/icon';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { distinctUntilChanged, filter, Subscription } from 'rxjs';
import { event } from '@cds/core/internal';
import { ApplicationError, ErrorState } from '../../store/core/features';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    HeaderComponent,
    GridViewComponent,
    GraphViewComponent,
    ClrVerticalNavModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    AddEditEmployeeComponent,
    ChangeDeleteEmployeeComponent,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
  public subscription = new Subscription();
  public modalOpen = false;
  private employeeStore = inject(EmployeeStore);
  public isLoadingEmployees: Signal<boolean | undefined> =
    this.employeeStore.loadingEmployees;
  public employeesList: Signal<Employee[]> = this.employeeStore.activeEmployees;
  public employeeData: any = {};
  public appName = SharedConstants.appName;
  public views = SharedConstants.view;
  public modalDetails: ModalDetails = initialModalDetails;
  public selectedView: WritableSignal<string> = signal('');
  public graphFromEmployeeId: number = 1;
  public employeeListError: Signal<ApplicationError | undefined> =
    this.employeeStore.loadingEmployeesError;
  public messages = SharedConstants.messages;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.subscribeRouterEvents();
    ClarityIcons.addIcons(snowflakeIcon);
  }

  subscribeRouterEvents = () => {
    this.subscription.add(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          const path = this.route.snapshot.firstChild?.routeConfig?.path;
          if (path?.startsWith('graph')) {
            const id = this.route.snapshot.firstChild?.paramMap.get('id');
            this.selectedView.set(this.views.graphView);
            this.graphFromEmployeeId = id ? +id : 1;
          } else if (path === 'grid') {
            this.selectedView.set(this.views.gridView);
            this.graphFromEmployeeId = 0;
          }
        }),
    );
  };

  submitForm = (event: { actionType: string; employeeData: Employee }) => {
    switch (event.actionType) {
      case 'add':
        this.employeeStore.addReportee(event.employeeData);
        break;
      case 'edit':
        this.employeeStore.editEmployee(event.employeeData);
        break;
      case 'delete':
        this.employeeStore.deleteEmployee(event.employeeData.id);
        break;
      case 'change':
        this.employeeStore.changeManager(
          event.employeeData.id,
          event.employeeData.managerName.id,
        );
        break;
    }
    this.modalOpen = false;
    this.employeeData = {};
    this.modalDetails = initialModalDetails;
  };

  cancelForm = () => (this.modalOpen = false);

  navigateToTab = (view: string, employeeId: number = 1) => {
    if (view === this.views.graphView) {
      this.router.navigate([`/graph/${employeeId}`]);
    } else if (view === this.views.gridView) {
      this.router.navigate(['/grid']);
    }
  };

  action = (event: { employeeId: number; actionType: string }) => {
    if (event.actionType === 'navigate') {
      // this.router.navigate([`/graph/${event.employeeId}`]);
      this.navigateToTab(this.views.graphView, event.employeeId);
    } else {
      this.modalDetails = SharedConstants.modal[event.actionType];
      switch (event.actionType) {
        case 'add':
          this.addEmployee(event.employeeId);
          break;
        case 'edit':
          this.editEmployee(event.employeeId);
          break;
        case 'delete':
          this.deleteEmployee(event.employeeId);
          break;
        case 'change':
          this.changeManager(event.employeeId);
          break;
      }
      this.modalOpen = true;
    }
  };

  addEmployee = (employeeId: number) => {
    this.employeeData = {
      managerId: employeeId,
      managerName: this.getEmployeeById(employeeId).name,
    };
  };

  editEmployee = (employeeId: number) => {
    this.employeeData = {
      ...this.getEmployeeById(employeeId),
    };
  };

  deleteEmployee = (employeeId: number) => {
    const employeeDetails: Employee = this.getEmployeeById(employeeId);
    this.employeeData = {
      id: employeeDetails.id,
      name: employeeDetails.name,
    };
  };

  changeManager = (employeeId: number) => {
    const employeeDetails: Employee = this.getEmployeeById(employeeId);
    this.employeeData = {
      id: employeeDetails.id,
      name: employeeDetails.name,
    };
  };

  getEmployeeById = (id: number) => this.employeeStore.employeeEntityMap()[id];

  getAllEmployeesList = (id: number) =>
    this.modalDetails.type === 'change'
      ? this.employeesList().filter((emp) => emp.id !== id)
      : [];

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
