import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Employee } from '../shared/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  selectedEmployee: Employee;
  employees: Employee[];
  baseUri: string = "http://localhost:3000/employees"
  constructor(private _http: HttpClient) { }

  getEmployees() {
    return this._http.get(`${this.baseUri}`);
  }

  getEmployee(id: string) {
    return this._http.get(`${this.baseUri}`);
  }

  createEmployee(emp: Employee) {
    return this._http.post(`${this.baseUri}`, emp);
  }

  editEmployee(emp: Employee) {
    return this._http.put(`${this.baseUri}/`, emp);
  }

  deleteEmployee(empId: any) {
    return this._http.delete(`${this.baseUri}/${empId}`);
  }


}
