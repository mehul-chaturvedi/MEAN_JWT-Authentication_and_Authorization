import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router) { }
  error: any;
  ngOnInit() {
    if (sessionStorage.getItem('token')) {
      this.router.navigate(['/home']);
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })

    this.userService.headerTitle('User Login')
  }

  loginSubmit(form: FormGroup) {
    console.log(form.value, 'form');
    this.userService.getUser(form.value).subscribe((res) => {
      if (res) {
        sessionStorage.setItem('token', res['token'])
        this.router.navigate(['/home']);
      }
    }, (err) => {
      this.error = err;
    })
  }

}
