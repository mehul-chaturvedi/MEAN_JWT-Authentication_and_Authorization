import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
title;
home=false;
login=true;
signup=false;
  ngOnInit() {
    this.userService.currentTitle.subscribe(res=>{
      this.title = res;
      console.log(this.title)
      if(this.title === 'Home'){
        this.home = true;
        this.signup = false;
        this.login = false;
      } else if(this.title == 'User Login') {
        this.home = false;
        this.login=true;
        this.signup = false;
      } else
      if(this.title == 'User Sign Up')  {
        this.home = false;
        this.signup = true;
        this.login = false;
      }
    })
    this.title = 'Home'
  }

  logout(){
      sessionStorage.removeItem('token');
     this.router.navigate(['/login']);
  }

}
