import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavLeftComponent } from '../nav-left/nav-left.component';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AsyncLocalStorage } from 'async_hooks';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,NavLeftComponent,FormsModule,CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    email: string = ''
    password: string = ''
    rememberMe: boolean = false;
    constructor(private userService: UserService, private tokenService: TokenService
      ,private route: Router
    ) {}
  ngOnInit(): void {
    const email = localStorage.getItem('email')
    if(email) {
      this.email = email
    }
  }
  login() {
    this.userService.login(this.email,this.password)
    .subscribe((response: any) => {
      console.log(response)
      this.tokenService.setToken(response.token)
      if(this.rememberMe) {
        localStorage.setItem("email",this.email);
      }
      if(this.tokenService.getRoleByToken() === 'ADMIN') {
        this.route.navigate(['/admin/posts'])
      } else {
        this.route.navigate([''])
      }
    })
  }

}
