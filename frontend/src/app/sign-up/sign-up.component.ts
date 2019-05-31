import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  error: any;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('token')) {
      this.router.navigate(['/home']);
      this.userService.headerTitle('Home');

    } else {
      this.userService.headerTitle('User Sign Up');
    }
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(9)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: this.matchPass('password', 'confirmPassword')
      })

  }

  onRegister(form: FormGroup) {
    if (this.registerForm.invalid) {
      return;
    }
    this.userService.addUser(form.value).subscribe((res) => {
      if (res) {
        sessionStorage.setItem('token', res['token'])
        this.router.navigate(['/home']);
        this.userService.headerTitle('Home');
      }
    }, (err) => {
      this.error = err;
    })
    console.log(form.value, 'values');
  }

  matchPass(pass1, pass2) {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls[pass1];
      const confPass = formGroup.controls[pass2];
      if (password.value !== confPass.value) {
        return confPass.setErrors({ matchPass: true })
      } else {
        return confPass.setErrors(null)
      }
    }

  }

}
