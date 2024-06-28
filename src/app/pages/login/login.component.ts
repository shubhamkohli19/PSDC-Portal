import { Component } from '@angular/core';
import { Login } from '../../interfaces/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessages: string[] = [];

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  login(): void {
    this.errorMessages = [];

    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);

      const controls = this.loginForm.controls;

      if (controls['email'].errors?.['required']) {
        this.errorMessages.push('Email is required.');
      } else if (controls['email'].errors?.['email']) {
        this.errorMessages.push('Invalid email format.');
      }
      else if (controls['password'].errors?.['required']) {
        this.errorMessages.push('Password is required.');
      }

      return;
    }

    else {
      const login: Login = this.loginForm.value;
      this.loginService.login(login).subscribe(
        (errorMessage: string) => {
          console.log(errorMessage)
          this.errorMessages.push(errorMessage);
        }
      );
    }
  }
}