import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavLeftComponent } from '../nav-left/nav-left.component';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-user-setting',
  standalone: true,
  imports: [HeaderComponent,NavLeftComponent,RouterLink],
  templateUrl: './user-setting.component.html',
  styleUrl: './user-setting.component.css'
})
export class UserSettingComponent {
  constructor(private tokenService: TokenService, private route:Router) {}
  logout() {
    this.tokenService.removeToken()
    this.route.navigate(['/login'])
  }
}
