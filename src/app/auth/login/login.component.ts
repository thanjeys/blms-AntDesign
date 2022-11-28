import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  isSubmitted: boolean = false;

  constructor (
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.loginForm = this.fb.group({
          email: [ null, [ Validators.required ] ],
          password: [ null, [ Validators.required ] ]
      });
  }

  submitForm(): void
  {
    for (const i in this.loginForm.controls) {
        this.loginForm.controls[ i ].markAsDirty();
        this.loginForm.controls[ i ].updateValueAndValidity();
    }

    if (this.loginForm.valid) {
      this.isSubmitted = true;
      this.authService.login(this.loginForm.value)
      .pipe(finalize(() => this.isSubmitted = false ))
      .subscribe({
        next: (res: any) => {
          this.redirection(res.data.role_id);
        },
        error: (err: any) =>   {
          this.message.create('error', `${err.error.message}`);
        },
        complete: () => {
        }
      })
    }
  }

  redirection(RoleId: Number) {
    if (RoleId == 1)
      this.router.navigate(['/admin']);
    else
      this.router.navigate(['notAuthorized'])

  }

}
