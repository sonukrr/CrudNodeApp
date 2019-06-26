import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../shared/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  employees: any = [];
  isNew: boolean = true;

  constructor(private empService: EmployeeService) { }

  ngOnInit() {

    this.empService.getEmployees().subscribe((res) => {
      this.employees = res;
    });
  }

  submit() {
    if (this.isNew)
      this.empService.createEmployee(this.employee).subscribe((res) => {
        console.log(res);
      });
    else {
      console.log("calling service");
      this.empService.editEmployee(this.employee).subscribe((res) => {
        console.log(res);
        this.isNew = true;
      },
        (err) => {
          console.log(err);
        });

    }
  }

  editEmployee(emp: Employee) {
    console.log("updating employee....")
    this.employee = emp;
    this.isNew = false;

  }

  deleteEmployee(emp: Employee) {
    this.empService.deleteEmployee(emp._id).subscribe((res) => {
      console.log("deleted Employee");
      this.ngOnInit();
    })
  }

  getEmployee(emp: Employee) {
    this.empService.getEmployee(emp._id).subscribe((res) => {
      console.log(res);
    })
  }

  resetForm() {
    this.employee = {};

  }
}
