import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) {}

  storeEmployee(createEmpForm: any): Observable<any> {
    return this.httpClient.post('admin/employees', createEmpForm);
  }
}
