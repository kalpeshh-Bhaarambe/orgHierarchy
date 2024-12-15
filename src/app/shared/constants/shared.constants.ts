import { min } from 'rxjs';
import { ModalDetails } from '../model/modal.model';

export class SharedConstants {
  public static appName = 'Hierarchical Organization Chart';
  public static view = {
    graphView: 'Graph View',
    gridView: 'Grid View',
  };

  public static actionButtons = {
    add: 'Add Reportee',
    edit: 'Edit Details',
    delete: 'Delete Employee',
    change: 'Change Reporting Line',
  };

  public static labels = {
    empName: 'Employee Name',
    empId: 'Employee Id',
    designation: 'Designation',
    email: 'Email',
    phone: 'Phone',
    emailId: 'Email Id',
    phoneNumber: 'Phone Number',
    manager: 'Manager',
    managerName: 'Manager Name',
  };

  public static messages = {
    loading: 'Loading...',
    loadingError: "Something went wrong, please try again later",
    nameRequired: 'Employee name is required',
    min3Chars: 'Must contain atleast 3 characters',
    validName: 'Please enter a valid name',
    designationRequired: 'Designation is required',
    emailRequired: 'Email is required',
    min5Chars: 'Must contain atleast 5 characters',
    validEmail: 'Please enter a valid email',
    phoneRequired: 'Phone number is required',
    validPhone: 'Please enter a valid phone number',
    managerSelect: 'Please select a new manager',
  };

  public static designations = [
    'CEO',
    'Director',
    'Manager',
    'Lead Software Engineer',
    'Senior Software Engineer',
    'Software Engineer',
    "Consultant",
    "Designer",
    "Analyst"
  ];

  public static modal: { [key: string]: ModalDetails } = {
    add: {
      type: 'add',
      title: 'Add New Reportee',
      subText:
        'Add a new employee who will report directly to this person. Provide the details like name, designation, email, and phone to create their profile in the organization chart.',
      btnCancel: 'Cancel',
      btnAction: 'Add Reportee',
    },
    edit: {
      type: 'edit',
      title: 'Edit Employee Details',
      subText: 'Edit the details of this employee',
      btnCancel: 'Cancel',
      btnAction: 'Edit',
    },
    delete: {
      type: 'delete',
      title: 'Delete Reportee',
      subText:
        "Deleting this employee will reassing all their direct reportees to the employee's manager. Confirm this action to remove the employee from the organization chart and update the reporting hierarchy accordingly.",
      btnCancel: 'Cancel',
      btnAction: 'Delete',
    },
    change: {
      type: 'change',
      title: 'Change Employee Reporting Line',
      subText:
        'Reassign the emploee report to a new manager. Select the desired manager from the available options to update the reporting hierarchy in the organization chart.',
      btnCancel: 'Cancel',
      btnAction: 'Change Reporting',
    },
  };
}
