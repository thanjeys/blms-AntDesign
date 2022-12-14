import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EmployeeService } from 'src/app/__services/admin/employee.service';

// import { Input, ViewChild } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  empForm!: FormGroup;
  isSubmitted: boolean = false;
  isFormValid: boolean = false;
  isCoInputField: boolean = false;

  listOfProducts: string[] = [];
  listOfSelectedProducts = ['a10', 'c12'];
  listofCos: any[] = [];

  inputDatas = 12;

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private message: NzMessageService,
    private drawerService: NzDrawerService
  ) { }

  ngOnInit(): void {
    this.empForm = this.fb.group({
      name: [null, [Validators.required] ],
      mobile: [null, [Validators.required] ],
      email: [ null, [Validators.required, Validators.email] ],
      password: [ null, [Validators.required, Validators.minLength(8)] ],
      role_id: [ null, [Validators.required] ],
      coordinator: [],
      products: [ null, [Validators.required] ],
      status: [ false]
    })

    this.listOfProducts = ['Home', 'Personal', 'LAP', 'Car Loan'];
  }

  showCoInput(roleId: any) {

    if (roleId == 1 || roleId == 2) {
      this.isCoInputField = true;
      this.empForm.controls['coordinator'].setValidators([Validators.required]);

      this.listofCos = [
        { id : 2, name: "Ram"},
        { id : 3, name: "Kumar"},
        { id : 4, name: "Ravi"},
      ];

    } else {
      this.isCoInputField = false;
    }

  }

  createEmpForm(): void
  {
    for (const i in this.empForm.controls) {
      this.empForm.controls[ i ].markAsDirty();
      this.empForm.controls[ i ].updateValueAndValidity();
    }

    console.log(this.empForm.value);

    if (this.empForm.valid){
      this.isSubmitted = true
      this.empService.storeEmployee(this.empForm.value)
      .pipe(finalize(() => this.isSubmitted = false))
      .subscribe({
        next: (res: any) => {
          this.message.create('success', res.message);
        },
        error: (err: any) => {
          if(err.status === 422) {
            const validatonErrors = err.error.errors;
            Object.keys(validatonErrors).forEach( prop => {
              const formControl = this.empForm.get(prop);
              if(formControl){
                formControl.setErrors({
                  serverError: validatonErrors[prop]
                });
              }
            });
          }
        },
        complete: () => {
          this.empForm.reset();
        }
      });
    }

  }


  drawerVisible = false;

  open(): void {
    this.drawerVisible = true;
  }
  close(): void {
    this.drawerVisible = false;
  }

  openComponent(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Create User',
      nzSize: 'large',
      nzContent: CreateEmployeeComponent,
      nzWidth: 500,
      nzContentParams: {
        inputData: this.inputDatas
      }
    });

    drawerRef.afterOpen.subscribe(() => {
      console.log('Drawer(Component) open');
    });

    drawerRef.afterClose.subscribe(data => {
      console.log(data);
      if (typeof data === 'string') {
        // this.inputDatas = data;
      }
    });
  }



}
