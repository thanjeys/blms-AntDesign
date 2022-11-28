import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EmployeeService } from 'src/app/__services/admin/employee.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  empForm!: FormGroup;
  isSubmitted: boolean = false;
  isFormValid: boolean = false;

  listOfProducts: string[] = [];
  listOfSelectedValue = ['a10', 'c12'];

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    this.empForm = this.fb.group({
      name: [null, [Validators.required] ],
      email: [ null, [Validators.required, Validators.email] ],
      password: [ null, [Validators.required, Validators.minLength(8)] ],
      role_id: [ null, [Validators.required] ],
      products: [ null, [Validators.required] ]
    })


    this.listOfProducts = ['Home', 'Personal', 'LAP', 'Car Loan'];

  }

  isEmailExists(e : any) {
    let email = e;
    console.log(email);
  }

  showCo(roleId: any) {
    console.log('roleid', roleId);
  }

  createEmpForm(): void
  {
    for (const i in this.empForm.controls) {
      this.empForm.controls[ i ].markAsDirty();
      this.empForm.controls[ i ].updateValueAndValidity();
    }

    if (this.empForm.valid) this.isFormValid = true;

    if (this.isFormValid){
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






}
