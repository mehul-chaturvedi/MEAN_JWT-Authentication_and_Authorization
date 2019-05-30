import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headTitle = new BehaviorSubject('Home');
  currentTitle = this.headTitle.asObservable()

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:5000'
  getUser(data){
    return this.http.post(`${this.uri}/auth/login`, data)
  }

  addUser(data){
    return this.http.post(`${this.uri}/auth/register`, data);
  }

  headerTitle(title){
    this.headTitle.next(title);
  }
}
