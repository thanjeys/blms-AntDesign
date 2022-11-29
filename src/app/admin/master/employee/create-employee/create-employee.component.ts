import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EmployeeService } from 'src/app/__services/admin/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  @Input() inputData : Number = 0;

  empForm!: FormGroup;
  isSubmitted: boolean = false;
  isFormValid: boolean = false;
  isCoInputField: boolean = false;

  listOfProducts: string[] = [];
  listOfSelectedProducts = ['a10', 'c12'];
  listofCos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private message: NzMessageService,
    private drawerRef: NzDrawerRef<string>
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
    console.log('Ng On Init', this.inputData);
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

  close(): void {
    this.drawerRef.close(this.inputData);
  }


}
