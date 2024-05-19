import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../helpers/validateform';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm!: FormGroup;

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

  type1: string = 'password';
  isText1: boolean = false;
  eyeIcon1: string = 'fa-eye-slash';

  toggleVisibility(): void {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  toggleVisibility1(): void {
    this.isText1 = !this.isText1;
    this.isText1
      ? (this.eyeIcon1 = 'fa-eye')
      : (this.eyeIcon1 = 'fa-eye-slash');
    this.isText1 ? (this.type1 = 'text') : (this.type1 = 'password');
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', Validators.required],
      // confirmPassword: ['', Validators.required],
    });
  }

  onSubmite() {
    if (this.signupForm.valid) {
      // Send only necessary fields to the database
      this.auth.signUp(this.signupForm.value).subscribe({
        next: (res) => {
          alert(res.message);
          this.signupForm.reset();
          // this.toast.success(res.message, 'success');
          // this.toast.success({
          //   detail: 'success',
          //   summary: res.message,
          //   duration: 3000,
          // });
          this.router.navigate(['login']);
        },
        error: (err) => {
          alert(err?.error.message);
          // this.toast.error(err?.error.message);
          // this.toast.error({
          //   detail: 'error',
          //   summary: err?.error.message,
          //   duration: 3000,
          // });
        },
      });
    } else {
      //throw an error using toaster and with required fields
      ValidateForm.validdateAllFromFileds(this.signupForm);
      alert('Your form is invalid');
    }
  }
}
