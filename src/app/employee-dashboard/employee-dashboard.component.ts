import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!: FormGroup
  employeeModelObject: EmployeeModel = new EmployeeModel();
  employeeData: any
  showAdd!: boolean
  showUpdate!: boolean
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    })
    this.getAllEmployees();
  }
  postEmployeeDetails() {
    this.employeeModelObject.firstName = this.formValue.value.firstName;
    this.employeeModelObject.lastName = this.formValue.value.lastName;
    this.employeeModelObject.email = this.formValue.value.email;
    this.employeeModelObject.mobile = this.formValue.value.mobile;
    this.employeeModelObject.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObject).subscribe(res => {
      console.log(res);
      alert('emp data added successfully..');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployees();
    },
      err => {
        alert("something went wrong");
      })
  }
  getAllEmployees() {
    this.api.getEmployee().subscribe(res => {
      this.employeeData = res;
    })
  }
  deleteEmployeeData(emp:any) {
    this.api.deleteEmployee(emp.id).subscribe(res => {
      alert('deleted a record');
      this.getAllEmployees();
    })
  }
  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  onEdit(emp: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObject.id = emp.id;
    this.formValue.controls['firstName'].setValue(emp.firstName);
    this.formValue.controls['lastName'].setValue(emp.lastName);
    this.formValue.controls['email'].setValue(emp.email);
    this.formValue.controls['mobile'].setValue(emp.mobile);
    this.formValue.controls['salary'].setValue(emp.salary);
  }
  updateEmployeeDetails() {
    this.employeeModelObject.firstName = this.formValue.value.firstName;
    this.employeeModelObject.lastName = this.formValue.value.lastName;
    this.employeeModelObject.email = this.formValue.value.email;
    this.employeeModelObject.mobile = this.formValue.value.mobile;
    this.employeeModelObject.salary = this.formValue.value.salary;

    this.api.putEmployee(this.employeeModelObject, this.employeeModelObject.id)
      .subscribe(res => {
        alert('emp data updated successfully')
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployees();
      })
  }
}
