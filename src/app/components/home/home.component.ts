import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NavLeftComponent } from '../nav-left/nav-left.component';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,NavLeftComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private userService: UserService, private tokenService: TokenService
    ,private route: Router
  ) {}
  ngOnInit(): void {
    if(!this.tokenService.getToken()) {
        this.route.navigate(['/login'])
    }
  }

}
