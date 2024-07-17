import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavLeftComponent } from '../nav-left/nav-left.component';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AsyncLocalStorage } from 'async_hooks';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, NavLeftComponent, FormsModule, CommonModule, ToastModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email: string = ''
  password: string = ''
  rememberMe: boolean = false;
  constructor(private userService: UserService, private tokenService: TokenService
    , private route: Router, private messageService: MessageService
  ) { }
  ngOnInit(): void {
    const email = localStorage.getItem('email')
    if (email) {
      this.email = email
    }
  }
  login() {
    this.userService.login(this.email, this.password)
      .subscribe({
        next: (response: any) => {

          this.tokenService.setToken(response.token)
          if (this.rememberMe) {
            localStorage.setItem("email", this.email);
          }
          if (this.tokenService.getRoleByToken() === 'ADMIN') {
            this.route.navigate(['/admin/posts'])
          } else {
            this.route.navigate([''])
          }
        }, error: (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Đăng nhập thất bại', detail: 'Sai tài khoản hoặc mật khẩu' });
        }
      })
  }

}
